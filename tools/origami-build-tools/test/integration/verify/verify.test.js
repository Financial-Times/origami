/* eslint-env mocha */
'use strict';

const execa = require('execa');
const path = require('path');
const process = require('process');
const proclaim = require('proclaim');
const obtBinPath = require('../helpers/obtpath');
const rimraf = require('../helpers/delete');
const fileExists = require('../helpers/fileExists');
const { writeFile } = require('fs/promises');
const tmpdir = require('../helpers/tmpdir');

describe('obt verify', function () {
	let obt;

	this.timeout(60 * 1000);

	afterEach(function () {
		// Delete installs.
		// restore the current working directory.
		return rimraf(path.join(process.cwd(), '/build'))
			.then(() => rimraf(path.join(process.cwd(), '/package-lock.json')))
			.then(() => rimraf(path.join(process.cwd(), '/node_modules')))
			.then(() => rimraf(path.join(process.cwd(), '/bower_components')))
			.then(() => process.chdir(process.cwd()));
	});

	describe.only('npmignore', function () {
		describe('component with no-npmignore', function () {
			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/no-npmignore'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with good npmignore', function () {
			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/npmignore'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with bad npmignore', function () {
			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/npmignore-invalid'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should error', function () {
				return execa(obt, ['verify']).then(() => {
					throw new Error('obt verify should error.');
				}, output => {
					// obt verify exited with a non-zero exit code, which is what we expected.
					proclaim.match(output.stdout, /\bmain.js\b/);
					proclaim.match(output.stdout, /\bmain.scss\b/);
					proclaim.match(output.stdout, /\bdemos\b/);
					proclaim.match(output.stdout, /\bsrc\b/);
					proclaim.match(output.stdout, /\bsrc\/\b/);
					proclaim.match(output.stdout, /\bsrc\/js\b/);
					proclaim.match(output.stdout, /\bsrc\/scss\b/);
				});
			});
		});
	});

	describe('readme', function () {
		describe('component with no readme', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/no-readme'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should error', function () {
				return execa(obt, ['verify'])
					.then(() => {
						throw new Error('obt verify should error.');
					}, output => {
						// obt verify exited with a non-zero exit code, which is what we expected.
						proclaim.include(output.stdout, 'Components require a README.md with documentation.');
					});
			});
		});

		describe('component with an invalid readme', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/readme-invalid'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});


			it('should warn', function () {
				return execa(obt, ['verify']).then(output => {
					proclaim.include(output.stdout, 'expected "@financial-times/invalid-readme", got "not-the-component-name"');
				});
			});
		});

		describe('component with an invalid readme filename', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/readme-invalid-name'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});


			it('should error', async function () {
				const folder = await tmpdir('obt-verify-task-');
				const filePath = path.join(folder, 'testFilesystemCaseSensitivity.txt');
				await writeFile(path.join(folder, 'testFilesystemCaseSensitivity.txt'), "hello", "utf8");
				const caseSensitiveFileSystem = await fileExists(filePath.toUpperCase());
				// Do not run this test on case-insensitive filesystems because it will fail.
				if (!caseSensitiveFileSystem) {
					return execa(obt, ['verify'])
						.then(() => {
							throw new Error('obt verify should error.');
						}, output => {
							// obt verify exited with a non-zero exit code, which is what we expected.
							proclaim.include(output.stdout, 'Components require a README.md with documentation.');
						});
				}
			});
		});

		describe('component with custom .remarkrc.cjs configuration', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/readme-custom-remarkrc'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error given conformance with custom rules', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with valid readme with lowercased name', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/readme-valid-lowercase'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with valid readme with uppercased name', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/readme-valid-uppercase'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});
	});

	describe('js', function () {
		describe('component with no js', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/no-js-or-sass'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with invalid js', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-invalid'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should error', function () {
				return execa(obt, ['verify'])
					.then(() => {
						throw new Error('obt verify should error.');
					}, () => {
						// obt verify exited with a non-zero exit code, which is what we expected.
					});
			});
		});

		describe('component with custom .eslintrc.cjs configuration', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-custom-eslint'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error given conformance with custom rules', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with valid ES5 js', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-es5'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with valid ES6 js', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-es6'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with valid ES7 js', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-es7'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with npm dependency', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/js-npm-dependency'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error because of bad js in a npm dependency', function () {
				let obt;
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					})
					.then(() => {
						return execa(obt, ['verify']);
					});
			});
		});
	});

	describe('sass', function () {
		describe('component with no sass', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/no-js-or-sass'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with invalid sass', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/sass-invalid'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should error', function () {
				return execa(obt, ['verify'])
					.then(() => {
						throw new Error('obt verify should error when trying to verify a component which has invalid sass.');
					}, () => {
						// obt verify exited with a non-zero exit code, which is what we expected.
					});
			});
		});

		describe('component with valid sass', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/sass'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error', function () {
				return execa(obt, ['verify']);
			});
		});

		describe('component with custom sass style configuration', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/sass-custom-config'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should error for customised rules', function () {
				return execa(obt, ['verify'])
					.then(() => {
						throw new Error('obt verify should error.');
					})
					.catch(e => {
						proclaim.include(
							e.message,
							'indentation of 4 spaces',
							'Expected the linter to check for indentation with spaces, instead of our default tabs rule.'
						);
					});
			});
		});

		describe('component with npm dependency', function () {

			beforeEach(function () {
				// Change the current working directory to the folder which contains the project we are testing against.
				// We are doing this to replicate how obt is used when executed inside a terminal.
				process.chdir(path.join(__dirname, '/fixtures/sass-npm-dependency'));
				// Install dependencies.
				return obtBinPath()
					.then(obtPath => {
						obt = obtPath;
						return execa(obt, ['install']);
					});
			});

			it('should not error because of bad sass in an npm dependency', function () {
				return execa(obt, ['verify']);
			});
		});
	});
});
