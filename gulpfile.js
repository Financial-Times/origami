"use strict";

var gulp = require('gulp');
var obt = require('origami-build-tools');


gulp.task('verify', function() {
    obt.verify(gulp);
});

gulp.task('build', function () {
    obt.build(gulp, {
        buildDir: 'build',
        standalone: 'oLivefyreCommentClient'
    });
});

gulp.task('default', ['verify', 'build']);
