"use strict"
let find = require("unist-util-find")
let findAllAfter = require("unist-util-find-all-after")
let findAllBefore = require("unist-util-find-all-before")
let findAllBetween = require("unist-util-find-all-between")
let rule = require("unified-lint-rule")
let GitHubSlugger = require("github-slugger")
let toString = require("mdast-util-to-string")
let visit = require("unist-util-visit")

let slugger = new GitHubSlugger()

let maxListItemDepth = 1

module.exports = rule(
	"remark-lint:origami-component/readme-has-toc",
	readmeHasToc
)

function readmeHasToc(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}
	slugger.reset()

	let headingLinks = {}

	visit(tree, "heading", node => {
		let text = toString(node)
		let slug = slugger.slug(text)
		let link = `#${slug}`

		headingLinks[link] = node
	})

	let toc = find(
		tree,
		node =>
			node.type == "heading" &&
			node.depth == 2 &&
			toString(node).trim() == "Table of Contents"
	)

	if (!toc) {
		let betweenHOneAndHTwo = findAllBetween(
			tree,
			find(tree, n => n.depth == 1),
			find(tree, n => n.depth == 2)
		)
		toc = betweenHOneAndHTwo.find(n => n.type == "list")
	}

	if (!toc) {
		// The table of contents isn't required
		return
	}

	let previousSubheadings = findAllBefore(tree, toc, {
		type: "heading",
	})

	if (previousSubheadings.length > 1) {
		file.message(
			"If a table of contents is included, it must immediately follow the description",
			toc
		)
	}

	let laterSubheadings = findAllAfter(tree, toc, {
		type: "heading",
		depth: 2,
	})

	checkTocItems({
		tree,
		file,
		list: toc,
		headingLinks,
		headings: laterSubheadings,
		depth: 0,
	})
}

// validateListItems
// from https://github.com/sindresorhus/awesome-lint/blob/a427f269d3280b356035f8f4f2ff2362a9da0092/rules/toc.js
// with modifications
function checkTocItems({tree, file, list, headingLinks, headings, depth}) {
	let index = 0

	if (list) {
		for (; index < list.children.length; ++index) {
			let listItem = list.children[index]
			let link = find(listItem, n => n.type === "link")

			if (!link) {
				file.message(
					`All table of contents items should be links. Item "${index}" has no link: "${toString(
						listItem
					)}"`,
					listItem
				)
			}

			let {url} = link
			let text = toString(link)
			let heading = headings[index]
			let headingText = heading && toString(heading)

			if (!text) {
				file.message(
					`All table of contents items should have link text. Item "${url}" is missing link text`,
					listItem
				)
			}

			if (!headingText) {
				file.message(
					`All table of contents items should correspond to a heading. Item "${text}" missing corresponding heading`,
					listItem
				)
			}

			if (
				text &&
				headingText &&
				text.trim().toLowerCase() !== headingText.trim().toLowerCase()
			) {
				file.message(
					`The table of contents items should be in the same order as the headings in the readme. Item "${text}" does not match heading "${headingText}"`,
					listItem
				)
			}

			let headingLink = headingLinks[url]

			if (headingLink) {
				headingLinks[url] = false
			} else if (headingLink === undefined) {
				file.message(
					`All table of contents items should match an item in the content. Item "${text}" link "${url}" not found`,
					listItem
				)
			} else {
				file.message(
					`All table of contents items should be unique. "${text}" has duplicate link "${url}"`,
					listItem
				)
			}

			let subList = find(listItem, n => n.type === "list")

			if (subList) {
				if (depth < maxListItemDepth) {
					let nextHeading = headings[index + 1]
					let subHeadings = nextHeading
						? findAllBetween(tree, heading, nextHeading, {
								type: "heading",
								depth: depth + 3,
						  })
						: findAllAfter(tree, heading, {
								type: "heading",
								depth: depth + 3,
						  })

					checkTocItems({
						tree,
						file,
						list: subList,
						headingLinks,
						headings: subHeadings,
						depth: depth + 1,
					})
				} else {
					file.message(`Exceeded max depth of ${maxListItemDepth + 1} levels`)
				}
			}
		}
	}

	if (index < headings.length) {
		for (; index < headings.length; ++index) {
			let heading = headings[index]
			file.message(
				`The table of contents top-level contain a link to every h2 in the document, and sub-levels should contain a link to every h3 in their section. Missing item for "${toString(
					heading
				)}"`,
				list
			)
		}
	}
}
