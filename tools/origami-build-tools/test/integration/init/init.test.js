/* eslint-env mocha */
"use strict";

const process = require("process");
const obtBinPath = require("../helpers/obtpath");
const rimraf = require("../helpers/delete");
const nixt = require("nixt");
const tmpdir = require('../helpers/tmpdir');

describe("obt init", function () {
	this.timeout(10 * 1000);

	describe("initialising a new component", function () {
		describe("obt install && demo && build && verify && test", () => {
			let testDirectory;
			beforeEach(async function () {
				testDirectory = await tmpdir('obt-init-task-');
				process.chdir(testDirectory);
			});

			afterEach(function () {
				process.chdir(process.cwd());
				return rimraf(testDirectory);
			});

			it("should not error", function (done) {
				this.timeout(100 * 1000);
				obtBinPath().then((obt) => {
					return nixt({ colors: false })
						.run(obt + ' init')
						.on(/name/i)
						.respond("bob\n")
						.on(/current directory/i)
						.respond("033[B\n")
						.on(/description/i)
						.respond("bla bla\n")
						.on(/keywords/i)
						.respond("\n")
						.on(/category/)
						.respond("\n")
						.on(/brands/)
						.respond("\n")
						.on(/JavaScript/)
						.respond("\n")
						.on(/Sass/)
						.respond("\n")
						.on(/status/)
						.respond("\n")
						.on(/team email/)
						.respond("\n")
						.on(/slack channel/)
						.respond("\n")
						.on(/Github team/)
						.respond("\n")
						.on(/right/)
						.respond("\n")
						.exec("./bob/")
						.exec('cd bob')
						.exec(obt + " install")
						.exec(obt + " demo")
						.exec(obt + " verify")
						.exec(obt + " test")
						.end(done);
				}).catch(done);
			});
		});
	});
});
