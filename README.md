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

o-typography uses a single typographic scale for use with all fonts. The scale consists of font-size and line-height combinations, as shown below:

| Scale | Font size | Line height |
|------ |---------- |------------ |
|    -2 |      12px |        12px |
|    -1 |      14px |        16px |
|     0 |      16px |        24px |
|     1 |      18px |        28px |
|     2 |      20px |        24px |
|     3 |      24px |        28px |
|     4 |      28px |        32px |
|     5 |      32px |        36px |
|     6 |      40px |        40px |
|     7 |      48px |        48px |
|     8 |      56px |        56px |
|     9 |      72px |        72px |
|    10 |      84px |        84px |

This scale makes up all typographic styles available through o-typography. It is available when using Sass through the [font scale mixins](#font-scale-mixins).

### Markup

#### Using CSS classes

The predefined CSS classes in o-typography are available when using the [build service](#) or in [Sass](#sass) when silent-mode is set to `false`.

All classes provided by o-typography come prefixed with 'o-typography-'; for example `o-typography-heading`. Classes do not depend on specific HTML, but we encourage developers to select semantic elements.

Example:

```html
<h2 class="o-typography-heading2">Heading medium</h2>
```

See the [demos]() for a full list of the classes provided and their effects.

#### Wrappers

Wrappers reduce the need for developers to apply styles to specific elements. By using a wrapper, body styles get applied to the HTML element and descendent typographic elements: h1, h2, h3, h4, h5, p, a, blockquote, footer, aside, strong, em, small, sup, sub, ul, ol, li.

Example:

```html
<div class="o-typography-body-wrapper">
	<h2>Heading medium</h2>
	<p>Body block with <strong>styled inline text</strong>.</p>
	<h3>Heading small</h3>
	<p>Body block with <em>styled inline text</em>.</p>
</div>
```

### Sass

As with all Origami components, o-typography has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use it's compiled CSS (rather than using the mixins with your own Sass) set `$o-typography-is-silent : false;` in your Sass before you import the o-typography Sass.

**Note: Including fonts**

By default, when silent mode is set to `false`, o-typography will download the FT webfonts. To suppress this use `$o-typography-load-fonts`:

```sass
$o-typography-is-silent: false;
$o-typography-load-fonts: false;

@import 'o-typography/main';
```

When silent mode is set to `true`, o-typography does not load web fonts. Products should load web fonts themselves using **[o-fonts](https://github.com/financial-times/o-fonts).**

#### Mixins and functions

The Sass in o-typography provides mixins and functions for use in your project. In the following sections they are in order of most to least preferred method.

##### Use Case mixins

The module has a small number of common typographic use cases that are available as mixins.

```scss
.article {
	p,
	blockquote {
		@include oTypographyBody;
	}
}
```

For wrappers ([see wrapper section](#wrappers)):

```scss
.article__body {
	@include oTypographyBodyWrapper;
}
```

Mixins exist for all the same styles as pre-defined classes, named with a camelCased version of the class name.

##### Type mixins

If you want to output just the font-family, font-size, and line-height, with no additional styles, this can be done with the type mixins.

Sass:

```sass
h1 {
	@include oTypographyDisplay($scale: 7);
}
```

Output:

```css
h1 {
	font-family: FinancierTextDisplay, serif;
	font-size: 48px;
	line-height: 48px;
}

These mixins take three arguments:

- **scale**: The number on the font scale you want to output.
- **line-height**: An override value for the line-height.
- **progressive**: Whether to output progressive font loading styles. `true` by default.

For example, to override the line-height for the serif font at using `1` on the font scale, you would do:

```sass
.content p {
	@include oTypographySerif(1, 28px);
}
```

Output:

```css
.content p {
	font-family: Georgia, serif;
	font-size: 18px;
	line-height: 28px;
}
```

##### Font Scale mixins


##### Using default styles


#### Progressive loading web fonts


## Migration guide

### Migrating from v4 to v5

V5 of o-typography is a complete overhaul of the typographic system for master brand products. The update includes:

- introducing a **new typographic scale**, replacing the type matrix system in the previous version. This affects the [mixins and sizes](#mixins-and-sizes) provided by the API.
- new use cases, updated to reflect the latest master brand styles. These are available via new [CSS classes](#css-classes) and mixins.
- removing access to the `FinancierText` font family.

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

The following mixins have been replaced:

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

#### CSS classes

// Todo

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
