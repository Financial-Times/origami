# Migration guide

## Migrating from v2 to v3

### Primary mixin

Like our other components, the preferred way to use `o-quote` is through the primary mixin, called `oQuote`. It takes an optional options parameter (called `$opts`) that can be a map of booleans to enable or disable feature, the default is:

```
oQuote($opts: (cite: true, editorial: true))
```

Which will output the base styles, the citation styles and the special editorial styles for articles.

### Other mixins

- `oQuoteStandard` has been renamed to `oQuoteEditorial` because that's what it seemed like it meant.
- `oQuoteStandardCite` is now `oQuoteEditorialCite`
- `oQuoteStandardCiteAuthor` is `oEditorialAuthor`
- `oQuoteStandardCiteSource` has become `oEditorialSource`
- The deprecated `oQuoteStandardIcon` is gone for real

### Placeholders

This shouldn't affect how you work, but the mixins in this component have been implemented using Sass's [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors). This should be transparent to you, the user, but it means multiple uses of the non-primary mixins will end up in the same place in the outputted CSS and if you're reading the outputted CSS when debugging that might just be something to bear in mind. Or is it bare? Bear, right?

## Migrating from v1 to v2

- v2 brings in the new majors of `o-colors` and `o-typography` and introduces a new dependency on `o-icons`. Some of these components may result in bower conflicts if you're using other Origami components which require different versions. The solution to this is to update your other dependencies.
- v2 deletes the extends that were deprecated in v1. If you were using the extends, then you should update your code to the mixins.
