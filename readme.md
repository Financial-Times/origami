# Header module

Origami module for the responsive FT page header. Also provides styles that can be extended by other front-end components intended to be injected into the header.

## Installation

1. In your project's root directory run

		bower install o-ft-header=https://github.com/Financial-Times/o-ft-header.git --save

	(If your project doesn't already contain a bower.json file you will need to create one first with the content `{"name": "your-project-name"}`)

1. Include the following in your project's sass styles

        @import "o-ft-header/main.scss";  

  	Make sure that `bower_components` is in your sass include path (see the [origami docs](http://financial-times.github.io/ft-origami/docs/syntax/scss/) for more details). 

1. Reference the mustache template as a partial in your product's template `{{ > ./bower_components/o-ft-header/main.mustache}}`. It *should* only be added in a part of the page which soans the entire winodw width as it defines its own responsive behaviour (via [o-grid](https://github.com/Financial-Times/o-grid)). Also, as the template consumes the partial `{{ > o-ft-header/partials/topbar-items }}` you will also need to register this partial with your mustache renderer (see the [origami docs](http://financial-times.github.io/ft-origami/docs/syntax/mustache/) for more details).

## Customisation

### Mustache variables
To use these define an object `o-ft-header` in the data passed to your view and set one or more of the following values

* **logo-url**: The url of the page clicking on the FT logo should lead to. If unset the link will point to `http://ft.com`
* **module-version**: The version of o-ft-header being used (this is normally only used by the build service)

### SCSS Variables
To use these set them *before* including `o-ft-header/main.scss` in your stylesheet

* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header has `position: fixed`);
* `$o-ft-header-z-index`: *[false]* z-index of header. Whn header is not fixed this also sets `position: relative`
* `$o-ft-header-is-silent`: *[true]* When true prevents the stylesheet outputting styles for optional states/items
* `$o-ft-header-sticky`: *[$o-grid-small,$o-grid-medium]* Configures when a 'sticky' fixed position header is used:
	* `false` - header is never sticky
	* `true` - header is always sticky
	* comma-separated list of [o-grid layout identifiers](https://github.com/Financial-Times/o-grid) - header will be sticky at these layout sizes only.
* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header is sticky);
* `$o-ft-header-version` and `$o-ft-header-assets-path` which should only be altered when configuring how products use [o-assets](https://github.com/Financial-Times/o-assets).

### Injecting content

The default content of `{{ > partials/topbar-items }}` is empty. To inject content into the `<div class="o-ft-header__topbar__items"></div>` container you will need to

1. Define your own mustache template with the content you want to appear there. To style your content with the standard header item styles extend the following sass placeholder classes: `%o-ft-header__topbar__item` and `%o-ft-header__topbar__item--active`
1. Register this partial with your mustache renderer under the name/path `partials/topbar-items` (see the [origami docs](http://financial-times.github.io/ft-origami/docs/syntax/mustache/) for more details).

## Development
To install locally (including demo files) run the following from terminal (you will already need bower, node, npm and grunt-cli installed globally):

	git clone http://git.svc.ft.com:9080/git/origami/o-ft-header.git
	cd o-ft-header
	npm install
	bower install
	grunt; grunt watch

The demo will be avilable at `/demos/main.html`.
