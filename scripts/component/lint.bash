#!/bin/bash
set -e

verify-origami-json

verify-package-json

if test -f ".eslintrc.cjs"; then
	args=(-c ".eslintrc.cjs" --no-error-on-unmatched-pattern)
	if test -f ".eslintignore"; then
		args+=(--ignore-path ".eslintignore")
	fi
	if [ "$1" == "--fix" ]; then
		args+=(--fix)
	fi
	npx eslint ${args[*]} "**/*.js"
fi

echo "::add-matcher::.github/stylelint-compact-problem-matcher.json"
if test -f ".stylelintrc.cjs"; then
	args=(--config=".stylelintrc.cjs" --allow-empty-input)
	if [ "$1" == "--fix" ]; then
		args+=(--fix)
	fi
	npx stylelint ${args[*]} "**/*.scss"
fi

