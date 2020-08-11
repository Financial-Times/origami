let rule = require("unified-lint-rule")
let walk = require("unist-util-visit")
let { join } = require("path")
let { existsSync, readFileSync } = require("fs")

/**
 * Has a link to general component usage information:
 * https://origami.ft.com/docs/components
 *
 * @param {import("mdast").Root} tree
 */
function readmeHasGeneralUsage(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}

	const generalUsageLink = "https://origami.ft.com/docs/components";

	let hasGeneralUsageLink = false;
	walk(tree, "link" , function (node) {
		// Check includes to allow anchor links to more specific sections.
		if (node.url && node.url.includes(generalUsageLink)) {
			hasGeneralUsageLink = true;
			return;
		}
	});

	if (hasGeneralUsageLink) {
		return;
	}

	file.message(
		`Readme should have a link to general component usage ` +
		`"${generalUsageLink}". Usually under a h2 heading "Usage" after ` +
		`the table of contents`
	)
}

module.exports = rule(
	"remark-lint:origami-component/readme-has-general-usage",
	readmeHasGeneralUsage
)
