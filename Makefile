PHONY: build

install:
	npm install origami-build-tools@beta
	obt install --verbose

build:
	obt build

test:
	obt verify

watch:
	obt build --watch

demo:
	obt demo --local

