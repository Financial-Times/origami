#!/bin/bash
set -e
# Build demos for ally and demo tests to run against
demo-build
test-javascript
sass-compilation
a11y
validate-component-demo-html
test-sass
