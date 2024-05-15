#!/bin/bash

set -e

# build components
cd ../../scripts/component
bash ./build-tokens.bash $1

# build css, ts and tsx files
cd ../../components/$1
o3-compilation $1
