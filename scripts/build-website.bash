#!/bin/bash
rm -r origami.ft.com/
cd apps/website/ && npm run build
cd ../storybook/
npm ci
npm run build-storybook
