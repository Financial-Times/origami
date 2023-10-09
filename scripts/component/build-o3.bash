#!/bin/bash

set -e

cd ../../components/$1


# build components
cd ../../scripts/component
bash ./build-tokens.bash $1

# transpile tsx to jsx
cd ../../components/$1
if test -f "tsconfig.json"; then
  npx tsc
else
	npx tsc --jsx preserve --outDir ./build/jsx/ --target es6 --declaration --skipLibCheck ./src/tsx/*.tsx
fi

# build css
cd ../../components/$1
if test -f "build.config.mjs"; then
	node build.config.mjs
else
	o3-compilation $1
fi

