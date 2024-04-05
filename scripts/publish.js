#!/usr/bin/env node
import {$} from "zx"
import {readPackage} from "read-pkg"
import {request} from "undici"

let outputs = JSON.parse(process.argv[2])

let {REPO_DATA_KEY, REPO_DATA_SECRET} = process.env

for (let key in outputs) {
	let value = outputs[key]
	let match = key.match(/^(.*\/.*)--release_created$/)
	if (!match || !value) continue
	let workspace = match[1]
	if (workspace.startsWith("components/o3-")) {
		await $`npm run build -w ${workspace} --if-present`
	}
	await $`npm publish -w ${workspace} --access public`
}
