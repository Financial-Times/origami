
# o-fonts [![Build Status](https://travis-ci.org/Financial-Times/o-fonts.svg)](https://travis-ci.org/Financial-Times/o-fonts)

Easily include FT web fonts in products.

## Quick start

```html
<!-- Load web fonts with @font-face declarations  -->
<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-fonts@^1" />

<!-- Set font families -->
<style>
	html {
		font-family: BentonSans, sans-serif;
	}
	h1 {
		font-family: MillerDisplay, serif;
	}
</style>
```

[Looking for more advanced usage options (Sass…)?](#advanced)

----

## Browser support

`o-fonts` loads web fonts in the [WOFF format](http://en.wikipedia.org/wiki/Web_Open_Font_Format).

WOFF is supported in IE 9+, Chrome, Firefox, iOS 5+, Android 4.4+.
[View full support table on caniuse.com](http://caniuse.com/#feat=woff).

## Font families, weights and styles

| Weight   | BentonSans | MillerDisplay | FinancierDisplayWeb | FinancierTextWeb | MetricWeb |
|----------|:----------:|:-------------:|:-------------------:|:----------------:|:---------:|
| thin     |            |               |                     |                  |     ✓     |
| light    |      ✓     |               |         *i*         |                  |   ✓ *i*   |
| regular  |      ✓     |       ✓       |        ✓ *i*        |       ✓ *i*      |   ✓ *i*   |
| medium   |            |               |         *i*         |                  |     ✓     |
| semibold |            |               |         *i*         |                  |     ✓     |
| bold     |      ✓     |       ✓       |                     |                  |   ✓ *i*   |
| black    |            |       ✓       |                     |                  |           |

*i*: italic available (if not, faux-italic will be displayed)

## Advanced usage<a name="advanced"></a>

### Loading web fonts

```scss
// @font-face declarations for all available families
$o-fonts-is-silent: false;

@import 'o-fonts/main';

// OR, output @font-face declarations for all available families
// using the mixin instead of turning off silent mode:
@include oFontsIncludeAll();

// @font-face declarations for all Benton Sans weights
@include oFontsInclude(BentonSans, light);
@include oFontsInclude(BentonSans, regular);
@include oFontsInclude(BentonSans, bold);

// @font-face declarations for Metric regular / italic
@include oFontsInclude(MetricWeb, $weight: regular, $style: italic);
```

### Specifying font families

`oFontsGetFontFamilyWithFallbacks()` is a function that returns the correct `font-family` with web safe fallbacks.

```scss
.my-class {
	font-family: oFontsGetFontFamilyWithFallbacks(BentonSans);
}
```

Compiles to:

```css
.my-class {
	font-family: BentonSans, sans-serif;
}
```

====

Product tip: store the family in a variable for brevity.

```scss
// _my-variables.scss
$serif: oFontsGetFontFamilyWithFallbacks(FinancierDisplayWeb);

// foo.scss
@import 'my-variables';
.foo {
	font-family: $serif;
}

// bar.scss
@import 'my-variables';
.bar {
	font-family: $serif;
}
```

`oFontsGetFontFamilyWithFallbacks()` has the added benefit of warning you if the family specified doesn't exist in the list of supported families (which as a result wouldn't show the text as intended).

----

## Contribute (*adding new variants*)

Note: font files are contained in a separate, private repository ([o-fonts-assets](http://git.svc.ft.com/projects/ORIG/repos/o-fonts-assets/)).

Open `src/scss/_variables.scss` in a text editor. Add the font family name (if it's an entirely new family) and the variant styles to the `$o-fonts-families` map:

```scss
$o-fonts-families: (
	BentonSans: (
		font-family: 'BentonSans, sans-serif',
		variants: (
			(weight: lighter, style: normal),
			(weight: normal,  style: normal),
			(weight: bold,    style: normal)
		)
	),
	// …
);
```

And then, if it's a new family, add a new entry in `demos/src/config.json`, like so:

    "demos": {
	  "bentonsans": {
	    "data": { "font": "bentonsans" }
	  },

And a new entry in `demos/src/demo.scss`:

```css
.demo-family-bentonsans .demo-example {
	font-family: oFontsGetFontFamilyWithFallback(BentonSans);
}
```

----

## License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
