#!/bin/bash
set -e

verify-origami-json

verify-package-json

if test -f ".eslintrc.cjs"; then
	args=(-c ".eslintrc.cjs" --no-error-on-unmatched-pattern)
	if test -f ".eslintignore"; then
		args+=(--ignore-path ".eslintignore")
	fi
	npx eslint ${args[*]} "**/*.js"
fi

echo "::add-matcher::.github/stylelint-compact-problem-matcher.json"
if test -f ".stylelintrc.cjs"; then
	 npx stylelint --config=".stylelintrc.cjs" --allow-empty-input "**/*.scss"
fi

# we need to cd back to root and run remark-cli from there
# so it prints out the whole filepath and annotations work correctly
workspace=$(pwd)
cd ../..
echo "::add-matcher::.github/remark-lint-problem-matcher.json"
npx remark-cli --no-stdout $workspace/README.md
