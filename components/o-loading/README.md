# o-loading [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This is an [Origami](http://origami.ft.com/) component that provides a visual loading indicator.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-loading`.

## Markup
In order to display a loading indicator in your product, you will need to supply the theme and the size modifiers in your markup, e.g.:
```html
<div class="o-loading o-loading--light o-loading--small"></div>
```

## Sass
In order to output all of the variations in theme and size of `o-loading`, you'll need to include the following:
```scss
@import '@financial-times/o-loading/main';

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
@import '@financial-times/o-loading/main';

@include oLoading($opts: (
	'themes': ('light'),
	'sizes': ('medium', 'large')
));

// outputs a large light spinner and a medium light spinner
```

If you need to build a loading spinner into a component, for example, you can use the following mixin:

```scss
@import '@financial-times/o-loading/main';

.my-loading-spinner {
	@include oLoadingContent($opts: (
		'theme': 'light',
		'size': 'small'
	));
}
```

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.0.4 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.1| [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-loading/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
