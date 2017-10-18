const standaloneName = 'oComments';

const path = require('path');
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const run = require('gulp-run');

gulp.task('bower_update', function (callback) {
	run('bower update').exec(callback);
});

gulp.task('bower_install', function (callback) {
	run('bower install').exec(callback);
});

gulp.task('clean-build', function (callback) {
	del(['./build'], callback);
});

gulp.task('verify', function(callback) {
	run(path.join(__dirname, './node_modules/.bin/obt') + ' verify').exec(callback);
});

gulp.task('obt-build', function (callback) {
	run(path.join(__dirname, './node_modules/.bin/obt') + ' build --build-folder build --standalone ' + standaloneName).exec(callback);
});

gulp.task('build', function (callback) {
	runSequence('clean-build', 'obt-build', callback);
});

gulp.task('demo', function (callback) {
	run(path.join(__dirname, './node_modules/.bin/obt') + ' demo').exec(callback);
});

gulp.task('demo-local', function (callback) {
	run(path.join(__dirname, './node_modules/.bin/obt') + ' demo').exec(callback);
});

gulp.task('obt', ['verify', 'build']);
gulp.task('default', function (callback) {
	runSequence('bower_update', 'bower_install', 'obt', callback);
});

gulp.task('watch', function() {
	gulp.watch(['./src/**', './main.js', './main.scss', './config.js'], ['obt-build']);
});
