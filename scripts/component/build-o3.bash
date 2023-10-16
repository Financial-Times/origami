#!/bin/bash

set -e

# build components
cd ../../scripts/component
bash ./build-tokens.bash $1

# transpile tsx to jsx
cd ../../components/$1
npx tsc ./src/tsx/index.ts --jsx preserve --outdir ./build/jsx --declaration --declarationDir ./build/types --skipLibCheck --moduleResolution bundler --module es6

# build css
cd ../../components/$1
o3-compilation $1
