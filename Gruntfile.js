var gruntBower = require('gruntmodule-bower'),
    gruntJsDoc = require('gruntmodule-js-doc'),
    gruntJsHint = require('gruntmodule-jshint'),
    gruntBrowserifyBuild = require('gruntmodule-browserify-build'),
    gruntQunit = require('gruntmodule-qunit'),
    gruntSass = require('gruntmodule-sass'),
    gruntModuleAggregator = require('gruntmodule-aggregator');

module.exports = function (grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

    gruntModuleAggregator.setGrunt(grunt);

    gruntModuleAggregator.addInitParams({
        pkg: pkg,
        main_js: './main.js',
        src_path: './src',
        js_src_path: '<%= src_path %>/javascripts/',
        all_js_src: ['<%= js_src_path %>**/*.js', '<%= main_js %>'],
        sass_src_path: '<%= src_path %>/stylesheets/',

        test_path: './tests/',

        dist_path: './dist/',
        js_dist_path: '<%= dist_path %>/javascripts/',
        sass_dist_path: '<%= dist_path %>/stylesheets/',

        docs_path: './docs/'
    });

    gruntModuleAggregator.addModule(gruntBower);
    gruntModuleAggregator.addModule(gruntJsDoc);
    gruntModuleAggregator.addModule(gruntBrowserifyBuild, "oLivefyreCommentClient");
    gruntModuleAggregator.addModule(gruntJsHint);
    gruntModuleAggregator.addModule(gruntQunit);
    gruntModuleAggregator.addModule(gruntSass);

    grunt.registerTask('default', 'Default', ['jshint:all', /*'test',*/ 'build', 'style', 'docs']);
    
    grunt.registerTask('jenkins-jshint', ['jshint:jenkins']);
    grunt.registerTask('jenkins-test', ['test-jenkins']);
    grunt.registerTask('jenkins-build', ['bower', 'build']);

    gruntModuleAggregator.initConfig();
};