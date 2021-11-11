#!/bin/bash
set -e
npx remark-cli -q README.md
origami-build-tools verify
# we need to cd back to root and run linters from there to get annotations working properly
workspace=$(pwd)
cd ../..
if test -f "$workspace/.eslintrc.cjs"; then
    args=(-c "$workspace/.eslintrc.cjs" --no-error-on-unmatched-pattern)
    if test -f "$workspace/.eslintignore"; then
        args+=(--ignore-path "$workspace/.eslintignore")
    fi
    npx eslint ${args[*]} "$workspace/**/*.js"
fi
if test -f "$workspace/.stylelintrc.cjs" && compgen -G "$workspace/**/*.scss"; then
    npx stylelint "$workspace/**/*.scss" --config="$workspace/.stylelintrc.cjs"
fi
