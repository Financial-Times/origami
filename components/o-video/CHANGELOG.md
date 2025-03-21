# Changelog

## [8.0.0](https://github.com/Financial-Times/origami/compare/o-video-v7.3.1...o-video-v8.0.0) (2025-02-20)

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

## [7.3.1](https://github.com/Financial-Times/origami/compare/o-video-v7.3.0...o-video-v7.3.1) (2024-07-26)

### Bug Fixes

- correct scp attribute on search params for video ads requests ([#1760](https://github.com/Financial-Times/origami/issues/1760)) ([1e745c0](https://github.com/Financial-Times/origami/commit/1e745c0485479b2e6c6290a0e0e4bb1168f3d23b))

## [7.3.0](https://github.com/Financial-Times/origami/compare/o-video-v7.2.13...o-video-v7.3.0) (2024-06-11)

### Features

- Add custom params to ad targeting ([#1703](https://github.com/Financial-Times/origami/issues/1703)) ([e20423a](https://github.com/Financial-Times/origami/commit/e20423ae16c4fde0b7f6931f7e7c9134484765c7))

## [7.2.13](https://github.com/Financial-Times/origami/compare/o-video-v7.2.12...o-video-v7.2.13) (2024-05-02)

### Bug Fixes

- Refactor o-video targeting logic to allow targeting to be passed as an option ([44207d8](https://github.com/Financial-Times/origami/commit/44207d8ef431d51c3b96bfc64915e5ae9435f206))

## [7.2.12](https://github.com/Financial-Times/origami/compare/o-video-v7.2.11...o-video-v7.2.12) (2024-04-25)

### Bug Fixes

- Fix an error when showing ads. Remove elements directly rather than use `el.removeChild(childEl)` ([1a2c522](https://github.com/Financial-Times/origami/commit/1a2c522c4c633070d028405097367191db99794a))

## [7.2.11](https://github.com/Financial-Times/origami/compare/o-video-v7.2.10...o-video-v7.2.11) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [7.2.10](https://github.com/Financial-Times/origami/compare/o-video-v7.2.9...o-video-v7.2.10) (2023-08-25)

### Bug Fixes

- update o-typography dependency ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

### [7.2.9](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.8...o-video-v7.2.9) (2023-07-06)

### Bug Fixes

- Remove deprecated $external parameter from otypographylink call ([dcf61a1](https://www.github.com/Financial-Times/origami/commit/dcf61a15053618c13f22392bddcef58d71f7aa5e))

### [7.2.8](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.7...o-video-v7.2.8) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [7.2.7](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.6...o-video-v7.2.7) (2023-04-05)

### Bug Fixes

- increase range of points to capture video progress at the end of a video ([5c29017](https://www.github.com/Financial-Times/origami/commit/5c29017633f3cdc3b776fb7d543539814fa8f0c6))

### [7.2.6](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.5...o-video-v7.2.6) (2023-01-20)

### Bug Fixes

- ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

### [7.2.5](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.4...o-video-v7.2.5) (2023-01-16)

### Bug Fixes

- o-video track 99% watch progress ([9ebbba2](https://www.github.com/Financial-Times/origami/commit/9ebbba297a6685bdbf345fd5fe8c6c712c7284b3))

### [7.2.4](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.3...o-video-v7.2.4) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [7.2.3](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.2...o-video-v7.2.3) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

### [7.2.2](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.1...o-video-v7.2.2) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))

### [7.2.1](https://www.github.com/Financial-Times/origami/compare/o-video-v7.2.0...o-video-v7.2.1) (2021-12-24)

### Bug Fixes

- add missing label for the video playlist demo ([99f17aa](https://www.github.com/Financial-Times/origami/commit/99f17aa2738aba6f32ed49b669981a62bfa062e6))
- correct invalid html ([c16dd52](https://www.github.com/Financial-Times/origami/commit/c16dd52b3f321a2384c9f1254fe11ecbeeead848))
- make subtitle link accessible for assistive technologies such as screenreaders ([5d5495e](https://www.github.com/Financial-Times/origami/commit/5d5495efccc3c1f7bce268d44f272e521bcd79fe))
- remove aria-label from the video container div as the label does not convey useful information and the div has no 'role' which means it can not have an aria-label. ([d769558](https://www.github.com/Financial-Times/origami/commit/d769558f10f581149ae970f8ebe316f973f0d024))

## [7.2.0](https://www.github.com/Financial-Times/origami/compare/o-video-v7.1.0...o-video-v7.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

## [7.1.0](https://www.github.com/Financial-Times/origami/compare/o-video-v7.0.3...o-video-v7.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [7.0.3](https://www.github.com/Financial-Times/origami/compare/o-video-v7.0.2...o-video-v7.0.3) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
