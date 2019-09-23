# o-icons [![CircleCI](https://circleci.com/gh/Financial-Times/o-icons.svg?style=shield&circle-token=cf2a28827a03270506ee12ca8dfd0c233709b1a7)](https://circleci.com/gh/Financial-Times/o-icons) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Helper Sass for the [fticons](http://registry.origami.ft.com/components/fticons) image set.
[Complete list of available icons](http://registry.origami.ft.com/components/fticons)

Though you can use these icons at any size, they render best at 40px.

- [Markup](#markup)
- [Sass](#sass)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

```html
<!-- Loads the CSS for o-icons  -->
<link rel="stylesheet" href="//origami-build.ft.com/v2/bundles/css?modules=o-icons@^5.0.0" />

<!-- In your markup, use the helper classes, such as: -->
<span class="o-icons-icon o-icons-icon--arrow-down"></span>
```

### Sass

There are a few ways to use o-icons to get fticons:

1. [Using the CSS helper classes](#using-the-css-helper-classes)
2. [Using the Sass mixins with your own CSS](#using-the-sass-mixins-with-your-own-css)

You can also request the icon directly from the Image Service (without using o-icons at all). See the [fticons](http://registry.origami.ft.com/components/fticons) for how to do this.

#### Using the CSS helper classes

```scss
// public/bundle.scss

$o-icons-is-silent: false;
@import "o-icons/main";
```

```html
<!-- In your markup, use the helper classes, such as: -->
<span class="o-icons-icon o-icons-icon--plus"></span>
```

When using CSS classes, it isn't possible to set a colour for the icon or to specify a size for the PNG fallback. The defaults are 'black' for the icon colour and '128px' for the width and height.

#### Using the Sass mixins with your own CSS

This option has the added flexibility of supporting coloured icons and PNG fallbacks of any size.

```scss
// public/bundle.scss

@import "o-icons/main";
@import "o-colors/main"; // So you can use colors from the Origami palette, the mixin only accepts hex values

.icon-plus {
	@include oIconsGetIcon('plus', oColorsGetPaletteColor('cold-1'), 32);
}
```

```html
<span class="icon-plus"></span>
```

The [Responsive Image Service](https://image.webservices.ft.com/) helps serving resolution-independent SVG icons.

The 'base' of the service url can be set with the `$o-icons-service-base-url` variable. e.g. setting

```
$o-icons-service-base-url: "https://my.image.service/foo";
```

will output an image service url in the format `https://my.image.service/foo/v2/images/raw/...`.

The 'version' of the service url can be set with the `$o-icons-service-version` variable. e.g. setting

```
$o-icons-service-version: "v1";
```

will output an image service url in the format `https://my.image.service/foo/v1/images/raw/...`.

There's also a separate mixin to output just the base styles for an icon:

```scss
.icon {
	@include oIconsBaseStyles;
}
```

Which outputs:

```scss
.icon {
	display: inline-block;
	width: 128px;
	height: 128px;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: 50%;
	background-color: transparent;
	vertical-align: middle;
}
```

## Contributing

`o-icons` is some Sass mixins and helpers for using the fticons image set. To add a new icon you need to add it to the fticons set. There are instructions in the [fticons README](http://github.com/financial-times/fticon). When the icon is in fticons, run `node ./scripts/build-icon-list.js` to update `o-icons` Sass with the new icon automatically.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A  | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.9  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.5  | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.3 | - |
╳ deprecated | 2 | 2.4 | - |
╳ deprecated | 1 | 1.2 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-icons/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
