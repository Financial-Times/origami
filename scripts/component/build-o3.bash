#!/bin/bash

set -e

# build css, ts and tsx files
cd ../../components/$1
o3-compilation $1
