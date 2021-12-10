# Migration Guides

## Migrating from v10 to v11

obt no longer supports bower, it now only supports npm.

The `--ignore-bower` flag has been removed.

Installing bower dependencies has been removed.

Bundling/Compiling code which uses bower dependencies is no longer supported.

`obt test` no longer runs `npm test`, this is to allow `obt test` to be a command within the components `npm test` script.

`obt verify` linting enforces fewer configuration options. Ignore patterns must now be configured for each component by creating `.eslintignore` and `.stylelintignore` files, with content that includes `demos/local/**` and any other file patterns which do not need to be linted. `node_modules` is ignored by default.

node-sass support has been removed, obt will no longer test the component sass can compile with node-sass.

Component lint configuration must be renamed to use the CommonJS extension `.eslintrc.js` becomes `.eslintrc.cjs`, `.stylelintrc.js` becomes `.stylelintrc.cjs`, `.remarkrc.js` becomes `.remarkrc.cjs`.

## Migrating from v9 to v10
The following `demo` command flags have been removed and replaced with the `develop` (`dev`) command:
- Removed the `--watch` flag.
- Removed the `--run-server` flag.

```diff
-obt demo --watch --run-server
+obt dev
```

JavaScript and Sass is compiled to the [recommended directory structure](https://origami.ft.com/spec/v1/components/#files-and-folder-structure). The flags to customise this have been removed from origami-build-tools:
- Removed the `--js` flag.
- Removed the `--sass` flag.
- Removed the `--build-js` flag.
- Removed the `--build-css` flag.
- Removed the `--build-folder` flag.

All logs are now output from Sass compilation by default. The `verbose` flag has been removed:
- Removed the `--verbose` flag.

In addition, the following flags have been removed:
- `--standalone`. It is no longer possible to specify a named export for the built JavaScript
- `--suppress-errors`. OBT no longer throws an error if their are no demos to be built if passed the `--demo-filter` flag.

The `obt build` command has been removed.

Other changes include:
- NodeJS v10 is no longer supported. Use NodeJS v12 or above.
- A default CommonJs export now maps to `module.exports.default`, the default [Babel](https://babeljs.io/) behaviour. If using `require` to include a default CommonJs export add a `.default` property to the `require` call. Alternatively update your project to use [ECMAScript Module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- The deprecated [scss-lint](https://github.com/sasstools/sass-lint) package has been replaced with [stylelint](https://github.com/stylelint/stylelint). Your component may fail the verify check and require Sass updates, including:
	- If your component uses Sass comments to temporarily disable linting (e.g. `// sass-lint:disable`) replace these with the [equivalent stylelint-disable comment for stylelint](https://stylelint.io/user-guide/ignore-code).
	- Components by default must be indented with tabs, unless configured otherwise.
	- Empty blocks will now error `.nothing-here {}`
	- Duplicate `@import` statements will throw an error
	- Extra semicolons will throw an error


## Migrating from v8 to v9
- NodeJS v8 is no longer supported. Use NodeJS v10 or above.
- [Dart Sass](https://github.com/sass/dart-sass), the reference implementation of Sass, is used instead of [Node Sass](https://github.com/sass/node-sass). You may need to update your Sass to be compatible with Dart Sass if an error is thrown during build.


## Migrating from v7 to v8

OBT no longer supports NodeJS v6 because it uses async functions. To use this version of OBT, you will need NodeJS v8 or above.


## Migrating from v6 to v7

The ability to use OBT via it's programmatic API has been removed, if you were using OBT via `gulp`, you will need to migrate to the command line version of OBT.
OBT has removed the ability to configure the way it installs/builds/verifies code, this is to ensure that systems built with OBT follows the Origami specification and conventions.



## Migrating from v5 to v6

### OBT build
The 6.0.0 release removes the ability for OBT to include the Babel/Core-JS polyfills in the built Javascript. If you are relying on this feature, we recommend that you use the [Polyfill service](https://polyfill.io) instead.


### OBT verify
The 6.0.0 release swapped out [`scss-lint`](https://www.npmjs.com/package/gulp-scss-lint) for [`sass-lint`](https://www.npmjs.com/package/gulp-sass-lint).

If you are supplying your own custom scss-lint configuration you need to convert it to an equivalent sass-lint configuration, [here is a tool which can do this for you](https://sasstools.github.io/make-sass-lint-config/). The programatic API and CLI flag has also changed from `scssLintPath` to `sassLintPath`.
