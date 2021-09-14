const fs = require('fs-extra');
const template = require('lodash/template');

module.exports = {

    do: (dictionary, config) => {
        const { buildPath, mode } = config;

        dictionary.allProperties
            .filter(token => {
                return token.attributes.category === 'image'
            })
            .forEach(token => {
                const { name, value } = token;

                const src = template(fs.readFileSync(value));
                const svg = src(dictionary.properties);

                // Make sure the directory exists and write the new SVG file
                const outputPath = `${buildPath || ''}/images/${name}-custom-properties-web.svg`;
                fs.ensureFileSync(outputPath);
                fs.writeFileSync(outputPath, svg);
                console.log(`✔︎  ${outputPath}`);
            });
    },

    undo: (dictionary, config) => {
        // no clean action
    }
}
