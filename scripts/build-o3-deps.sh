#!/bin/bash

cd ../../

o3_sources=("libraries" "components")

for directory in "${o3_sources[@]}";
do
	cd $directory

	for o3_dep in o3-*
	do
		cd $o3_dep;
		npm run build --if-present;
    cd ../
	done;

	cd ../
done;
