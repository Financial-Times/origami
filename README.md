# FT Typography [![Build Status](https://travis-ci.org/Financial-Times/o-typography.png?branch=master)](https://travis-ci.org/Financial-Times/o-typography)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm.

----

## Overview

This module provides styles for Headings, Titles, Leads and body content.

### Font system

We’re using a matrix of font variants in order to standardize typography across the site. This provides a common language and helps to avoid inconsistencies.

[![Font system](https://raw.githubusercontent.com/Financial-Times/o-typography/next-type/img/font-matrix.png)](https://raw.githubusercontent.com/Financial-Times/o-typography/next-type/img/font-matrix.png)

### Recommended setup

```
html {
	font-family: $o-typography-sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
	-moz-font-feature-settings: "liga" on;
}
```

There are two main ways to use these typographic styles:

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

See docs/demo.html for a full list of the classes provided and their effects.

In addition to applying classes individual to elements, body styles can be applied to an HTML element and descendent `h2, h3, p, a, strong, em, small, sup, sub, ul, ol, li` elements will have styling applied.

body styles:

```html
<div class="o-typography-body-wrapper">
	<h2>Heading medium</h2>
	<p>Body block with <strong>styled inline text</strong>.</p>
	<h3>Heading small</h3>
	<p>Body block with <em>styled inline text</em>.</p>
</div>
```

Pre-defined classes are not available to module developers. Module developers are required to use the mixins.

### 2. Using the mixins

If you don't want to include the pre-defined classes in your HTML (or are a module developer) you may instead use the mixins provided:

#### Using the font system

The font system is a matrix which defines small building blocks that can used as a base for typographic elements. Having a small subset of sizes and styles allows for greater consistency.

Type name |         Standard mixin         |    Size/Line-height only mixin
----------| ------------------------------ | -----------------------------------
Alpha     | `@include oTypographyAlpha([1-5])`   | `@include oTypographyAlphaSize([1-5])`
Bravo     | `@include oTypographyBravo([1-5])`   | `@include oTypographyBravoSize([1-5])`
Charlie   | `@include oTypographyCharlie([1-5])` | `@include oTypographyCharlieSize([1-5])`
Delta     | `@include oTypographyDelta([1-5])`   | `@include oTypographyDeltaSize([1-5])`
Echo      | `@include oTypographyEcho([1-5])`    | `@include oTypographyEchoSize([1-5])`
Foxtrot   | `@include oTypographyFoxtrot([1-5])` | `@include oTypographyFoxtrotSize([1-5])`

Example, using the font system in Sass

```scss
.component__text {
	@include oTypographyAlpha(3);
	color: #505050;
}
```

#### Using default styles

The module defines a small number of common typographic use cases that can be included as mixins.

```scss
.article {
	p,
	blockquote {
		@include oTypographyBodyBlock;
	}
}
```

For wrappers:

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

### Web fonts

When running in silent mode, o-typography will only load fonts which are required by the mixins you include.

When running in non-silent mode, o-typography loads all web fonts required by the module.

----

## License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
