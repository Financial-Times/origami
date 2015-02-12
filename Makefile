.PHONY: test

install:
	@origami-build-tools install

build: clean
	@./node_modules/.bin/origami-build-tools build --js=./src/main.js --scss=./src/main.scss --buildFolder=./

build-test: clean
		@./node_modules/.bin/origami-build-tools build --js=./test/main.spec.js --buildFolder=./

clean:
	@rm -f ./main.*;

test: build-test
	@./node_modules/.bin/mocha-phantomjs test/testrunner.html
