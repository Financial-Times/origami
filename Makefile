
whitesource.config.json:
	echo '{ "apiKey": "$(WHITESOURCE_API_KEY)", "checkPolicies":true,"productName":"NGDA","projectName":"o_tracking", "devDep": "false"}' > $@;

whitesource: whitesource.config.json
	(whitesource run && rm -r ws* && rm npm-shrinkwrap.json) || echo "whitesource run failed, skipping"
