# Changelog

## [8.0.0](https://github.com/Financial-Times/origami/compare/o-expander-v7.0.0...o-expander-v8.0.0) (2025-02-20)


### ⚠ BREAKING CHANGES

* 2025 o3 migration release, README/MIGRATION updates. ([#1970](https://github.com/Financial-Times/origami/issues/1970))

### Features

* 2025 o3 migration release, README/MIGRATION updates. ([#1970](https://github.com/Financial-Times/origami/issues/1970)) ([3be858a](https://github.com/Financial-Times/origami/commit/3be858a81a79c3f92c4dff8b4aab5c95b600c7ee))

## [7.0.0](https://github.com/Financial-Times/origami/compare/o-expander-v6.3.1...o-expander-v7.0.0) (2025-02-20)

### ⚠ BREAKING CHANGES

This introduces a new design language and visually breaking changes. Including mobile optimised typography, icons, and buttons (see [MIGRATION.md](./MIGRATION.md)).

#### Origami 3: Principles, Purpose, and Impact

For anyone in P&T. We covered what’s new in Origami 3 (o3), why it matters, and what’s next.

[Slides](https://docs.google.com/presentation/d/1Qs8RHpMrDxxP5LyrVlnsUHnS3AriRK5-IboUeneRyMs/edit#slide=id.g764506c38c_0_357) | [Recording](https://drive.google.com/file/d/1OMW9zdTOEUvWyW1trsFqL3XhpTejYelO/view)

#### Origami 3: Bridging design & code

For designers and engineers alike. How to work with design guidelines, design foundations, and techniques for designer–engineer collaboration.

[Slides](https://docs.google.com/presentation/d/1pGBKFNv-g8RbY2g3SJ7v823XBI-MQqpjHrdgg9B6bzI/edit#slide=id.g764506c38c_0_357) | [Recording](https://drive.google.com/file/d/14hWVKM690arNEWROPHx9gmebnOUa6wlM/view)

#### Origami 3: Engineers’ Deep Dive

We got into the technical detail. Working with Origami CSS (no more Sass), custom elements, JSX templates, etc.

[Slides](https://docs.google.com/presentation/d/1s1S959CwZYnd0Q89EhsDFLFUuy2HZ9UnpBVaDHDFX7A/edit#slide=id.g3347c4befb5_0_402) | [Recording](https://drive.google.com/file/d/1hDtSN8Ce_P0Vr_dv0KXuXhs5Q9aHfvAp/view)

## [6.3.1](https://github.com/Financial-Times/origami/compare/o-expander-v6.3.0...o-expander-v6.3.1) (2024-04-16)

### Bug Fixes

- fix bug in expander tsx template ([#1563](https://github.com/Financial-Times/origami/issues/1563)) ([f3d2821](https://github.com/Financial-Times/origami/commit/f3d28213ec5cb0e25eedf162578d06d26b3c0949))

## [6.3.0](https://github.com/Financial-Times/origami/compare/o-expander-v6.2.7...o-expander-v6.3.0) (2024-04-12)

### Features

- Do not initialise expanders twice, to support nested expanders ([pr](https://github.com/Financial-Times/origami/pull/1528))

## [6.2.7](https://github.com/Financial-Times/origami/compare/o-expander-v6.2.6...o-expander-v6.2.7) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

### [6.2.6](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.5...o-expander-v6.2.6) (2023-01-20)

### Bug Fixes

- ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

### [6.2.5](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.4...o-expander-v6.2.5) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [6.2.4](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.3...o-expander-v6.2.4) (2022-10-13)

### Bug Fixes

- o-expander, advertise where content is added to screen reader users ([a2e75a7](https://www.github.com/Financial-Times/origami/commit/a2e75a7422e8c7b56b4ac3482c874f20116a9b3b))

### [6.2.3](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.2...o-expander-v6.2.3) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [6.2.2](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.1...o-expander-v6.2.2) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

### [6.2.1](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.2.0...o-expander-v6.2.1) (2022-01-07)

### Bug Fixes

- support ie11 in the demo by adding Element.prototype.matches to list of required browser features ([3f63474](https://www.github.com/Financial-Times/origami/commit/3f63474321681268b5dfe627f2b06f6564cd0c9a))

## [6.2.0](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.1.0...o-expander-v6.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

## [6.1.0](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.0.1...o-expander-v6.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [6.0.1](https://www.github.com/Financial-Times/origami/compare/o-expander-v6.0.0...o-expander-v6.0.1) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
