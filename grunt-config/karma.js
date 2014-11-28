module.exports = {
	options: {
		frameworks: ['browserify', 'jasmine'],
		files: ['src/js/**/*.js', 'test/**/*.js', 'http://polyfill.webservices.ft.com/v1/polyfill.js?ua=safari/4'],

		preprocessors: {
			'test/**/*.js': ['browserify'],
			'src/js/**/*.js': ['browserify']
		}
	},
	ci: {
		options: {
			browserify: {
				transform: ['debowerify'],
				debug: false
			},
			singleRun: true,
			browsers: ['PhantomJS']
		}
	},
	chrome: {
		options: {
			browserify: {
				transform: ['debowerify'],
				debug: true
			},
			singleRun: false,
			autoWatch: true,
			browsers: ['Chrome']
		}
	}
};
