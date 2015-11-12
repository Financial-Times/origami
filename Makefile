PHONY: build

install:
	obt install --verbose

verify:
	obt verify

unit-test:
	karma start tests/karma.conf.js

test: verify unit-test

test-watch: verify
	karma start tests/karma.conf.js --no-single-run

demo:
	obt demo --local --watch --runServer

pre-commit:
	obt demo --updateorigami

