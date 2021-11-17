#!/bin/bash
if [ -e .git/hooks ]; then
	cp hooks/* .git/hooks
fi
