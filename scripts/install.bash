#!/bin/bash
if [ -e .git/hooks ]; then
	cp hooks/* .git/hooks
fi

if [ -z "$SKIP_NPM_CI_IN_OBT" ]; then
	cd tools/origami-build-tools && npm ci
fi
