# Changelog

## [10.0.2](https://github.com/Financial-Times/origami/compare/o-forms-v10.0.1...o-forms-v10.0.2) (2025-04-16)


### Bug Fixes

* o-forms theme issue ([159797d](https://github.com/Financial-Times/origami/commit/159797d5a9945426b2c14e6846d9f72c194e1cdb))
* update ORIGAMI_STORYBOOK_BRAND to STORYBOOK_BRAND ([e5bed4a](https://github.com/Financial-Times/origami/commit/e5bed4a3988e10cbae4384cfda573cb295b3d238))

## [10.0.1](https://github.com/Financial-Times/origami/compare/o-forms-v10.0.0...o-forms-v10.0.1) (2025-02-26)


### Bug Fixes

* Remove unused o-buttons reference ([1be12a8](https://github.com/Financial-Times/origami/commit/1be12a809a44421541412363671445477454656a))
* Remove unused o-icons iSass imports ([e8b105f](https://github.com/Financial-Times/origami/commit/e8b105fa887fbc50e5030fb1f398989df290046b))

## [10.0.0](https://github.com/Financial-Times/origami/compare/o-forms-v9.12.1...o-forms-v10.0.0) (2025-02-20)

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

## [9.12.1](https://github.com/Financial-Times/origami/compare/o-forms-v9.12.0...o-forms-v9.12.1) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [9.12.0](https://github.com/Financial-Times/origami/compare/o-forms-v9.11.3...o-forms-v9.12.0) (2023-09-12)

### Features

- o-forms, add ft-live subbrand to o-forms ([f2ae032](https://github.com/Financial-Times/origami/commit/f2ae03292819f738aabc61b52d1a18287da7ea4d))
- o-forms, fix focus state for professional-inverse ([1446d63](https://github.com/Financial-Times/origami/commit/1446d63d1b8190bc739920c81eb7e04a81a47d5d))

## [9.11.3](https://github.com/Financial-Times/origami/compare/o-forms-v9.11.2...o-forms-v9.11.3) (2023-08-25)

### Bug Fixes

- update o-typography dependency ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

### [9.11.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.11.1...o-forms-v9.11.2) (2023-07-20)

### Bug Fixes

- trigger release to rollback o-forms docs ([258d573](https://www.github.com/Financial-Times/origami/commit/258d5736452f9802691733175e0d1254cab36409))

### [9.11.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.11.0...o-forms-v9.11.1) (2023-07-14)

### Bug Fixes

- migrate date input design docs to its Origami readme ([372b435](https://www.github.com/Financial-Times/origami/commit/372b435f44435b3e0f59de1e023ca0cdab0b10e9))
- migrate o-checkbox design docs to its Origami readme ([7275af2](https://www.github.com/Financial-Times/origami/commit/7275af2600430a72e2f61bc6fc8b84792b01e266))
- migrate radio input designer docs to readme ([2866714](https://www.github.com/Financial-Times/origami/commit/2866714a4b7e54aac4486f62a9d5e96b8c245cf0))
- migrate select box designer docs to readme ([47f88ad](https://www.github.com/Financial-Times/origami/commit/47f88ad9a82966e2d59e44715b336854960d0196))
- migrate text input designer docs to readme ([4c83605](https://www.github.com/Financial-Times/origami/commit/4c836052a5bd0fb8457252b5ce20cb260b6b9b4c))
- use correct link ([a6b5aa2](https://www.github.com/Financial-Times/origami/commit/a6b5aa2f64889855cc91b2f17338097518b63e5e))

## [9.11.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.10.0...o-forms-v9.11.0) (2023-05-30)

### Features

- apply invalid input styles to inputs without browser validation ([a81824d](https://www.github.com/Financial-Times/origami/commit/a81824daa81622ba109b92e888e2e5f7f5ce414a))

### Bug Fixes

- fix how we render storybook select labels. Remove empty string as a key and instead use undefined. ([dc95f8f](https://www.github.com/Financial-Times/origami/commit/dc95f8f42941463899d7f143c679b01d67ea024b))

## [9.10.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.9.2...o-forms-v9.10.0) (2023-05-18)

### Features

- o-forms box style radio, add professional themes ([b205f7e](https://www.github.com/Financial-Times/origami/commit/b205f7ecfca1e7166d3b04ba54c674f162ea6a70))

### [9.9.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.9.1...o-forms-v9.9.2) (2023-05-09)

### Bug Fixes

- o-forms, do not error when no themes given to primary mixin ([#1106](https://www.github.com/Financial-Times/origami/issues/1106)) ([32834fc](https://www.github.com/Financial-Times/origami/commit/32834fc62776e046d003ce1c66c5745b0417c65e))

### [9.9.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.9.0...o-forms-v9.9.1) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

## [9.9.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.8.0...o-forms-v9.9.0) (2023-04-28)

### Features

- add professional inverse theme for chekcboxes ([#1091](https://www.github.com/Financial-Times/origami/issues/1091)) ([4bd9a3e](https://www.github.com/Financial-Times/origami/commit/4bd9a3ee993577a8a46f861235a208545329c678))
- add professional theme for checkboxes ([#1089](https://www.github.com/Financial-Times/origami/issues/1089)) ([2848c27](https://www.github.com/Financial-Times/origami/commit/2848c27a4fdc9e2f8e624c9938009991192ae9a6))
- o-forms, add FT Professional themes for round radio buttons ([a2ec0ec](https://www.github.com/Financial-Times/origami/commit/a2ec0ecbb21fbe6c8ab788d05cb02e1e54c099fa))

## [9.8.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.7.2...o-forms-v9.8.0) (2023-04-20)

### Features

- publish tsx templates ([551dcc8](https://www.github.com/Financial-Times/origami/commit/551dcc8d1e98750a343d2a2b320d09f16507afa1))

### [9.7.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.7.1...o-forms-v9.7.2) (2023-04-11)

### Bug Fixes

- o-forms, deprecate pseudo-radio-link. ([fa297c4](https://www.github.com/Financial-Times/origami/commit/fa297c4ca746d397075245f71e36c41c1fdefacf))
- o-forms, remove valid state ([7ea9884](https://www.github.com/Financial-Times/origami/commit/7ea9884c0db7ba285b5589d4a2f4adbe509a17fe))

### [9.7.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.7.0...o-forms-v9.7.1) (2023-03-31)

### Bug Fixes

- require correct o-utils version ([5a18f37](https://www.github.com/Financial-Times/origami/commit/5a18f377ede852ed0b0c35707f69bfdb9537763c))

## [9.7.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.6.0...o-forms-v9.7.0) (2023-03-30)

### Features

- Adds a `GenericInput` TSX template, to use custom form inputs within o-forms field styles which includes labels and spacing.

## [9.6.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.5.0...o-forms-v9.6.0) (2023-02-24)

### Features

- o-forms, allow submit events to be intercepted ([#1025](https://www.github.com/Financial-Times/origami/issues/1025)) ([3e4e93a](https://www.github.com/Financial-Times/origami/commit/3e4e93a4425f262685e589249c7f66a6a1d1cbd2))

## [9.5.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.9...o-forms-v9.5.0) (2023-01-24)

### Features

- introduces o-forms TSX components:
  - Checkboxes
  - DateInput
  - FileInput
  - Form
  - RadioBoxLinks
  - RadioBtns
  - Select
  - TextInput

### Bug Fixes

- added saved controls to only one component ([98b6e14](https://www.github.com/Financial-Times/origami/commit/98b6e146be627195c592a28600c45820194c4694))
- corected typos, added roles to span elements and sorted the checked issue ([98a954c](https://www.github.com/Financial-Times/origami/commit/98a954c66edd7e969c10dc6551bc3aef98c3d755))
- formatted codes to increase readability ([6ac744a](https://www.github.com/Financial-Times/origami/commit/6ac744a6efd54f1953d6ee725e4087db820e1562))
- reduced stories and added controls to manipulate stories over storybook ([96661b4](https://www.github.com/Financial-Times/origami/commit/96661b4ba5ab741c524d34ee357e9039b7fb4641))
- removed saved control from unnecessary components ([0aaf802](https://www.github.com/Financial-Times/origami/commit/0aaf802aae9673777ca580330db7df45a213eff7))
- small syntax change ([c57392d](https://www.github.com/Financial-Times/origami/commit/c57392dac240f5d41b31e93103320c517b6cba6a))

### [9.4.9](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.8...o-forms-v9.4.9) (2023-01-20)

### Bug Fixes

- ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

### [9.4.8](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.7...o-forms-v9.4.8) (2023-01-04)

### Bug Fixes

- show focus state on invalid input elements ([470957a](https://www.github.com/Financial-Times/origami/commit/470957ad60fc9688541c13be5607a21ee5286d96))

### [9.4.7](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.6...o-forms-v9.4.7) (2022-12-21)

### Bug Fixes

- require o-normalise 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [9.4.6](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.5...o-forms-v9.4.6) (2022-12-15)

### Bug Fixes

- o-forms, update input focus style with a double ring ([a8a37d9](https://www.github.com/Financial-Times/origami/commit/a8a37d9e62af85672093780691b5d510c0d741a1))

### [9.4.5](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.4...o-forms-v9.4.5) (2022-12-15)

### Bug Fixes

- o-forms, do not style invalid inputs outside `.o-forms-input` ([f9e1f96](https://www.github.com/Financial-Times/origami/commit/f9e1f969873bc60957f53913c8f6b7e0329af2bc))

### [9.4.4](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.3...o-forms-v9.4.4) (2022-12-08)

### Bug Fixes

- handle dynamic input changes when validating forms ([69ac478](https://www.github.com/Financial-Times/origami/commit/69ac4780922aded1dd4ce9b62b8437c454f0adba))

### [9.4.3](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.2...o-forms-v9.4.3) (2022-11-08)

### Bug Fixes

- improve o-forms date input error handling ([cc4c149](https://www.github.com/Financial-Times/origami/commit/cc4c14901fb8eaf67450a439ee0e57c9c93846e3)), closes [#536](https://www.github.com/Financial-Times/origami/issues/536)

### [9.4.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.1...o-forms-v9.4.2) (2022-10-18)

### Bug Fixes

- Add icon to o-forms error summary ([16e46b5](https://www.github.com/Financial-Times/origami/commit/16e46b5209b27f27f49ea8c181dd2308c35df7e9))

### [9.4.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.4.0...o-forms-v9.4.1) (2022-10-12)

### Bug Fixes

- fix DAC issue on suffix element ([31f696c](https://www.github.com/Financial-Times/origami/commit/31f696c5d10f4450908eb5074359416a54d5b0b3))
- fix DAC issue on suffix element ([6a1603c](https://www.github.com/Financial-Times/origami/commit/6a1603c69e7ef43c8638c22eab7b1390f1197d62))
- fix lint error by disabling lint for selector ([a735654](https://www.github.com/Financial-Times/origami/commit/a73565444a2ae7d2837ae34d679a0934207666b6))
- fix runbook,md error ([a5019f8](https://www.github.com/Financial-Times/origami/commit/a5019f867a75ef3684b04dac431e286692f79452))

## [9.4.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.3.1...o-forms-v9.4.0) (2022-04-21)

### Features

- o-forms toggle on white background support ([#715](https://www.github.com/Financial-Times/origami/issues/715)) ([00e579f](https://www.github.com/Financial-Times/origami/commit/00e579f757be1bfa277bdf7f1fc1ffbb78f44ea7))

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [9.3.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.3.0...o-forms-v9.3.1) (2022-03-23)

### Bug Fixes

- checkboxes with long labels (split with multiple "label" span tags) ([8de473c](https://www.github.com/Financial-Times/origami/commit/8de473caebbb93884de4f53a37f2398ba03c63d1))

## [9.3.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.2.4...o-forms-v9.3.0) (2022-03-22)

### Features

- checkbox descriptive text + toggle checkbox improvements ([1a48067](https://www.github.com/Financial-Times/origami/commit/1a48067307f7da44a292e9fa6a86eb506f19fcb6))

### [9.2.4](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.2.3...o-forms-v9.2.4) (2022-02-07)

### Bug Fixes

- correct error summary links in the demos to use the correct IDs ([930c1cf](https://www.github.com/Financial-Times/origami/commit/930c1cff88589a1a4e7baef00f53ae54fd7e7d7d))

### [9.2.3](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.2.2...o-forms-v9.2.3) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

### [9.2.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.2.1...o-forms-v9.2.2) (2022-01-10)

### Bug Fixes

- o-forms remove demo inputs which have no id ([b8a3e01](https://www.github.com/Financial-Times/origami/commit/b8a3e010d944af507ad91d0f1cae6950190a7ddf)), closes [#524](https://www.github.com/Financial-Times/origami/issues/524)

### [9.2.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.2.0...o-forms-v9.2.1) (2021-12-24)

### Bug Fixes

- only add a checkbox if the related input is a checkbox ([1389125](https://www.github.com/Financial-Times/origami/commit/1389125c52bfd9aba201da3873e559825e80ad95))
- remove duplicate ids and expose input label text to the AOM ([034f1f7](https://www.github.com/Financial-Times/origami/commit/034f1f755ad6ea7f6ff2adc7df397c0bde050e40))
- remove password input used in checkbox demo as it is not possible to label it correctly and show password functionality is covered by the input suffix demo ([f4c4612](https://www.github.com/Financial-Times/origami/commit/f4c46126ec51da6d401a5c7465afe14eb65500fb))

## [9.2.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.1.1...o-forms-v9.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [9.1.1](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.1.0...o-forms-v9.1.1) (2021-11-08)

### Bug Fixes

- pin components to latest o-brand, or greater ([3a6ccea](https://www.github.com/Financial-Times/origami/commit/3a6ccea1e838e4a2003322ca1f855d0b87b26b60))

## [9.1.0](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.0.3...o-forms-v9.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [9.0.3](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.0.2...o-forms-v9.0.3) (2021-11-02)

### Bug Fixes

- Update `o-brand` in components, replace "master" with "core" ([322617e](https://www.github.com/Financial-Times/origami/commit/322617ea80f30a6825d9c36872e05574b871ea82))

### [9.0.2](https://www.github.com/Financial-Times/origami/compare/o-forms-v9.0.1...o-forms-v9.0.2) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
