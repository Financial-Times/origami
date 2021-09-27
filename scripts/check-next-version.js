import core from "@actions/core"
import {$} from "zx"
import {promises as fs} from "fs"
import {context} from "@actions/github"

let patch = Symbol('patch')
let minor = Symbol('minor')
let major = Symbol('major')

try {
    $.verbose = false
    const publishablePackages = await getPublishablePackages()
    // Map of package names to version bump type
    // E.G. 'components/o-quote' => Symbol(major)
    const packagesToPublish = new Map;
    let baseRef = getBaseRef()
    let headRef = getHeadRef()
    let commitHashesAndMessages = await commitHashesAndMessagesBetween(baseRef, headRef)
    for (const commitHashAndMessage of commitHashesAndMessages) {
        const [hash, message] = splitOnce(commitHashAndMessage, ' ')
        if (isPublishableCommitMessage(message)) {
            let version = parseCommitMessageToVersion(message)
            let filesChanged = await findModifiedFilesInCommit(hash)
            for (const pkg of publishablePackages) {
                for (const file of filesChanged) {
                    if (file.startsWith(pkg)) {
                        if (packagesToPublish.has(pkg)) {
                            const currentVersion = packagesToPublish.get(pkg);
                            // If the version if patch, we can skip all the rest as nothing is lower than a patch
                            if (version === patch) {
                                continue
                            } else if (version === minor && currentVersion === patch) {
                                packagesToPublish.set(pkg, version);
                                // If the version is majoe, we can assign it immediately as nothign is higher than a major
                            } else if (version === major) {
                                packagesToPublish.set(pkg, version);
                            }
                        } else {
                            packagesToPublish.set(pkg, version);
                        }
                    }
                }
            }
        }
    }
    if (packagesToPublish.size) {
        core.notice('A commit is a `fix` or `feat` commit, a release will be made.')
        console.log({packagesToPublish})
    } else {
        core.notice('No commits since last release are a `fix` or `feat` - which means no user facing changes have been made. This means no releases will be made.')
    }
} catch (error) {
	core.setFailed(error.message)
}

function splitOnce(string, separator) {
    let [first, ...rest] = string.split(separator)
    if (rest.length === 0) {
        return [first]
    } else {
        return [first, rest.join(separator)]
    }
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

function getBaseRef() {
    let baseRef = 'main'
    if (context?.payload?.pull_request?.base?.ref) {
        baseRef = `origin/${context.payload.pull_request.base.ref}`
    }
    return baseRef
}
function getHeadRef() {
    let headRef = 'HEAD'
    if (context?.payload?.pull_request?.head?.ref) {
        headRef = `origin/${context.payload.pull_request.head.ref}`
    }
    return headRef
}
async function commitHashesAndMessagesBetween(baseRef, headRef) {
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
    let version;
    if (message.startsWith('fix:')){
        version = patch
    } else if (message.startsWith('feat:')) {
        version = minor
    } else {
        version = major
    }
    return version
}