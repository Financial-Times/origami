#!/bin/bash
rm -r origami.ft.com/
cd apps/website/ && npm run build -- --incremental
cd ../storybook/
npm ci
npm run build-storybook
cd ../..
for component in components/*; do
	for brand in master internal whitelabel; do
		npm exec -w $component -- \
			obt demo \
				--dest=../../origami.ft.com/demos/$(basename $component)/$brand \
				--brand=$brand
	done
done
