'use strict';
/* eslint-env mocha */

const process = require('process');
const path = require('path');
const execa = require('execa');

const rootDirectory = process.cwd();
const testPath = path.resolve(process.cwd(), './test/integration/fixtures/scss');

describe('stylelint', function () {

    const expectedNotices = [
        {
            name: 'indentation',
            locations: [
                'indentation/invalid.scss:2:5',
            ]
        },
        {
            name: 'no-extra-semicolons',
            locations: [
                'no-extra-semicolons/invalid.scss:5:2',
            ]
        },
        {
            name: 'declaration-property-value-blacklist',
            locations: [
                'border-zero/invalid.scss:2:2',
                'border-zero/invalid.scss:6:2'
            ]
        },
        {
            name: 'block-opening-brace-space-before',
            locations: [
                'brace-style/invalid.scss:1:5',
                'brace-style/invalid.scss:7:5',
                'brace-style/invalid.scss:12:16',
                'brace-style/invalid.scss:17:13',
                'space-before-brace/invalid.scss:1:4',
                'space-before-brace/invalid.scss:2:13',
                'space-before-brace/invalid.scss:7:10'
            ]
        },
        {
            name: 'selector-class-pattern',
            locations: [
                'class-name-format/invalid.scss:1:1',
                'class-name-format/invalid.scss:5:1',
                'class-name-format/invalid.scss:9:1',
                'class-name-format/invalid.scss:13:1',
                'class-name-format/invalid.scss:17:1'
            ]
        },
        {
            name: 'no-duplicate-at-import-rules',
            locations: [
                'no-duplicate-at-import-rules/invalid.scss:3:1'
            ]
        },
        {
            name: 'scss/at-import-no-partial-leading-underscore',
            locations: [
                'clean-import-paths/invalid.scss:2:1',
                'clean-import-paths/invalid.scss:6:1',
            ]
        },
        {
            name: 'scss/at-import-partial-extension',
            locations: [
                'clean-import-paths/invalid.scss:4:22',
                'clean-import-paths/invalid.scss:6:23',
            ]
        },
        {
            name: 'order/order',
            locations: [
                'extends-before-declarations/invalid.scss:7:2',
                'extends-before-mixins/invalid.scss:11:2',
                'mixins-before-declarations/invalid.scss:9:2'
            ]
        },
        {
            name: 'no-missing-end-of-source-newline',
            locations: [
                'final-newline/invalid.scss:4:44'
            ]
        },
        {
            name: 'scss/at-function-pattern',
            locations: [
                'function-name-format/invalid.scss:1:1',
                'function-name-format/invalid.scss:5:1',
            ]
        },
        {
            name: 'color-hex-length',
            locations: [
                'hex-length/invalid.scss:1:13',
                'hex-length/invalid.scss:4:35',
                'hex-length/invalid.scss:4:41',
                'hex-length/invalid.scss:8:9'
            ]
        },
        {
            name: 'color-hex-case',
            locations: [
                'hex-notation/invalid.scss:2:13',
                'hex-notation/invalid.scss:5:35',
                'hex-notation/invalid.scss:5:44',
                'hex-notation/invalid.scss:9:9'
            ]
        },
        {
            name: 'leading-zero',
            locations: [
                'leading-zero/invalid.scss:2:13'
            ]
        },
        {
            name: 'scss/at-mixin-pattern',
            locations: [
                'mixin-name-format/invalid.scss:1:1',
                'mixin-name-format/invalid.scss:5:1'
            ]
        },
        {
            name: 'max-nesting-depth',
            locations: [
                'nesting-depth/invalid.scss:5:5'
            ]
        },
        {
            name: 'at-rule-blacklist',
            locations: [
                'no-debug/invalid.scss:1:1'
            ]
        },
        {
            name: 'declaration-block-no-duplicate-properties',
            locations: [
                'no-duplicate-properties/invalid.scss:3:2',
                'no-duplicate-properties/invalid.scss:8:2',
            ]
        },
        {
            name: 'selector-max-id',
            locations: [
                'no-ids/invalid.scss:1:1'
            ]
        },
        {
            // if a user ignores no-ids,
            // verify the name format of the ids
            name: 'selector-id-pattern',
            locations: [
                'id-name-format/invalid.scss:4:1',
                'id-name-format/invalid.scss:8:1',
                'id-name-format/invalid.scss:12:1',
                'id-name-format/invalid.scss:16:1',
                'id-name-format/invalid.scss:20:1'
            ]
        },
        {
            name: 'declaration-no-important',
            locations: [
                'no-important/invalid.scss:2:29'
            ]
        },
        {
            // if the user disables no-important,
            // verify there is no extra space `! important`
            name: 'declaration-bang-space-after',
            locations: [
                'space-after-bang/invalid.scss:4:17'
            ]
        },
        {
            // if the user disables no-important,
            // verify there is a space before the bang `; !important`
            name: 'declaration-bang-space-before',
            locations: [
                'space-before-bang/invalid.scss:4:16'
            ]
        },
        {
            name: 'color-no-invalid-hex',
            locations: [
                'no-invalid-hex/invalid.scss:1:16'
            ]
        },
        {
            name: 'property-no-unknown',
            locations: [
                'no-misspelled-properties/invalid.scss:3:2',
                'no-misspelled-properties/invalid.scss:8:2',
                'no-misspelled-properties/invalid.scss:13:2'
            ]
        },
        {
            name: 'selector-no-qualifying-type',
            locations: [
                'no-qualifying-elements/invalid.scss:2:1',
                'no-qualifying-elements/invalid.scss:7:1'
            ]
        },
        {
            name: 'number-no-trailing-zeros',
            locations: [
                'no-trailing-zero/invalid.scss:2:13',
                'no-trailing-zero/invalid.scss:6:14',
                'no-trailing-zero/invalid.scss:10:12'
            ]
        },
        {
            name: 'property-no-vendor-prefix',
            locations: [
                'no-vendor-prefixes/invalid.scss:10:2',
                'no-vendor-prefixes/invalid.scss:18:2',
                'no-vendor-prefixes/invalid.scss:19:2',
                'no-vendor-prefixes/invalid.scss:20:2',
                'no-vendor-prefixes/invalid.scss:21:2'
            ]
        },
        {
            name: 'selector-no-vendor-prefix',
            locations: [
                'no-vendor-prefixes/invalid.scss:5:3',
            ]
        },
        {
            name: 'at-rule-no-vendor-prefix',
            locations: [
                'no-vendor-prefixes/invalid.scss:1:1'
            ]
        },
        {
            name: 'value-no-vendor-prefix',
            locations: [
                'no-vendor-prefixes/invalid.scss:14:11'
            ]
        },
        {
            name: 'scss/at-extend-no-missing-placeholder',
            locations: [
                'placeholder-in-extend/invalid.scss:6:2',
                'placeholder-in-extend/invalid.scss:10:2'
            ]
        },
        {
            name: 'scss/percent-placeholder-pattern',
            locations: [
                'placeholder-name-format/invalid.scss:1:1',
                'placeholder-name-format/invalid.scss:5:1',
                'placeholder-name-format/invalid.scss:9:1',
                'placeholder-name-format/invalid.scss:13:1',
                'placeholder-name-format/invalid.scss:17:1'
            ]
        },
        {
            name: 'shorthand-property-no-redundant-values',
            locations: [
                'shorthand-values/invalid.scss:2:2',
                'shorthand-values/invalid.scss:6:2',
                'shorthand-values/invalid.scss:10:2'
            ]
        },
        {
            name: 'selector-list-comma-newline-after',
            locations: [
                'single-line-per-selector/invalid.scss:1:5'
            ]
        },
        {
            name: 'declaration-colon-space-after',
            locations: [
                'space-after-colon/invalid.scss:2:10'
            ]
        },
        {
            name: 'declaration-colon-space-before',
            locations: [
                'space-before-colon/invalid.scss:3:10'
            ]
        },
        {
            name: 'function-comma-space-after',
            locations: [
                'space-after-comma/invalid.scss:6:24'
            ]
        },
        {
            name: 'value-list-comma-space-after',
            locations: [
                'space-after-comma/invalid.scss:2:27'
            ]
        },
        {
            name: 'function-parentheses-space-inside',
            locations: [
                'space-between-parens/invalid.scss:11:15',
                'space-between-parens/invalid.scss:12:14'
            ]
        },
        {
            name: 'declaration-block-trailing-semicolon',
            locations: [
                'trailing-semicolon/invalid.scss:4:18'
            ]
        },
        {
            name: 'scss/dollar-variable-pattern',
            locations: [
                'variable-name-format/invalid.scss:1:1',
                'variable-name-format/invalid.scss:3:1'
            ]
        },
        {
            name: 'block-no-empty',
            locations: [
                'no-empty-rulesets/invalid.scss:2:6',
                'no-empty-rulesets/invalid.scss:9:7',
                'no-empty-rulesets/invalid.scss:12:8'
            ]
        },
    ];

    beforeEach(function () {
        process.chdir(testPath);
    });

    afterEach(function () {
        process.chdir(rootDirectory);
    });

    it('should output errors and warnings where there are linting violations', function () {
        let stylelintOutput;

        try {
            const result = execa.sync('npx', [
                'stylelint',
                '**/*.scss',
                '--ignore-path=".gitignore"',
                `--config="${path.relative(process.cwd(), rootDirectory)}/config.js"`,
                `--formatter="unix"`
            ]);
            stylelintOutput = result.stdout || '';
        } catch (result) {
            // An exit code of 2 indicates "there was at least one rule
            // violation or CLI flag error" which we can test are expected.
            // Any error that is not exit code 2 is something going wrong.
            // https://stylelint.io/user-guide/usage/cli#exit-codes
            if (result.exitCode !== 2) {
                throw new Error('stylelint failed to lint test Sass: ' + result.message);
            }
            stylelintOutput = result.stdout || '';
        }

        // Assert no SCSS in a valid.scss file throws a linting error.
        if (/\/valid.scss/.test(stylelintOutput)) {
            throw new Error(`Found:\n\n${stylelintOutput}\n\nDid not expect ` +
            `any lint errors for "valid.scss" files.`);
        }

        // Assert some linting errors are thrown for invalid.scss files.
        if (!/\/invalid.scss/.test(stylelintOutput)) {
            throw new Error(`Expected lint errors for Sass in ` +
            `"invalid.scss" files but found none.`);
        }

        // Assert expected lint errors are thrown from invalid.scss files.
        const missingNotices = expectedNotices.flatMap(expectedNotice => {
            const { name, locations } = expectedNotice;
            return locations.map(location => {
                const expectedPattern = new RegExp(
                    `${location}[^\n]*${name}[^\n]*error`,
                    'g'
                );

                if (!expectedPattern.test(stylelintOutput)) {
                    return `Expected a "${name}" error from "${location}".`;
                }
            });
        }).filter(Boolean);

        if (missingNotices.length > 0) {
            throw new Error(`\n\nNot all expected stylelint notices where found.\n\n`+
            `Found:\n\n${stylelintOutput}\n\nMissing Problems:\n\n${missingNotices.join('\n')}`);
        }
    });
});
