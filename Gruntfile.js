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
				htmlDemo: false
			}
		}
	},
    'origami-demo': {
      options: {
        modernizr: false,
        main: ['demo.mustache']
      }
    },
    watch: {
      'origami-demo': {
          files: ['main.scss', 'scss/*.scss', 'demo.mustache', 'demo.scss'],
          tasks: ['demo']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-origami-demoer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('demo', function() {
    // Read svg directory for list of icons to pass to demo template
    var fs = require('fs'),
        files = fs.readdirSync('svg').filter(function(file) {
          return file.indexOf(".svg") > -1;
        }),
        icons = files.map(function(file) {
          return { name: file.slice(0, -4) };
        });
    grunt.config.set("origami-demo.options.viewModel.icons", icons);
    grunt.task.run(['clean', 'webfont', 'origami-demo']);
  });

  grunt.registerTask('default', ["demo"]);

 };