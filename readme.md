# Header module [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-header)

Origami module for the responsive FT page header. Also provides styles that can be extended by other front-end components intended to be injected into the header.

## Customisation

### Mustache variables
To use these define an object `o-ft-header` in the data passed to your view and set one or more of the following values

* `logo-url`: The url of the page clicking on the FT logo should lead to. If unset the link will point to `http://ft.com`
* `module-version`: The version of o-ft-header being used (this is normally only used by the build service)
* `topbar-items`: html for additional items to inject into the header

### SCSS Variables
To use these set them *before* including `o-ft-header/main.scss` in your stylesheet

* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header has `position: fixed`);
* `$o-ft-header-z-index`: *[false]* z-index of header. When header is not fixed this also sets `position: relative`
* `$o-ft-header-is-silent`: *[true]* When true prevents the stylesheet outputting styles for optional states/items
* `$o-ft-header-sticky`: *[true]* Configures when a 'sticky' fixed position header is used:
	* `false` - header is never sticky
	* `true` - header is always sticky
	* comma-separated list of [o-grid layout identifiers](https://github.com/Financial-Times/o-grid) - header will be sticky at these layout sizes only.
* `$o-ft-header-top-offset`: *[0]* Distance of header from top of page (only applied when the header is sticky);
* `$o-ft-header-version` and `$o-ft-header-assets-path` which should only be altered when configuring how products use [o-assets](https://github.com/Financial-Times/o-assets).

### Injecting content

To inject content into the `<div class="o-ft-header__topbar__items"></div>` container you will need to

1. Set the html as the value for `o-ft-header.topbar-items` in your view model.
1. Apply generic styles by extending the following sass placeholder classes: `%o-ft-header__topbar__item` and `%o-ft-header__topbar__item--active`

### Javascript API

The module contains limited javascript functionality to improve the look and feel of the header by shrinking/expanding the FT logo in response to user scrolling and other events (as defined by the developer)

#### Initializing

    require('o-ft-header').init();

#### Methods

* `forceCondense()`  Forces the FT logo to appear in it's reduced, non-overhanging size, irrespective of user scrolling
* `unforceCondense(expandNow)`: Returns the FT logo size to being determined by user scrolling. If `expandNow` is `true` the logo will expand to full size immediately.
