import core from "@actions/core"
import {
	getChangedPackages,
	filterUserFacing,
} from "./lib/get-changed-packages.mjs"
import {context} from "@actions/github"

try {
	let baseRef = getBaseRef()
	let headRef = getHeadRef()
	const packagesToPublish = filterUserFacing(
		await getChangedPackages(baseRef, headRef)
	)
	if (packagesToPublish.size) {
		core.notice("A commit is a `fix` or `feat` commit, a release will be made.")
		console.log({packagesToPublish})
	} else {
		core.notice(
			"No commits since last release are a `fix` or `feat` - which means no user facing changes have been made. This means no releases will be made."
		)
	}
} catch (error) {
	core.setFailed(error.message)
}

function getBaseRef() {
	let baseRef = "main"
	if (context?.payload?.pull_request?.base?.ref) {
		baseRef = `origin/${context.payload.pull_request.base.ref}`
	}
	return baseRef
}
function getHeadRef() {
	let headRef = "HEAD"
	if (context?.payload?.pull_request?.head?.ref) {
		headRef = `origin/${context.payload.pull_request.head.ref}`
	}
	return headRef
}
