#!/bin/bash

set -e

cd ../../components/$1


# build components
cd ../../scripts/component
bash ./build-tokens.bash $1

# transpile ts to js
cd ../../components/$1
if test -f "tsconfig.json"; then
	npx tsc
else
	npx tsc ./src/ts/index.ts --outdir ./build/js --target es6 --declaration --skipLibCheck
fi

# transpile tsx to jsx
cd ../../components/$1
if test -f "tsconfig.json"; then
  npx tsc
else
	# npx tsc --jsx preserve --skipLibCheck --outfile ./build/jsx/index.js --declaration --emitDeclarationOnly ./src/tsx/*.tsx
	# npx tsc --noemit ./src/tsx/*.tsx --skipLibCheck
	npx tsc --jsx preserve --outdir ./build/jsx --target es6 --declaration --skipLibCheck ./src/tsx/index.ts
fi

# build css
cd ../../components/$1
if test -f "build.config.mjs"; then
	node build.config.mjs
else
	o3-compilation $1
fi

