# o-quote Sass Documentation

- [o-quote Sass Documentation](#o-quote-sass-documentation)
  - [Mixins](#mixins)
    - [oQuote](#oquote)
      - [Examples](#examples)
    - [oQuoteStandard](#oquotestandard)
    - [oQuoteStandardCite](#oquotestandardcite)
    - [oQuoteStandardCiteSource](#oquotestandardcitesource)
    - [oQuoteStandardCiteAuthor](#oquotestandardciteauthor)
  - [Variables](#variables)
    - [o-quote-is-silent (`Bool`)](#o-quote-is-silent-bool)

## Mixins

### oQuote

Default styles for o-quote

The output includes the `.o-quote*` selectors
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('cite': true, 'standard': true, 'editorial': true |The feature set to output rules for. |

#### Examples

##### Example 1

all o-quote rules.

```Output
@include oQuote();
```

##### Example 2

a selection of o-quote rules.

```Output
@include oQuote((
	'cite': false,
	'editorial': true
));
```

### oQuoteStandard

Standard quote styles

### oQuoteStandardCite

Standard quote cite styles

### oQuoteStandardCiteSource

Standard quote source styles

### oQuoteStandardCiteAuthor

Standard quote author styles

## Variables

### o-quote-is-silent (`Bool`)

Silent mode
