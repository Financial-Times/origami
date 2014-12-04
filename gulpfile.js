"use strict";

var standaloneName = 'oComments';

var gulp = require('gulp');
var obt = require('origami-build-tools');


gulp.task('verify', function() {
	obt.verify(gulp);
});

gulp.task('build', function () {
	obt.build(gulp, {
		buildDir: 'build',
		standalone: standaloneName
	});
});

gulp.task('default', ['verify', 'build']);

gulp.task('watch', function() {
	gulp.watch(['./src/**', './main.js', './main.scss', './config.json'], ['default']);
});
