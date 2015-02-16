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

gulp.task('demo', function () {
	obt.demo(gulp);
});

gulp.task('demo-local', function () {
	obt.demo(gulp, {
		local: true
	});
});

gulp.task('default', ['verify', 'build', 'demo']);

gulp.task('watch', function() {
	gulp.watch(['./src/**', './main.js', './main.scss', './config.json'], ['default']);
});
