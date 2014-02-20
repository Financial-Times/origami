module.exports = {
  options: {
    frameworks: ['browserify', 'jasmine'],
    files: ['test/helpers/*.js', 'src/js/**/*.js', 'test/specs/**/*.js'],

    preprocessors: {
      'test/**/*.js': ['browserify'],
      'src/js/**/*.js': ['browserify']
    },
    reporters: ['progress', 'html'],

    // the default configuration
    htmlReporter: {
      outputDir: 'reports',
      templatePath: 'node_modules/karma-html-reporter/jasmine_template.html'
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
      browsers: ['Chrome'],
      reporters: ['progress', 'dots', 'html']
    }
  }
};
