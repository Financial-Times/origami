# o-quote [![Build Status](https://travis-ci.org/Financial-Times/o-quote.png?branch=master)](https://travis-ci.org/financial-times/o-quote)

___
Styling for quotes - block, pull or otherwise.
___

## Markup

Simply add an `o-quote` class to any quote you wish to apply the styles to.

```html
<blockquote class="o-quote">
  <p>...</p>
  <cite class="o-quote__cite">Anonymous</cite>
</blockquote>
```

## Silent mode

If using __o-quote__ in silent mode, `@extend` the placeholder `%o-quote` into your own table class:

```sass
  .my-pulled-blockquote {
    @extend %o-quote
  }
```
