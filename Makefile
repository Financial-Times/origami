clean:
	git clean -fxd

install:
	npm install
	obt install --verbose

verify:
	obt verify

test: verify
