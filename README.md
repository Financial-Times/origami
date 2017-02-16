o-normalise [![Circle CI](https://circleci.com/gh/Financial-Times/o-normalise/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-normalise/tree/master)
=================

Foundation styles and standardised utilities

- [Usage](#usage)
	- [Sass](#sass)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)


## Usage

### Sass

As with all Origami components, o-normalise has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-normalise-is-silent : false;` in your Sass before you import the o-normalise Sass.

#### Available mixins

- `oNormaliseVisuallyHidden` - provides styles to [visually hide an element while remaining accessible to screen reader](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility).
- `oNormaliseClearfix` - adds clearfix styles to the element. See [this Sitepoint article for more on clearfixes - we use a variation on method 3.](https://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/)
- `oNormaliseBoxSizing` - adds `box-sizing: border-box` to the current and all descending elements, see [this article by Paul Irish for a full explanation](https://www.paulirish.com/2012/box-sizing-border-box-ftw/).

##### Normalising styles

The following mixins apply normalising styles to groups of HTML elements, these aim to fix browser inconsistencies and any potential side-effects caused by browser default styles.

- `oNormaliseHTML` - affects `html`, `body`, `main` elements and defaults `:focus` state
- `oNormaliseLinks` - affects `a` tags and `:hover` & `:active` states
- `oNormaliseText` - affects text related elements
- `oNormaliseImages` - affects the `img` element
- `oNormaliseForms` - affects form related elements

#### Available variables

- `$o-normalise-grid-gutters` - provides a map of standardised grid gutter sizes
- `$o-normalise-border-radius` - provides a standardised border radius value

## Contributing

If you think there is something that could be added to `o-normalise`, either [raise an issue](https://github.com/Financial-Times/o-normalise/issues) to discuss or create a Pull Request with the changes to be reviewed by the Origami team.

If you think of any JavaScript functions or utilities that would be useful to have in a module like this, please raise an issue on [o-utils](https://github.com/Financial-Times/o-utils/issues).

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-normalise/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
