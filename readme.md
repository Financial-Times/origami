# Header module

Origami module for the responsive FT page header.

## Installation

To include `o-ft-header` in your module or product run

	bower install o-ft-header=http://git.svc.ft.com:9080/git/origami/o-ft-header.git --save

## Module contents

This module contains three assets:

* **main.mustache** - The template that renders the header HTML.
* **img/ft-logo.gif** - FT logo image used by nrowser that don't support inline svg
* **main.scss** - The SASS that compiles into the footer CSS.

## Stylesheet

The SCSS is defined in `main.scss`.

### Variables
To use these set them *before* including `o-ft-header/main.scss` in your stylesheet

* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header has `position: fixed`);
* `$o-ft-header-z-index`: *[false]* z-index of header. Whn header is not fixed this also sets `position: relative`
* `$o-ft-header-sticky`: *[$o-grid-small,$o-grid-medium]* Configures when a 'sticky' fixed position header is used:
	* `false` - header is never sticky
	* `true` - header is always sticky
	* comma-separated list of [o-grid layout identifiers](link-to-grid-module-docs-eventually) - header will be sticky at these layout sizes only.
* `$o-ft-header-version` and `$o-ft-header-assets-path` which should only be altered when configuring how products use [origami/assets-module](http://git.svc.ft.com/summary/?r=origami/o-assets.git).

## View model
`main.mustache` accepts a view model with the following properties
	
	* `oFtHeaderTopbarItems`: Html for items to include at the right hand side of the header e.g. serach box, user details

##Development
To install locally (including demo files) run the following from terminal (you will already need bower, node, npm and grunt-cli installed globally):

	git clone http://git.svc.ft.com:9080/git/origami/o-ft-header.git
	cd o-ft-header
	npm install
	bower install
	grunt origami-demo

The demo will be avilable at `/demos/main.html`. To live update the demo run `grunt watch`.
