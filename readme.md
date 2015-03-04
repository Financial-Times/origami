
# o-fonts [![Build Status](https://travis-ci.org/Financial-Times/o-fonts.svg)](https://travis-ci.org/Financial-Times/o-fonts)

This module provides:

* a means of including web fonts (by writing `@font-face` declarations)
* a means of defining use cases for those fonts
* a means of getting the `font-family` for a specific usecase

It does not contain the web font files, which are contained in a separate, private repository ([o-fonts-assets](http://git.svc.ft.com/projects/ORIG/repos/o-fonts-assets/)). The documentation below assumes the font assets have already been added to that.

# Browser support
This module has been verified in Internet Explorer 9+, modern desktop browsers (Chrome, Safari, Firefox, ...) and mobile browsers (Android browser, iOS safari, Chrome mobile).

# Supported fonts and variants

|           BentonSans           |          MillerDisplay         |              MetricWeb          |
|:------------------------------:|:------------------------------:|:-------------------------------:|
|  weight: light, style: normal  | weight: regular, style: normal |   weight: thin, style: normal   |
| weight: regular, style: normal |   weight: bold, style: normal  |  weight: light, style: normal   |
|  weight: bold, style: normal   |  weight: black, style: normal  | weight: regular, style: normal  |
|                                |                                | weight: regular, style: italic  |
|                                |                                |  weight: medium, style: normal  |
|                                |                                |   weight: bold, style: normal   |
|                                |                                |   weight: bold, style: italic   |
|                                |                                | weight: semibold, style: normal |

|       FinancierDisplayWeb      |       FinancierTextWeb         |
|:------------------------------:|:------------------------------:|
| weight: regular, style: normal | weight: regular, style: normal |
| weight: regular, style: italic | weight: regular, style: italic |

# How to

You can include fonts in two different ways:

* Loading `o-fonts` via the build service or with silent mode off (`$o-fonts-is-silent: false;`), so all fonts will be included for you.
* Call the `oFontsInclude()` mixin e.g.

```scss
	@include oFontsInclude(BentonSans, bold);
	@include oFontsInclude(MillerDisplay, $weight: normal, $style: italic);
```

## Specifying fonts

Use this module's `oFontsGetFontFamilyWithFallbacks()` function to return the passed `font-family` name with web safe fallbacks.

For example:

```scss
.myClass {
	font-family: oFontsGetFontFamilyWithFallbacks(BentonSans);
}
```

Compiles to:

```css
.myClass {
	font-family: BentonSans, sans-serif;
}
```

`oFontsGetFontFamilyWithFallbacks()` has the added benefit of warning you if the font specified doesn't exist, and as a result won't be loaded.

Note that you still need to use `oFontsInclude()` to actually include the `@font-face`.

# Adding families or variants

Open `src/scss/_variables.scss` in a text editor. Add the font family name (if it's an entirely new family) and the variant styles to the `$_o-fonts-families` map:

```scss
$_o-fonts-families: (
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

## Checking font rendering

Different browsers use different font formats. Different browsers use different font formats. We only support `.woff` which is supported on all major browsers (>=IE9). You should make sure the demos for the new font family load properly on:

* Chrome
* IE >9
* Firefox
* Safari
