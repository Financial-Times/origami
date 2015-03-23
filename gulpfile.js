"use strict";

var standaloneName = 'oComments';

var gulp = require('gulp');
var obt = require('origami-build-tools');
var del = require('del');
var runSequence = require('run-sequence');
var run = require('gulp-run');



gulp.task('bower_update', function (callback) {
	run('bower update').exec(callback);
});

gulp.task('bower_install', function (callback) {
	run('bower install').exec(callback);
});

gulp.task('clean-build', function (callback) {
	del(['./build'], callback);
});

gulp.task('verify', function() {
	return obt.verify(gulp);
});

gulp.task('obt-build', function () {
	obt.build(gulp, {
		buildDir: 'build',
		standalone: standaloneName
	});
});

gulp.task('build', function (callback) {
	runSequence('clean-build', 'obt-build', callback);
});

gulp.task('demo', function () {
	obt.demo(gulp);
});

gulp.task('demo-local', function () {
	obt.demo(gulp, {
		local: true
	});
});

gulp.task('obt', ['verify', 'build']);
gulp.task('default', function (callback) {
	runSequence('bower_update', 'bower_install', 'obt', callback);
});

gulp.task('watch', function() {
	gulp.watch(['./src/**', './main.js', './main.scss', './config.json'], ['obt-build']);
});
