#!/bin/bash
set -e
test-javascript
sass-compilation
npx playwright install
a11y
validate-component-demo-html
test-sass
