const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const buildPath = 'dist/'
const webPath = `${buildPath}/web/`
const iosPath = `${buildPath}/ios/`
const androidPath = `${buildPath}/android/styledictionary/src/main/res/`;

console.log(`removing previous build...`);
fs.removeSync(buildPath);

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({
  // custom actions
  action: {
    generateColorsets: require('./actions/ios/colorsets.js'),
    generateGraphics: require('./actions/generateGraphics'),
    generateWebGraphics: require('./actions/generateWebGraphics'),
  },
  // custom transforms
  transform: {
    'attribute/cti': require('./transforms/attributeCTI'),
    'colorRGB': require('./transforms/colorRGB'),
    'size/remToFloat': require('./transforms/remToFloat')
  },
  // custom formats
  format: {
    swiftColor: require('./formats/swiftColor'),
    swiftImage: require('./formats/swiftImage'),
  },
});

const modes = [`light`, `dark`];

// @todo, probably don't want to swap rem to float for web assets? E.g. stroke of an svg
const assets = {
  transforms: [`attribute/cti`, `color/hex`, `size/remToFloat`, `name/ti/camel`],
  buildPath: `${webPath}/images/`,
  iosPath,
  androidPath,
  actions: [`generateGraphics`]
};


const iosColors = {
  buildPath: iosPath,
  transforms: [`attribute/cti`, `colorRGB`, `name/ti/camel`],
  actions: [`generateColorsets`]
};

console.log(`building light mode...`);
styleDictionary.extend({
  source: [
    // this is saying find any files in the tokens folder
    // that does not have .dark or .light, but ends in .js
    `tokens/**/!(*.${modes.join(`|*.`)}).js`
  ],

  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      actions: [`generateWebGraphics`],
      files: [{
        destination: `variables.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      }]
    },

    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `tokens.json`,
        format: `json/flat`
      }]
    },

    iOS: {
      buildPath: iosPath,
      transforms: [`attribute/cti`, `name/ti/camel`, `size/swift/remToCGFloat`],
      files: [{
        destination: `Color.swift`,
        format: `swiftColor`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          outputReferences: true
        }
      }, {
        destination: `Size.swift`,
        filter: (token) => token.attributes.category === `size`,
        className: `Size`,
        format: `ios-swift/class.swift`
      }, {
        destination: `Image.swift`,
        filter: (token) => token.attributes.category === `image`,
        format: `swiftImage`
      }]
    },

    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values/colors.xml`,
        format: `android/resources`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          outputReferences: true
        },
      }, {
        destination: `values/font_dimens.xml`,
        filter: (token) => token.attributes.category === `size` &&
          token.attributes.type === `font`,
        format: `android/resources`
      }, {
        destination: `values/dimens.xml`,
        filter: (token) => token.attributes.category === `size` &&
          token.attributes.type !== `font`,
        format: `android/resources`
      }]
    },

    iosColors: Object.assign(iosColors, {
      mode: `light`
    }),

    assets: Object.assign(assets, {
      mode: `light`
    }),
  }
}).buildAllPlatforms();


// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary.extend({
  // Using the include array so that theme token overrides don't show
  // warnings in the console.
  include: [
    `tokens/**/!(*.${modes.join(`|*.`)}).js`
  ],
  source: [
    `tokens/**/*.dark.js`
  ],
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables-dark.css`,
        format: `css/variables`,
        // only putting in the tokens from files with '.dark' in the filepath
        filter: (token) => token.filePath.indexOf(`.dark`) > -1,
        options: {
          outputReferences: true
        }
      }]
    },

    iosColors: Object.assign(iosColors, {
      mode: `dark`
    }),

    assets: Object.assign(assets, {
      mode: `dark`
    }),

    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values-night/colors.xml`,
        format: `android/resources`,
        // only outputting the tokens from files with '.dark' in the filepath
        filter: (token) => token.filePath.indexOf(`.dark`) > -1
      }]
    }
  }
}).buildAllPlatforms();

