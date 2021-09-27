import {$} from "zx"
import {promises as fs} from "fs"
import splitonce from "splitonce"

let patch = Symbol('patch')
let minor = Symbol('minor')
let major = Symbol('major')

export async function getChangedPackages(baseRef, headRef) {
    $.verbose = false
    const publishablePackages = await getPublishablePackages()
    // Map of package names to version bump type
    // E.G. 'components/o-quote' => Symbol(major)
    const packagesToPublish = new Map
    let commitHashesAndMessages = await commitHashesAndMessagesBetween(baseRef, headRef)
    for (const commitHashAndMessage of commitHashesAndMessages) {
        const [hash, message] = splitonce(commitHashAndMessage, ' ')
        if (isPublishableCommitMessage(message)) {
            let version = parseCommitMessageToVersion(message)
            let filesChanged = await findModifiedFilesInCommit(hash)
            for (const pkg of publishablePackages) {
                for (const file of filesChanged) {
                    if (file.startsWith(pkg)) {
                        if (packagesToPublish.has(pkg)) {
                            const currentVersion = packagesToPublish.get(pkg)
                            // If the version is a patch, we can skip all the rest as nothing is lower than a patch
                            if (version === patch) {
                                continue
                            } else if (version === minor && currentVersion === patch) {
                                packagesToPublish.set(pkg, version)
                                // If the version is major, we can assign it immediately as nothing is higher than a major
                            } else if (version === major) {
                                packagesToPublish.set(pkg, version)
                            }
                        } else {
                            packagesToPublish.set(pkg, version)
                        }
                    }
                }
            }
        }
    }
    return packagesToPublish
}

async function getPublishablePackages() {
    let releasePleaseFile
    try {
        releasePleaseFile = await fs.readFile('release-please-config.json', "utf-8")
    } catch (error) {
        throw new Error('cannot read release-please-config.json')
    }
    let releasePleaseConfig
    try {
        releasePleaseConfig = JSON.parse(releasePleaseFile)
    } catch (error) {
        throw new Error('release-please-config.json contains invalid json')
    }
    const publishablePackages = Object.keys(releasePleaseConfig.packages)
    return publishablePackages
}

async function commitHashesAndMessagesBetween(baseRef = 'main', headRef = 'HEAD') {
    let commitHashesAndMessages = (await $`git log --pretty="format:%H %s" ${baseRef}~20...${headRef} --`).stdout.split('\n')
    return commitHashesAndMessages
}

async function findModifiedFilesInCommit(commitSha) {
    let filesChanged = (await $`git show --pretty="format:" --name-only ${commitSha}`).stdout.split('\n')
    return filesChanged
}

function isPublishableCommitMessage(message) {
    if (message.startsWith('fix:') || message.startsWith('fix!:') || message.startsWith('feat:') || message.startsWith('feat!:')) {
        return true
    } else {
        return false
    }
}

function parseCommitMessageToVersion(message) {
    let version
    if (message.startsWith('fix:')){
        version = patch
    } else if (message.startsWith('feat:')) {
        version = minor
    } else {
        version = major
    }
    return version
}