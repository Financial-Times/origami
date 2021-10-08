#!/bin/bash
set -e
rm -r origami.ft.com || true
cd apps/website/
bundle
npm run build
cd ../storybook/
npm install
npm run build-storybook
