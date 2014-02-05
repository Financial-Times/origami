module.exports = {
    automated: {
        src: ['tmp/instrumented.js'], //'public/src/**/*.js', '!public/src/main.js'],
        options: {
            outfile: '_specRunner.html',
            keepRunner: false,
            specs: ['test/specs/**/*.js'],
            helpers: ['test/helpers/**/*.js'],
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                replace: false,
                coverage: 'reports/coverage.json',
                report: [
                    {
                        type: 'html',
                        options: {
                            dir: 'reports/coverage'
                        }
                    },
                    {
                        type: 'text-summary'
                    }
                ]
            }
        }
    },
    browser: {
        src: ['tmp/vanilla.js'],
        options: {
            outfile: 'specRunner.html',
            keepRunner: true,
            specs: ['test/specs/**/*.js'],
            helpers: ['test/helpers/**/*.js']
        }
    }
} ;