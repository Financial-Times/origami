PHONY: build

install:
	obt install --verbose

test:
	obt verify
	karma start tests/karma.conf.js

test-watch:
	obt verify
	karma start tests/karma.conf.js --no-single-run

demo:
	obt demo --local --watch --runServer

pre-commit:
	obt demo --updateorigami

