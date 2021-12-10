"use strict";

module.exports = {
	"extends": "origami-component",
	"parserOptions": {
		"ecmaVersion": 2019,
		"sourceType": "script"
	},
	"env": {
		"es6": true,
		"browser": false,
		"node": true
	},
	"rules": {
		"no-console": "off",
		"no-await-in-loop": "off",

		"filenames/match-regex": [2, "^[a-z0-9-]+(\.test|(\.config(\.browserstack|\.bower|\.dev|\.chrome|\.prod)?))?$|\.eslintrc", true],

		"import/no-dynamic-require": "error",
		"import/no-unresolved": "error",
		"import/named": "error",
		"import/default": "error",
		"import/namespace": "error",
		"import/no-absolute-path": "error",
		"import/no-webpack-loader-syntax": "error",
		"import/export": "error",
		"import/no-named-as-default": "error",
		"import/no-named-as-default-member": "error",
		"import/no-extraneous-dependencies": "error",
		"import/no-mutable-exports": "error",

		"mocha/no-exclusive-tests": "error",
		"mocha/handle-done-callback": "error",
		"mocha/no-pending-tests": "error",
		"mocha/no-return-and-callback": "error",
		"mocha/no-sibling-hooks": "error",
		"mocha/no-skipped-tests": "error",

		"node/exports-style": "error",
		"node/no-deprecated-api": "error",
		"node/no-missing-require": "error",
		"node/no-unpublished-bin": "error",
		"node/no-unpublished-require": "error",
		"node/no-unsupported-features": "error",
		"node/shebang": "error",

		"objects/no-object-properties-one-line": "error",
		"objects/no-object-properties-first-line": "error",
		"objects/no-object-properties-last-line": "error",
		"objects/no-object-property-split": "error",

		"promise/no-return-wrap": "error",
		"promise/param-names": "error",
		"promise/catch-or-return": "error"
	},
	globals: {
		require: true,
		module: true,
		exports: true
	},
	plugins: [
		'filenames',
		'import',
		'json',
		'mocha',
		'node',
		'objects',
		'promise'
	]
};
