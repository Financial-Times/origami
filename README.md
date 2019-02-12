# o-loading [![CircleCI](https://circleci.com/gh/Financial-Times/o-loading.png?style=shield&circle-token=03cae109ceaa7cf8e0c0df732ee0db6a42f61fb7)](https://circleci.com/gh/Financial-Times/o-loading) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This is an [Origami](http://origami.ft.com/) component that provides a visual loading indicator.

- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup
In order to display a loading indicator in your product, you will need to supply the theme and the size modifiers in your markup, e.g.:
```html
<div class="o-loading o-loading--light o-loading--small"></div>
```

## Sass
In order to output all of the variations in theme and size of `o-loading`, you'll need to include the following:
```scss
@import 'o-loading/main';

@include oLoading();
```
You can also be more selective about which themes or sizes of the loading indicator you wish to output, by using a map.
The `$opts` map accepts two lists:

'themes':
- light
- dark

And 'sizes':
- mini
- small
- medium
- large

```scss
@import 'o-loading/main';

@include oLoading($opts: (
	'themes': ('light'),
	'sizes': ('medium', 'large')
));

// outputs a large light spinner and a medium light spinner
```

If you need to build a loading spinner into a component, for example, you can use the following mixin:

```scss
@import 'o-loading/main';

.my-loading-spinner {
	@include oLoadingContent($opts: (
		'theme': 'light',
		'size': 'small'
	));
}
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-loading/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
