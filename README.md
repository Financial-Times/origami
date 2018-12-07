# o-loading [![CircleCI](https://circleci.com/gh/Financial-Times/o-loading.png?style=shield&circle-token=03cae109ceaa7cf8e0c0df732ee0db6a42f61fb7)](https://circleci.com/gh/Financial-Times/o-loading) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This is an [Origami](http://origami.ft.com/) component that provides a visual loading indicator.

- [Usage](#usage)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Loading indicators come in the following themes:

- light
- dark

And the following sizes:

- small
- medium
- large

### Mixins, silent mode and classes

> Mixins and silent mode are only available if you're including o-loading in your project using Bower. If you're using o-loading via the build service, you must use the o-loading classes instead. Both are documented below.

[Full documentation of mixins and variables](http://sassdoc.webservices.ft.com/v1/sassdoc/o-loading)

#### Default loading indicator

```html
<div class="o-loading o-loading--light o-loading--small"></div>
```

```scss
$o-loading-is-silent: false;
@import 'o-loading/main';
```

#### Custom loading indicator

```scss
@import 'o-loading/main';

.my-custom-indicator {
    @include oLoading();
    @include oLoadingSize('small');
    @include oLoadingColor('light');
}
```

---

## Migration guide

### Migrating from 1.X.X to 2.X.X

V1 -> V2 introduces the new majors of o-colors. Updating to this new version will mean updating any other components that you have which are using o-colors. There are no other breaking changes in this release.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-loading/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
