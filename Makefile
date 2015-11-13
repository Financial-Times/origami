PHONY: test

install:
	obt install --verbose

verify:
	nbt verify --skip-layout-checks --skip-dotenv-check

unit-test:
	karma start test/karma.conf.js

unit-test-watch:
	karma start test/karma.conf.js --no-single-run

test: verify unit-test

test-watch: verify unit-test-watch

demo:
	obt demo --local --watch --runServer

pre-commit:
	obt demo --updateorigami

