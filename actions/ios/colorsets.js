
const fs = require('fs-extra');

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions.
 */
module.exports = {
    // This is going to run once per theme.
    do: (dictionary, platform) => {
        const assetPath = `${platform.buildPath}/StyleDictionary.xcassets`;
        fs.ensureDirSync(assetPath)
        fs.writeFileSync(`${assetPath}/Contents.json`, JSON.stringify({
            "info": {
                "author": "xcode",
                "version": 1
            }
        }, null, 2));

        dictionary.allProperties
            .filter(token => token.attributes.category === `color`)
            .forEach(token => {
                const colorsetPath = `${assetPath}/${token.name}.colorset`;
                fs.ensureDirSync(colorsetPath);

                // The colorset might already exist because Style Dictionary is run multiple
                // times with different configurations. If the colorset already exists we want
                // to modify it rather than writing over it.
                const colorset = fs.existsSync(`${colorsetPath}/Contents.json`) ?
                    fs.readJsonSync(`${colorsetPath}/Contents.json`) :
                    {
                        info: {
                            "author": "xcode",
                            "version": 1
                        },
                        colors: []
                    }

                const color = {
                    idiom: 'universal',
                    color: {
                        'color-space': `srgb`,
                        components: token.value
                    }
                };

                if (platform.mode === `dark`) {
                    color.appearances = [{
                        appearance: "luminosity",
                        value: "dark"
                    }];
                }

                if (platform.mode === `hc`) {
                    color.appearances = [{
                        appearance: "contrast",
                        value: "high"
                    }];
                }

                if (platform.mode === `hcDark`) {
                    color.appearances = [{
                        appearance: "luminosity",
                        value: "dark"
                    }, {
                        appearance: "contrast",
                        value: "high"
                    }];
                }

                colorset.colors.push(color);

                fs.writeFileSync(`${colorsetPath}/Contents.json`, JSON.stringify(colorset, null, 2));
            });
    },
    undo: function (dictionary, platform) {
        // no undo
    }
}
