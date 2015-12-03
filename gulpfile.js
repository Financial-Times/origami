'use strict';
var gulp = require('gulp');

gulp.task('default', function() {
	require('../origami-build-tools').verify(gulp);
});