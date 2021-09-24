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
	[require("remark-lint-rule-style"), "***"],
	[require("remark-lint-strong-marker"), "*"],

	/// Overrides
	[require("remark-lint-fenced-code-marker"), "`"],

	/// Custom rules
	//// README.md
	require("./rules/readme-has-name"),
	require("./rules/readme-has-short-description"),
	require("./rules/readme-has-toc"),
	require("./rules/readme-has-licence"),
	require("./rules/readme-has-general-usage"),
]
