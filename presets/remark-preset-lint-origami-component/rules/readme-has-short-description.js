let rule = require("unified-lint-rule")

let validDescriptionNodeTypes = "paragraph"

let validAfterNodeTypes = [
	// TOC
	"list",
	// A next heading
	"heading",
]

/** @param {import("mdast").Root} tree */
function shortDescriptionFollowsHeading(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}
	let topHeadingIndex = tree.children.findIndex(
		n => n.type == "heading" && n.depth == 1
	)

	if (topHeadingIndex == -1) {
		// I didn't find a heading, and it's not my job.
		// the has-name checker can take this one.
		return
	}
	let nextItem = tree.children[topHeadingIndex + 1]
	let itemAfterNext = tree.children[topHeadingIndex + 2]

	if (
		validDescriptionNodeTypes.includes(nextItem.type) &&
		validAfterNodeTypes.includes(itemAfterNext.type)
	) {
		return
	} else {
		file.message(
			"After the component name, there should be a single-line description of what the component does, followed by table of contents or further sections",
			nextItem
		)
	}
}

module.exports = rule(
	"remark-lint:origami-component/readme-has-short-description-following-heading",
	shortDescriptionFollowsHeading
)
