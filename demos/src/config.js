module.exports = {
    options: {
        sass: 'demos/src/demo.scss',
        js: 'demos/src/demo.js',
        data: {
          'o-ft-header': {
            'topbar-items': require('fs').readFileSync(process.cwd() + '/demos/src/topbar-items.html', {encoding: 'utf8'})
          }
        }
    },
    demos: {
        'ft-header': {
            template: 'main.mustache'
        }
    }
};