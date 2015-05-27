/*global module*/

module.exports = function (grunt) {
	"use strict";

	grunt.registerMultiTask('version', 'Bumps the version in all required files.', function () {
		var options = this.options(),
			new_version = options.current_version.split('.');

		new_version[2] = parseInt(new_version[2], 10) + 1;
		new_version = new_version.join('.');

		grunt.log.writeln("New version " + new_version);

		this.data.forEach(function (file) {
			grunt.log.writeln(" - Changing " + file.location);

			var contents = grunt.file.read(file.location);

			if (file.regex.test(contents)) {
				grunt.file.write(file.location, contents.replace(file.regex, RegExp.$1 + new_version + RegExp.$3));
			}
		});

		grunt.log.ok();
		grunt.log.subhead('Now commit changes and run git tag ' + new_version);

	});
};
