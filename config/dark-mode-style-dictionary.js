const StyleDictionary = require('style-dictionary');

const buildPath = 'dist/'
const webPath = `${buildPath}/web/`
const iosPath = `${buildPath}/ios/`
const androidPath = `${buildPath}/android/styledictionary/src/main/res/`;

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({
    // custom actions
    action: {
        generateColorsets: require('../actions/ios/colorsets.js'),
        generateIosGraphics: require('../actions/ios/imagesets'),
        generateAndroidGraphics: require('../actions/android/vector'),
        generateWebGraphics: require('../actions/web/svg-images')
    },
    // custom transforms
    transform: {
        'attribute/cti': require('../transforms/attributeCTI'),
        'colorRGB': require('../transforms/colorRGB'),
    },
});


const mode = 'dark';
module.exports = (brand) => {
    return styleDictionary.extend({
        include: [
            `tokens/brands/${brand}/**/!(*.${mode}).js`
        ],
        source: [
            `tokens/brands/${brand}/**/*.${mode}.js`
        ],
        platforms: {
            css: {
                transformGroup: `css`,
                buildPath: webPath,
                assetBuildPath: `${webPath}/images/`,
                actions: ['generateWebGraphics'],
                files: [{
                    destination: `variables-${mode}.css`,
                    format: `css/variables`,
                    // only putting in the tokens from files with '.mode' (e.g. `.dark`) in the filepath
                    filter: (token) => token.filePath.indexOf(`.${mode}`) > -1,
                    options: {
                        outputReferences: true
                    }
                }],
                mode
            },

            ios: {
                buildPath: iosPath,
                transforms: [`attribute/cti`, `name/ti/camel`, `colorRGB`, `size/swift/remToCGFloat`],
                actions: [`generateColorsets`],
                mode
            },

            iosAssets: {
                transforms: [`attribute/cti`, `color/hex`, `size/remToPx`, `name/ti/camel`],
                actions: [`generateIosGraphics`],
                assetBuildPath: iosPath,
                mode
            },

            android: {
                transformGroup: `android`,
                buildPath: androidPath,
                files: [{
                    destination: `values-night/colors.xml`,
                    format: `android/resources`,
                    // only outputting the tokens from files with '.mode' (e.g. `.dark`) in the filepath
                    filter: (token) => token.filePath.indexOf(`.${mode}`) > -1
                }],
                mode
            },

            androidAssets: {
                transforms: [`attribute/cti`, `color/hex`, `size/remToPx`, `name/ti/camel`],
                actions: [`generateAndroidGraphics`],
                assetBuildPath: androidPath,
                mode
            }
        }
    })
};
