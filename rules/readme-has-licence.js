let rule = require("unified-lint-rule")
let find = require("unist-util-find")
let toString = require("mdast-util-to-string")
let visit = require("unist-util-visit")
let findAllAfter = require("unist-util-find-all-after")
let findAllBetween = require("unist-util-find-all-between")

/** @param {import("mdast").Root} tree */
function readmeHasLicence(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}
	let licenceHeading = find(tree, n => {
		if (n.type == "heading" && n.depth == 2) {
			let text = toString(n).trim().toLowerCase()
			if (text == "license") {
				file.message("Licence should be spelt 'licence', not 'license'")
				return true
			}
			return text == "licence"
		}
	})

	if (!licenceHeading) {
		file.message("Readme should have a 'Licence' section, with a valid licence")
		return
	}

	let rest = findAllAfter(tree, licenceHeading)
	let nextHeading = rest.find(n => n.type == "heading" && n.depth == 2)

	let licenceContent
	if (nextHeading) {
		licenceContent = toString(findAllBetween(tree, licenceHeading, nextHeading))
	} else {
		licenceContent = toString(rest)
	}

	let mentionsMit = licenceContent.match(/\bMIT\b/)

	if (!mentionsMit) {
		file.message(
			`The license section should mention MIT. got: ${licenceContent}`,
			licenceHeading
		)
	}
}

module.exports = rule(
	"remark-lint:origami-component/readme-has-licence",
	readmeHasLicence
)
