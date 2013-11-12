# Header module

Origami module for the responsive FT page header.

## Installation

Add this to your dependencies in bower.json:

     "dependencies": {
          "header-module": "http://git.svc.ft.com:9080/git/origami/footer-module.git#{semver}"
     }

It's strongly advised to specify at least the major and minor version as a [semver](http://semver.org/) tag.

## Module contents

This module contains three assets:

* **header.mustache** - The template that renders the header HTML.
* **img/ft-logo.gif** - FT logo image used by ie7 & ie8.
* **main.scss** - The SASS that compiles into the footer CSS.

## Dependencies

This module depends on:

* **origami/grid-module** - for layout CSS
* **Mustache** - for rendering the template
* **SASS** - For compiling the CSS
* **Browser support for HTML5 semantic elements** - or [HTML5 Shiv](https://github.com/aFarkas/html5shiv)/[Shim](https://code.google.com/p/html5shim/)

The header will soon also depend upon **origami/colors-module** for colour variables and **origami/fonts-module** for fonts.

## Stylesheet

The SCSS is defined in `main.scss`. There are no variables, functions or mixins that are expected to be of use outside this module.

### Images

To correctly include the ft logo for ie7 & 8 you will neet to configure your server to make `header-module/img` public and set the `$ft-header-img-root` variable in your sass *before* importing the header module's sass and also make sure 

    $ft-header-img-root: 'assets/header-module/img';
    @import 'header-module/main';
