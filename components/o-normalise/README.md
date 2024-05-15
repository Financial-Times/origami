# o-normalise [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Foundation styles and standardised utilities

- [o-normalise ](#o-normalise-)
	- [Usage](#usage)
	- [Sass](#sass)
		- [Other Mixins](#other-mixins)
	- [Focus States](#focus-states)
	- [Contributing](#contributing)
	- [Migration guide](#migration-guide)
	- [Contact](#contact)
	- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-normalise`.

## Sass

To output all default `o-normalise` styles call the mixin `oNormalise`:

```scss
@include oNormalise();
```

To include features of `o-normalise` granularly, pass an `$opts` map. E.g. to output all styles except for the css helper classes `o-normalise-visually-hidden` and `o-normalise-clearfix`:

```scss
@include oNormalise($opts: (
	'elements': ('forms', 'images', 'text', 'links'),
	'body': ('font-smoothing', 'focus', 'reduce-motion')
));
```

Options include:

| Feature             | Description                                                                                                         | Values                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| elements            | Element types to apply normalising styles to.                                                                       | 'forms', 'images', 'text', 'links'      |
| body                | Features which apply to `html`, `body`, `main` elements and all elements with a `:focus` state.                     | 'font-smoothing', 'focus' |
| helpers             | Classes which may be applied to elements manually.                                                                  | 'clearfix', 'visually-hidden'           |

### Other Mixins

- `oNormaliseVisuallyHidden` - provides styles to [visually hide an element while remaining accessible to screen reader](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility).
- `oNormaliseClearfix` - adds clearfix styles to the element. See [this Sitepoint article for more on clearfixes - we use a variation on method 3.](https://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/)
- `oNormaliseBoxSizing` - adds `box-sizing: border-box` to the current and all descending elements, see [this article by Paul Irish for a full explanation](https://www.paulirish.com/2012/box-sizing-border-box-ftw/).

## Focus States

`o-normalise` provides default focus states using the `:focus-visible` pseudo-class. This applies while an element matches the `:focus` pseudo-class and the user-agent determines that the focus should be specially indicated.

Browser support is now good so we no longer recommend the [focus-visible polyfill](https://github.com/WICG/focus-visible), this should be removed from your project. `:focus` is used as a fallback where needed in older browsers.

## Contributing

If you think there is something that could be added to `o-normalise`, either [raise an issue](https://github.com/Financial-Times/o-normalise/issues) to discuss or create a Pull Request with the changes to be reviewed by the Origami team.

If you think of any JavaScript functions or utilities that would be useful to have in a module like this, please raise an issue on [o-utils](https://github.com/Financial-Times/o-utils/issues).

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.7 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-normalise/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

***

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
