include n.Makefile

install:
	obt install --verbose

build: clean
	obt build --js=./src/main.js --sass=./src/main.scss --buildFolder=./

clean:
	rm -f ./main.*;

test:
	./node_modules/karma/bin/karma start --single-run
	obt verify

demo:
	obt demo --local --watch
