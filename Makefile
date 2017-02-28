include n.Makefile

install:
	obt install --verbose

test:
	./node_modules/karma/bin/karma start --single-run
	obt verify

demo:
	obt demo --local --watch --runServer
