# Changelog

## [10.0.2](https://github.com/Financial-Times/origami/compare/o-share-v10.0.1...o-share-v10.0.2) (2024-04-11)


### Bug Fixes

* tweak the `$system-code` error message to include a simple link ([cd41d7f](https://github.com/Financial-Times/origami/commit/cd41d7fb4d5044e031d006ae6e608d658bf93f17))

## [10.0.1](https://github.com/Financial-Times/origami/compare/o-share-v10.0.0...o-share-v10.0.1) (2023-10-27)


### Bug Fixes

* Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [10.0.0](https://github.com/Financial-Times/origami/compare/o-share-v9.0.2...o-share-v10.0.0) (2023-08-25)


### ⚠ BREAKING CHANGES

* Replace Twitter with X [OR-282] ([#1239](https://github.com/Financial-Times/origami/issues/1239))

### Features

* Replace Twitter with X [OR-282] ([#1239](https://github.com/Financial-Times/origami/issues/1239)) ([4561d0d](https://github.com/Financial-Times/origami/commit/4561d0d40dd2ae513f2a1de4eee7456e14d63b40))


### Bug Fixes

* update o-typography dependency  ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

### [9.0.2](https://www.github.com/Financial-Times/origami/compare/o-share-v9.0.1...o-share-v9.0.2) (2023-04-28)


### Bug Fixes

* Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [9.0.1](https://www.github.com/Financial-Times/origami/compare/o-share-v9.0.0...o-share-v9.0.1) (2023-01-20)


### Bug Fixes

* ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

## [9.0.0](https://www.github.com/Financial-Times/origami/compare/o-share-v8.3.2...o-share-v9.0.0) (2023-01-17)


### ⚠ BREAKING CHANGES

* remove javascript-initialised `o-share` component.
* replace `o-share` background-image icons with SVGs. We recommend following the [Migration Guide](https://github.com/Financial-Times/origami/blob/main/components/o-share/MIGRATION.md) to upgrade.


Version 9 has markup changes and component API got updated as well. New version relies less on javaScript and improves accessibility on high contrast mode. The most important updates are:
1. The icons are now inlined inside the templates, since this was our only known option to [fix an accessibility issue](https://github.com/Financial-Times/origami/issues/930) on high contrast mode devices.
2. Share link MUST be written in full markup instead of using js to automatically generate share.
3. New TSX template requires social icons to be passed as children.

### [8.3.2](https://www.github.com/Financial-Times/origami/compare/o-share-v8.3.1...o-share-v8.3.2) (2022-12-21)


### Bug Fixes

* require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [8.3.1](https://www.github.com/Financial-Times/origami/compare/o-share-v8.3.0...o-share-v8.3.1) (2022-12-15)


### Bug Fixes

* o-share, update input focus style with a double ring ([ae600b6](https://www.github.com/Financial-Times/origami/commit/ae600b6fa3a06d0edc8d3c565e41ef4737c60aa2))

## [8.3.0](https://www.github.com/Financial-Times/origami/compare/o-share-v8.2.2...o-share-v8.3.0) (2022-06-21)


### Features

* o-share demos for storybook ([#749](https://www.github.com/Financial-Times/origami/issues/749)) ([bbb6cef](https://www.github.com/Financial-Times/origami/commit/bbb6cef08b2575ab6449d93890ee5cdc392942b1))

### [8.2.2](https://www.github.com/Financial-Times/origami/compare/o-share-v8.2.1...o-share-v8.2.2) (2022-04-21)


### Bug Fixes

* Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [8.2.1](https://www.github.com/Financial-Times/origami/compare/o-share-v8.2.0...o-share-v8.2.1) (2022-01-13)


### Bug Fixes

* expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))
* use the o-share js render method for demos ([52307e8](https://www.github.com/Financial-Times/origami/commit/52307e83cd88a7da17bca608874d592d35a52532))

## [8.2.0](https://www.github.com/Financial-Times/origami/compare/o-share-v8.1.1...o-share-v8.2.0) (2021-11-24)


### Features

* allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [8.1.1](https://www.github.com/Financial-Times/origami/compare/o-share-v8.1.0...o-share-v8.1.1) (2021-11-08)


### Bug Fixes

* pin components to latest o-brand, or greater ([3a6ccea](https://www.github.com/Financial-Times/origami/commit/3a6ccea1e838e4a2003322ca1f855d0b87b26b60))

## [8.1.0](https://www.github.com/Financial-Times/origami/compare/o-share-v8.0.2...o-share-v8.1.0) (2021-11-08)


### Features

* Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))


### Bug Fixes

* remove last master brand references from components ([2594662](https://www.github.com/Financial-Times/origami/commit/2594662843811d3c56cd4a50bebffe9481486e91))

### [8.0.2](https://www.github.com/Financial-Times/origami/compare/o-share-v8.0.1...o-share-v8.0.2) (2021-11-02)


### Bug Fixes

* Update `o-brand` in components, replace "master" with "core" ([322617e](https://www.github.com/Financial-Times/origami/commit/322617ea80f30a6825d9c36872e05574b871ea82))

### [8.0.1](https://www.github.com/Financial-Times/origami/compare/o-share-v8.0.0...o-share-v8.0.1) (2021-09-21)


### Bug Fixes

* Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
* update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
* update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
