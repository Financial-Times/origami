'use strict';

module.exports = function (grunt) {
    return {
        jshint: {
            options: grunt.file.readJSON('./.jshintrc'),
            src: ['./src/js/**/*.js']
        }
    };
};