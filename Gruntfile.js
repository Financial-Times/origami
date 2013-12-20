module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_folder: './build',

        version : {
            options : {
                current_version: "<%=pkg.version %>"
            },

            files : [
                {
                    location: "bower.json",
                    regex: /("version"\s*:\s*["'])(\d\.\d\.\d)(["'])/
                },
                {
                    location: "package.json",
                    regex: /("version"\s*:\s*["'])(\d\.\d\.\d)(["'])/
                },
                {
                    location: "README.md",
                    regex: /("tracking-module": "http:\/\/git\.svc\.ft\.com\:9080\/git\/origami\/tracking-module.git#)(\d\.\d\.\d)(")/
                },
                {
                    location: "tracking.mustache",
                    regex: /(data-version=")(\d\.\d\.\d)(")/
                }
            ]
        },

        jshint: {
            track: ['Gruntfile.js', 'main.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                ignores: ["src/javascript/utils.js"]
            }
        },

        clean: ['<%=build_folder %>'],

        concat: {
            track: {
                src: [
                    'main.js',
                    'src/javascript/**/*.js'
                ],
                dest: '<%=build_folder %>/track.<%=pkg.version %>.js'
            }
        },

        umd: {
            track: {
                src: '<%=build_folder %>/track.<%=pkg.version %>.js',
                dest: '<%=build_folder %>/track.<%=pkg.version %>.umd.js', // optional, if missing the src will be used
                //template: 'path/to/template.hbs', // optional; a template from templates subdir can be specified by name (e.g. 'umd');
                // if missing the templates/umd.hbs file will be used
                objectToExport: 'Track', // optional, internal object that will be exported
                amdModuleId: 'track', // optional, if missing the AMD module will be anonymous
                globalAlias: 'track' // optional, changes the name of the global variable
                /*deps: { // optional
                    'default': ['foo', 'bar'],
                    amd: ['foobar', 'barbar'],
                    cjs: ['foo', 'barbar'],
                    global: ['foobar', 'bar']
                }*/
            }
        },

        uglify: {
            track: {
                files: {
                    '<%=build_folder %>/track.<%=pkg.version %>.min.js': '<%=build_folder %>/track.<%=pkg.version %>.js',
                    '<%=build_folder %>/track.<%=pkg.version %>.umd.min.js': '<%=build_folder %>/track.<%=pkg.version %>.umd.js'
                }
            }
        },

        copy: {
            track: {
                files: [
                    { src: '<%=build_folder %>/track.<%=pkg.version %>.js', dest: '<%=build_folder %>/track.latest.js' },
                    { src: '<%=build_folder %>/track.<%=pkg.version %>.umd.js', dest: '<%=build_folder %>/track.latest.umd.js' },
                    { src: '<%=build_folder %>/track.<%=pkg.version %>.min.js', dest: '<%=build_folder %>/track.latest.min.js' },
                    { src: '<%=build_folder %>/track.<%=pkg.version %>.umd.min.js', dest: '<%=build_folder %>/track.latest.umd.min.js' }
                ]
            }
        }
    });

    grunt.registerMultiTask('version', 'Bumps the version in all required files.', function () {
        var options = this.options(),
            new_version = options.current_version.split('.');

        new_version[2] = parseInt(new_version[2], 10) + 1;
        new_version = new_version.join('.');

        grunt.log.writeln("New version " + new_version);

        this.data.forEach(function (file) {
            grunt.log.writeln(" - Changing " + file.location);

            var contents = grunt.file.read(file.location);

            if (file.regex.test(contents)) {
                grunt.file.write(file.location, contents.replace(file.regex, RegExp.$1 + new_version + RegExp.$3));
            }
        });

        grunt.log.ok();
        grunt.log.subhead('Now commit changes and run git tag ' + new_version);

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-umd');
    //grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', "Default.", ['jshint', 'clean', 'concat', 'umd', 'uglify', 'copy']);
};