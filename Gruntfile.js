"use strict";

module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
      'origami-demo': {
          options: {
              modernizr: false,
              main: ['demo.mustache']
          }
      },
    'watch': {
      'origami-demo': {
          files: ['demo.mustache', 'demo.scss', 'main.scss', 'src/**/*'],
          tasks: ['origami-demo']
      }
    }
  });

   grunt.loadNpmTasks('grunt-origami-demoer');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['origami-demo']);

 };