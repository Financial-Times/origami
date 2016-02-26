# o-ft-icons [![Build Status](https://travis-ci.org/Financial-Times/o-ft-icons.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-icons)

Icon font with helper classes, and resolution-independent SVG icons to load via the [responsive image service](http://image.webservices.ft.com).

## Quick start

```html
<!-- Load web fonts with @font-face declarations  -->
<link rel="stylesheet" href="//build.origami.ft.com/v2/bundles/css?modules=o-ft-icons@^2.0.0" />

<!-- In your markup, use the helper classes, such as: -->
<i class="o-ft-icons-icon o-ft-icons-icon--arrow-down"></i>
```

[Complete list of available icons](http://build.origami.ft.com/v2/files/o-ft-icons@latest/demos/main.html)

## Advanced usage

There are multiple ways to use the icons:

1. Using the CSS helper classes
1. Extending the predefined Sass placeholders into your own CSS classes
1. Resolution independent SVGs, using the [responsive image service](http://image.webservices.ft.com/)

### 1. Using the CSS helper classes

```scss
// public/bundle.scss

$o-ft-icons-is-silent: false;
@import "o-ft-icons/main";
```

```html
<!-- In your markup, use the helper classes, such as: -->
<i class="o-ft-icons-icon o-ft-icons-icon--columnists"><i>
```

### 2. Extending the predefined Sass placeholders into your own CSS classes

```scss
// public/bundle.scss

@import "o-ft-icons/main";

// Load the webfont that contains all icons as glyphs
@include oFtIconsFontFace();

.icon-columnists {
	// Base icon styles
	@include oFtIconsBaseIconStyles();

	// Extend icon styles
	@extend %o-ft-icons-icon--columnists;
}
```

```html
<i class="icon-columnists"></i>
```

### 3. Resolution independent SVGs, using the image service

The [responsive image service](http://image.webservices.ft.com/) helps serving resolution-independent SVG icons with a resized PNG fallback:

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

We provide a mixin to make this easier which is documented in Sassdoc [http://registry.origami.ft.com/components/o-ft-icons#docs-css](http://registry.origami.ft.com/components/o-ft-icons#docs-css).

----

## Add / edit icons, build the web font and demo page

**warning** Fontforge is notoriously flaky at the moment. We are planning to deprecate its use shortly so if you need to make a minor amendment and these steps don't work for you first time, it might be worth getting someone who has fontforge working on their machine already to make the change. If you really want to try and get this running on your machine and it's giving you trouble, a gist of the steps I tried is here: https://gist.github.com/alicebartlett/1e785aa6a9baa8876d3f

1. Install the following:

	* [fontforge](http://fontforge.org/)
	* [ttfautohint](http://www.freetype.org/ttfautohint/#download)
	* [X11](http://support.apple.com/kb/ht5293) (Mac only)

2. Clone the repository and install dependencies:

		git clone https://github.com/Financial-Times/o-ft-icons.git
		cd o-ft-icons
		obt install

3. Add or edit an SVG file to the `svg` folder (see [SVG file naming rules](#svg-file-naming-rules)).
4. Generate the web font from the SVG sources:

		grunt

5. Check the rendering locally (on http://localhost:8080/demos/local):

		obt demo --runServer

6. Before publishing your work, generate the component's demos:

		obt demo

### SVG version
The icons module uses SVG version 1.1. Files can be created in any vector graphics software. In Adobe Illustrator use the "save as" function and set to version 1.1

### SVG file naming rules

The file must be named according to the following rules:

1. All lower case
2. Contains only letters, numbers and hyphens (no spaces)
3. Ends with `.svg`

Good: `columnists.svg`, `back-arrow.svg`
Bad: `RightArrow.svg`, `linked_in.svg`, `yahoo!.svg`

### IE7 support

IE7 support is handled by an IE7 CSS expression hack, which is bundled into the main icons mixin.

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
