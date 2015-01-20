module.exports = {
	options: {
		sass: "demos/src/demo.scss",
		data: {
			'o-footer': JSON.parse(require('fs').readFileSync(process.cwd() + '/footer.json', {encoding: 'utf8'}))
		}
	},
	demos: [
		{
			name: 'footer',
			template: 'main.mustache'
		}
	]
};
