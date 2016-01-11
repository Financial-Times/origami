module.exports = function(karma) {
	karma.set({

		frameworks: [ 'mocha', 'chai','browserify' ],
		files: [
			'tests/**/*.js'
		],
		preprocessors: {
			'tests/**/*.js': ['browserify']
		},
		browserify: {
				transform: ['babelify', 'debowerify', 'textrequireify'],
				debug: true
		},
		browsers: ['Chrome'],
	});
};
