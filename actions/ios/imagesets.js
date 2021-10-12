const fs = require('fs-extra');
const sharp = require('sharp');
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
                const src = template(fs.readFileSync(value));

                // Generate the final SVG output by passing in the dictionary
                // to resolve the references. `svg` is the finished SVG string
                // that can now be written to a file or passed to other functions
                // to translate it to a PNG or Android Vector Drawable
                const svg = src(dictionary.properties);

                // This will take the SVG and convert it to a PNG and create the metadata
                // for an iOS imageset
                generateImageset({ assetBuildPath, name, svg, mode });
            });
    },

    undo: (dictionary, config) => {
        // no clean action
    }
}


/**
 * This function will generate an imageset for iOS
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a PNG. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.assetBuildPath - The build path for iOS. This will be defined in the configuration
 * @param {String} options.mode - The current mode (light or dark) Style Dictionary is building in.
 */
function generateImageset({ svg, name, assetBuildPath, mode }) {
    const outputPath = `${assetBuildPath}StyleDictionary.xcassets/${name}.imageset`;
    fs.ensureDirSync(outputPath);

    // The imageset might already exist because Style Dictionary is run multiple
    // times with different configurations. If the imageset already exists we want
    // to modify it rather than writing over it.
    const imageset = fs.existsSync(`${outputPath}/Contents.json`) ?
        fs.readJsonSync(`${outputPath}/Contents.json`) :
        {
            "info": {
                "author": "xcode",
                "version": 1
            },
            "images": []
        }

    let filename = `img.png`;
    let image = {
        idiom: `universal`
    };

    if (mode === `dark`) {
        filename = `img-dark.png`;
        image.appearances = [{
            appearance: "luminosity",
            value: "dark"
        }];
    }

    if (mode === `hc`) {
        filename = `img-hc.png`;
        image.appearances = [{
            appearance: "contrast",
            value: "high"
        }];
    }

    if (mode === `hcDark`) {
        filename = `img-hc-dark.png`;
        image.appearances = [{
            appearance: "luminosity",
            value: "dark"
        }, {
            appearance: "contrast",
            value: "high"
        }];
    }

    // Add the image to the images array of the imageset object.
    image.filename = filename;
    imageset.images.push(image);

    // Here we are using the sharp library for image processing that will take
    // the SVG content and render it as a PNG
    // https://sharp.pixelplumbing.com/api-constructor
    sharp(Buffer.from(svg, `utf-8`), { density: 300 })
        .toFile(`${outputPath}/${filename}`, (err) => {
            if (!err) {
                console.log(`✔︎  ${outputPath}/${filename}`);
            } else {
                console.log(err);
            }
        });

    // Lastly, write the Contents.json file with the updated content
    fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
}
