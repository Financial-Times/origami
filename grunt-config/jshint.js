'use strict';

module.exports = function (grunt) {
    return {
        options: grunt.file.readJSON('./.jshintrc'),
        src: ['./src/js/**/*.js']
    };
};