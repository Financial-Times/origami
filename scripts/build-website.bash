#!/bin/bash
rm -r origami.ft.com/
cd apps/website/ && bundle && npm run build
cd ../storybook/
npm install
npm run build-storybook
