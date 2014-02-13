module.exports = {
	'origami-demo': {
		files: ['./main.scss', './main.js', './demo.mustache', 'src/**/*', 'bower-components/**/*', '!tmp.scss'],
		tasks: ['origami-demo']
	},
	test: {
		files: './test/specs/**/*.js',
		tasks: ['browserify:specs']
	}
};