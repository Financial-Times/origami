import {GluegunToolbox} from 'gluegun';
import {oComponentsPath, templateFiles} from '../../helpers/utils';
import * as ejsHelpers from '../../helpers/name-formats';
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
	toolbox.origami = {
		copyTemplates: props => {
			if (props.name.includes('test')) {
				const testPath = './__tests__';
				return copyTemplates(toolbox, props, testPath);
			}
			return copyTemplates(toolbox, props, oComponentsPath);
		},
	};
};

export async function copyTemplates(toolbox, props, targetPath) {
	let files = templateFiles;
	if (!props.javascript) {
		const jsFilesNotToInclude = [
			'src/js/<name>.js.ejs',
			'test/<name>.test.js.ejs',
			'test/helpers/fixtures.js.ejs',
			'main.js.ejs',
		];
		files = files.filter(file => !jsFilesNotToInclude.includes(file));
	}

	if (!props.scss) {
		const sassFilesNotToInclude = [
			'src/scss/_brand.scss.ejs',
			'src/scss/_variables.scss.ejs',
			'test/scss/index.test.scss',
			'test/scss/_main.test.scss.ejs',
			'main.scss.ejs',
		];
		files = files.filter(file => !sassFilesNotToInclude.includes(file));
	}
	await Promise.all(
		files.map(async file => {
			const template = `/${file}`;
			// Where to copy this file to.
			const target = `${targetPath}/${props.name}/${file
				.replace('<name>', props.name)
				.replace('.ejs', '')}`;
			return await toolbox.template.generate({
				template,
				target,
				props: {...props, ...ejsHelpers},
			});
		})
	);
}
