PHONY: build

install:
	bower install

build: install
	origami-build-tools build

test:
	origami-build-tools verify
	origami-build-tools build

watch:
	origami-build-tools build --watch

demo:
	origami-build-tools demo --local

run: build
	static