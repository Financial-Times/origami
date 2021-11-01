#!/usr/bin/env node
import {globby as glob} from 'globby';
import { HtmlValidate, formatterFactory } from 'html-validate';

const demoHtmlFiles = await glob('./demos/local/*.html');
const reportFormatter = formatterFactory('codeframe');
const validator = new HtmlValidate({
	root: true,
	extends: ['html-validate:standard'],
	elements: [
		"html5",
		{
			"button": {
				"attributes": {
					"type": {
						"required": false
					}
				}
			},
			"th": {
				"attributes": {
					"scope": {
						"required": false
					}
				}
			},
		}
	]
});

console.log('validate-component-demo-html: Checking demos for HTML errors.');
const reportsWithErrors = [];
for (const file of demoHtmlFiles) {
	const report = validator.validateFile(file);
	if(report.errorCount) {
		reportsWithErrors.push(report);
	}
}

if(reportsWithErrors.length > 0) {
	console.log('validate-component-demo-html: HTML errors found.');
	const formattedErrorReports = reportsWithErrors.map(report => reportFormatter(report.results));
	console.log(...formattedErrorReports);
	process.exit(1);
}

console.log('validate-component-demo-html: No demo HTML errors found.');
