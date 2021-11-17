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
	await $`npm publish -w ${workspace}`
	let pkgjson = await readPackage({cwd: `${workspace}`})
	let {statusCode, body} = await request(
		"https://origami-repo-data.ft.com/v1/queue",
		{
			maxRedirections: 100,
			headers: {
				"content-type": "application/json",
				"x-api-key": REPO_DATA_KEY,
				"x-api-secret": REPO_DATA_SECRET,
			},
			method: "POST",
			body: JSON.stringify({
				packageName: pkgjson.name,
				version: pkgjson.version,
				type: "npm",
			}),
		}
	)

	for await (let data of body) {
		process.stdout.write(data)
	}

	if (statusCode < 200 || statusCode >= 300) {
		throw statusCode
	}
}
