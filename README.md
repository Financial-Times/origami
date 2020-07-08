# o-quote [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Styling for quotes

- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

A block quote is a passage of text from another source, or a passage of text that’s been spoken by a person. Used to attribute another source of information, or to quote the spoken words of a person.

For a standard blockquote style use classes `o-quote o-quote--standard` and the following markup. We recommend the editorial style instead for editorial contexts such as within articles.

```html
<blockquote class="o-quote o-quote--standard">
	<p>
		The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
	</p>
	<cite class="o-quote__cite">
		<span class="o-quote__author">Henry Mance</span>
		<span class="o-quote__source">Financial Times</span>
	</cite>
</blockquote>
```

For an editorial style blockquote swap the `o-quote--standard` class for `o-quote--editorial`. The editorial variant inherits font size and colour to support multiple editorial contexts. For example at the time of writing [live blogs](https://www.ft.com/content/f61c179d-fd47-38ba-b1ab-df158fa62dd9) and article pages have different font sizes on large viewports but both should share the editorial quote style. Therefore the editorial quote must be within an element that sets typography styles such as [o-editorial-typography-body](https://registry.origami.ft.com/components/o-editorial-typography/readme?brand=master#body).
```diff
-<blockquote class="o-quote o-quote--standard">
+<blockquote class="o-quote o-quote--editorial">
	<p>
		The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
	</p>
	<cite class="o-quote__cite">
		<span class="o-quote__author">Henry Mance</span>
		<span class="o-quote__source">Financial Times</span>
	</cite>
</blockquote>
```

## Sass

To output all o-quote styles include the `oQuote` mixin.

```scss
@import 'o-quote/main';
@include oQuote();
```

Pass an options `$opts` map to include only the o-quote styles you need. For example o-quote has styles for standard and editorial blockquotes. To only include styles for the editorial blockquote:
```scss
@include oQuote($opts: (
	'standard': false, // do not output .o-quote--standard variant styles
	'editorial': true, // output .o-quote--editorial variant styles
	'cite': true // output .o-quote__cite styles, to support citations
));
```
_The "editorial" option is only available to master brand users._

You may also use o-quote mixins with custom HTML markup. For example if your markup used `my-blockquote` as a classname. We do not recommend this approach unless you are unable to update your markup, as it may lead to unnecessary CSS output and more difficult migrations.
```html
<blockquote class="my-blockquote">
	<p>The quote.</p>
	<cite class="my-blockquote__cite">
		<span class="my-blockquote__author">Author</span>
		<span class="my-blockquote__source">Source</span>
	</cite>
</blockquote>
```

```scss
.my-blockquote {
	@include oQuoteEditorial();
}

.my-blockquote .my-blockquote__cite {
	@include oQuoteEditorialCite();
}

.my-blockquote .my-blockquote__author {
	@include oQuoteEditorialCiteAuthor();
}

.my-blockquote .my-blockquote__source {
	@include oQuoteEditorialCiteSource();
}
```

The `oQuoteEditorial` mixins shown here are only available to master brand users. For a full list of o-quote mixins see [o-quote SassDoc in the registry](https://registry.origami.ft.com/components/o-quote/sassdoc).


## Migration Guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ broken | 3 | 3.0 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.2 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.3 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
