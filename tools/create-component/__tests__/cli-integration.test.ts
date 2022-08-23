import { templateFiles } from './../helpers/utils'
import { filesystem } from 'gluegun'
import * as nixt from 'nixt'
import * as rimraf from 'rimraf'

describe('CLI integration tests', () => {
	jest.setTimeout(100000)
	afterEach((done) => {
		rimraf('./__tests__/o-test-name', done)
	})

	it('CLI with all properties', (done) => {
		getNixtInstance(true, true, [], done)
	})
	it('without javascript', (done) => {
		const jsFilesToExclude = [
			'src/js/o-test-name.js',
			'test/o-test-name.test.js',
			'test/helpers/fixtures.js',
			'main.js',
		]
		getNixtInstance(false, true, jsFilesToExclude, done)
	})
	it('without sass', (done) => {
		const sassFilesToExclude = [
			'src/scss/_brand.scss',
			'src/scss/_variables.scss',
			'test/scss/index.test.scss',
			'test/scss/_main.test.scss',
			'main.scss',
		]
		getNixtInstance(true, false, sassFilesToExclude, done)
	})
})

function getNixtInstance(
	js: boolean,
	scss: boolean,
	filesToExclude?: string[],
	done?: () => void
) {
	return nixt({ colors: false })
		.run('./bin/create-component')
		.on(/name/i)
		.respond('o Test name\n')
		.on(/okay/i)
		.respond('\n')
		.on(/description/i)
		.respond('bla bla\n')
		.on(/keywords/i)
		.respond('\n')
		.on(/information/)
		.respond('\n')
		.on(/status/)
		.respond('\n')
		.on(/templates/)
		.respond('\n')
		.on(/JavaScript/)
		.respond(js ? '\n' : 'n\n')
		.on(/Sass/)
		.respond(scss ? '\n' : 'n\n')
		.on(/create/)
		.respond('\n')
		.on(/change/)
		.respond('\n')
		.expect(() => {
			checkFiles(filesToExclude)
		})
		.end(done)
}

function checkFiles(filesNotToInclude?: string[]) {
	const testComponentPath = filesystem.path(__dirname, 'o-test-name')
	const actualGeneratedFiles = filesystem
		.find(testComponentPath)
		.map((filePath) => filePath.split('o-test-name/')[1])
	templateFiles
		.map((template) =>
			template.replace('<name>', 'o-test-name').replace('.ejs', '')
		)
		.map((template) => {
			if (filesNotToInclude && filesNotToInclude.includes(template)) {
				expect(actualGeneratedFiles).not.toContain(template)
				return
			}
			expect(actualGeneratedFiles).toContain(template)
		})
}
