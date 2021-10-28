#!/bin/bash
set -e
cd apps/website/
bundle
npm run build -- --incremental
cd ../storybook/
npm run build-storybook
