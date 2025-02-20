# Changelog

## [9.0.0](https://github.com/Financial-Times/origami/compare/o-tabs-v8.1.4...o-tabs-v9.0.0) (2025-02-20)

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

## [8.1.4](https://github.com/Financial-Times/origami/compare/o-tabs-v8.1.3...o-tabs-v8.1.4) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

### [8.1.3](https://www.github.com/Financial-Times/origami/compare/o-tabs-v8.1.2...o-tabs-v8.1.3) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [8.1.2](https://www.github.com/Financial-Times/origami/compare/o-tabs-v8.1.1...o-tabs-v8.1.2) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [8.1.1](https://www.github.com/Financial-Times/origami/compare/o-tabs-v8.1.0...o-tabs-v8.1.1) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

## [8.1.0](https://www.github.com/Financial-Times/origami/compare/o-tabs-v8.0.0...o-tabs-v8.1.0) (2022-02-03)

### Features

- add Storybook addon, Origami background selector ([#595](https://www.github.com/Financial-Times/origami/issues/595)) ([f58329c](https://www.github.com/Financial-Times/origami/commit/f58329c17a8f8aa8dfa9aa2319f9aba07c0add69))
- add Storybook stories for o-tabs ([40e1a77](https://www.github.com/Financial-Times/origami/commit/40e1a772c69ca6620fd777ccd1fc0ba602f7b1c8))

### Bug Fixes

- output primary inverse theme by default ([e8def1c](https://www.github.com/Financial-Times/origami/commit/e8def1cb35a983e3ad2d609c038f5cc24f970c8a))

## [8.0.0](https://www.github.com/Financial-Times/origami/compare/o-tabs-v7.0.2...o-tabs-v8.0.0) (2022-01-20)

### ⚠ BREAKING CHANGES

- rename getTabPanelEls to \_getTabPanelEls as it is a private method
- mark getTabPanelEls as a private method
- rename keyPressHandler to keyUpHandler
- remove ability to autofocus into the panel

### Features

- add ability to traverse tabs using left and right arrow keys and to select a tab using enter or space ([c22e879](https://www.github.com/Financial-Times/origami/commit/c22e879cad3a5194ed94dd135f117d9c353bdaab))

### Bug Fixes

- add aria-controls to each element with role tab referring to its associated tabpanel element. ([b252a56](https://www.github.com/Financial-Times/origami/commit/b252a5607e6c653e652467d30c2305b1c0222ed7))
- allow tabs to be focusable ([4b52cb3](https://www.github.com/Financial-Times/origami/commit/4b52cb3a378f297f246482535b6b352ede774bfe))
- mark getTabPanelEls as a private method ([d7a483e](https://www.github.com/Financial-Times/origami/commit/d7a483ee63c3259162f65cfc14059878bf99d804))
- remove ability to autofocus into the panel ([ca1fa48](https://www.github.com/Financial-Times/origami/commit/ca1fa480a638dd5243298d8d9adc3717957c77c6))
- remove disablefocus from tests as the option no longer exists ([a3eefeb](https://www.github.com/Financial-Times/origami/commit/a3eefebd2b8475b5859fdee979419c244c645830))
- remove inactive tabs and tabpanels from the tabbing order ([d49c6d8](https://www.github.com/Financial-Times/origami/commit/d49c6d8b4fc2dc4cd76bfff44b0adc3581b21863))
- remove keyup event when calling Tabs.destroy() ([767348c](https://www.github.com/Financial-Times/origami/commit/767348c45b5ccd782f83f960c973e1b4fde1edb9))
- remove unselected tabs from the focusable elements ([6878f9c](https://www.github.com/Financial-Times/origami/commit/6878f9c725cc76a1366b4148825a8e664c9c87d7))
- rename getTabPanelEls to \_getTabPanelEls as it is a private method ([1f270e3](https://www.github.com/Financial-Times/origami/commit/1f270e395c09d837ab7632ecbd53b8b647c5fb03))
- rename keyPressHandler to keyUpHandler ([b8f063e](https://www.github.com/Financial-Times/origami/commit/b8f063e82c8d9e46cd41ffbc348cb4c5c7b7f655))
- stop modifying the aria-controls as they should be correct already within the html ([08bd4ef](https://www.github.com/Financial-Times/origami/commit/08bd4ef4bbcce7395579203a9cfe91bd34f9aedf))
- update html markup to not include # in the aria-controls value ([c255a6c](https://www.github.com/Financial-Times/origami/commit/c255a6c27d123e2abbcdc987aa2e73193887295c))
- when on the first tab in a tablist and pressing left arrow - move to the last tab in the tablist ([8bc11e1](https://www.github.com/Financial-Times/origami/commit/8bc11e1ddc9e5e3e63d7202b364253f9ac9b7c0c))

### [7.0.2](https://www.github.com/Financial-Times/origami/compare/o-tabs-v7.0.1...o-tabs-v7.0.2) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

### [7.0.1](https://www.github.com/Financial-Times/origami/compare/o-tabs-v7.0.0...o-tabs-v7.0.1) (2022-01-12)

### Bug Fixes

- add/correct all the required features to get o-tabs working in ie11 ([e04e8a5](https://www.github.com/Financial-Times/origami/commit/e04e8a5322e1f6771ad4ba419b0bac283e01567b))

## [7.0.0](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.2.0...o-tabs-v7.0.0) (2021-12-24)

### ⚠ BREAKING CHANGES

- change the markup for o-tabs to no longer have nested interactive elements which is inaccessible

### Bug Fixes

- change the markup for o-tabs to no longer have nested interactive elements which is inaccessible ([7edc936](https://www.github.com/Financial-Times/origami/commit/7edc9363cbb8317ca932667a7312dc0400661e6b))

## [6.2.0](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.1.1...o-tabs-v6.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [6.1.1](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.1.0...o-tabs-v6.1.1) (2021-11-08)

### Bug Fixes

- pin components to latest o-brand, or greater ([3a6ccea](https://www.github.com/Financial-Times/origami/commit/3a6ccea1e838e4a2003322ca1f855d0b87b26b60))

## [6.1.0](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.0.2...o-tabs-v6.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [6.0.2](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.0.1...o-tabs-v6.0.2) (2021-11-02)

### Bug Fixes

- Update `o-brand` in components, replace "master" with "core" ([322617e](https://www.github.com/Financial-Times/origami/commit/322617ea80f30a6825d9c36872e05574b871ea82))

### [6.0.1](https://www.github.com/Financial-Times/origami/compare/o-tabs-v6.0.0...o-tabs-v6.0.1) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
