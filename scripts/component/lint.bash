#!/bin/bash
set -e
npx remark-cli -q README.md
origami-build-tools verify
verify-origami-json
verify-package-json
if test -f ".eslintrc.cjs"; then
    args=(-c ".eslintrc.cjs" --no-error-on-unmatched-pattern)
    if test -f ".eslintignore"; then
        args+=(--ignore-path ".eslintignore")
    fi
    npx eslint ${args[*]} "**/*.js"
fi
if test -f ".stylelintrc.cjs" && compgen -G "**/*.scss"; then
    npx stylelint "**/*.scss" --config=".stylelintrc.cjs"
fi
