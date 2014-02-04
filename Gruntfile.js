"use strict";

module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
  	clean: {
  		before: ["build", "demo"]
  	},
	webfont: {
		icons: {
			src: 'svg/*.svg',
			dest: 'build/',
			options: {
				engine: "fontforge",
				font: "ft-icons",
				types: "eot,woff,ttf",
				hashes: false,
				stylesheet: "scss",
				template: 'grunt-webfont-templates/origami.css',
				destHtml: "demo",
				htmlDemoTemplate: "grunt-webfont-templates/demo-template.html",
				ie7: true
			}
		}
	}
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webfont');

  grunt.registerTask('default', ["clean", "webfont"]);

 };