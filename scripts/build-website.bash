#!/bin/bash
rm -r origami.ft.com/
cd apps/website/ && make build
mv _site ../../origami.ft.com
cd ../storybook/
npm ci
npm run build-storybook
