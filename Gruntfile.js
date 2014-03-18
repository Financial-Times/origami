/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_folder: './build',
        examples_build: './examples/build',
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
                    regex: /("tracking-module": "http:\/\/git\.svc\.ft\.com:8080\/scm\/track\/o-tracking\.git#>=)(\d\.\d\.\d)( < 1")/
                },
                {
                    location: "tracking.mustache",
                    regex: /(data-o-version=")(\d\.\d\.\d)(")/
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
                './examples/*.js'
            ],
            options: {
                ignores: [
                    "./resources/vendor/**",
                    "<%=examples_build %>/**"/*,
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
                    '<%=examples_build %>/util.js': ['examples/util.js']
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
                    { src: '<%=versioned_build_folder %>/track.<%=pkg.version %>.min.js', dest: '<%=build_folder %>/track.latest.min.js' },
                    { src: '<%=versioned_build_folder %>/track.<%=pkg.version %>.min.js', dest: '<%=examples_build %>/track.latest.min.js' }
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
                    quiet: true,
                    sassDir: './examples',
                    importPath: "./resources/vendor",
                    cssDir: '<%=examples_build %>'
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
                    themedir: './resources/yui-doc-theme/',
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

        karma: {
            options: {
                files: ['src/javascript/**/*.js', 'test/**/*.js'],

                //logLevel: "DEBUG",
                frameworks: ['browserify', 'mocha', 'sinon'],
                singleRun: true,
                browsers: ['PhantomJS'],

                preprocessors: {
                    'test/**/*.js': ['browserify'],
                    'src/javascript/**/*.js': ['browserify', 'coverage']
                },
                browserify: {
                    debug: false
                },
                reporters: ['progress', 'html', 'coverage'],
                htmlReporter: {
                    outputDir: './build/reports/unit-tests'
                },
                coverageReporter: {
                    reporters: [
                        { type: 'text', dir : './build/reports/coverage/' }/*,
                         TODO Add this back in, when they sort out Karma https://github.com/xdissent/karma-browserify/issues/29
                         { type : 'html', dir : './build/reports/coverage/' }*/
                    ]
                }
            },
            dev: {},
            ci: {},
            full: {
                options: {
                    browsers: ['Chrome', 'Firefox']
                }
            }
        }
    });

    grunt.loadTasks("./resources/grunt-tasks");

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('build', "Build", ['browserify:track', 'uglify', 'copy:track']);
    grunt.registerTask('test', "Test", ['jshint', 'karma:dev']);
    grunt.registerTask('examples', "Examples", ['browserify:examples', 'compass']);
    grunt.registerTask('docs', "Docs", ['copy:docs', 'yuidoc']);

    grunt.registerTask('default', "Default.", ['clean', 'test', 'build', 'examples', 'docs']);
};