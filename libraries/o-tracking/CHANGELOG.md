# Changelog

## [4.8.0](https://github.com/Financial-Times/origami/compare/o-tracking-v4.7.0...o-tracking-v4.8.0) (2025-06-02)


### Features

* (o-tracking) ci-2846  add custom to allowed tracking attributes for component-view ([a0023c3](https://github.com/Financial-Times/origami/commit/a0023c3e33e772df4fe9c6c7802f5ea1c0f926f3))


### Bug Fixes

* (session) allow up to a second for session to be created ([f2f1d6b](https://github.com/Financial-Times/origami/commit/f2f1d6bd2015b8b4f5b0b6771d5435961cc547ce))
* (session) ms differences between session time and current time ([ca5f0c7](https://github.com/Financial-Times/origami/commit/ca5f0c796de01c227afe302d4b4c9d9af98c4163))

## [4.7.0](https://github.com/Financial-Times/origami/compare/o-tracking-v4.6.1...o-tracking-v4.7.0) (2025-01-30)


### Features

* add a new opt to component-view to be able to configure the IntersectionObserver threshold ([6f4ed74](https://github.com/Financial-Times/origami/commit/6f4ed74db6ab1c241227c6ae6f2a920255dddc55))

## [4.6.1](https://github.com/Financial-Times/origami/compare/o-tracking-v4.6.0...o-tracking-v4.6.1) (2024-11-18)


### Bug Fixes

* correctly detect truly circular paths in JS objects, rather than objects with multiple references ([63f3c0a](https://github.com/Financial-Times/origami/commit/63f3c0a1d6e7fbd0b8734eb56df5c7ca568cb490))

## [4.6.0](https://github.com/Financial-Times/origami/compare/o-tracking-v4.5.4...o-tracking-v4.6.0) (2024-11-14)


### Features

* add timestamp to session generations in o-tracking ([37ed21f](https://github.com/Financial-Times/origami/commit/37ed21f8e75128e7fd9f52be86c5c744f4148479))

## [4.5.4](https://github.com/Financial-Times/origami/compare/o-tracking-v4.5.3...o-tracking-v4.5.4) (2024-05-01)


### Bug Fixes

* report correct o-tracking version ([#1623](https://github.com/Financial-Times/origami/issues/1623)) ([916da0f](https://github.com/Financial-Times/origami/commit/916da0fa262ed4ee5a05950a8b2a8facb8ee287d))

## [4.5.3](https://github.com/Financial-Times/origami/compare/o-tracking-v4.5.2...o-tracking-v4.5.3) (2024-04-30)


### Bug Fixes

* fix new session behavior for o-tracking ([16a798c](https://github.com/Financial-Times/origami/commit/16a798c8095329d94d46a180ad7076f109bfceaa))

## [4.5.2](https://github.com/Financial-Times/origami/compare/o-tracking-v4.5.1...o-tracking-v4.5.2) (2024-02-26)


### Bug Fixes

* Remove polyfill from component readme. ([78f9e1d](https://github.com/Financial-Times/origami/commit/78f9e1d49c1cdddeedb2cf6739a530cb4fe4f35c))

## [4.5.1](https://github.com/Financial-Times/origami/compare/o-tracking-v4.5.0...o-tracking-v4.5.1) (2023-10-27)


### Bug Fixes

* Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [4.5.0](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.4.0...o-tracking-v4.5.0) (2022-11-14)


### Features

* publish o-tracking support for nested JSON-like property values via data-trackable-context-* ([#886](https://www.github.com/Financial-Times/origami/issues/886)) ([daf2eb9](https://www.github.com/Financial-Times/origami/commit/daf2eb9abd0576ae74cd5f17f1f98a527c2955a2))

## [4.4.0](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.3.2...o-tracking-v4.4.0) (2022-07-12)


### Features

* o-tracking, add test mode minus debug logs ([fcea526](https://www.github.com/Financial-Times/origami/commit/fcea526f883ce422e5cd48f7b318242afa7fced8))

### [4.3.2](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.3.1...o-tracking-v4.3.2) (2022-04-21)


### Bug Fixes

* Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [4.3.1](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.3.0...o-tracking-v4.3.1) (2022-04-20)


### Bug Fixes

* update o-tracking origami.json with new owner ([#707](https://www.github.com/Financial-Times/origami/issues/707)) ([70fd495](https://www.github.com/Financial-Times/origami/commit/70fd4953f4c23a3f91109d1828cb32955b4b4ff0))

## [4.3.0](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.2.2...o-tracking-v4.3.0) (2022-03-25)


### Features

* add ability to force o-tracking to use a queue ([f41d632](https://www.github.com/Financial-Times/origami/commit/f41d6322ef4f0bfda6d93f94fea17533f9923048))

### [4.2.2](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.2.1...o-tracking-v4.2.2) (2022-03-24)


### Bug Fixes

* add test runner to o-tracking so that the tests can run ([e41645a](https://www.github.com/Financial-Times/origami/commit/e41645aebba19eef73ba3a0260dc7b90fa16ab5a))

### [4.2.1](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.2.0...o-tracking-v4.2.1) (2022-01-13)


### Bug Fixes

* expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))
* expand all uses of spec to specification ([e93de37](https://www.github.com/Financial-Times/origami/commit/e93de3789c3a0ae8b2737ab9d9e9e63b294e8f65))

## [4.2.0](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.1.3...o-tracking-v4.2.0) (2021-11-24)


### Features

* allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [4.1.3](https://www.github.com/Financial-Times/origami/compare/o-tracking-v4.1.2...o-tracking-v4.1.3) (2021-09-21)


### Bug Fixes

* update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
* update origami.json support url ([512149c](https://www.github.com/Financial-Times/origami/commit/512149c735c58740f774d4d3c69a32bf26c74961))
* update urls in libraries ([39cca8c](https://www.github.com/Financial-Times/origami/commit/39cca8cf3c6704453f49f819b8db5455452a8e33))
* use libraries label for the libraries ([4ce58a3](https://www.github.com/Financial-Times/origami/commit/4ce58a365f2d4ff085f1d829b197f21ec440e1df))
