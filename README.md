# o-typography [![Build Status](https://circleci.com/gh/Financial-Times/o-typography.png?style=shield&circle-token=9ca314332de2a9b6a80eb8477e097d9acbc96e0b)](https://circleci.com/gh/Financial-Times/o-typography)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm. The module provides styles for headings, titles, leads and body content.

----

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
	- [JavaScript](#javascript)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

o-typography has Sass and JavaScript


### Markup

#### Using the predefined CSS classes

If you're not using the build service, [turn off 'silent mode'](#silentmode).

Pre-defined CSS classes are provided and can be used directly in your HTML. All classes are prefixed with 'o-typography-', for example `o-typography-heading1`.

The classes do not depend on any specific HTML element, but appropriate semantic elements should be chosen.

```html
<h2 class="o-typography-heading2">Heading medium</h2>
```

See the [demos](http://registry.origami.ft.com/components/o-typography) for a full list of the classes provided and their effects.

#### Wrappers

In addition to applying classes individual to elements, body styles can be applied to an HTML element and descendent `h2, h3, h4, p, a, blockquote, footer, aside, strong, em, small, sup, sub, ul, ol, li` elements will have typographic styling applied.

```html
<div class="o-typography-body-wrapper">
	<h2>Heading medium</h2>
	<p>Body block with <strong>styled inline text</strong>.</p>
	<h3>Heading small</h3>
	<p>Body block with <em>styled inline text</em>.</p>
</div>
```

More detailed examples of the wrappers can be found in the demos.

Pre-defined classes are not available to module developers. Module developers are required to use the mixins.

### Sass

As with all Origami components, o-typography has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-typography-is-silent : false;` in your Sass before you import the o-typography Sass.

By default, when silent mode is turned off, o-typography will download a number of webfonts. To suppress this use `$o-typography-load-fonts`

```scss
$o-typography-is-silent: false;
$o-typography-load-fonts: false;

@import 'o-typography/main';
```

#### Use Case mixins

<!-- If you don't want to include the pre-defined classes in your HTML (or are a module developer) you may instead use the mixins provided: -->

The module defines a small number of common typographic use cases that can be included as mixins.

```scss
.article {
	p,
	blockquote {
		@include oTypographyBody;
	}
}
```

For wrappers ([see wrapper section](#wrapper)):

```scss
.article__body {
	@include oTypographyBodyWrapper;
}
```

Mixins exist for all the same styles as pre-defined classes, named with a camelCased version of the class name.

#### Font mixins


#### Font Scale mixins


#### Using default styles


#### Web fonts

When running in silent mode, o-typography does not load web fonts, products should load web fonts themselves. **Load FT's custom web fonts using [o-fonts](https://github.com/financial-times/o-fonts).**

When running in non-silent mode, o-typography loads all web fonts which are used.

##### Progressively loading web fonts

One of the drawbacks of using web fonts is some browsers hide the text while the font is downloading (Flash of Invisible Text, aka FOIT). A common pattern for avoiding this is to initially use a system fallback font, and once we know the web font has loaded, add a class to the `html` element and use this to 'upgrade' to the web font, e.g.

```css
.text {
	font-family: FinancierDisplayWeb,serif;
}

.font-loaded-serif .text {
	font-family: serif;
}
```

In this case we added a `font-loaded-serif` class to the `html` element once we were sure the web font `FinancierDisplayWeb` was downloaded.

To help with this pattern, each `oTypographyXDisplayItalic` mixin takes a second argument, `$load-progressively`, which, if set to `true`, outputs css in the above format.

Initially we need to set which fonts we want to follow this pattern, by setting the `$o-typography-progressive-fonts` variable

We can also override what the 'loaded' class is prefixed with; `$o-typography-loaded-prefix` (default is `o-typography--loaded`)

A further thing to note is the fallback fonts are generally of a different size to the webfont, so we also scale the font, e.g.

```css
.text {
	font-family: serif;
	font-size: 18px;
	line-height: 24px;
}

.font-loaded-serif .text {
	font-family: FinancierDisplayWeb,serif;
	font-size: 20px
}
```

When using the `oTypographyXDisplayItalicSize` mixin, a second argument `$with-progressive-size` can be supplied to scale fonts


So as a full example,

```sass
$o-typography-progressive-fonts: sansData, serifDisplay;
$o-typography-loaded-prefix: 'loaded-font';

.foo {
	@include oTypographySansData(m, $load-progressively: true);
}

.bar {
	@include oTypographySerifDisplayItalic(m, $load-progressively: true);
}
```

compiles to

```css
.foo {
	font-family: sans-serif;
	font-size: 12.18px;
	line-height: 16px;
	font-weight: 400;
}

.loaded-font-sansData .foo {
	font-family: MetricWeb,sans-serif;
	font-size: 14px;
}

.bar {
	font-family: FinancierDisplayWeb,serif;
	font-size: 20px;
	line-height: 22px;
	font-style: italic;
	font-weight: 200;
}
```


## Migration guide

### Migrating from v4 to v5

V5 of o-typography introduces a new typographic scale compared with the type matrix system in the previous version. This effects the [mixins and sizes](#mixins-and-sizes) you will be requesting through the API. V5 also includes changes to the output [CSS classes](#changes-to-css-classes) for certain styles and removes some for others.

o-typography v5 also removes access to the `FinancierText` font-family.

#### Mixins and sizes

The following mixins have been removed:

```diff
- oTypographySansSize
- oTypographySansBoldSize
- oTypographySansDataSize
- oTypographySansDataBoldSize
- oTypographySansDataItalicSize
- oTypographySerifSize
- oTypographySerifBoldSize
- oTypographySerifItalicSize
- oTypographySerifDisplaySize
- oTypographySerifDisplayBoldSize
- oTypographySerifDisplayItalicSize
```

The following mixins have been renamed:

```diff
- oTypographySerifDisplayBold
+ oTypographyDisplayBold

- oTypographySerifDisplay
+ oTypographyDisplay

- oTypographySansDataBold
+ oTypographySansBold

- oTypographySansData
+ oTypographySans

- font-size
+ oTypographyFontSize

- oTypographyProgressiveFont
+ oTypographyProgressiveFontFallback

- oTypographyFallbackFontSize
+ _oTypographyProgressiveFontFallbackSize
```

#### Changes to CSS classes

// Todo

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
