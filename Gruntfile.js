"use strict";

module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
	webfont: {
		icons: {
			src: 'svg/*.svg',
			dest: 'build/',
		    destCss: 'scss/',
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
    watch: {
      'demo': {
          files: ['main.scss', 'scss/*.scss', 'demo/src/*', 'svg/*'],
          tasks: ['demo']
      }
    }
  });

  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('demo', function() {
    // Read svg directory for list of icons to pass to demo template
    var fs = require('fs'),
        files = fs.readdirSync('svg').filter(function(file) {
          return file.indexOf(".svg") > -1;
        }),
        icons = files.map(function(file) {
          return { name: file.slice(0, -4) };
        }),
        done = this.async();
      fs.writeFileSync('demos/src/data.json', JSON.stringify({ icons: icons }), { encoding: 'utf-8' });

      grunt.task.run(['webfont']);
      grunt.util.spawn({
          cmd: "origami-build-tools",
          args: [
              "demo",
              "demos/src/config.json",
              "--buildservice"
          ]
      }, function() {
          done();
      });
  });

  grunt.registerTask('default', ["demo"]);

 };