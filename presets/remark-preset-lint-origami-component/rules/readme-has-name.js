let rule = require("unified-lint-rule")
let walk = require("unist-util-visit")
let {join, basename} = require("path")
let {existsSync, readFileSync} = require("fs")

/** @param {import("mdast").Root} tree */
function readmeHasName(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}

	let packageJsonPath = join(file.path, "..", "package.json")

	if (!existsSync(packageJsonPath)) {
		file.message(`${packageJsonPath} not found.`)
		return
	}

	let packageJson
	try {
		packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
	} catch (error) {
		file.message("could not parse package.json: " + error.message)
		return
	}

	if (typeof packageJson.name != "string") {
		file.message("package.json requires `name` set to the name of the component")
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
	let name = packageJson.name;
	// If the package is under the @financial-times namespace then we don't include the namespace in the main heading
	if (name.startsWith("@financial-times/")) {
		name = name.replace("@financial-times/", "");
	}

	if (h1Content == name) {
		return
	} else {
		file.message(
			`The main heading in the README must be the component's name as defined in the package.json, excluding the @financial-times namespace. expected "${name}", got "${h1Content}"`,
			h1
		)
	}
}

module.exports = rule(
	"remark-lint:origami-component/readme-has-name",
	readmeHasName
)
