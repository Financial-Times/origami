#!/bin/bash
set -e
npx remark-cli -q README.md 
origami-build-tools verify
