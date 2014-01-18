# Colours [![Build Status](https://travis-ci.org/Financial-Times/o-colors.png?branch=master)](https://travis-ci.org/Financial-Times/o-colors)

This is an [Origami](http://financial-times.github.io/ft-origami/) module that provides variables to define the FT digital colour palette.

## Usage

Install the module or use the [build service](http://financial-times.github.io/ft-origami/docs/developer-guide/build-service) to load it into your page.  If you install the module, you should use it via the `oColorsGetColorFor` function:

    .mything {
    	color: oColorsGetColorFor(article-body-text);
    }

Alternatively, you may extend placeholder classes:

    .mything {
    	@extend %o-colors-article-body-text;
    }

Finally, if the module is configured to be noisy, you may use concrete classes directly in your HTML (not recommended, except for prototypes and demos):

    <p class='o-colors-article-body-text'>Article text</p>

If you load the module via the build service, it will be configured to be noisy automatically.

## Silent configuration

This module support silent use, in which it will output no concrete selectors, only mixins, functions and placeholders.  You can then use these in your own CSS to import only the elements of the module that you need.  This is recommended, and can be configured by setting the following variable before the import in your SASS:

    $o-colors-is-silent: true;
