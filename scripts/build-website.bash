#!/bin/bash
set -e
rm -r this-does-not-exist
cd apps/website/
bundle
npm run build -- --incremental
cd ../storybook/
npm install
npm run build-storybook
