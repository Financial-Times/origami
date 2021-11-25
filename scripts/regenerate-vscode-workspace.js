#!/usr/bin/env node
import * as workspaces from "./lib/workspaces.js"
import {writeFile} from "node:fs/promises"
let workspacePaths = await workspaces.paths()

Object.defineProperty(Array.prototype, "last", {
	get() {
		return this[this.length - 1]
	},
})

let folders = [{path: "."}].concat(
	workspacePaths
		.sort((a, b) => {
			a = a.split("/").last
			b = b.split("/").last
			return a > b ? 1 : a < b ? -1 : 0
		})
		.map(path => ({path}))
)

let workspace = {folders, settings: {}}
await writeFile("origami.code-workspace", JSON.stringify(workspace, null, "\t"))
