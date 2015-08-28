# FT Typography [![Build Status](https://travis-ci.org/Financial-Times/o-typography.png?branch=master)](https://travis-ci.org/Financial-Times/o-typography)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm.

----

## Overview

This module provides styles for Headings, Titles, Leads, Metadata, and body content.

Body content styles come in two categories:

* **general**, used for informational pages, forms, application user interfaces etc.
* **article**, used for editorial content.

### Web fonts

o-typography **does not load web fonts**, products should load web fonts themselves.

**Load FT's custom web fonts using [o-fonts](https://github.com/financial-times/o-fonts).**

## Usage

There are two main ways to use these typographic styles:

1. Using the predefined CSS classes
2. Using Sass mixins in your own CSS classes

If you are using the [Origami Build Service](http://origami.ft.com/docs/developer-guide/build-service/) to add this module's CSS to your page, then only option 1 is available to you.

### 1. Using the predefined CSS classes

If you're not using the build service, [turn off 'silent mode'](#silentmode).

Pre-defined CSS classes are provided and can be used directly in your HTML. All classes are prefixed with 'o-typography-', for example `o-typography-heading-large`.

The classes do not depend on any specific HTML element, but appropriate semantic elements should be chosen.

```html
<h2 class="o-typography-heading-medium">Heading medium</h2>
```

See docs/demo.html for a full list of the classes provided and their effects. 

In addition to applying classes individual to elements, body styles can be applied to an HTML element and descendent `h2, h3, p, a, strong, em, small, sup, sub, ul, ol, li` elements will have styling applied.

**General** body styles:

```html
<div class="o-typography-body-wrapper">
	<h2>Heading medium</h2>
	<p>Body block with <strong>styled inline text</strong>.</p>
	<h3>Heading small</h3>
	<p>Body block with <em>styled inline text</em>.</p>
</div>
```

**Article** body styles:

```html
<div class="o-typography-article-body-wrapper">
	<h2>Article subheading 1</h2>
	<p>Article body block with <strong>styled inline text</strong>.</p>
	<h3>Article subheading 2</h3>
	<p>Article body block with <em>styled inline text</em>.</p>
</div>
```

Pre-defined classes are not available to module developers. Module developers are required to use the mixins.

### 2. Using the mixins

If you don't want to include the pre-defined classes in your HTML (or are a module developer) you may instead use the mixins provided:

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
.article {
	@include oTypographyArticleBodyWrapper;
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

----

## License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
