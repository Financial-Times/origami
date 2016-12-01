o-ft-affiliate-ribbon [![Circle CI](https://circleci.com/gh/Financial-Times/o-ft-affiliate-ribbon/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-ft-affiliate-ribbon/tree/master)
=================

A ribbon denoting affiliation with the Financial Times, for use in off-brand products. 

[![Demo](https://raw.githubusercontent.com/Financial-Times/o-ft-affiliate-ribbon/master/img/demo.png)](https://raw.githubusercontent.com/Financial-Times/o-ft-affiliate-ribbon/master/img/demo.png)


- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage 

### Markup

Use the following HTML to get a full-width FT affiliation ribbon.  Ideally this should be placed beneath a footer.

```html
<div class="o-ft-affiliate-ribbon">
	<div class="o-ft-affiliate-ribbon__container">
		<div class="o-ft-affiliate-ribbon__row">
			<span class="o-ft-affiliate-ribbon__text">Published by</span>
			<a class="o-ft-affiliate-ribbon__logo" href="https://www.ft.com/" title="The Financial Times" target="_blank">
				<span class="o-ft-affiliate-ribbon__visually-hidden">Financial Times</span>
			</a>
		</div>	
	</div>
</div>
```

### Sass

As with all Origami components, o-ft-affiliate-ribbon has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-ft-affiliate-ribbon-is-silent : false;` in your Sass after you've imported the o-ft-affiliate-ribbon Sass.

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-ft-affiliate-ribbon/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
