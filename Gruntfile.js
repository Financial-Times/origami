/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'origami-demo': {
      options: {
        scriptMode: 'browserify'
      }
    },
    watch: {
      'origami-demo': {
          files: ['./main.scss', './main.js', './js/**/*', './*.ms', './*.mustache', './scss/**/*'],
          tasks: ['origami-demo']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-origami-demoer');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['origami-demo']);


};