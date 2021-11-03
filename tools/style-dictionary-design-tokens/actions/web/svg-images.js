const fs = require('fs-extra');
const path = require('path');
const template = require('lodash/template');

module.exports = {

    do: (dictionary, config) => {
        const { assetBuildPath, mode } = config;

        dictionary.allProperties
            .filter(token => {
                return token.attributes.category === 'image'
            })
            .forEach(token => {
                const { name, value } = token;

                const tokenPath = path.dirname(token.filePath);
                const imagePath = path.join(tokenPath, value);

                const src = template(fs.readFileSync(imagePath));
                const svg = src(dictionary.properties);

                // Make sure the directory exists and write the new SVG file
                const outputPath = `${assetBuildPath || ''}/${name}${mode ? `-${mode}` : '' }.svg`;
                fs.ensureFileSync(outputPath);
                fs.writeFileSync(outputPath, svg);
                console.log(`✔︎  ${outputPath}`);
            });
    },

    undo: (dictionary, config) => {
        // no clean action
    }
}
