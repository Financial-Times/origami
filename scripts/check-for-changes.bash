#!/bin/bash
if [ $(git diff | wc -l) -gt 0 ]; then
	echo something changed
	echo
	echo 'run "npm install" and "npm run regenerate" and commit the changes'
	exit 22
fi
