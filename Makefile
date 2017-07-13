node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

test:
	./node_modules/karma/bin/karma start --single-run
	obt verify

demo:
	obt demo --local --watch --runServer
