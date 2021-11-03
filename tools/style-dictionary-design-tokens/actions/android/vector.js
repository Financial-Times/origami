const path = require('path');
const fs = require('fs-extra');
const s2v = require('svg2vectordrawable');
const template = require('lodash/template');

/**
 * This is a custom [Style Dictionary action](https://amzn.github.io/style-dictionary/#/actions)
 * that will generate all of the graphics for each platform (android, ios, web) based on
 * the SVG tokens defined in our Style Dictionary.
 */
module.exports = {
    // An action in Style Dictionary has `do` and `undo` functions, which take the transformed
    // and resolved dictionary object containing all the tokens and the platform configuration
    // of the platform that called this action.
    do: (dictionary, config) => {
        const { assetBuildPath, mode } = config;

        dictionary.allProperties
            .filter(token => {
                return token.attributes.category === `image`
            })
            .forEach(token => {
                const { name, value } = token;

                // Read the file from the token's value and turn it into a
                // [lodash template](https://lodash.com/docs/4.17.15#template)
                // This is why the original SVG files have `<%= color.brand.primary.value %>` in them.
                // That is the lodash template's way of using data in the template.
                // `src` is now a function that will accept a data object that will be used
                // to generate a finished output.
                const tokenPath = path.dirname(token.filePath);
                const imagePath = path.join(tokenPath, value);

                const src = template(fs.readFileSync(imagePath));

                // Generate the final SVG output by passing in the dictionary
                // to resolve the references. `svg` is the finished SVG string
                // that can now be written to a file or passed to other functions
                // to translate it to a PNG or Android Vector Drawable
                const svg = src(dictionary.properties);

                // This will take the SVG and convert it into Android Vector Drawable format
                androidVector({ assetBuildPath, name, svg, mode });
            });
    },

    undo: (dictionary, config) => {
        // no clean action
    }
}


/**
 * This function will generate an Android Vector Drawable
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a vector drawable. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.assetBuildPath - The build path for Android. This will be defined in the configuration
 * @param {String} options.mode - The current mode (light or dark) Style Dictionary is being run in.
 */
function androidVector({ assetBuildPath, svg, name, mode }) {
    // Android doesn't support high contrast modes
    if ([`hc`, `hcDark`].includes(mode)) {
        return;
    }

    const outputPath = mode === `dark` ?
        `${assetBuildPath}drawable-night/${name}.xml` :
        `${assetBuildPath}drawable/${name}.xml`;

    fs.ensureFileSync(outputPath);

    // s2v will generate an Android vector drawable file
    // from SVG. We are reusing the output already generated above.
    s2v(svg).then(xml => {
        setTimeout(() => null, 0); // forces node to not exit immediately
        fs.writeFileSync(outputPath, xml);
        console.log(`✔︎  ${outputPath}`);
    });
}
