module.exports = {
  options: {
    frameworks: ['browserify', 'jasmine'],
    files: ['src/js/**/*.js', 'test/**/*.js'],

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

      // preprocessors: {
      //   'test/**/*.js': ['browserify'],
      //   'src/js/**/*.js': ['coverage', 'browserify']
      // },
      // 
      // coverageReporter: {
      //   type: 'html',
      //   dir: 'coverage/'
      // }
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
