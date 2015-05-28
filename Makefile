PHONY: build

install:
	npm install origami-build-tools@beta
	obt install --verbose

test:
	obt verify

demo:
	obt demo --local --watch

pre-commit:
	obt demo --updateorigami

