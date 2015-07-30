/*jslint node: true */
module.exports = {
	options: {
		sass: "demos/src/demo.scss",
		data: {
			'o-footer': JSON.parse(require('fs').readFileSync(process.cwd() + '/footer.json', {encoding: 'utf8'}))
		},
		"dependencies": ["o-fonts@^1.4.0"]
	},
	demos: [
		{
			name: 'footer',
			template: 'main.mustache'
		},
		{
			name: 'footer-theme-light',
			data: { 'modifier': 'o-footer--theme-light' },
			template: 'main.mustache'
		},
		{
			name: 'simple-footer',
			data: { 'modifier': 'o-footer--theme-light' },
			template: 'demos/src/simple-footer.mustache'
		}
	]
};
