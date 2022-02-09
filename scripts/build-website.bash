#!/bin/bash

# this script is used by the build-website workflow and heroku review apps

set -e
cd apps/website/
bundle
bundle exec jekyll build -d ../../origami.ft.com --incremental
cd ../storybook/
npm run build-storybook
cd ../../

if ! [ -z "$SHOULD_DELETE_ALL_YOUR_FILES" ]; then
	rm -r apps components libraries tools
fi
