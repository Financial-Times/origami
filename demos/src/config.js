module.exports = {
    options: {
        sass: 'demos/src/demo.scss',
        data: {
          'o-ft-footer': JSON.parse(require('fs').readFileSync(process.cwd() + '/footer.json', {encoding: 'utf8'}))
        }
    },
    demos: [
        {
            name: 'ft-footer',
            template: 'main.mustache'
        }
    ]
};