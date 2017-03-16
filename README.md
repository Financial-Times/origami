# FT Typography [![Build Status](https://circleci.com/gh/Financial-Times/o-typography.png?style=shield&circle-token=9ca314332de2a9b6a80eb8477e097d9acbc96e0b)](https://circleci.com/gh/Financial-Times/o-typography)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm.

----

## Overview

This module provides styles for headings, titles, leads and body content.

### Font system

We’re using a matrix of font variants in order to standardize typography across the site. This provides a common language and helps to avoid inconsistencies across sites.

#### Sans

Sans or SansBold are the common fonts for the site. SansData, SansDataBold and SansDataItalic are included for use in charts and graphics where a heavier weight is needed at smaller sizes.

<table><thead>
<tr>
<th>Font label</th>
<th>Sans</th>
<th>SansBold</th>
<th>SansData</th>
<th>SansDataBold</th>
<th>SansDataItalic</th>
</tr>
</thead><tbody>
<tr>
<td><strong>Font name</strong></td>
<td>Metric regular</td>
<td>Metric semibold</td>
<td>Metric regular</td>
<td>Metric semibold</td>
<td>Metric regular italic</td>
</tr>
<tr>
<td><strong>CSS font-family (weight)</strong></td>
<td>MetricWeb (400)</td>
<td>MetricWeb (600)</td>
<td>MetricWeb (400)</td>
<td>MetricWeb (600)</td>
<td>MetricWeb (400)</td>
</tr>
<tr>
<th><strong>Variant</strong></th>
<th colspan='5'>Size/Line-height (px)</th>
</tr>
<tr>
<td><strong>xl</strong></td>
<td>40/40</td>
<td>40/40</td>
<td>28/32</td>
<td>28/32</td>
<td>28/32</td>
</tr>
<tr>
<td><strong>l</strong></td>
<td>26/27</td>
<td>26/27</td>
<td>21/24</td>
<td>21/24</td>
<td>21/24</td>
</tr>
<tr>
<td><strong>m</strong></td>
<td>20/24</td>
<td>20/24</td>
<td>14/16</td>
<td>14/16</td>
<td>14/16</td>
</tr>
<tr>
<td><strong>s</strong></td>
<td>15/17</td>
<td>15/17</td>
<td>12/14</td>
<td>12/14</td>
<td>12/14</td>
</tr>
<tr>
<td><strong>xs</strong></td>
<td>12/12</td>
<td>12/12</td>
<td>11/13</td>
<td>11/13</td>
<td>11/13</td>
</tr>
</tbody></table>


