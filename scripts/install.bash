#!/bin/bash
if [ -e .git/hooks ];
	cp hooks/* .git/hooks
fi

cd tools/origami-build-tools && npm ci
