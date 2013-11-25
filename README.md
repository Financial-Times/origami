# Colours

This is an [Origami](http://financial-times.github.io/ft-origami/) module that provides variables to define the FT digital colour palette.

## Usage

This module contains only SASS variables, so if compiled on its own, it will produce no output.  To be useful, you must install the module in your project, and import `main.scss` into your own CSS, then use the variables to set the colours of your CSS selectors. In general it's advisable to define mappings of colours to particular use cases in your product/module, and then use these use case variables in your product/module's styles. For example, in your own CSS, put:

	@import "colors-module/main";

	$my-body-text-color: $o-colors-ft-charcoal;

	.my-thing {
		color: $my-body-text-color;
	}

To compile your finished CSS bundle, incorporating the colors module and your own CSS, run a SASS processor such as [Smartsass](https://github.com/theblacksmith/smartsass), and set the `include-path` to wherever you put your modules.  If you are using bower to install modules, this is typically `bower_components`:

	scss --include-path bower_components resources/scss/style.scss public/resources/bundle.css
