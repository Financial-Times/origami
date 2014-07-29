
# o-fonts [![Build Status](https://travis-ci.org/Financial-Times/o-fonts.svg)](https://travis-ci.org/Financial-Times/o-fonts)

This module provides:

* a means of including web fonts (by writing `@font-face` declarations)
* a means of defining use cases for those fonts
* a means of getting the `font-family` for a specific usecase

It does not contain the web font files, which are contained in a separate, private repository (`o-fonts-assets`). The documentation below assumes the font assets have already been added to that.

# Browser support
This module has been verified in Internet Explorer 7+, modern desktop browsers (Chrome, Safari, Firefox, ...) and mobile browsers (Android browser, iOS safari, Chrome mobile).

## Adding a new font family or variant

Open `src/scss/_variables` in a text editor. Add the font family name (if it's an entirely new family) and the variant styles to the `$_o-fonts-families` map:

```sass
$_o-fonts-families: (
  BentonSans: (lighter, normal, bold),
  MillerDisplay: (normal, bold),
  Clarion: (normal, bold, (normal, italic)),
  NewFontFamily: (new style1, new style2)
);
```

Then follow these steps below for each variant in the family.

## Adding a new variant

Finally, add a new entry in `demos/src/config.json`, like so:

    "demos": {
        "bentonsans-lighter": {
            "data": { "font": "bentonsans-lighter" }
        },

And a new entry in `demos/src/demo.scss`:

```css
.demo-bentonsans-normal .demo-example {
  font-family: BentonSans;
}
```

## Building demo pages

Demo pages are built using [origami-build-tools](https://github.com/Financial-Times/origami-build-tools), for example:

    origami-build-tools demo --local --watch

This will generate demo pages in `demos/` for each demo defined in `demos/src/config.json`. Open the demo page(s) in a range of browsers to check they render as you expect.

### Checking font rendering

Different browsers use different font formats. This is why there needs to be `.eot`, `.ttf` and `.woff` versions of each font. In order to check all formats of the font render correctly, the demo pages need to be opened in the following browsers:

* Internet Explorer 7 or 8 - for the `.eot` font
* Safari on iPhone or iPad - for the `.ttf` font
* Chrome - for the `.woff` font

## For developers

Follow the standard Origami process for using this module:

* Add an entry in your project's `bower.json` dependencies
* `@import "o-fonts/main"` in your SASS

To load any given font you will need to call the `oFontsInclude()` mixin e.g.

    @include oFontsInclude(BentonSans, bold);
	@include oFontsInclude(Clarion, normal, italic);

### Specifying fonts

Use this module's `oFontsGetFontFamilyWithFallbacks()` function to return the passed `font-family` name with web safe fallbacks.

For example:

```sass
.myClass {
    font-family: oFontsGetFontFamilyWithFallbacks(BentonSans);
}
```

Would compile to something like this:

```css
.myClass {
    font-family: BentonSans, Helvetica, Arial, sans-serif;
}
```

`oFontsGetFontFamilyWithFallbacks()` has the added benefit of warning you if the `@font-face` may not have been included.

Note that you still need to use `oFontsInclude()` to actually include the `@font-face`.
