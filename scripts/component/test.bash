#!/bin/bash
set -e
test-javascript
sass-compilation
xvfb-run a11y
validate-component-demo-html
test-sass
