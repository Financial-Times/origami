# Changelog

## [7.0.1](https://github.com/Financial-Times/origami/compare/o-cookie-message-v7.0.0...o-cookie-message-v7.0.1) (2025-02-26)


### Bug Fixes

* Remove unused o-buttons reference ([1be12a8](https://github.com/Financial-Times/origami/commit/1be12a809a44421541412363671445477454656a))

## [7.0.0](https://github.com/Financial-Times/origami/compare/o-cookie-message-v6.7.1...o-cookie-message-v7.0.0) (2025-02-20)

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

## [6.7.1](https://github.com/Financial-Times/origami/compare/o-cookie-message-v6.7.0...o-cookie-message-v6.7.1) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [6.7.0](https://github.com/Financial-Times/origami/compare/o-cookie-message-v6.6.1...o-cookie-message-v6.7.0) (2023-10-05)

### Features

- Prevent cookie message copy displaying on Search Engine Results Pages (SERPS). This only applies to imperative use of o-cookie-message. If your project copy-pastes markup to support an experience without JavaScript, set the `data-nosnippet` on the root cookie message element. ([081b1f2](https://github.com/Financial-Times/origami/commit/081b1f2e32a0b33b1926054b1005832f5ab22996))

## [6.6.1](https://github.com/Financial-Times/origami/compare/o-cookie-message-v6.6.0...o-cookie-message-v6.6.1) (2023-08-25)

### Bug Fixes

- update o-typography dependency ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

## [6.6.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.5.2...o-cookie-message-v6.6.0) (2023-07-20)

### Features

- o-cookie-message, publish tsx template ([#1199](https://www.github.com/Financial-Times/origami/issues/1199)) ([7052fe3](https://www.github.com/Financial-Times/origami/commit/7052fe34bef7f96ed867dc79409522fb29a22017))

### [6.5.2](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.5.1...o-cookie-message-v6.5.2) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [6.5.1](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.5.0...o-cookie-message-v6.5.1) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

## [6.5.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.4.3...o-cookie-message-v6.5.0) (2022-10-31)

### Features

- make cookie banner content scrollable ([pr 867](https://github.com/Financial-Times/origami/pull/867))

### Bug Fixes

- update missed cookie message CTA copy with context, "accept cookies" rather than "accept & continue" ([pr 867](https://github.com/Financial-Times/origami/pull/867))

### [6.4.3](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.4.2...o-cookie-message-v6.4.3) (2022-08-31)

### Bug Fixes

- o-cookie-message, fix tab order ([1ffc599](https://www.github.com/Financial-Times/origami/commit/1ffc5998e67f53a139324e101d4394bcf86c0ae8))

### [6.4.2](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.4.1...o-cookie-message-v6.4.2) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [6.4.1](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.4.0...o-cookie-message-v6.4.1) (2022-02-16)

### Bug Fixes

- remove icon for external links ([da7ea84](https://www.github.com/Financial-Times/origami/commit/da7ea8441f16db163e4459183d263cefea40e6b6))

## [6.4.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.3.1...o-cookie-message-v6.4.0) (2022-02-09)

### Features

- Allow configuring the path to the manage cookies page ([ccb99a9](https://www.github.com/Financial-Times/origami/commit/ccb99a9a377fd05f07f923daaa139b9899065544))

### [6.3.1](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.3.0...o-cookie-message-v6.3.1) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

## [6.3.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.2.2...o-cookie-message-v6.3.0) (2022-01-11)

### Features

- add cookie message destroy method ([c39b36d](https://www.github.com/Financial-Times/origami/commit/c39b36d1f99031e151b413904ebd90146e22a47f))
- add o-cookie-message Storybook Story ([8d4e9d6](https://www.github.com/Financial-Times/origami/commit/8d4e9d6837bd15508258e7f2f1bfbc3e50bb8840))

### [6.2.2](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.2.1...o-cookie-message-v6.2.2) (2022-01-06)

### Bug Fixes

- support ie11 in the demo by adding object.assign to list of required browser features ([b997fe3](https://www.github.com/Financial-Times/origami/commit/b997fe378aaa512aa21579cce33390f4d407ee39))

### [6.2.1](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.2.0...o-cookie-message-v6.2.1) (2021-12-24)

### Bug Fixes

- add missing dialog name to the custom-html-full demo ([0ca6bd2](https://www.github.com/Financial-Times/origami/commit/0ca6bd21ab5b8fd1d341c77c2b8cb841253a4ce1))

## [6.2.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.1.0...o-cookie-message-v6.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

## [6.1.0](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.0.2...o-cookie-message-v6.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [6.0.2](https://www.github.com/Financial-Times/origami/compare/o-cookie-message-v6.0.1...o-cookie-message-v6.0.2) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
