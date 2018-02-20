node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

export IGNORE_A11Y=true

test:
	./node_modules/karma/bin/karma start --single-run
	make verify

demo:
	obt demo --local --watch --runServer
