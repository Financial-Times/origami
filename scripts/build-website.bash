#!/bin/bash
set -e
cd apps/website/
bundle
npm run build -- --incremental
cd ../storybook/
npm install
npm run build-storybook
