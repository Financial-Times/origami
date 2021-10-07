#!/bin/bash
if [ -e .git/hooks ]; then
	cp hooks/* .git/hooks
fi

cd tools/origami-build-tools && npm ci
