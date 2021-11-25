#!/usr/bin/env node
import * as workspaces from "./lib/workspaces.js"
import {readPackage} from "read-pkg"

let {exit} = process
let {log} = console

/** exit code */
let code = 0

let message = `
make sure private is false for packages that should be published, and true for
those that shouldn't.
`

for (let cwd of await workspaces.paths()) {
	let pkg = await readPackage({cwd})
	if (typeof pkg.private != "boolean") {
		log(`${cwd}/package.json#private is not a boolean`)
		code = 130
	}
}

if (code != 0) {
	log(message)
}

exit(code)
