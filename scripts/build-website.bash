#!/bin/bash

# this script is used by the build-website workflow

set -e
cd apps/website/
npm run build
cd ../../

if ! [ -z "$SHOULD_DELETE_ALL_YOUR_FILES" ]; then
	rm -r apps components libraries tools
fi
