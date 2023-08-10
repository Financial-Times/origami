#!/bin/bash

# this script is used by the build-website workflow and heroku review apps

set -e
cd apps/astro-website/
npm run astro build
cd ../storybook/
npm run build-storybook
cd ../../

if ! [ -z "$SHOULD_DELETE_ALL_YOUR_FILES" ]; then
	rm -r apps components libraries tools
fi
