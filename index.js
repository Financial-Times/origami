module.exports.plugins = [
	/// Include everything from remark-preset-lint-recommended, we can turn off
	/// anything we don't like by deleting it here
	require("remark-lint"),
	// Unix compatibility.
	require("remark-lint-final-newline"),
	// Rendering across vendors differs greatly if using other styles.
	require("remark-lint-list-item-bullet-indent"),
	[require("remark-lint-list-item-indent"), "tab-size"],
	// Differs or unsupported across vendors.
	require("remark-lint-no-auto-link-without-protocol"),
	require("remark-lint-no-blockquote-without-marker"),
	require("remark-lint-no-literal-urls"),
	[require("remark-lint-ordered-list-marker-style"), "."],
	// Mistakes.
	require("remark-lint-hard-break-spaces"),
	require("remark-lint-no-duplicate-definitions"),
	require("remark-lint-no-heading-content-indent"),
	require("remark-lint-no-inline-padding"),
	require("remark-lint-no-shortcut-reference-image"),
	require("remark-lint-no-shortcut-reference-link"),
	require("remark-lint-no-undefined-references"),
	require("remark-lint-no-unused-definitions"),

	/// Include all of remark-preset-link-consistent
	[require("remark-lint-blockquote-indentation"), "consistent"],
	[require("remark-lint-checkbox-character-style"), "consistent"],
	[require("remark-lint-code-block-style"), "consistent"],
	[require("remark-lint-emphasis-marker"), "consistent"],
	[require("remark-lint-heading-style"), "consistent"],
	[require("remark-lint-link-title-style"), "consistent"],
	// [require("remark-lint-list-item-content-indent"), "consistent"],
	[require("remark-lint-rule-style"), "consistent"],
	[require("remark-lint-strong-marker"), "consistent"],
	// [require("remark-lint-table-cell-padding"), "consistent"],

	/// Overrides
	[require("remark-lint-fenced-code-marker"), "`"],
	[require("remark-lint-list-item-indent"), "mixed"],

	/// Custom rules
	//// README.md
	require("./rules/readme-has-name"),
	require("./rules/readme-has-short-description"),
	require("./rules/readme-has-toc"),
	require("./rules/readme-has-licence"),
	require("./rules/readme-has-general-usage"),
]
