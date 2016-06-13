# o-icons [![CircleCI](https://circleci.com/gh/Financial-Times/o-icons.svg?style=shield&circle-token=cf2a28827a03270506ee12ca8dfd0c233709b1a7)](https://circleci.com/gh/Financial-Times/o-icons)

SVG icon set with helper mixins and classes

## Quick start

```html
<!-- Loads the CSS for o-icons  -->
<link rel="stylesheet" href="//origami-build.ft.com/v2/bundles/css?modules=o-icons@^2.0.0" />

<!-- In your markup, use the helper classes, such as: -->
<i class="o-icons-icon o-icons-icon--arrow-down"></i>
```

[Complete list of available icons](http://registry.origami.ft.com/components/o-icons)

## Advanced usage

There are multiple ways to use the icons:

1. [Using the CSS helper classes](#1-using-the-css-helper-classes)
1. [Including the predefined Sass mixins into your own CSS classes](#2-including-the-predefined-sass-mixins)
1. [Manually using the Responsive Image Service](#3-manually-using-the-responsive-image-service)

### 1. Using the CSS helper classes

```scss
// public/bundle.scss

$o-icons-is-silent: false;
@import "o-icons/main";
```

```html
<!-- In your markup, use the helper classes, such as: -->
<i class="o-icons-icon o-icons-icon--plus"><i>
```

When using CSS classes, it isn't possible to set a colour for the icon or to specify a size for the PNG fallback. The defaults are 'black' for the icon colour and '128px' for the width and height.

### 2. Including the predefined Sass mixins

This option has the added flexibility of supporting coloured icons and PNG fallbacks of any size.

```scss
// public/bundle.scss

@import "o-icons/main";
@import "o-colors/main"; // So you can use colors from the Origami palette, but mixin accepts hex codes

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
	// Older browsers: PNG fallback (resized to 32px wide)
	background-image: url('//image.webservices.ft.com/v1/images/raw/fticon:plus?width=32&format=png&source=o-icons');
	// Modern browsers: SVG covering the whole size of the element
	// we declare multiple backgrounds so that only modern browsers read this property
	background-image: url('//image.webservices.ft.com/v1/images/raw/fticon:plus?format=svg&source=o-icons'), none;

	display: inline-block;
	width: 32px;
	height: 32px;
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

### 3. Manually using the Responsive Image Service

If you can't use the mixins, and you need to see a custom size or colour, you can also use the [Responsive Image Service](https://image.webservices.ft.com) to fetch the icons in a very similar way as to how the mixin works:

```scss
element {
    display: inline-block;
    width: 100px;
    height: 100px;

    // Older browsers: PNG fallback (resized to 100px wide)
    background-image: url('//image.webservices.ft.com/v1/images/raw/fticon:tick?width=100&format=png&source=my-product');

    // Modern browsers: SVG covering the whole size of the element
    // we declare multiple backgrounds so that only modern browsers read this property
    background-image: url('//image.webservices.ft.com/v1/images/raw/fticon:tick?format=svg&source=my-product'), none;
    background-size: cover;
}
```

## How to add or edit icons

Please see our [contributing.md](/contributing.md) for guidelines on how to add an icon to o-icons.

## Deprecation process

Icon sets can't be versioned so, when removing an icon, make sure that it isn't used anywhere. To find out if an icon is being used search on [Splunk](http://splunk.internal.ft.com). An example search:

> (host="ftweb61759-law1b-eu-p" OR host="ftweb61758-law1a-eu-p") source="/var/log/httpd/access_log" fticon:section-world| top limit=120 referer

Where you can change _section-world_ to the icon you're looking for.

The list of icons that are deprecated and will be removed in the next major release can be found [here](_deprecated.js).

## How to upgrade from v3.x.x to v4.x.x?

### Important changes

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

### Markup changes

CSS now doesn't add any pseudoclasses, so all the styling is applied directly on the element

### CSS Changes

* Class prefixes need to be renamed from `o-ft-icons` to `o-icons`

	e.g.

	`o-ft-icons-icon` to `o-icons-icon`
	`o-ft-icons-icon--arrow-down` to `o-icons-icon--arrow-down`

* As it's an SVG instead of a font, size is now set using the CSS properties `width` and `height`

### Sass Changes

* All icon font related mixins have been removed
* `oFtIconsBaseIconStyles` has been renamed to `oIconsBaseStyles`
* `oFtIconsGetSvg` has been renamed to `oIconsGetIcon`

### Silent mode off Changes

When using the [Build Service](https://origami-build.ft.com), you're using this module with silent mode turned off. Due to the removal of the icon font, there are a couple things to keep in mind in the new implementation:

* There is a PNG fallback, and when using the default CSS classes, the size of the image served is _128px_ so it can be resized down, but not up
* The colour of the icon served is _black_. This cannot be changed. If you need a custom colour (or even a custom size), [option 3](#3-manually-using-the-responsive-image-service) of the suggested ways of using this module is the way to go

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
