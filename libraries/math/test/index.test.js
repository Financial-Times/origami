import sassTrue from 'sass-true'
import dartSass from 'sass'
import nodeSass from 'node-sass'

describe('sass', () => {
  context('dart-sass', function() {
    runTestsWith(dartSass)
  })
  context('node-sass', function() {
    runTestsWith(nodeSass)
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
