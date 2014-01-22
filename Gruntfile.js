"use strict";

module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
    'origami-demo': {
      options: {
        modernizr: false,
        main: ['example.mustache'],
        sassExtras: 'demo.scss',
        viewModel: {}// a javascript object of example content to be consumed by your module's template
      }
    },
    'watch': {
      'origami-demo': {
          files: ['example.mustache', 'main.scss', 'src/**/*'], //edit as necessary
          tasks: ['origami-demo']
      }
    }
  });

   grunt.loadNpmTasks('grunt-origami-demoer');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['origami-demo']);

 };