module.exports = {
    main: {
        options: {
            debug: true,
            transform: ['debowerify']
        },
        files: {
            'tmp/main.js': './main.js'
        }
    },
    instrumented: {
        options: {
            debug: false,
            aliasMappings: [
                {
                    cwd: './tmp/instrumented/src/js/', // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: './src/js/'
                }
            ],
            transform: ['debowerify']
            //, TODO - find a way to mock o- dependencies ?
            // external: baseConfig.bower.map(function (item) {
            //     return item.name;
            // })
        },
        files: {
            'tmp/instrumented.js': ['./tmp/instrumented/src/js/**/*.js']
        }
    },
    src: {
        options: {
            debug: true,
            aliasMappings: [
                {
                    cwd: './src/js/', // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: './src/js/'
                }
            ],
            transform: ['debowerify']
        },
        files: {
            'tmp/vanilla.js': ['./src/js/**/*.js']
        }
    }
};