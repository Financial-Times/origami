#!/bin/bash
set -e
npx remark-cli -fq README.md
origami-build-tools verify
