PHONY: build

install:
	obt install --verbose

test:
	obt verify
	karma start tests/karma.conf.js

demo:
	obt demo --local --watch --runServer

pre-commit:
	obt demo --updateorigami

