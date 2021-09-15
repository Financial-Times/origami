/* eslint-env mocha */
'use strict';

const mockery = require('mockery');
const proclaim = require('proclaim');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});
const process = require('process');
const fs = require('fs-extra');
const path = require('path');
const denodeify = require('util').promisify;
const rimraf = denodeify(require('rimraf'));

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';
const pathSuffix = '-verify';
const verifyTestPath = path.resolve(obtPath, oTestPath + pathSuffix);

describe('verify-package-json', function () {
	let verifyPackageJson;
	const originalConsole = global.console;
	let console;
	beforeEach(function() {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		console = {
			log: sinon.stub(),
			warn: sinon.stub(),
			error: sinon.stub()
		};
		mockery.registerMock('is-ci', true);
		process.env.CI = true;
		global.console = console;
		verifyPackageJson = require('../../../lib/tasks/verify-package-json');
		fs.copySync(path.resolve(obtPath, oTestPath), verifyTestPath);
		process.chdir(verifyTestPath);
		fs.writeFileSync('src/scss/verify.scss', '$color: #ccc;\n\np {\n  color: $color!important ;\n}\n', 'utf8');
		fs.writeFileSync('src/js/verify.js', 'const test = \'We live in financial times\';\n');
	});

	afterEach(function () {
		global.console = originalConsole;
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
		process.chdir(obtPath);
		fs.removeSync(path.resolve(obtPath, verifyTestPath));
	});

	describe('default title', () => {
		it('should be "Verifying your package.json"', () => {
			proclaim.equal(verifyPackageJson().title, 'Verifying your package.json');
		});
	});

	describe('task', function () {
		it('should run package.json check successfully', function () {
			return verifyPackageJson().task().
				then(function (verifiedPackageJson) {
					proclaim.equal(verifiedPackageJson.length, 0);
				});
		});

		it('should not write to the output a github annotation if package.json has no issues', async () => {
			await verifyPackageJson().task();
			proclaim.notCalled(console.log);
		});

		it('should fail if no package.json file exists', async function () {
			fs.unlinkSync('package.json', JSON.stringify({}), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
						'No package.json file found. To make this an origami component, create a package.json file following the format defined at: https://origami.ft.com/docs/components/code/#package-management\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);

				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0ANo package.json file found. To make this an origami component, create a package.json file following the format defined at: https://origami.ft.com/docs/components/code/#package-management%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail with an empty package.json', async function () {
			fs.writeFileSync('package.json', JSON.stringify({}), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
						'The `type` property is required. It must be the string "module".\n' +
						'A description property is required. It must be a string which describes the component.\n' +
						'The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n' +
						'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n' +
						'Because the file `main.js` exists, the `browser` property is required. It must have the value `"main.js"`.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);

				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe `type` property is required. It must be the string \"module\".%0AA description property is required. It must be a string which describes the component.%0AThe keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0ABecause the file `main.js` exists, the `browser` property is required. It must have the value `\"main.js\"`.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should write to the output a github annotation if empty package.json', async function() {
			fs.writeFileSync('package.json', JSON.stringify({}), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
						'The `type` property is required. It must be the string "module".\n' +
						'A description property is required. It must be a string which describes the component.\n' +
						'The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n' +
						'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n' +
						'Because the file `main.js` exists, the `browser` property is required. It must have the value `"main.js"`.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe `type` property is required. It must be the string \"module\".%0AA description property is required. It must be a string which describes the component.%0AThe keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0ABecause the file `main.js` exists, the `browser` property is required. It must have the value `\"main.js\"`.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if missing description property', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			delete packageJSON.description;
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
						'A description property is required. It must be a string which describes the component.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					[`::error file=package.json,line=1,col=1::Failed linting:%0A%0AA description property is required. It must be a string which describes the component.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management`]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if description property is an empty string', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			packageJSON.description = '';
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
					'A description property is required. It must be a string which describes the component.\n\n' +
					'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					[`::error file=package.json,line=1,col=1::Failed linting:%0A%0AA description property is required. It must be a string which describes the component.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management`]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if description property is a string containing only spaces', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			packageJSON.description = '      ';
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
					'A description property is required. It must be a string which describes the component.\n\n' +
					'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AA description property is required. It must be a string which describes the component.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if missing keywords property', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			delete packageJSON.keywords;
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
					'The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.\n\n' +
					'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if keywords property contains an empty string', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			packageJSON.keywords = [''];
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
					'The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.\n\n' +
					'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		it('should fail if keywords property contains a string containing only spaces', async function () {
			const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
			packageJSON.keywords = ['      '];
			fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

			let errored;
			try {
				await verifyPackageJson().task();
				errored = false;
			} catch (error) {
				errored = true;
				proclaim.equal(
					error.message,
					'Failed linting:\n\n' +
					'The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.\n\n' +
					'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
				);
				proclaim.calledOnce(console.log);
				proclaim.deepStrictEqual(
					console.log.lastCall.args,
					["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
				);
			}

			if (!errored) {
				proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
			}
		});

		context('the name property', function(){

			it('should fail if property is missing', async function () {
				const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
				delete packageJSON.name;
				fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

				let errored;
				try {
					await verifyPackageJson().task();
					errored = false;
				} catch (error) {
					errored = true;
					proclaim.equal(
						error.message,
						'Failed linting:\n\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
					);
					proclaim.calledOnce(console.log);
					proclaim.deepStrictEqual(
						console.log.lastCall.args,
						["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
					);
				}

				if (!errored) {
					proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
				}
			});

			it('should fail if property contains an empty string', async function () {
				const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
				packageJSON.name = '';
				fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

				let errored;
				try {
					await verifyPackageJson().task();
					errored = false;
				} catch (error) {
					errored = true;
					proclaim.equal(
						error.message,
						'Failed linting:\n\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
					);
					proclaim.calledOnce(console.log);
					proclaim.deepStrictEqual(
						console.log.lastCall.args,
						["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
					);
				}

				if (!errored) {
					proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
				}
			});

			it('should fail if property does not conform to the npmjs specification', async function () {
				const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
				packageJSON.name = '@financial-times/Hello_W@rld!';
				fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

				let errored;
				try {
					await verifyPackageJson().task();
					errored = false;
				} catch (error) {
					errored = true;
					proclaim.equal(
						error.message,
						'Failed linting:\n\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
					);
					proclaim.calledOnce(console.log);
					proclaim.deepStrictEqual(
						console.log.lastCall.args,
						["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
					);
				}

				if (!errored) {
					proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
				}
			});

			it('should fail if it is not within the `@financial-times` namespace', async function () {
				const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
				packageJSON.name = 'o-test-component';
				fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

				let errored;
				try {
					await verifyPackageJson().task();
					errored = false;
				} catch (error) {
					errored = true;
					proclaim.equal(
						error.message,
						'Failed linting:\n\n' +
						'The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.\n\n' +
						'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
					);
					proclaim.calledOnce(console.log);
					proclaim.deepStrictEqual(
						console.log.lastCall.args,
						["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
					);
				}

				if (!errored) {
					proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
				}
			});

			it('should pass if it is within the `@financial-times` namespace and conforms to the npmjs specification', async function () {
				const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
				packageJSON.name = '@financial-times/o-test-component';
				fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

				await verifyPackageJson().task();
				proclaim.notCalled(console.log);
			});

		});

		context('the browser property', function(){
			context('when main.js file exists', function() {
				it('should fail if property does not exist ', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					delete packageJSON.browser;
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'Because the file `main.js` exists, the `browser` property is required. It must have the value `"main.js"`.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0ABecause the file `main.js` exists, the `browser` property is required. It must have the value `\"main.js\"`.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});

				it('should fail if property does not contain the value `"main.js"', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.browser = "";
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'Because the file `main.js` exists, the `browser` property is required. It must have the value `"main.js"`.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0ABecause the file `main.js` exists, the `browser` property is required. It must have the value `\"main.js\"`.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});
				it('should pass if property is set to `"main.js"', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.browser = 'main.js';
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});

				it('should pass if property is set to `"./main.js"', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.browser = './main.js';
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});

				it('should pass if property is set to an odd path which resolves to `"./main.js"', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.browser = './src/../main.js';
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});
			});

			context('when main.js file does not exist', function() {
				it('should pass if property does not exist ', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					delete packageJSON.browser;
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');
					await rimraf(path.join(process.cwd(), 'main.js'));

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});

				it('should fail if property exists', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.browser = "";
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');
					await rimraf(path.join(process.cwd(), 'main.js'));

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'Because the file `main.js` does not exist, the `browser` property must not be set.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0ABecause the file `main.js` does not exist, the `browser` property must not be set.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});
			});

		});

		context('the type property', function(){
			context('when type exists', function() {
				it('should fail if property is not set to `"module"`', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.type = "carrot";
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The `type` property is required. It must be the string "module".\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe `type` property is required. It must be the string \"module\".%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});

				it('should pass if property is set to `"module"', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.type = 'module';
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});
			});

			context('when type does not exist', function() {
				it('should fail', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					delete packageJSON.type;
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The `type` property is required. It must be the string "module".\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe `type` property is required. It must be the string \"module\".%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});
			});

		});

		context('the engines property', function(){
			context('when engines exists', function() {
				it('should fail if missing the npm property', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.engines = "carrot";
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});
				it('should fail if npm property is set to SemVer ranges which allows npm versions below 7', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.engines = {npm: '>=6'};
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});

				it('should fail if npm property is not a valid SemVer range', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.engines = {npm: 'penguin'};
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});

				it('should pass if npm property is set to SemVer ranges which disallows npm versions below 7', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					packageJSON.engines = {'npm': '>=7'};
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					await verifyPackageJson().task();
					proclaim.notCalled(console.log);
				});
			});

			context('when engines does not exist', function() {
				it('should fail', async function () {
					const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
					delete packageJSON.engines;
					fs.writeFileSync('package.json', JSON.stringify(packageJSON), 'utf8');

					let errored;
					try {
						await verifyPackageJson().task();
						errored = false;
					} catch (error) {
						errored = true;
						proclaim.equal(
							error.message,
							'Failed linting:\n\n' +
							'The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.\n\n' +
							'The package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management'
						);
						proclaim.calledOnce(console.log);
						proclaim.deepStrictEqual(
							console.log.lastCall.args,
							["::error file=package.json,line=1,col=1::Failed linting:%0A%0AThe engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.%0A%0AThe package.json file does not conform to the specification at https://origami.ft.com/docs/components/code/#package-management"]
						);
					}

					if (!errored) {
						proclaim.fail('verifyPackageJson().task() did not return a rejected promise', 'verifyPackageJson().task() should have returned a rejected promise');
					}
				});
			});

		});

	});
});
