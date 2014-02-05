module.exports = function (grunt) {
    return {
        jshint: {
            options: grunt.file.readJSON('./.jshintrc')
        }
    };
}