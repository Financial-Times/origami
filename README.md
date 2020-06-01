# remark-preset-lint-origami-component-readme

remark preset to configure `remark-lint` with settings that enforce the rules
and suggestions in the [origami component specification](https://origami.ft.com/spec/v1/components/#readme).

## installation

```sh
npm install remark-preset-lint-origami-component-readme
```

## use

You can use it by adding it to the plugins in a `.remarkrc.js` file in the root of your component:

```js
module.exports.plugins = [require("remark-preset-lint-origami-component")]
```

Or use it directly through [the remark cli](https://github.com/remarkjs/remark/tree/master/packages/remark-cli):

```sh
remark -u preset-lint-consistent README.md
```
