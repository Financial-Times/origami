o-normalise [![Circle CI](https://circleci.com/gh/Financial-Times/o-normalise/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-normalise/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

Foundation styles and standardised utilities

- [Sass](#sass)
- [Focus States](#focus-states)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)


## Sass

As with all Origami components, o-normalise has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-normalise-is-silent : false;` in your Sass before you import the o-normalise Sass.

### Available mixins

- `oNormaliseVisuallyHidden` - provides styles to [visually hide an element while remaining accessible to screen reader](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility).
- `oNormaliseClearfix` - adds clearfix styles to the element. See [this Sitepoint article for more on clearfixes - we use a variation on method 3.](https://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/)
- `oNormaliseBoxSizing` - adds `box-sizing: border-box` to the current and all descending elements, see [this article by Paul Irish for a full explanation](https://www.paulirish.com/2012/box-sizing-border-box-ftw/).

#### Normalising styles

The following mixins apply normalising styles to groups of HTML elements, these aim to fix browser inconsistencies and any potential side-effects caused by browser default styles.

- `oNormaliseHTML` - affects `html`, `body`, `main` elements and defaults `:focus` state
- `oNormaliseLinks` - affects `a` tags and `:hover` & `:active` states
- `oNormaliseText` - affects text related elements
- `oNormaliseImages` - affects the `img` element
- `oNormaliseForms` - affects form related elements

### Available variables

- `$o-normalise-grid-gutters` - provides a map of standardised grid gutter sizes
- `$o-normalise-border-radius` - provides a standardised border radius value

## Focus States

`o-normalise` provides default focus states using the `:focus-visible` pseudo-class. This applies while an element matches the `:focus` pseudo-class and the user-agent determines that the focus should be specially indicated.

No browser supports `:focus-visible` right now (31st Jan 2018) but there is [a polyfill](https://github.com/WICG/focus-visible) which roughly mimics the behaviour by adding a class `.focus-visible` to an element if it should have `:focus-visible` applied to it. Integrate [the polyfill](https://github.com/WICG/focus-visible) with your project to apply these focus styles.

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
