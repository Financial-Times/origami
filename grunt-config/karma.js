module.exports = {
  options: {},
  ci: {
    options: {
      browserify: {
        transform: ['debowerify'],
        debug: true
      },
     
      singleRun: true,
      browsers: ['PhantomJS'],
      frameworks: ['browserify', 'jasmine'],
      files: ['test/helpers/*.js', 'src/js/**/*.js', 'test/specs/**/*.js'],

      preprocessors: {
        'test/**/*.js': ['browserify'],
        'src/js/**/*.js': ['browserify']
      }
      // preprocessors: {
      //   'test/**/*.js': ['browserify'],
      //   'src/js/**/*.js': ['coverage', 'browserify']
      // },
      // reporters: ['coverage', 'progress'],
      // coverageReporter: {
      //   type: 'html',
      //   dir: 'coverage/'
      // }
    }
  }
};
