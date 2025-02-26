# Changelog

## [15.0.2](https://github.com/Financial-Times/origami/compare/o-header-v15.0.1...o-header-v15.0.2) (2025-02-26)


### Bug Fixes

* bump o-private-foundation version ([#1993](https://github.com/Financial-Times/origami/issues/1993)) ([2f3b870](https://github.com/Financial-Times/origami/commit/2f3b8701256e4a5d91b1bfea6a2ed3b9046913e5))

## [15.0.1](https://github.com/Financial-Times/origami/compare/o-header-v15.0.0...o-header-v15.0.1) (2025-02-26)


### Bug Fixes

* Remove unused o-icons import ([6f1c178](https://github.com/Financial-Times/origami/commit/6f1c1784382b7eec8ff78c4593d42ccf23f3da89))
* round non-navigational buttons on o-header ([#1986](https://github.com/Financial-Times/origami/issues/1986)) ([8c71231](https://github.com/Financial-Times/origami/commit/8c712311dff42e95d6374b2a8493ff15bad7478a))

## [15.0.0](https://github.com/Financial-Times/origami/compare/o-header-v14.1.0...o-header-v15.0.0) (2025-02-20)

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

## [14.1.0](https://github.com/Financial-Times/origami/compare/o-header-v14.0.4...o-header-v14.1.0) (2024-10-24)

### Features

- o-header subnav primary styles ([#1853](https://github.com/Financial-Times/origami/issues/1853)) ([421eb30](https://github.com/Financial-Times/origami/commit/421eb3070ba1fc58a35b808f7496b72dd5c849df))

## [14.0.4](https://github.com/Financial-Times/origami/compare/o-header-v14.0.3...o-header-v14.0.4) (2024-09-24)

### Bug Fixes

- (o-header) subnav scroll behaviour ([#1825](https://github.com/Financial-Times/origami/issues/1825)) ([a4329e1](https://github.com/Financial-Times/origami/commit/a4329e13818d85a3b8cea10496646ac0a52bf597))

## [14.0.3](https://github.com/Financial-Times/origami/compare/o-header-v14.0.2...o-header-v14.0.3) (2024-09-19)

### Bug Fixes

- (o-header) increase the value of o-header-mega to 5 ([#1817](https://github.com/Financial-Times/origami/issues/1817)) ([c9944df](https://github.com/Financial-Times/origami/commit/c9944df765ccc063bc5d9e6bca79535fe614df78))

## [14.0.2](https://github.com/Financial-Times/origami/compare/o-header-v14.0.1...o-header-v14.0.2) (2024-09-05)

### Bug Fixes

- (o-header) add `relative` position to `o-header` to align absolutely positioned typeahead ([59cef6c](https://github.com/Financial-Times/origami/commit/59cef6c8c34a96d05f21a3a998cef174af82f549))
- (o-header) prevent overscrolling behaviour ([3b77307](https://github.com/Financial-Times/origami/commit/3b773074d0d997f58db15668aaf57ac9b4846fae))
- align padding in drawer ([#1809](https://github.com/Financial-Times/origami/issues/1809)) ([3c222a8](https://github.com/Financial-Times/origami/commit/3c222a8de2e0232fe0e2252a5b6480ec7aece255))

## [14.0.1](https://github.com/Financial-Times/origami/compare/o-header-v14.0.0...o-header-v14.0.1) (2024-08-27)

### Bug Fixes

- (o-header) hide sticky header container when sticky header disappears ([027b716](https://github.com/Financial-Times/origami/commit/027b7167f3a49a2b637f33e25d302da44320d039))
- (o-header) increase the value of `o-header` container to `10` ([3d74d56](https://github.com/Financial-Times/origami/commit/3d74d56db277e44ffc06c00ea081611ca6de3f68))
- (o-header) remove `padding` from the form label ([bd1f0af](https://github.com/Financial-Times/origami/commit/bd1f0af0534b9c68fb49c8730d3fc2a8614f3733))

## [14.0.0](https://github.com/Financial-Times/origami/compare/o-header-v13.0.3...o-header-v14.0.0) (2024-08-22)

### ⚠ BREAKING CHANGES

- Add Ask FT button to header
- Add `type="search" to the input field inside the drawer
- Rework search & close buttons

### Features

- Add `type="search" to the input field inside the drawer ([d020919](https://github.com/Financial-Times/origami/commit/d02091960c0f03f29b7ee1bc525ef1f9f3c33e78))
- Align the search bar width and color according to the new look ([96f377f](https://github.com/Financial-Times/origami/commit/96f377f1e0a15957e466492ad37e6e4eceb21e07))
- Hide drawer search for tables & display search icon ([89f50cf](https://github.com/Financial-Times/origami/commit/89f50cf24a330d8aa7a0858de612a551f35b45a8))
- Rework search & close buttons ([2411230](https://github.com/Financial-Times/origami/commit/241123062b7558452dd4437882237799fe2f1801))
- add Ask FT button in the drawer ([a6b115b](https://github.com/Financial-Times/origami/commit/a6b115b1e90666c70bd88a523bb59c19d35d64a9))
- add Ask FT button to the top header ([9784f02](https://github.com/Financial-Times/origami/commit/9784f029a0d3bd9845ed20ba1bac301e911353c6))
- rename color variables ([9880a9e](https://github.com/Financial-Times/origami/commit/9880a9e8d13dd7aadaf3785693cc5227e175b279))
- update Ask FT button responsive visibility ([fcf388e](https://github.com/Financial-Times/origami/commit/fcf388ec20896a3962a549fe9e095566902c522b))

### Bug Fixes

- Fix a11ty issues where `aria-controls` atrributes were referencing incorect IDs ([b555f03](https://github.com/Financial-Times/origami/commit/b555f03e446357d4cb4cee61e8ea18a0958c9803))
- tweak the icon size to make sure the container is `40px` tall ([f9cecb7](https://github.com/Financial-Times/origami/commit/f9cecb7bbde2d8ba5508226f7f065abf7f202533))

## [13.0.3](https://github.com/Financial-Times/origami/compare/o-header-v13.0.2...o-header-v13.0.3) (2024-07-10)

### Bug Fixes

- fix search term width (again!) ([#1744](https://github.com/Financial-Times/origami/issues/1744)) ([34ff48f](https://github.com/Financial-Times/origami/commit/34ff48fcc95499d52d87516bbdb5baf5927d02a9))

## [13.0.2](https://github.com/Financial-Times/origami/compare/o-header-v13.0.1...o-header-v13.0.2) (2024-07-10)

### Bug Fixes

- fix search term wide ([#1742](https://github.com/Financial-Times/origami/issues/1742)) ([b0ee3bb](https://github.com/Financial-Times/origami/commit/b0ee3bb317c39694f1ee4b591f0b20ecfd31ec8a))

## [13.0.1](https://github.com/Financial-Times/origami/compare/o-header-v13.0.0...o-header-v13.0.1) (2024-07-09)

### Bug Fixes

- adjust search bar width according to the designs ([#1740](https://github.com/Financial-Times/origami/issues/1740)) ([bd7ba46](https://github.com/Financial-Times/origami/commit/bd7ba4605ae79dc03f3314bfd884c099c4cdc956))

## [13.0.0](https://github.com/Financial-Times/origami/compare/o-header-v12.0.0...o-header-v13.0.0) (2024-07-05)

### ⚠ BREAKING CHANGES

- Drawer, search, and edition switcher updates ([#1725](https://github.com/Financial-Times/origami/issues/1725))

### Features

- Drawer, search, and edition switcher updates ([#1725](https://github.com/Financial-Times/origami/issues/1725)) ([090d384](https://github.com/Financial-Times/origami/commit/090d38439b2af9475757f3c70ced26e4b08e37dd))

## [12.0.0](https://github.com/Financial-Times/origami/compare/o-header-v11.2.0...o-header-v12.0.0) (2024-05-21)

### ⚠ BREAKING CHANGES

- Change the My Account & myFT header link locations

### Features

- Change the My Account & myFT header link locations ([7e9d2c8](https://github.com/Financial-Times/origami/commit/7e9d2c8a156b95270aeca49cae9c02df95a67350))

## [11.2.0](https://github.com/Financial-Times/origami/compare/o-header-v11.1.1...o-header-v11.2.0) (2024-03-18)

### Features

- removing spacing of first subnav button ([74ebf9c](https://github.com/Financial-Times/origami/commit/74ebf9c2d015711c2e42a9cdf3f61177627c9569))

## [11.1.1](https://github.com/Financial-Times/origami/compare/o-header-v11.1.0...o-header-v11.1.1) (2023-10-27)

### Bug Fixes

- Update node and npm ([c371fc3](https://github.com/Financial-Times/origami/commit/c371fc3f7f2d66266dbca95862ecef3ddeb1f339))

## [11.1.0](https://github.com/Financial-Times/origami/compare/o-header-v11.0.7...o-header-v11.1.0) (2023-09-07)

### Features

- o-header, add option to reveal the search bar by default. ([#1265](https://github.com/Financial-Times/origami/issues/1265)) ([0f44111](https://github.com/Financial-Times/origami/commit/0f44111a9091a1d3f1b5e999b2394b81b89bf895))

## [11.0.7](https://github.com/Financial-Times/origami/compare/o-header-v11.0.6...o-header-v11.0.7) (2023-08-25)

### Bug Fixes

- update o-typography dependency ([fb45b47](https://github.com/Financial-Times/origami/commit/fb45b47274241ea828f7dd50233441a76a215a51))

### [11.0.6](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.5...o-header-v11.0.6) (2023-04-28)

### Bug Fixes

- Require latest minor version of o-colors, o-buttons, and o-forms ([#1098](https://www.github.com/Financial-Times/origami/issues/1098)) ([b856ca6](https://www.github.com/Financial-Times/origami/commit/b856ca66c9ec555f3c70833ffa35cb05cd19841f))

### [11.0.5](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.4...o-header-v11.0.5) (2023-04-27)

### Bug Fixes

- o-header, subnav, improve scroll button behaviour. ([#1095](https://www.github.com/Financial-Times/origami/issues/1095)) ([b6d9fdd](https://www.github.com/Financial-Times/origami/commit/b6d9fdd86c2cb994a5b9a42646e870633c01f695))

### [11.0.4](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.3...o-header-v11.0.4) (2023-01-20)

### Bug Fixes

- ensure components depend on the latest o-normalise version ([e910236](https://www.github.com/Financial-Times/origami/commit/e910236454318ce1bf198a06da7e76c0893c9142))

### [11.0.3](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.2...o-header-v11.0.3) (2023-01-18)

### Bug Fixes

- o-header tsx, use correct drawer markup ([7a95985](https://www.github.com/Financial-Times/origami/commit/7a959858ce5f199393ab89196b384398f52caccf))

### [11.0.2](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.1...o-header-v11.0.2) (2023-01-16)

### Bug Fixes

- o-header, fix tsx errors ([545435d](https://www.github.com/Financial-Times/origami/commit/545435de2f60a69e7d7d30c48a591c285dfcd2fd))

### [11.0.1](https://www.github.com/Financial-Times/origami/compare/o-header-v11.0.0...o-header-v11.0.1) (2023-01-16)

### Bug Fixes

- o-header, bundle tsx in release ([9a6f908](https://www.github.com/Financial-Times/origami/commit/9a6f9084ae4b306902da844a17782a54ef149964))

## [11.0.0](https://www.github.com/Financial-Times/origami/compare/o-header-v10.1.2...o-header-v11.0.0) (2023-01-13)

### ⚠ BREAKING CHANGES

- Update markup to make a number of accessibility fixes ([cc0c80a](https://github.com/Financial-Times/origami/pull/912))
- Remove the sub-brand variant([cc0c80a](https://github.com/Financial-Times/origami/pull/950))

[See the o-header v10 to v11 migration guide for more details](https://github.com/Financial-Times/origami/blob/main/components/o-header/MIGRATION.md#migrating-from-v10-to-v11).

### [10.1.2](https://www.github.com/Financial-Times/origami/compare/o-header-v10.1.1...o-header-v10.1.2) (2022-12-21)

### Bug Fixes

- require 3.3.0 or higher ([fc180c6](https://www.github.com/Financial-Times/origami/commit/fc180c619755daa1b7bfe65509f354cf0de113bf))

### [10.1.1](https://www.github.com/Financial-Times/origami/compare/o-header-v10.1.0...o-header-v10.1.1) (2022-12-15)

### Bug Fixes

- o-header, update input focus style with a double ring ([649a9e8](https://www.github.com/Financial-Times/origami/commit/649a9e82ae21650ac1129cf07a211f6883cfd1a2))

## [10.1.0](https://www.github.com/Financial-Times/origami/compare/o-header-v10.0.1...o-header-v10.1.0) (2022-08-17)

### Features

- Add storybook / tsx templates ([e533fcc](https://www.github.com/Financial-Times/origami/commit/e533fccb9e80d758a21b52d4a176248f46d11a50))

### [10.0.1](https://www.github.com/Financial-Times/origami/compare/o-header-v10.0.0...o-header-v10.0.1) (2022-04-21)

### Bug Fixes

- Adds basic existence checking to most module entry points ([#714](https://www.github.com/Financial-Times/origami/issues/714)) ([7ba3a61](https://www.github.com/Financial-Times/origami/commit/7ba3a61d0de2a32d3a27a225fd4258b3820c7bda))

## [10.0.0](https://www.github.com/Financial-Times/origami/compare/o-header-v9.3.1...o-header-v10.0.0) (2022-04-12)

### ⚠ BREAKING CHANGES

- header anon updates (#696)

### Features

- header anon updates ([#696](https://www.github.com/Financial-Times/origami/issues/696)) ([d80a023](https://www.github.com/Financial-Times/origami/commit/d80a023201e87a951de8ef856e84d68c1606e973))

### [9.3.1](https://www.github.com/Financial-Times/origami/compare/o-header-v9.3.0...o-header-v9.3.1) (2022-04-06)

### Bug Fixes

- center ft logo in o-header when right/left columns are missing ([#692](https://www.github.com/Financial-Times/origami/issues/692)) ([815604d](https://www.github.com/Financial-Times/origami/commit/815604d8c6ddbc05f7f49552a7284353708aacef))

## [9.3.0](https://www.github.com/Financial-Times/origami/compare/o-header-v9.2.4...o-header-v9.3.0) (2022-04-05)

### Features

- add drawer button demo and update class name ([7b79555](https://www.github.com/Financial-Times/origami/commit/7b7955528c5a67386f824df1036a2d6c49a0c3c4))
- update o-header with new subs button for annon readers ([217018b](https://www.github.com/Financial-Times/origami/commit/217018be87605674a822056bc353ca5eddeb4f32))

### Bug Fixes

- o-header, handle nav icon spacing within `o-header__nav-item` ([43d761c](https://www.github.com/Financial-Times/origami/commit/43d761c7860d1fe211c728929ff420c5ec46f780))

### [9.2.4](https://www.github.com/Financial-Times/origami/compare/o-header-v9.2.3...o-header-v9.2.4) (2022-02-09)

### Bug Fixes

- show the entire focus ring for links within the drawer ([5211b0e](https://www.github.com/Financial-Times/origami/commit/5211b0e2e937621a756c0b3e7b612e40aa9dcd73))
- show the entire focus ring for links within the drawer ([459ae52](https://www.github.com/Financial-Times/origami/commit/459ae529ee88b6b1de289dbaadfe18d04ac2440e))

### [9.2.3](https://www.github.com/Financial-Times/origami/compare/o-header-v9.2.2...o-header-v9.2.3) (2022-01-17)

### Bug Fixes

- use KeyboardEvent.key as it is the standardised and non-deprecated alternative to KeyboardEvent.keyCode ([4f07630](https://www.github.com/Financial-Times/origami/commit/4f07630635d4d84db0a0262c8c04b70353a22685))
- when pressing escape key, close any open mega-menus ([c03bf89](https://www.github.com/Financial-Times/origami/commit/c03bf89296898cb783d69072caeb37ebd812e63c))

### [9.2.2](https://www.github.com/Financial-Times/origami/compare/o-header-v9.2.1...o-header-v9.2.2) (2022-01-13)

### Bug Fixes

- expand all uses of docs to documentation ([26f8d9d](https://www.github.com/Financial-Times/origami/commit/26f8d9d8cbbe3e78902d8c3951b37e08150a77bd))
- expand all uses of spec to specification ([e93de37](https://www.github.com/Financial-Times/origami/commit/e93de3789c3a0ae8b2737ab9d9e9e63b294e8f65))

### [9.2.1](https://www.github.com/Financial-Times/origami/compare/o-header-v9.2.0...o-header-v9.2.1) (2021-12-24)

### Bug Fixes

- stop making the `html` element scrollable as it is not focusable via a keyboard which is an accessibility issue ([5797fa5](https://www.github.com/Financial-Times/origami/commit/5797fa5d12660b6b21c81e378d5a2abf2722f0b8))

## [9.2.0](https://www.github.com/Financial-Times/origami/compare/o-header-v9.1.1...o-header-v9.2.0) (2021-11-24)

### Features

- allow npm 8 in engines config ([eeb1cae](https://www.github.com/Financial-Times/origami/commit/eeb1cae6e7f0379e647f2b41240b1f294997d528))

### [9.1.1](https://www.github.com/Financial-Times/origami/compare/o-header-v9.1.0...o-header-v9.1.1) (2021-11-08)

### Bug Fixes

- pin components to latest o-brand, or greater ([3a6ccea](https://www.github.com/Financial-Times/origami/commit/3a6ccea1e838e4a2003322ca1f855d0b87b26b60))

## [9.1.0](https://www.github.com/Financial-Times/origami/compare/o-header-v9.0.4...o-header-v9.1.0) (2021-11-08)

### Features

- Rename master brand in component origami.json ([f642faf](https://www.github.com/Financial-Times/origami/commit/f642faf0574d84ea8185b56e6090c8015def27e6))

### [9.0.4](https://www.github.com/Financial-Times/origami/compare/o-header-v9.0.3...o-header-v9.0.4) (2021-11-02)

### Bug Fixes

- Update `o-brand` in components, replace "master" with "core" ([322617e](https://www.github.com/Financial-Times/origami/commit/322617ea80f30a6825d9c36872e05574b871ea82))

### [9.0.3](https://www.github.com/Financial-Times/origami/compare/o-header-v9.0.2...o-header-v9.0.3) (2021-09-28)

### Bug Fixes

- correct markup in o-header demos ([5f1d671](https://www.github.com/Financial-Times/origami/commit/5f1d671fd052016572775fab02b0253385ed4231))

### [9.0.2](https://www.github.com/Financial-Times/origami/compare/o-header-v9.0.1...o-header-v9.0.2) (2021-09-21)

### Bug Fixes

- Add homepage, bugs and support email to the package.json ([6c0de60](https://www.github.com/Financial-Times/origami/commit/6c0de60ebd6e64c4dd16d000fcc6b79412ce30f4))
- update bugs urls ([3ea0ca0](https://www.github.com/Financial-Times/origami/commit/3ea0ca03bcb6e55142a77387ad0fff5ddf056d44))
- update origami json urls ([c757653](https://www.github.com/Financial-Times/origami/commit/c7576532b5a14f0462d5346dfb63238be025602e))
