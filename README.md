# Footer module

Origami module for the responsive FT page footer.

## Installation

Add this to your depdendencies in bower.json:

     "dependencies": {
          "o-ft-footer": "http://git.svc.ft.com:9080/git/origami/o-ft-footer.git#{semver}"
     }

It's strongly advised to specify at least the major and minor version as a [semver](http://semver.org/) tag.

## Module contents

This module contains three assets:

* **main.ms** - The template that renders the footer HTML.
* **footer.json** - The footer content to be rendered by the template.
* **main.scss** - The SASS that compiles into the footer CSS.
* **img/pearson_sprite.gif** - gif fallback image for Pearson branding

## Dependencies

This module depends on:

* **origami/o-grid** - for layout CSS
* **ft-velcro (v2)** - for colours and fonts
* **Mustache** - for rendering the template
* **SASS** - for compiling the CSS
* **Modernzr** - for Inline SVG support detection, and shim/shiv of HTML5 semantic elements
* **ft-velcro** - for colours and typography
* **origami/assets-module** - for build-agnostic referencing of static assets from stylesheets 

## Template

`main.ms` expects a `footer` object, containing three properties:

* `links` - an array of objects, each containing two properties:
    * `text` - The link text to display, e.g. "Privacy policy"
    * `href` - The path for the link to go to, e.g. "http://www.ft.com/privacy/policy"
* `copyrightYear` - The year to display with the copyright, e.g. 2013
* `copyrightText` - The text to display alongside the copyright notice.

## Content

`footer.json` contains the default content to display in the footer. It is recommended that this is used verbatim, but it can be altered after parsing, or even substituted with a custom version (following the same structure), if necessary.

## Stylesheet

The SCSS is defined in `main.scss`. There are no variables, functions or mixins that are expected to be of use outside this module, aside from default values for `$o-ft-footer-version` and `$o-ft-footer-assets-path` which shoudl only be altered when configuring how products use `origami/assets-module`.

## Responsive behavior

The on small and medium screens, the footer links will render in two vertical columns. On larger screens, the links will render horizontally.

In order to make the copyright text wrap nicely at all screen sizes, the copyright year has a word break element after it, and the `copyrightText` is set to not wrap. This means that if you replace the content of `copyrightText` for something much longer, it is advisable to put further `<wbr/>` elements inline. For example:

    copyrightText: "This is a really really long piece of copyright related text, that may wrap at small screen sizes, so if it does wrap, I want the line break to be here <wbr /> to make things nice and predictable.

The Pearson logo and 'always learning' text is rendered as an SVG, with a GIF fallback for older browsers.

##Development
To install locally (including demo files) run the following from terminal (you will already need bower, node, npm and grunt-cli installed globally):

	git clone http://git.svc.ft.com:9080/git/origami/o-footer.git
	cd o-footer
	npm install
	bower install
	grunt origami-demo

The demo will be avilable at `/demos/main.html`. To live update the demo run `grunt watch`.
