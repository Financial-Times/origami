import sassTrue from 'sass-true'
import dartSass from 'sass'

describe('sass', () => {
  context('dart-sass', function() {
    runTestsWith(dartSass)
  })
})

function runTestsWith(sassEngine) {
  sassTrue.runSass({
    file: './test/index.test.scss',
    includePaths: ['../../node_modules']
  }, {
    describe,
    it,
    sassEngine
  })
}
