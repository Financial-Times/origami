# o-quote Sass Documentation
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
### oQuoteEditorial
Editorial quote styles

### oQuoteEditorialCite
Editorial quote cite styles

### oQuoteEditorialCiteSource
Editorial quote source styles

### oQuoteEditorialCiteAuthor
Editorial quote author styles

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


