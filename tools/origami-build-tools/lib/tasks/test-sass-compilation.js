'use strict';

const files = require('../helpers/files');
const Listr = require('listr');
const ListrRenderer = require('../helpers/listr-renderer');
const isCI = require('is-ci');
const { camelCase } = require('lodash');
const ftSass = require('../helpers/sass');
const { readFile } = require('fs/promises');
const execa = require('execa');

async function compilationTest(cwd, { silent, brand } = {
	silent: false,
	brand: false
}) {
	const mainSassFilePath = await files.getMainSassPath(cwd);
	if (!mainSassFilePath) {
		return;
	}

	const name = await files.getComponentName();
	const origamiManifest = await files.getOrigamiJson();

	const requiresPrimaryMixin = origamiManifest.origamiType === 'component';

	const primaryMixinName = camelCase(name);
	const primaryMixinErrorCode = `OBT_NO_PRIMARY-MIXIN-${primaryMixinName}`;

	const sassContent = await readFile(mainSassFilePath, 'utf8');
	const sassData = `
		$system-code: "origami-build-tools";
		${brand ? `$o-brand: ${brand};` : ''}

		${sassContent}

		${!silent && requiresPrimaryMixin ? `
			@if not mixin-exists('${primaryMixinName}') {
				@error '${primaryMixinErrorCode}';
			};
			@include ${primaryMixinName}();
		` : ''}
	`;

	// Build Sass
	try {
		const result = await execa(ftSass, [
			'--stdin',
			'--style=compressed',
			'--no-source-map',
			...files.getSassIncludePaths(cwd).map(p => `--load-path=${p}`)
		], {
			input: sassData,
			cwd,
		});

		const css = result.stdout;

		if (silent && css) {
			throw new Error('CSS was output by default, without making a call to the component\'s Sass API.');
		}

	} catch (error) {
		const missingPrimaryMixin = error.message.includes(primaryMixinErrorCode);
		const missingPrimaryMixinMessage = 'Origami components require a ' +
			`primary mixin, in this case "${primaryMixinName}". See the ` +
			'"Create A New Origami Component" tutorial to learn how to add ' +
			'a primary mixin to your component, or contact the Origami ' +
			'community on Slack in #origami-support.\n' +
			'https://origami.ft.com/docs/tutorials/create-a-new-component-part-2/#primary-mixin';

		const errorMessage = missingPrimaryMixin ? missingPrimaryMixinMessage : error.message;

		if (isCI) {
			const newLine = "%0A";
			const message = errorMessage.replace(/\n/g, newLine);
			console.log(`::error file=${mainSassFilePath},line=1,col=1::${message}`);
		}
		throw new Error(errorMessage);
	}
}


module.exports = function (cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: `Testing sass compilation`,
		task: () => {
			return new Listr([
				{
					title: 'Tests starting...',
					task: async (context, task) => {
						let brands = await files.getModuleBrands();
						for (const brand of brands) {
							task.title = `Testing compilation for the ${brand} brand.`;
							await compilationTest(config.cwd, {
								silent: true
							});

							task.title = `Testing compilation for the ${brand} brand with a call to the primary mixin.`;
							await compilationTest(config.cwd, {
								brand,
								silent: false
							});
						}
					}
				}
			], {
				renderer: ListrRenderer,
				collapse: false,
				showSubtasks: true,
				concurrent: true
			});
		},
		skip: async () => {
			if (config.testFilter && config.testFilter !== 'sass') {
				return 'Sass tests filtered out with --test-filter';
			}
			const exists = await files.fileExists(await files.getMainSassPath(config.cwd));
			return !exists;
		}
	};
};
