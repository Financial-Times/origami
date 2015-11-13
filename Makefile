PHONY: build

install:
	obt install --verbose

verify:
	nbt verify --skip-layout-checks --skip-dotenv-check

unit-test:
	karma start tests/karma.conf.js

test: verify unit-test

test-watch: verify
	karma start tests/karma.conf.js --no-single-run

demo:
	obt demo --local --watch --runServer

pre-commit:
	obt demo --updateorigami

