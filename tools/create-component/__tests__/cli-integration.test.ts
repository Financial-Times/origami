import * as nixt from 'nixt';
import * as jetPack from 'fs-jetpack';
import {sanitizeName, templateFiles} from './../helpers/utils';
import {copyTemplates} from '../helpers/ejsFunctions';

describe('CLI integration tests', () => {
	jest.setTimeout(30000);
	let tempDir;
	beforeEach(() => {
		tempDir = jetPack.tmpDir({prefix: 'o-test-name-'});
	});
	afterEach(() => {
		tempDir.remove();
	});

	const testDefaults = {
		description: 'bla bla',
		keywords: [],
		team: {
			email: 'origami.support@ft.com',
			slack: '#origami-support',
			githubTeam: 'origami-core',
		},
		status: 'experimental',
		brands: ['core'],
	};

	it('CLI with all properties', async () => {
		const responds = {
			...testDefaults,
			name: 'o Test name',
			javascript: true,
			scss: true,
		};
		const cli = getNixtInstance(responds);
		cli.expect(result => {
			const expectedStdOutName = `name: '${sanitizeName(responds.name)}'`;
			const expectedStdOutJavascript = `javascript: ${responds.javascript}`;
			const expectedStdOutScss = `scss: ${responds.scss}`;
			expect(result.stdout.includes(expectedStdOutName)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutJavascript)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutScss)).toBeTruthy();
		});
		cli.end();
		await copyTemplates(
			{...responds, name: sanitizeName(responds.name)},
			tempDir.cwd()
		);
		checkFiles(tempDir.cwd());
	});

	it('without javascript', async () => {
		const jsFilesToExclude = [
			'demos/src/demo.js',
			'src/js/test-name.js',
			'test/test-name.test.js',
			'test/helpers/fixtures.js',
			'main.js',
		];
		const responds = {
			...testDefaults,
			name: 'o Test name',
			javascript: false,
			scss: true,
		};
		const cli = getNixtInstance(responds);
		cli.expect(result => {
			const expectedStdOutName = `name: '${sanitizeName(responds.name)}'`;
			const expectedStdOutJavascript = `javascript: ${responds.javascript}`;
			const expectedStdOutScss = `scss: ${responds.scss}`;
			expect(result.stdout.includes(expectedStdOutName)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutJavascript)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutScss)).toBeTruthy();
		});
		cli.end();
		await copyTemplates(
			{...responds, name: sanitizeName(responds.name)},
			tempDir.cwd()
		);
		checkFiles(tempDir.cwd(), jsFilesToExclude);
	});
	it('without sass', async () => {
		const sassFilesToExclude = [
			'demos/src/demo.scss',
			'stories/test-name.scss',
			'src/scss/_brand.scss',
			'src/scss/_variables.scss',
			'test/scss/index.test.scss',
			'test/scss/_main.test.scss',
			'main.scss',
		];
		const responds = {
			...testDefaults,
			name: 'o Test name',
			javascript: true,
			scss: false,
		};
		const cli = getNixtInstance(responds);
		cli.expect(result => {
			const expectedStdOutName = `name: '${sanitizeName(responds.name)}'`;
			const expectedStdOutJavascript = `javascript: ${responds.javascript}`;
			const expectedStdOutScss = `scss: ${responds.scss}`;
			expect(result.stdout.includes(expectedStdOutName)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutJavascript)).toBeTruthy();
			expect(result.stdout.includes(expectedStdOutScss)).toBeTruthy();
		});
		cli.end();
		await copyTemplates(
			{...responds, name: sanitizeName(responds.name)},
			tempDir.cwd()
		);
		checkFiles(tempDir.cwd(), sassFilesToExclude);
	});
});

function getNixtInstance(responses) {
	const {name, description, javascript, scss} = responses;
	return nixt({colors: false})
		.run('./bin/create-component')
		.on(/name/i)
		.respond(`${name}'\n'`)
		.on(/okay/i)
		.respond('\n')
		.on(/description/i)
		.respond(`${description}\n`)
		.on(/keywords/i)
		.respond('\n')
		.on(/information/)
		.respond('\n')
		.on(/status/)
		.respond('\n')
		.on(/templates/)
		.respond('\n')
		.on(/JavaScript/)
		.respond(javascript ? '\n' : 'n\n')
		.on(/Sass/)
		.respond(scss ? '\n' : 'n\n')
		.on(/create/)
		.respond('\n')
		.on(/change/)
		.respond('\n');
}

function checkFiles(tempDirPath: string, filesNotToInclude?: string[]) {
	const actualGeneratedFiles = jetPack
		.find(tempDirPath)
		.map(filePath => filePath.split('o-test-name/')[1]);
	templateFiles
		.map(template =>
			template.replace('<name>', 'test-name').replace('.ejs', '')
		)
		.map(template => {
			if (filesNotToInclude && filesNotToInclude.includes(template)) {
				expect(actualGeneratedFiles).not.toContain(template);
				return;
			}
			expect(actualGeneratedFiles).toContain(template);
		});
}
