let walk = require("unist-util-visit")

/**
 * Has a link to general component usage information:
 * https://origami.ft.com/documentation/components
 *
 * @param {import("mdast").Root} tree
 */
function readmeHasGeneralUsage(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}

	const generalUsageLink = "https://origami.ft.com/documentation/components";
	const generalUsageUrl = new URL(generalUsageLink);

	let hasGeneralUsageLink = false;
	walk(tree, "link" , function (node) {
		if (!node.url) {
			return;
		}

		// Allow links to the general usage page, including anchor links
		// (for example: https://origami.ft.com/documentation/components#usage).
		try {
			const parsed = new URL(node.url, generalUsageUrl);
			if (
				node.url === generalUsageLink ||
				(parsed.origin === generalUsageUrl.origin &&
				 parsed.pathname === generalUsageUrl.pathname)
			) {
				hasGeneralUsageLink = true;
				return;
			}
		} catch {
			// Ignore invalid URLs and continue checking other links.
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

/** @param {import("mdast").Root} tree */
function readmeHasLicence(tree, file) {
	if (file.basename.toLowerCase() != "readme.md") {
		return
	}
	let licenceHeading = find(tree, n => {
		if (n.type == "heading" && n.depth == 2) {
			let h2 = n
			let text = toString(h2).trim().toLowerCase()
			if (text == "license") {
				file.message("Licence should be spelt 'licence', not 'license'", h2)
				return true
			}
			return text == "licence"
		}
	})

	if (!licenceHeading) {
		file.message(
			"Readme should have an h2 'Licence' section, with a valid licence"
		)
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

let {join} = require("path")

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

	let tocHeading = find(
		tree,
		node =>
			node.type == "heading" &&
			node.depth == 2 &&
			toString(node).trim().toLowerCase() == "table of contents"
	)

	let toc

	if (tocHeading) {
		toc = findAllBetween(
			tree,
			tocHeading,
			find(tree, n => n != tocHeading && n.depth == 2),
			"list"
		)[0]
	}

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
		depth: 2,
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

			let url = link && link.url
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

module.exports.plugins = [
	/// Include everything from remark-preset-lint-recommended, we can turn off
	/// anything we don't like by deleting it here
	require("remark-lint"),
	// Unix compatibility.
	require("remark-lint-final-newline"),
	// Rendering across vendors differs greatly if using other styles.
	require("remark-lint-list-item-bullet-indent"),
	// Differs or unsupported across vendors.
	require("remark-lint-no-auto-link-without-protocol"),
	require("remark-lint-no-blockquote-without-marker"),
	require("remark-lint-no-literal-urls"),
	[require("remark-lint-ordered-list-marker-style"), "."],
	[require("remark-lint-unordered-list-marker-style"), "-"],
	// Mistakes.
	require("remark-lint-hard-break-spaces"),
	require("remark-lint-no-duplicate-definitions"),
	require("remark-lint-no-heading-content-indent"),
	require("remark-lint-no-inline-padding"),
	require("remark-lint-no-shortcut-reference-image"),
	require("remark-lint-no-shortcut-reference-link"),
	require("remark-lint-no-undefined-references"),
	require("remark-lint-no-unused-definitions"),

	[require("remark-lint-blockquote-indentation"), 2],
	[
		require("remark-lint-checkbox-character-style"),
		{checked: "x", unchecked: " "},
	],
	[require("remark-lint-code-block-style"), "fenced"],
	[require("remark-lint-emphasis-marker"), "_"],
	[require("remark-lint-heading-style"), "atx"],
	[require("remark-lint-link-title-style"), '"'],
	[require("remark-lint-rule-style"), "---"],
	[require("remark-lint-strong-marker"), "*"],

	/// Overrides
	[require("remark-lint-fenced-code-marker"), "`"],

	/// Custom rules
	//// README.md
	rule(
		"remark-lint:origami-component/readme-has-name",
		readmeHasName
	),
	rule(
		"remark-lint:origami-component/readme-has-short-description-following-heading",
		shortDescriptionFollowsHeading
	),
	rule(
		"remark-lint:origami-component/readme-has-toc",
		readmeHasToc
	),
	rule(
		"remark-lint:origami-component/readme-has-licence",
		readmeHasLicence
	),
	rule(
		"remark-lint:origami-component/readme-has-general-usage",
		readmeHasGeneralUsage
	)

]
