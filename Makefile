.PHONY: test

install:
	obt install --verbose

build: clean
	obt build --js=./src/main.js --sass=./src/main.scss --buildFolder=./

build-test: clean
	obt build --js=./test/main.spec.js --sass=./src/main.scss --buildFolder=./

build-demos:
	obt build --js=./demo/demo.js --sass=./src/main.scss --buildFolder=./demo/

clean:
	rm -f ./main.*;

test: build-test
	mocha-phantomjs test/testrunner.html
	obt verify
