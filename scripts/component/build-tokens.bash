#!/bin/bash
set -e
cd ../../apps/dictionary
node scripts/build-config/build-component.js $1
