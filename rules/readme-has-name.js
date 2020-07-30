let rule = require("unified-lint-rule")
let walk = require("unist-util-visit")
let {join} = require("path")
let {existsSync, readFileSync} = require("fs")

/** @param {import("mdast").Root} tree */
function readmeHasName(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}

	let bowerJsonPath = join(process.cwd(), "/bower.json")

	if (!existsSync(bowerJsonPath)) {
		file.message("bower.json with name is required to be in the component root")
		return
	}

	let bowerJson
	try {
		bowerJson = JSON.parse(readFileSync(bowerJsonPath, "utf-8"))
	} catch (error) {
		file.message("could not parse bower.json: " + error.message)
		return
	}

	if (!typeof bowerJson.name == "string") {
		file.message("bower.json requires `name` set to the name of the component")
		return
	}

	let firstChild = tree.children[0]

	if (firstChild.type != "heading") {
		file.message(
			"The README should start with an h1 containing the name of the component",
			firstChild
		)
		return
	}

	if (firstChild.depth != 1) {
		file.message(
			"The README should start with an h1 containing the name of the component, but the first heading here is h" +
				firstChild.depth,
			firstChild
		)
		return
	}

	let h1 = firstChild

	let h1Content = ""

	walk(h1, function (node) {
		if (node.type == "text") {
			h1Content += node.value
		}
	})

	h1Content = h1Content.trim()

	if (h1Content == bowerJson.name) {
		return
	} else {
		file.message(
			`The main heading in the README must be the component's name as defined in the bower.json. expected "${bowerJson.name}", got "${h1Content}"`,
			h1
		)
	}
}

module.exports = rule(
	"remark-lint:origami-component/readme-has-name",
	readmeHasName
)
