const fs = require('fs-extra');
const defaultStyleDictionary = require('./config/default-style-dictionary');
const darkModeStyleDictionary = require('./config/dark-mode-style-dictionary');
const buildPath = 'dist/'

console.log(`Removing previous build...`);
fs.removeSync(buildPath);

console.log(`☀️ Building light mode...`);
defaultStyleDictionary('core').buildAllPlatforms();

console.log(`\n\n🌙 Building dark mode...`);
darkModeStyleDictionary('core').buildAllPlatforms();

