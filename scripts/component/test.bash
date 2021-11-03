#!/bin/bash
set -e
origami-build-tools test
a11y
validate-component-demo-html
test-sass
