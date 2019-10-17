# o-quote [![Build Status](https://circleci.com/gh/Financial-Times/o-quote.png?style=shield&circle-token=87d81370851f7666617cb65f664064af826052d1)](https://circleci.com/gh/Financial-Times/o-quote) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

___
Styling for quotes - block, pull or otherwise.
___

## Markup

Add an `o-quote` class to any quote you wish to apply the styles to.

```html
<blockquote class="o-quote o-quote--standard">
		<p>
			The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
		</p>
	<cite class="o-quote__cite"><span class="o-quote__author">Henry Mance</span><span class="o-quote__source">Financial Times</span></cite>
</blockquote>

```

## Themeable

Either extend the base classes to create a custom theme or use the standard theme.

## Silent mode ([docs](http://origami.ft.com/docs/syntax/scss/#silent-styles))

With `$o-quote-is-silent` is set to `true`, the module won't output any styles.
You can then use the mixins directly in your code:

```html
<div class="article-container">
	<blockquote>
		<p>…</p>
		<cite>Anonymous</cite>
	</blockquote>
</div>
```

```scss
.article-container blockquote {
	@include oQuoteStandard;

	cite {
		@include oQuoteStandardCite;
	}
}
```

----

## Licence

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
