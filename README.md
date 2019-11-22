o-normalise [![Circle CI](https://circleci.com/gh/Financial-Times/o-normalise/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-normalise/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

Foundation styles and standardised utilities

- [Sass](#sass)
- [Focus States](#focus-states)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)


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

_Note: if using the "focus" option in your project also include the `:focus-visible` polyfill. See [Focus States](#focus-states)._

### Other Mixins

- `oNormaliseVisuallyHidden` - provides styles to [visually hide an element while remaining accessible to screen reader](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility).
- `oNormaliseClearfix` - adds clearfix styles to the element. See [this Sitepoint article for more on clearfixes - we use a variation on method 3.](https://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/)
- `oNormaliseBoxSizing` - adds `box-sizing: border-box` to the current and all descending elements, see [this article by Paul Irish for a full explanation](https://www.paulirish.com/2012/box-sizing-border-box-ftw/).

## Focus States

`o-normalise` provides default focus states using the `:focus-visible` pseudo-class. This applies while an element matches the `:focus` pseudo-class and the user-agent determines that the focus should be specially indicated.

No browser supports `:focus-visible` right now (31st Jan 2018) but there is [a polyfill](https://github.com/WICG/focus-visible) which roughly mimics the behaviour by adding a class `.focus-visible` to an element if it should have `:focus-visible` applied to it. Integrate [the polyfill](https://github.com/WICG/focus-visible) at v4 or v5 with your project to apply these focus styles.

`:focus` is used as a fallback in `core` mode.

## Contributing

If you think there is something that could be added to `o-normalise`, either [raise an issue](https://github.com/Financial-Times/o-normalise/issues) to discuss or create a Pull Request with the changes to be reviewed by the Origami team.

If you think of any JavaScript functions or utilities that would be useful to have in a module like this, please raise an issue on [o-utils](https://github.com/Financial-Times/o-utils/issues).

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.7 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-normalise/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