#### Serif
o-typography contains two variants of Financier; Financier Display and Financier Text. Display fonts are designed to be used at larger sizes whereas text fonts are designed to be legible at smaller sizes. fonts.com has a more detailed run down of the [differences between display and text fonts](http://www.fonts.com/content/learning/fontology/level-1/type-anatomy/text-v-display).

<table><thead>
<tr>
<th>Font label</th>
<th>Serif</th>
<th>SerifBold</th>
<th>SerifItalic</th>
<th>SerifDisplay</th>
<th>SerifDisplayBold</th>
<th>SerifDisplayItalic</th>
</tr>
</thead><tbody>
<tr>
<td><strong>Font name</strong></td>
<td>Financier text regular</td>
<td>Financier text regular</td>
<td>Financier text regular italic</td>
<td>Financier display</td>
<td>Financier display semibold</td>
<td>Financier display italic</td>
</tr>
<tr>
<td><strong>CSS font-family (weight)</strong></td>
<td>FinancierTextWeb (400)</td>
<td>FinancierTextWeb (500)</td>
<td>FinancierTextWeb (400)</td>
<td>FinancierDisplayWeb (400)</td>
<td>FinancierDisplayWeb (600)</td>
<td>FinancierDisplayWeb (200)</td>
</tr>
<tr>
<th><strong>Variant</strong></th>
<th colspan='6'>Size/Line-height (px)</th>
</tr>
<tr>
<td><strong>xl</strong></td>
<td>40/40</td>
<td>40/40</td>
<td>40/40</td>
<td>40/40</td>
<td>40/40</td>
<td>40/40</td>
</tr>
<tr>
<td><strong>l</strong></td>
<td>26/31</td>
<td>26/31</td>
<td>26/27</td>
<td>26/31</td>
<td>26/31</td>
<td>26/27</td>
</tr>
<tr>
<td><strong>m</strong></td>
<td>20/24</td>
<td>20/24</td>
<td>22/22</td>
<td>20/24</td>
<td>20/24</td>
<td>22/22</td>
</tr>
<tr>
<td><strong>s</strong></td>
<td>16/19</td>
<td>16/19</td>
<td>15/17</td>
<td>16/19</td>
<td>16/19</td>
<td>15/17</td>
</tr>
<tr>
<td><strong>xs</strong></td>
<td>12/12</td>
<td>12/12</td>
<td>11/12</td>
<td>11/12</td>
<td>11/12</td>
<td>11/12</td>
</tr>
</tbody></table>

## Usage

There are two ways to use o-typography:

1. Using the predefined CSS classes
2. Using Sass mixins in your own CSS classes

If you are using the [Origami Build Service](http://origami.ft.com/docs/developer-guide/build-service/) to add this module's CSS to your page, then only option 1 is available to you.

### 1. Using the predefined CSS classes

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

```html
<aside class="o-typography-aside-wrapper">
	<h3>Aside Title</h3>
	<article>
		<h4><a>Example Headline</a></h4>
	</article>
	<div>
		<p>Some explanatory text would go here</p>
	</div>
</aside>
```

More detailed examples of the wrappers can be found in the demos.

Pre-defined classes are not available to module developers. Module developers are required to use the mixins.

### 2. Using the mixins

If you don't want to include the pre-defined classes in your HTML (or are a module developer) you may instead use the mixins provided:

#### Using the font system

The font system is a matrix which defines small building blocks that can used as a base for typographic elements. Having a small subset of sizes and styles allows for greater consistency.

Type name					| Standard mixin																	| Size/Line-height only mixin
-------------------| ----------------------------------------------- | -----------------------------------
Sans							 | `@include oTypographySans([xl-xs])`							 | `@include oTypographySansSize([xl-xs])`
SansBold					 | `@include oTypographySansBold([xl-xs])`					 | `@include oTypographySansBoldSize([xl-xs])`
SansData					 | `@include oTypographySansData([xl-xs])`					 | `@include oTypographySansDataSize([xl-xs])`
SansDataBold			 | `@include oTypographySansDataBold([xl-xs])`			 | `@include oTypographySansDataBoldSize([xl-xs])`
SansDataItalic		 | `@include oTypographySansDataItalic([xl-xs])`		 | `@include oTypographySansDataItalicSize([xl-xs])`
Serif							| `@include oTypographySerif([xl-xs])`							| `@include oTypographySerifSize([xl-xs])`
SerifBold					| `@include oTypographySerifBold([xl-xs])`					| `@include oTypographySerifBoldSize([xl-xs])`
SerifItalic				| `@include oTypographySerifItalic([xl-xs])`				| `@include oTypographySerifItalicSize([xl-xs])`
SerifDisplay			 | `@include oTypographySerifDisplay([xl-xs])`			 | `@include oTypographySerifDisplaySize([xl-xs])`
SerifDisplayBold	 | `@include oTypographySerifDisplayBold([xl-xs])`	 | `@include oTypographySerifDisplayBoldSize([xl-xs])`
SerifDisplayItalic | `@include oTypographySerifDisplayItalic([xl-xs])` | `@include oTypographySerifDisplayItalicSize([xl-xs])`

Example, using the font system in Sass

```scss
.component__text {
	@include oTypographySans(m);
	color: #505050;
}
```

#### Using default styles

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


## Silent mode ([docs](http://origami.ft.com/docs/syntax/scss/#silent-styles)) <a name="silentmode"></a>

When you're not consuming this module via the build service, by default this module is set to 'silent' - meaning its Sass will not output any CSS classes, only Sass mixins.

This can be turned off by setting a variable before you import the Sass:

```scss
$o-typography-is-silent: false;

@import 'o-typography/main';
```

By default, when unsilenced, o-typography will download a number of webfonts. To suppress this use `$o-typography-load-fonts`

```scss
$o-typography-is-silent: false;
$o-typography-load-fonts: false;

@import 'o-typography/main';
```

### Web fonts

When running in silent mode, o-typography does not load web fonts, products should load web fonts themselves. **Load FT's custom web fonts using [o-fonts](https://github.com/financial-times/o-fonts).**

When running in non-silent mode, o-typography loads all web fonts which are used.

### Progressively loading web fonts

**Note: this functionality is not available when using the build service**

One of the drawbacks of using web fonts is some browsers hide the text while the font is downloading (Flash of Invisible Text, aka FOIT). A common pattern for avoiding this is to initially use a system fallback font, and once we know the web font has loaded, add a class to the `html` element and use this to 'upgrade' to the web font, e.g.

```
.text {
	font-family: serif;
}

.font-loaded-serif .text {
	font-family: FinancierDisplayWeb,serif;
}
```

In this case we added a `font-loaded-serif` class to the `html` element once we were sure the web font `FinancierDisplayWeb` was downloaded.

To help with this pattern, each `oTypographyXDisplayItalic` mixin takes a second argument, `$load-progressively`, which, if set to `true`, outputs css in the above format.

Initially we need to set which fonts we want to follow this pattern, by setting the `$o-typography-progressive-fonts` variable

We can also override what the 'loaded' class is prefixed with; `$o-typography-loaded-prefix` (default is `o-typography--loaded`)

A further thing to note is the fallback fonts are generally of a different size to the webfont, so we also scale the font, e.g.

```
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

```
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

```
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

----

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
