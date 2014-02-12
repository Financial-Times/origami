/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 'Cowboy' Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  var path = require('path');

  require('load-grunt-config')(grunt, {
      configPath: path.join(process.cwd(), 'grunt-config'),
      config: {
          pkg: grunt.file.readJSON('package.json'),
          bwr: grunt.file.readJSON('bower.json'),
          o: grunt.file.readJSON('origami.json')
      },
      loadGruntTasks: {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
      }
  });

  grunt.loadTasks('grunt-tasks');
 
  // By default, lint and run all tests.
  grunt.registerTask('default', ['origami-demo']);
  grunt.registerTask('test', [
      'jshint',
      // build the manually run browser test page
      'browserify:src',
      'jasmine:browser:build',
      // build the automatically run phantomjs page with test coverage reports
      'instrument',
      'browserify:instrumented',
      'jasmine:automated',
      'enforce-coverage'
  ]);

};