# Header [![Build Status](https://travis-ci.org/Financial-Times/o-header.svg)](https://travis-ci.org/Financial-Times/o-header)

Responsive FT page header.

Note: this module used to be called `o-ft-header` which is why there are references to that name in verions 1 and 2 of the module.

## Browser Support

Tested and working on:

|  Browsers  | Primary Experience | Core Experience |
|:----------:|:------------------:|:---------------:|
|   Chrome   |        35+         |       35+       |
|   Firefox  |        30+         |       30+       |
|   Safari   |        7+          |       7+        |
|   IE       |        9+          |       8+        |

Known issues:

* IE: 
	* Masthead not displaying properly
* IE8 and IE9:
	* Secondary bar doesn't occupy full width of XL screens because they don't support _linear-gradient_.
* IE8:
	* It doesn't support the `<nav>` and `<header>` element. Products need to use HTML5Shiv which is bundled in Modernizr. Also, it runs as core experience.

## Element containers

The header consists of the following content containers:

* Primary: Left
* Primary: Centre
* Primary: Right
* Primary: Featured
* Secondary: Left
* Secondary: Right

Each content container can contain one of the following:

* Custom content (e.g) - brand-specific logo/title etc
* A title
* Navigation (_primary_ theme)
* Navigation (_secondary_ theme)
* Navigation (_tools_ theme)
* Breadcrumb

## Navigation

For navigation, this module uses [o-hierarchical-nav](https://github.com/Financial-Times/o-hierarchical-nav), so please check out its documentation to add it in your header.

There are three horizontal Navigation styles depending on the class you add to the `<nav>`:

* __Primary__: `o-header__nav--primary-theme`
* __Secondary__: `o-header__nav--secondary-theme`
* __Tools__: `o-header__nav--tools-theme`

Primary and Secondary navigations work identically except for the fact the one goes in a Primary container, and the other in the Secondary Container. They can both hold Standalone Items, [Sub-Levels](https://github.com/Financial-Times/o-hierarchical-nav#parent-of-sub-level) and [Controllers for a DOM element](https://github.com/Financial-Times/o-hierarchical-nav#controller-for-dom-element).

As for the Tools theme, it should only be used in a Primary Container, normally in Primary Right. It's intended to be used to contain an icon and text in each element of the navigation. An example of the markup:

```html
<nav class="o-header__primary__right o-hierarchical-nav o-header__nav--tools-theme" data-o-component="hierarchical-nav">
	<ul data-o-hierarchical-nav-level="1"><!--
	--><li data-priority="1"><a><i class="demo__icon demo__icon__search"></i>Tool 1</a></li><!--
	--><li data-priority="3"><a><i class="demo__icon demo__icon__settings"></i>Tool 2</a></li><!--
	--><li data-priority="4"><a><i class="demo__icon demo__icon__share"></i>Tool 3</a></li><!--
	--><li data-priority="2"><a><i class="demo__icon demo__icon__account"></i>Tool 4</a></li><!--
	--><li data-more class="o-hierarchical-nav__parent" aria-hidden="true"><a><i class="demo__icon demo__icon__more"></i>More</a></li><!--
	--></ul>
</nav>
```

### Responsiveness

On primary experience, all navigations use [o-squishy-list](https://github.com/Financial-Times/o-squishy-list) to set priorities to top level items and only show as many items it can to fit the available width.

### Hover events

Like it's explained [here](https://github.com/Financial-Times/o-hierarchical-nav#hover-events), you need to implement [o-hoverable](https://github.com/Financial-Times/o-hoverable#using-in-a-product).

### Arrow icons

So that your nav elements have arrows telling the user in which direction the sub-level menu is going to appear, you can add an `<i>` tag with the class `.o-hierarchical-nav__parent_down-arrow` like explained [here](https://github.com/Financial-Times/o-hierarchical-nav#arrows).

## Brands

To add your brand color, you need to set the `brand` colour custom use case like this:

```scss
@include oColorsSetUseCase(product-brand, background, claret);
```

This brand colour will be used in both this module and in [o-ft-footer](http://github.com/Financial-Times/o-ft-footer). If you want a different brand colour for the header than is used in the footer, set the `o-header-product-brand` use case instead.

_The `$o-header-brand-color` variable is now deprecated and will be removed in next major release._

If you want mega-dropdowns to appear showing part of your branded secondary container, you would also need to add the class `.o-header__mega-dropdown--primary` on your DOM element.

## Logos

If you want to have the FT logo on your website, you just need to have the following markup:

```html
<div class="o-header__logo o-header__logo--ft">
	<a href="http://www.ft.com"><abbr title="Financial Times">FT</abbr></a>
</div>
```

You can also have a 'Back to FT.com' button on your navigation based on the tools theme using this markup:

```html
<a href="http://ft.com"><i class="o-header__back-to-ft">Back to FT.com</i></a>
```

## Adjusting widths

The primary-left, primary-right, primary-featured and secondary-left need to have a fixed width for primary-centre to adjust appropriately. To change any the default widths, you would need to add the following variables to your stylesheet before importing this module's Sass:

```scss
$o-header-primary-left-width
$o-header-secondary-left-width
$o-header-primary-featured-width
```

You may specify specific widths for different layouts, [based on o-grid](https://github.com/Financial-Times/o-grid):

```scss
// always 254px wide
$o-header-primary-left-width: 254px;

// 254px wide by default, and 303px wide at the medium layout and up
$o-header-primary-left-width: (default: 254px, M:  303px);
```

## JavaScript instantiation

An __o-header__ object must be constructed for every `<header>` you have on your page that uses this module.

```javascript
var oHeader = require('o-header');
var header = document.querySelector('.o-header');
var ftHeader = new oHeader(header);
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct an __o-header__ object for each element with a `data-o-component="o-header"` attribute:

```javascript
require('o-header');
document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```
## Upgrading from 2.x.x

### 1. Renaming the module

Rename all instances of `o-ft-header` into `o-header`.

Rename all instances of `oFtHeader` into `oHeader`.

### 2. Markup changes

Add `<div class="o-header__inner">` in `<div class="o-header__container">`:

```html
<header data-o-component="o-header" class="o-header">
	<div class="o-header__container">
+		<div class="o-header__inner">
			<div class="o-header__primary">
				{{{o-header.primary}}}
			</div>
			<div class="o-header__secondary">
				{{{o-header.secondary}}}
			</div>
+		</div>
	</div>
</header>
```

Note that o-header v3 relies on the o-grid v3 which introduces breaking changes.

### 3. Font settings

The header now inherits the `font-family` set in your application.
