# o-ft-icons [![Build Status](https://travis-ci.org/Financial-Times/o-ft-icons.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-icons)

Icon font with helper classes, and resolution-independant SVG icons to load via the image service.

## Quick start

```html
<!-- Load web fonts with @font-face declarations  -->
<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-ft-icons@^2" />

<!-- In your markup, use the helper classes, such as: -->
<i class="o-ft-icons-icon o-ft-icons-icon--arrow-down"></i>
```

[Complete list of available icons](http://build.origami.ft.com/files/o-ft-icons@latest/demos/main.html)

## Advanced usage

There are multiple ways to use the icons:

1. Using the CSS helper classes
2. Extending the predefined Sass placeholders into your own CSS classes
3. Resolution independant SVGs, using the [image service](http://image.webservices.ft.com/v1/)

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

### 3. Resolution independant SVGs, using the image service

The [image service](http://image.webservices.ft.com/v1/) helps serving resolution independant icons in SVG with a resized PNG fallback:

```scss
element {
	display: inline-block;
	width: 100px;
	height: 100px;

	// Older browsers: PNG fallback (resized to 100px wide)
	background-image: url(//image.webservices.ft.com/v1/images/raw/fticon:tick?width=100&format=png&source=my-product);

	// Modern browsers: SVG covering the whole size of the element
	background-image: url(//image.webservices.ft.com/v1/images/raw/fticon:tick?format=svg&source=my-product), none;
	background-size: cover;
}
```

----

## To add or edit icons and build the web font and demo page

Install the following:

* [fontforge](http://fontforge.org/)
* [ttfautohint](http://www.freetype.org/ttfautohint/#download)

On a Mac <ahref="http://brew.sh/">Homebrew</a> is a popular package manager to install these programs. You'll also need <a href="http://support.apple.com/kb/ht5293">X11</a> on your Mac.


Clone this repo and at the command line, `cd` to the repo's directory and run:

	npm install

Add or edit an SVG file to the `svg` folder (see SVG file naming rules).

Next, run:

	grunt

This will generate the web font from the SVG sources.

Finally, run:

	origami-build-tools demo --local

###SVG version
The icons module uses SVG version 1.1. Files can be created in any vector graphics software. In Adobe Illustrator use the "save as" function and set to version 1.1

###SVG file naming rules

The file must be named according to the following rules:

1. All lower case
2. Contain only letters, numbers and hyphens.
3. No spaces
4. End in `.svg`

Good examples: columnists.svg, back-arrow.svg

Bad examples: RightArrow.svg, linked_in.svg, yahoo!.svg

### IE7 support

IE7 support is handled by an IE7 CSS expression hack, which is bundled into the main icons mixin.
