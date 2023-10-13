#!/bin/bash

set -e

cd ../../components/$1

# build components
cd ../../scripts/component
bash ./build-tokens.bash $1

# transpile ts to js
# cd ../../components/$1
# if test -f "tsconfig.json"; then
# 	npx tsc
# else
# 	npx tsc ./src/ts/index.ts --outdir ./build/js --target es6 --declaration --skipLibCheck --declarationDir ./build/types
# fi

# transpile tsx to jsx
cd ../../components/$1
if test -f "tsconfig.json"; then
  npx tsc
else
  npx tsc ./src/tsx/index.ts --jsx preserve --outdir ./build/jsx --declaration --declarationDir ./build/types --skipLibCheck --moduleResolution bundler --module es6
fi

# build css
cd ../../components/$1
if test -f "build.config.mjs"; then
  node build.config.mjs
else
  o3-compilation $1
fi
