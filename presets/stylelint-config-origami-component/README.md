# stylelint-config-origami-component

This is [Stylelint](https://stylelint.io/) configuration which helps catch bugs and ensure consistency between Origami component Sass.

_See [eslint-config-origami-component](https://github.com/Financial-Times/eslint-config-origami-component) for rules to lint component JavaScript._

## Usage

Install as a development dependency:

`npm install stylelint-config-origami-component --save-dev`


And extend the rules in our [Stylelint configuration](https://stylelint.io/user-guide/configure#extends). For example in `.stylelintrc.js`:
```
module.exports = {
    "extends": "stylelint-config-origami-component"
};
```
