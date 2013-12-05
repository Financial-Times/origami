# Header module

Origami module for the responsive FT page header.

## Installation

Add this to your dependencies in bower.json:

     "dependencies": {
          "ft-header-module": "http://git.svc.ft.com:9080/git/origami/header-module.git#{semver}"
     }

It's strongly advised to specify at least the major and minor version as a [semver](http://semver.org/) tag.

## Module contents

This module contains three assets:

* **main.ms** - The template that renders the header HTML.
* **img/ft-logo.gif** - FT logo image used by nrowser that don't support inline svg
* **main.scss** - The SASS that compiles into the footer CSS.

## Dependencies

This module depends on:

* **origami/grid-module** - for layout CSS
* **Mustache** - for rendering the template
* **SASS** - For compiling the CSS
* **Modernizr** - for `inlinesvg` feature detection and cross-browser HTML5 semantic elements
* **ft-velcro** - for colours and typography
* **origami/assets-module** - for build-agnostic referencing of static assets from stylesheets 


## Stylesheet

The SCSS is defined in `main.scss`.

###Variables
To use these set them *before* including `header-module/main.scss` in your stylesheet

* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header has `position: fixed`);
* `$o-ft-header-sticky`: *[$o-grid-small,$o-grid-medium]* Configures when a 'sticky' fixed position header is used:
	* `false` - header is never sticky
	* `true` - header is always sticky
	* comma-separated list of [grid-module layout identifiers](link-to-grid-module-docs-eventually) - header will be sicky at these layout sizes only.
* `$o-ft-header-version` and `$o-ft-header-assets-path` which should only be altered when configuring how products use [origami/assets-module](http://git.svc.ft.com/summary/?r=origami/assets-module.git).

##Development
To install locally (including demo files) run the following from terminal (you will already need bower, node, npm and grunt-cli installed globally):

	git clone http://git.svc.ft.com:9080/git/origami/header-module.git
	cd header-module
	npm install
	bower install
	grunt origami-demo

The demo will be avilable at `/demos/main.html`. To live update the demo run `grunt watch`.
