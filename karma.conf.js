module.exports = function(karma) {
	karma.set({

		frameworks: [ 'mocha', 'chai','browserify' ],
		files: [
			'http://polyfill.webservices.ft.com/v1/polyfill.min.js?callback=ftNextInit&libVersion=v1.3.0&features=default,CustomEvent|always,modernizr:promises,matchMedia,_enqueueMicrotask|always',
			'tests/**/*.js'
		],
		preprocessors: {
			'tests/**/*.js': ['browserify']
		},
		browserify: {
				transform: ['babelify', 'debowerify', 'textrequireify'],
				debug: true
		},
		browsers: ['PhantomJS'],
	});
};
