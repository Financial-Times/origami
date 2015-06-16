# o-quote [![Build Status](https://travis-ci.org/Financial-Times/o-quote.svg?branch=master)](https://travis-ci.org/Financial-Times/o-quote)

___
Styling for quotes - block, pull or otherwise.
___

## Markup

Simply add an `o-quote` class to any quote you wish to apply the styles to.

```html
<blockquote class="o-quote">
	<p>…</p>
	<cite class="o-quote__cite">Anonymous</cite>
</blockquote>
```


## Themeable

Either extend the base classes to create a custom theme or use the standard theme.

```html
<blockquote class="o-quote o-quote--standard">
	<p>…</p>
	<cite class="o-quote__cite">Anonymous</cite>
	…
</blockquote>
```

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

## License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
