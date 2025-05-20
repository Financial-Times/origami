#!/bin/bash

# this script is used by the build-website workflow

set -e
cd apps/astro-website/
NODE_OPTIONS=--max-old-space-size=10248 npm run astro build
cd ../../

if ! [ -z "$SHOULD_DELETE_ALL_YOUR_FILES" ]; then
	rm -r apps components libraries tools
fi
