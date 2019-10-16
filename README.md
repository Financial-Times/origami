o-editorial-typography [![Circle CI](https://circleci.com/gh/Financial-Times/o-editorial-typography/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-editorial-typography/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

**Work in progress: See the [o-typography v6 proposal](https://github.com/Financial-Times/o-typography/issues/203).**

_Typography styles for editorial content _

- [Markup](#markup)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

_Whatever usage instructions your component has. We've broken this down by Markup, JavaScript and Sass, but it depends how complex your component is._

### Markup

_Common templating can go here, especially if there is only one template, but people can always check the demos for more._

_Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly._

```html
<div data-o-component="o-editorial-typography" class='o-editorial-typography'>
</div>
```

### Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by silent mode, so this line (remember to change the o-editorial-typography to your component name) is useful if you have Sass:_

As with all Origami components, o-editorial-typography has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-editorial-typography-is-silent : false;` in your Sass before you import the o-editorial-typography Sass.

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-editorial-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
