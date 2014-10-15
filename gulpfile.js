"use strict";

var gulp = require('gulp');
var obt = require('origami-build-tools');


gulp.task('verify', function() {
    obt.verify(gulp, {
        js: './main.js',
        sass: './main.scss'
    });
});

gulp.task('default', ['verify']);