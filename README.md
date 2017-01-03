# o-icons [![CircleCI](https://circleci.com/gh/Financial-Times/o-icons.svg?style=shield&circle-token=cf2a28827a03270506ee12ca8dfd0c233709b1a7)](https://circleci.com/gh/Financial-Times/o-icons)

Helper Sass for the [fticons](http://registry.origami.ft.com/components/fticons) image set.
[Complete list of available icons](http://registry.origami.ft.com/components/fticons)

Though you can use these icons at any size, they render best at 40px.

- [Usage](#usage)
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
<i class="o-icons-icon o-icons-icon--arrow-down"></i>
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
<i class="o-icons-icon o-icons-icon--plus"></i>
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
<i class="icon-plus"></i>
```

The [Responsive Image Service](https://image.webservices.ft.com/) helps serving resolution-independent SVG icons with a resized PNG fallback. Using the mixin from above, you'll get the following output:

```scss
.icon-plus {
	// Older browsers: PNG fallback (resized to 40px wide)
	background-image: url('https://www.ft.com/__origami/service/image/v2/images/raw/fticon:plus?width=40&format=png&source=o-icons');
	// Modern browsers: SVG covering the whole size of the element
	// we declare multiple backgrounds so that only modern browsers read this property
	background-image: url('https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:plus?format=svg&source=o-icons'), none;

	display: inline-block;
	width: 40px;
	height: 40px;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: 50%;
	background-color: transparent;
	vertical-align: middle;
}
```

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

`o-icons` is some Sass mixins and helpers for using the fticons image set. To add a new icon you need to add it to the fticons set. There are instructions in the [fticons README](http://github.com/financial-times/fticon).

## Migration guide

### How to upgrade from v4.x.x to v5.x.x?

The jump from 4 to 5 introduces an entirely new set of icons. Using these icons should be a lot easier as they have a uniform amount of white-space around them, so you don't need to individually size icons to work in your application harmoniously.

That said, because the icons have all changed, you will need to adjust the sizing and alignment of them in your application as things that aligned before may be out of whack now.


#### Deprecated icons
The new icon set has deprecated some icons, added some, and renamed some others. For a full list of these icons please see the [fticon README](http://github.com/financial-times/fticon).

#### Logos and Mastheads
The logos and masthead that were deprecated in version 4 have now moved completely. Please use the [Logo Images set](http://github.com/financial-times/logo-images) via the image service for these.

### How to upgrade from v3.x.x to v4.x.x?

#### Important changes

* `o-ft-icons` has been renamed to `o-icons`
* Icon font has been removed, now it's SVGs all the way. This changes the behaviour for silent mode turned off users which includes Build Service users
* Some icons have been removed, and as mentioned above, others have been deprecated. The list of deleted icons is:
	- brand-always-learning
	- brand-fast-ft
	- brand-fast
	- brand-myft
	- brand-pearson
	- eye
	- font-size
	- gift
	- section-columnists
	- section-house-and-home
	- section-leader-and-letters
	- section-lex
	- section-markets-data
	- section-money
	- section-uk

#### Markup changes

CSS now doesn't add any pseudoclasses, so all the styling is applied directly on the element

#### CSS Changes

* Class prefixes need to be renamed from `o-ft-icons` to `o-icons`

	e.g.

	`o-ft-icons-icon` to `o-icons-icon`
	`o-ft-icons-icon--arrow-down` to `o-icons-icon--arrow-down`

* As it's an SVG instead of a font, size is now set using the CSS properties `width` and `height`

#### Sass Changes

* All icon font related mixins have been removed
* `oFtIconsBaseIconStyles` has been renamed to `oIconsBaseStyles`
* `oFtIconsGetSvg` has been renamed to `oIconsGetIcon`

#### Silent mode off Changes

When using the [Build Service](https://origami-build.ft.com), you're using this module with silent mode turned off. Due to the removal of the icon font, there are a couple things to keep in mind in the new implementation:

* There is a PNG fallback, and when using the default CSS classes, the size of the image served is _128px_ so it can be resized down, but not up
* The colour of the icon served is _black_. This cannot be changed. If you need a custom colour (or even a custom size), [option 3](#3-manually-using-the-responsive-image-service) of the suggested ways of using this module is the way to go


----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-icons/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
