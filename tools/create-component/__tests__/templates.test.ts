import {ejsToHTML} from '../helpers/ejsFunctions';

describe('Component template files', () => {
	const data = {
		props: {
			name: 'o-test-name',
			description: 'bla blas ',
			keywords: ['git', 'o', 'init'],
			team: {
				email: 'origami.support@ft.com',
				slack: '#origami-support',
				githubTeam: 'origami-core',
			},
			status: 'experimental',
			brands: ['core', 'internal'],
			javascript: true,
			scss: true,
		},
	};
	describe('Root non ejs files', () => {
		it('expect .eslintignore ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.eslintignore');
			expect(str).toMatchSnapshot();
		});
		it('expect .eslintrc.cjs ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.eslintrc.cjs');
			expect(str).toMatchSnapshot();
		});
		it('expect .gitignore ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.gitignore');
			expect(str).toMatchSnapshot();
		});
		it('expect .npmignore ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.npmignore');
			expect(str).toMatchSnapshot();
		});
		it('expect .remarkrc.cjs ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.remarkrc.cjs');
			expect(str).toMatchSnapshot();
		});
		it('expect .stylelintignore ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.stylelintignore');
			expect(str).toMatchSnapshot();
		});
		it('expect .stylelintrc.cjs ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('.stylelintrc.cjs');
			expect(str).toMatchSnapshot();
		});
	});

	describe('Root ejs files', () => {
		it('expect main.js ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('main.js.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect main.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('main.scss.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect origami.json ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('origami.json.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect package.json ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('package.json.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect README.md ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('README.md.ejs', data);
			expect(str).toMatchSnapshot();
		});
	});

	describe('demos ejs files', () => {
		it('expect demo.js ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('demos/src/demo.js');
			expect(str).toMatchSnapshot();
		});
		it('expect demo.mustache ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('demos/src/demo.mustache.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect demo.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('demos/src/demo.scss.ejs', data);
			expect(str).toMatchSnapshot();
		});
	});
	describe('src and stories ejs files', () => {
		it(`expect <name>.js ejsRenderer fn output to match snapshot`, async () => {
			const str = await ejsToHTML(`src/js/<name>.js.ejs`, data);
			expect(str).toMatchSnapshot();
		});
		it('expect _brand.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('src/scss/_brand.scss.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect _variables.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('src/scss/_variables.scss.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it(`expect <name>.tsx ejsRenderer fn output to match snapshot`, async () => {
			const str = await ejsToHTML(`src/tsx/<name>.tsx.ejs`, data);
			expect(str).toMatchSnapshot();
		});
		it(`expect <name>.tsx ejsRenderer fn output to match snapshot`, async () => {
			const str = await ejsToHTML(`stories/<name>.scss.ejs`, data);
			expect(str).toMatchSnapshot();
		});
		it(`expect <name>.stories.tsx ejsRenderer fn output to match snapshot`, async () => {
			const str = await ejsToHTML(`stories/<name>.stories.tsx.ejs`, data);
			expect(str).toMatchSnapshot();
		});
	});

	describe('test ejs files', () => {
		it(`expect <name>.test.js ejsRenderer fn output to match snapshot`, async () => {
			const str = await ejsToHTML(`test/<name>.test.js.ejs`, data);
			expect(str).toMatchSnapshot();
		});
		it('expect fixtures.js ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('test/helpers/fixtures.js.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect _main.test.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('test/scss/_main.test.scss.ejs', data);
			expect(str).toMatchSnapshot();
		});
		it('expect index.test.scss ejsRenderer fn output to match snapshot', async () => {
			const str = await ejsToHTML('test/scss/index.test.scss');
			expect(str).toMatchSnapshot();
		});
	});
});
