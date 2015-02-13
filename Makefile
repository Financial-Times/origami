.PHONY: test

install:
	@origami-build-tools install

verify:
	@origami-build-tools verify

build: clean
	@./node_modules/.bin/origami-build-tools build --js=./src/main.js --sass=./src/main.scss --buildFolder=./

build-test: clean
	@./node_modules/.bin/origami-build-tools build --js=./test/main.spec.js --sass=./src/main.scss --buildFolder=./

build-demos:
	@./node_modules/.bin/origami-build-tools build --js=./demo/demo.js --sass=./src/main.scss --buildFolder=./demo/

clean:
	@rm -f ./main.*;

test: build-test
	@./node_modules/.bin/mocha-phantomjs test/testrunner.html
