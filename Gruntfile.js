/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_folder: './build',
        versioned_build_folder: './build/<%=pkg.version %>',

        version : {
            options : {
                current_version: "<%=pkg.version %>"
            },

            files : [
                /*{
                 location: "bower.json",
                 regex: /("version"\s*:\s*["'])(\d\.\d\.\d)(["'])/
                 },*/
                {
                    location: "package.json",
                    regex: /("version"\s*:\s*["'])(\d\.\d\.\d)(["'])/
                },
                {
                    location: "README.md",
                    regex: /("tracking-module": "https:\/\/github\.com\/Financial-Times\/o-tracking\.git#)(\d\.\d\.\d)(")/
                },
                {
                    location: "tracking.mustache",
                    regex: /(data-version=")(\d\.\d\.\d)(")/
                },
                {
                    location: "main.js",
                    regex: /(version = "Track version )(\d\.\d\.\d)(";)/
                }
            ]
        },

        jshint: {
            track: [
                'Gruntfile.js',
                'main.js',
                'src/**/*.js',
                'test/**/*.js',
                'examples/**/*.js'
            ],
            options: {
                ignores: [
                    "src/resources/vendor/**",
                    "examples/jquery/**"/*,
                     "src/javascript/utils.js"*/
                ],

                forin: true,
                noarg: true,
                noempty: true,
                eqeqeq: true,
                bitwise: true,
                strict: true,
                undef: true,
                unused: true,
                curly: true,
                browser: true,
                newcap: true,
                immed: true,
                trailing: true,
                smarttabs: true
            }
        },

        clean: ['<%=build_folder %>'],

        browserify: {
            'examples': {
                files: {
                    '<%= build_folder %>/examples/util.js': ['examples/util.js']
                },
                options: {
                    alias: 'util'
                }
            },
            'track': {
                files: {
                    '<%=versioned_build_folder %>/track.<%=pkg.version %>.js': ['./main.js']
                },
                options: {
                    //alias: './main.js:track',
                    standalone: "Track"
                }
            }
        },

        uglify: {
            track: {
                files: {
                    '<%=versioned_build_folder %>/track.<%=pkg.version %>.min.js': '<%=versioned_build_folder %>/track.<%=pkg.version %>.js',
                    //'<%=versioned_build_folder %>/track.<%=pkg.version %>.umd.min.js': '<%=versioned_build_folder %>/track.<%=pkg.version %>.umd.js'
                }
            }
        },

        copy: {
            track: {
                files: [
                    { src: '<%=versioned_build_folder %>/track.<%=pkg.version %>.js', dest: '<%=build_folder %>/track.latest.js' },
                    { src: '<%=versioned_build_folder %>/track.<%=pkg.version %>.min.js', dest: '<%=build_folder %>/track.latest.min.js' }
                ]
            },
            docs: {
                files: [
                    { src: 'main.js', dest: '<%=build_folder %>/docs/main.js' },
                    { cwd: 'src/javascript/', src: '**/*.js', dest: '<%=build_folder %>/docs', expand: true }
                ]
            }
        },

        compass: {
            examples: {
                options: {
                    sassDir: 'examples',
                    cssDir: '<%= build_folder %>/examples'
                }
            },

            options: {
                outputStyle: 'compressed'
            }
        },

        yuidoc: {
            compile: {
                name: 'Origami Tracking module',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    themedir: 'src/resources/yui-doc-theme/',
                    paths: '<%=build_folder %>/docs', // Have to do this and then exclude everything to get the main.js included.
                    outdir: 'docs/'
                }
            }
        },

        watch: {
            build: {
                files: '<%=concat.track.src %>',
                tasks: ['browserify:track', 'uglify', 'copy:track', 'docs'],
                options: {
                    spawn: false
                }
            },
            examples: {
                files: './examples/*',
                tasks: ['examples'],
                options: {
                    spawn: false
                }
            }
        },

        mocha: {
            track: {
                src: ['tests/**/*.html']
            },
            options: {
                run: true,
                logErrors: true,
                log: true
            }
        }
    });

    grunt.loadTasks("src/resources/grunt-tasks");

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('build', "Build", ['jshint', 'clean', 'browserify:track', 'uglify', 'copy:track']);
    grunt.registerTask('test', "Test", ['mocha']);
    grunt.registerTask('examples', "Examples", ['browserify:examples', 'compass']);
    grunt.registerTask('docs', "Docs", ['copy:docs', 'yuidoc']);

    grunt.registerTask('default', "Default.", ['build', 'test', 'examples', 'docs']);
};