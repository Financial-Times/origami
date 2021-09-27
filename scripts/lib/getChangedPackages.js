import {$} from "zx"
import {promises as fs} from "fs"
import splitonce from "splitonce"
import { URL } from 'url';
import path from "path"

const __dirname = new URL('.', import.meta.url).pathname;

let patch = 'patch'
let minor = 'minor'
let major = 'major'

/**
 * Find all the packages which have been modified in the commits which are on the `headRef` and not on the `baseRef`
 * 
 * @param {string} baseRef The commit sha to use as the base
 * @param {string} headRef The commit sha to use as the head
 * @returns {Promise<Object<string, string|null>>} A promise which resolves to a map of package names to version bump type or null if no version bump required E.G. 'components/o-quote' => 'major'
 */
export async function getChangedPackages(baseRef, headRef) {
    const publishablePackages = await getPublishablePackages()
    // Map of package names to version bump type
    // E.G. 'components/o-quote' => 'major'
    /** @type {Object<string, string|null>} */
    const changedPackages = {}
    let commitHashesAndMessages = await commitHashesAndMessagesBetween(baseRef, headRef)
    for (const commitHashAndMessage of commitHashesAndMessages) {
        const [hash, message] = splitonce(commitHashAndMessage, ' ')
        let version = parseCommitMessageToVersion(message)
        let filesChanged = await findModifiedFilesInCommit(hash)
        for (const pkg of publishablePackages) {
            for (const file of filesChanged) {
                if (file.startsWith(pkg)) {
                    if (changedPackages.hasOwnProperty(pkg)) {
                        const currentVersion = changedPackages[pkg]
                        // If the version is a patch, we can skip all the rest as nothing is lower than a patch
                        if (version === patch) {
                            continue
                        } else if (version === minor && currentVersion === patch) {
                            changedPackages[pkg] = version
                            // If the version is major, we can assign it immediately as nothing is higher than a major
                        } else if (version === major) {
                            changedPackages[pkg] = version
                        }
                    } else {
                        changedPackages[pkg] = version
                    }
                }
            }
        }
    }
    return changedPackages
}

/**
 * Filter a map of changed packages for the ones which have user facing changes
 * 
 * @param {Object<string, string>} changedPackages Map of package names to version bump type -- This can be retrieved with the `getChangedPackages` function
 */
export function filterUserFacing(changedPackages) {
    const userFacingChangedPackages = {}
    for (const [name, bump] of Object.entries(changedPackages)) {
        if (bump != null) {
            userFacingChangedPackages[name] = bump
        }
    }
    return userFacingChangedPackages
}

async function getPublishablePackages() {
    let releasePleaseFile
    try {
        releasePleaseFile = await fs.readFile(path.join(__dirname, '../../release-please-config.json'), "utf-8")
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

/**
 * Retrieve the commit shas and commit messages for all commits which are on the `headRef` and not on the `baseRef`
 * 
 * @param {string} baseRef The commit sha to use as the base
 * @param {string} headRef The commit sha to use as the head
 * @returns {Promise<Array<string>>} A promise which resolves to an array of the strings. Each string is in the format `<commit sha> <commit message>`.
 */
async function commitHashesAndMessagesBetween(baseRef = 'main', headRef = 'HEAD') {
    $.verbose = false
    let commitHashesAndMessages = (await $`git log --pretty="format:%H %s" ${headRef} --not ${baseRef} --`).stdout.split('\n')
    $.verbose = true
    return commitHashesAndMessages
}

/**
 * Retrieve the list of files which were modified for the given commit sha
 * 
 * @param {string} commitSha The commit sha to use
 * @returns {Promise<Array<string>>} A promise which resolves to an array of the file paths which were modified
 */
async function findModifiedFilesInCommit(commitSha) {
    $.verbose = false
    let filesChanged = (await $`git show --pretty="format:" --name-only ${commitSha}`).stdout.split('\n')
    $.verbose = true
    return filesChanged
}

/**
 * Find what version bump the given commit message corresponds to.
 * 
 * A commit prefix `fix:` will return `patch`
 * A commit prefix `feat:` will return `minor`
 * A commit prefix ending in `!:` will return `major`
 * Anything else will return null
 * 
 * @param {string} message 
 * @returns {null|string} If the commit message corresponds to a version bump, returns a string, otherwise returns null
 */
function parseCommitMessageToVersion(message) {
    let version = null
    if (message.startsWith('fix:')){
        version = patch
    } else if (message.startsWith('feat:')) {
        version = minor
    } else if (
        message.startsWith('feat!:') ||
        message.startsWith('fix!:') ||
        message.startsWith('perf!:') ||
        message.startsWith('revert!:') ||
        message.startsWith('docs!:') ||
        message.startsWith('chore!:')
    ) {
        version = major
    }
    return version
}