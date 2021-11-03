#!/bin/bash
set -e
cd apps/website/
bundle
bundle exec jekyll build -d ../../origami.ft.com --incremental
cd ../storybook/
npm run build-storybook
