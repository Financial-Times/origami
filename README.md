o-ft-icons
==========

This module has 2 purposes:

1. Provide standard FT-brand icons to Origami-consuming products via a web font and associated CSS classes.
2. Contain SVG icon source files and means of building a web font from these sources.


##To use this module's icons in your product

If not using the [Origami build service](http://financial-times.github.io/ft-origami/docs/developer-guide/build-service/), then add this module as a dependency in your `bower.json`:

    "dependencies": {
        "o-ft-icons": "https://github.com/Financial-Times/o-ft-icons.git"
    }

It is strongly recommended to specify a version tag.

There are three ways to use the icons:

1. Using the predefined CSS classes
2. Extending the predefined SASS placeholders into your own CSS classes
3. Using the standalone icon class creator SASS mixin

### 1. Using the predefined CSS classes

If you are using the Origami build service to include this module, then this is the only way to use the icons.

If you're not using the build service, then silent mode must be turned off, with the following SASS variable:

    $o-ft-icons-is-silent: false;
    
In this mode, the o-ft-icons SASS will output a base icon CSS class (`o-ft-icons-icon`), and a CSS class for _every_ icon in the module (in the format `o-ft-icons-icon--[name]`).

Both the base class and the individual icon class must be applied to the HTML element, for example:

    <i class="o-ft-icons-icon o-ft-icons-icon--columnists"><i>
    
### 2. Extending the predefined SASS placeholders into your own CSS classes

Import the `o-ft-icons` SASS and include the font-face & base icon styles like so:

    @import "o-ft-icons/main";

    @include o-ft-icons-icon-font-face();

    .icon {
        @include o-ft-icons-base-icon-styles();
    }

For each icon you want to use, @extend the SASS placeholder into your own class:

    .icon--columnists {
        @extend %o-ft-icons-icon--columnists;
    }

Apply both the base icon and individual icon classes in the HTML:

     <i class="icon icon--columnists"><i>

### 3. Using the standalone icon class creator SASS mixin

Import the `o-ft-icons` SASS:

    @import "o-ft-icons/main";

The `o-ft-icons-icon-as-class` mixin requires two arguments: icon name and class name. For example:

    @include o-ft-icons-icon-as-class(columnists, my-columnist-icon);

This will output a single CSS class containing all the necessary styles for that icon. It will also include the `font-face` declaration for the icon web font, if it has not already been included.

In your HTML, you can then just use that class on its own:

    <i class="my-columnist-icon"></i>

 If you are using multiple icons, this way is less efficient in that it will output more CSS because the icon base styles are duplicated in the generated CSS for each class you create.


##To add or edit icons and build the web font and demo page

Install the following:

* [fontforge](http://fontforge.org/)
* [ttfautohint](http://www.freetype.org/ttfautohint/#download)

Clone this repo and at the command line, `cd` to the repo's directory and run:

    npm install

Add or edit an SVG file to the `svg` folder (see SVG file naming rules).

Then run

    grunt

This will generate the web font from the SVG sources and also create the HTML demo page showing each of the icons.

###SVG file naming rules

The file must be named according to the following rules:

1. All lower case
2. Contain only letters, numbers and hyphens.
3. No spaces
4. End in `.svg`

Good examples: columnists.svg, back-arrow.svg

Bad examples: RightArrow.svg, linked_in.svg, yahoo!.svg

### Options

IE7 support is switched off by default, but can be switched on by way of a SASS variable:

    $o-ft-icons-support-ie7: true;
    