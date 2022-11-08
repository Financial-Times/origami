#!/bin/bash
deps="rg entr"

for dep in $deps; do
	if ! which $dep >/dev/null; then
		echo "this script depends on: $deps" >&2
		echo "brew install $deps" >&2
		exit 2
	fi
done

die() {
	echo
	echo goodbye
	# kill all my children
	pkill -P $$
	# shut down the trap house
	trap - INT
	# die
	exit
}

trap die INT

# we use rg --files, it will not rebuild for any .gitignore'd files
rg ../../components ../../libraries --files | entr npm run build &

serve demos/local/
