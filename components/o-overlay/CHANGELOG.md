# Changelog

## [5.0.3](https://github.com/Financial-Times/origami/compare/o-overlay-v5.0.2...o-overlay-v5.0.3) (2025-12-04)


### Bug Fixes

* prevent overlay from being stuck in a full width state ([3b8269d](https://github.com/Financial-Times/origami/commit/3b8269d9613d4759799748cc5820eccdde8a04b9))

## [5.0.2](https://github.com/Financial-Times/origami/compare/o-overlay-v5.0.1...o-overlay-v5.0.2) (2025-09-11)


### Bug Fixes

* change the context only if the parentnode exists in the DOM ([536eab1](https://github.com/Financial-Times/origami/commit/536eab12adb8ee7aab3a0969e8b74556246fe2e1))
* **overlay:** set aria-pressed=true on trigger when overlay closes ([e4e2a01](https://github.com/Financial-Times/origami/commit/e4e2a014ac3851b0be1718dc140a087113e61385))
* **overlay:** use parent node context if trigger also provided ([0cdb992](https://github.com/Financial-Times/origami/commit/0cdb9924d3b37f91370f12c66e3a221fec1ed808))

## [5.0.1](https://github.com/Financial-Times/origami/compare/o-overlay-v5.0.0...o-overlay-v5.0.1) (2025-02-26)


### Bug Fixes

* Remove o-colors references ([b7d8c6a](https://github.com/Financial-Times/origami/commit/b7d8c6a3d5d01c03c37cc8e0d57fa40f06361d38))
* Remove unused o-buttons reference ([1be12a8](https://github.com/Financial-Times/origami/commit/1be12a809a44421541412363671445477454656a))
* Remove unused o-icons iSass imports ([e8b105f](https://github.com/Financial-Times/origami/commit/e8b105fa887fbc50e5030fb1f398989df290046b))

## [5.0.0](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.13...o-overlay-v5.0.0) (2025-02-20)

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

## [4.2.13](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.12...o-overlay-v4.2.13) (2024-04-16)

### Bug Fixes

- set aria-modal according to opts.modal (o-overlay) ([#1564](https://github.com/Financial-Times/origami/issues/1564)) ([8afb206](https://github.com/Financial-Times/origami/commit/8afb206544d8caa7d6cb5144cccd74307f8a8419))

## [4.2.12](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.11...o-overlay-v4.2.12) (2024-02-26)

### Bug Fixes

- Remove polyfill from component readme. ([78f9e1d](https://github.com/Financial-Times/origami/commit/78f9e1d49c1cdddeedb2cf6739a530cb4fe4f35c))

## [4.2.11](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.10...o-overlay-v4.2.11) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [4.2.10](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.9...o-overlay-v4.2.10) (2023-10-16)

### Bug Fixes

- o-overlay, which to a h2 header ([#1291](https://github.com/Financial-Times/origami/issues/1291)) ([8513d25](https://github.com/Financial-Times/origami/commit/8513d25bec439a6067e8fd865c706baf55aba1c2))

## [4.2.9](https://github.com/Financial-Times/origami/compare/o-overlay-v4.2.8...o-overlay-v4.2.9) (2023-08-25)

### Bug Fixes

- update o-typography dependency ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

### [4.2.8](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.7...o-overlay-v4.2.8) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [4.2.7](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.6...o-overlay-v4.2.7) (2023-01-20)

### Bug Fixes

- ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

### [4.2.6](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.5...o-overlay-v4.2.6) (2023-01-04)

### Bug Fixes

- o-overlay, trap focus in overlay for screen reader users ([#940](https://www.github.com/Financial-Times/origami/issues/940)) ([87d149f](https://www.github.com/Financial-Times/origami/commit/87d149f3b3df30f75675c9273015872c79f50d34))

### [4.2.5](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.4...o-overlay-v4.2.5) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [4.2.4](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.3...o-overlay-v4.2.4) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [4.2.3](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.2...o-overlay-v4.2.3) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

### [4.2.2](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.1...o-overlay-v4.2.2) (2021-12-24)

### Bug Fixes

- add missing aria-level attribute which is required because the element has a 'role' set to 'heading' ([a41eb3a](https://www.github.com/Financial-Times/origami/commit/a41eb3aaaf6c43a3e2839d00263cdaaa08ee735f))
- make the title be correctly associated to the overlay ([9ca6351](https://www.github.com/Financial-Times/origami/commit/9ca63517cb32cc889b5a91689e5d3ec728e8a28b))
- visually hide the text in the sliding noticification demo as it is not meant to be read by anyone ([7b3bb56](https://www.github.com/Financial-Times/origami/commit/7b3bb5664b0f9fd87796b153c793885c00ffcfc7))

### [4.2.1](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.2.0...o-overlay-v4.2.1) (2021-12-09)

### Bug Fixes

- Improve o-overlay focus trap ([#474](https://www.github.com/Financial-Times/origami/issues/474)) ([7d52ed7](https://www.github.com/Financial-Times/origami/commit/7d52ed722eee196ee2bfe6d780be79f2b4a4b1c6))

## [4.2.0](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.1.1...o-overlay-v4.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [4.1.1](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.1.0...o-overlay-v4.1.1) (2021-11-08)

### Bug Fixes

- pin components to latest o-brand, or greater ([3a6ccea](https://www.github.com/Financial-Times/origami/commit/3a6ccea1e838e4a2003322ca1f855d0b87b26b60))

## [4.1.0](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.0.2...o-overlay-v4.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [4.0.2](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.0.1...o-overlay-v4.0.2) (2021-11-02)

### Bug Fixes

- Update `o-brand` in components, replace "master" with "core" ([322617e](https://www.github.com/Financial-Times/origami/commit/322617ea80f30a6825d9c36872e05574b871ea82))

### [4.0.1](https://www.github.com/Financial-Times/origami/compare/o-overlay-v4.0.0...o-overlay-v4.0.1) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
