#FT Typography [![Build Status](https://travis-ci.org/Financial-Times/o-ft-typography.png?branch=master)](https://travis-ci.org/Financial-Times/o-typography)

Typographical styles for FT branded sites - fonts, weight, colors, sizes and vertical rhythm

## Overview

There are two categories of typography style - **general**, used for informational pages, forms, application user interfaces etc, and **article**, used for editorial content.  There are also two ways of accessing each style - by applying individual styles, or by using a wrapper class that styles all its immediate descendents by interpreting native HTML semantic elements. Finally, any combination of the above can be applied in two different ways:

* Using pre-defined classes
* Extending placeholder classes

## Usage

### Pre-defined classes

Pre-defined classes are provided and can be used directly in your HTML.  In the case of styling naked semantic tags, the effect of the container class only extends to immediate descendents.  Here is an example using pre-defined classes to apply a single specific style from the **article** group:

    <div class="o-ft-typography-article-subheading1">Article subheading 1</div>

And the same style applied using its wrapper class:

    <div class="o-ft-typography-article-body-wrapper">
      <h2>Article subheading 2</h2>
    </div>

See docs/demo.html for a full list of the classes provided and their effects.  In order to use pre-defined classes, the module must be built in non-silent mode (see below; this is the only option when using the build service).

Pre-defined classes are not available to module developers.  Module developers are required to use placeholders.

### Placeholder classes

If you don't want to include the pre-defined classes in your HTML (or are a module developer) you may instead extend the typography placeholder classes in your own SASS.  You can apply both individual element styles:

    .article {
      p,
      blockquote {
        @extend %o-ft-typography-body__block;       	
      }
    }

And wrappers:

    .article {
      @extend %o-ft-typography-article-body-wrapper;
    }

Placeholders exist for all the same styles as pre-defined classes, and have the same names.

### Wrapper classes

Wrapper classes apply styles automatically to naked `h2, h3, p, a, strong, em, small, sup, sub, ul, ol, li` tags that are descendents of the element to which the wrapper class is applied.  There is one wrapper class (and placeholder) for each category of typography:

* `o-ft-typography-body-wrapper` General
* `o-ft-typography-article-body-wrapper` Article


### Silent mode

To prevent built output from containing all possible classes and styles, set `$o-ft-typography-is-silent: true` before the `import` statement that loads the module. You will also need to include one or more of the following lines in your sass in order to load the fonts required by the typography you are using (due to the limitations of sass' mixins, this cannot at present be done automatically)

	@include oFontsInclude(BentonSans);
	@include oFontsInclude(BentonSans, bold);
	@include oFontsInclude(MillerDisplay);

Note that module developers must not set configuration for imported modules, but must assume that the imported module will be silent.

## TODO
* Specify and enforce the vertical rhythm using a variable and mixins
