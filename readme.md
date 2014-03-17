
# o-fonts

This module provides:

* @font-face definitions
* SASS variables

It does not contain the web font files, which are contained in a separate, private repository (`o-fonts-assets`). The documentation below assumes the font assets have already been added to that.

## Adding a new font family

If you are adding a font from a completely new font-family open `src/scss/_variables` in a text editor and add the font family name to the end of `$o-fonts-supported`. e.g if your font is `Courier-Light.ttf` add `Courier` to the end of the list.

Then follow these steps below for each variant in the family.

## Adding a new variant

For each variant font-family, add a new variable in `src/scss/_variables` in the following format:

    $o-fonts-<family>-<variant>: <family>-<variant>, fallbacks;
    
For example:

    $o-fonts-bentonsans-lighter: BentonSans-lighter, $o-fonts-sans-serif;

Also, for each variant, add an entry in the `oFontsIncludeAll` mixin:

    @mixin oFontsIncludeAll() {
      @include oFontsInclude(BentonSans, Lighter);

Finally, add a new entry in `demos/src/config.json`, like so:

    "demos": {
        "bentonsans-lighter": {
            "data": { "font": "bentonsans-lighter" }
        },


## Building demo pages

Demo pages are built using [origami-build-tools](https://github.com/Financial-Times/origami-build-tools), for example:

    origami-build-tools demo demos/src/config --local --watch

This will generate demo pages in `demos/` for each font and variant. Open the demo page(s) in a range of browsers to check they render as you expect.


### Checking font rendering

Different browsers use different font formats. This is why there needs to be `.eot`, `.ttf` and `.woff` versions of each font. In order to check all formats of the font render correctly, the demo pages need to be opened in the following browsers:

* Internet Explorer 7 or 8 - for the `.eot` font
* Safari on iPhone or iPad - for the `.ttf` font
* Chrome - for the `.woff` font

## For developers

Add this to your project's `bower.json` dependencies:

    dependencies": {
        "o-fonts": "http://git.svc.ft.com:9080/git/origami/o-fonts.git#{semver}"
    }

In your project's SASS files, import the o-fonts's `main.scss`:

    @import 'o-fonts/main.scss';

It is assumed you have your bower_components folder listed in your SASS loadPath. If not, you will need to include the full path to the o-fonts.

To load any given font you will need to call the `oFontsInclude()` mixin e.g.

    @include oFontsInclude(BentonSans, Bold);
	@include oFontsInclude(Clarion, Normal, Italic);

### Specifying fonts

The following variables are provided to specify standard font stacks:

* `$o-font-sansserif` - for Helvetica, Arial, sans-serif;
* `$o-font-serif` - for Georgia, 'Times New Roman', serif;

For all available font families and variants variables similar to the following are also automatically generated.

	$o-fonts-bentonsans-lighter: BentonSans-lighter, $o-fonts-sans-serif;
	$o-fonts-bentonsans-normal: BentonSans-normal, $o-fonts-sans-serif;
	$o-fonts-bentonsans-bold: BentonSans-bold, $o-fonts-sans-serif;
	$o-fonts-clarion-italic: Clarion-italic, $o-fonts-serif;

*Note that you still need to use oFontsInclude() to actually include the font family*
