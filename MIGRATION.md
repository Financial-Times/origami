# Migration guide

## Migrating from v3 to v4

This major version was released to correct an error in the publishing of v3.0.0. There are no changes, aside from using stable major releases in dependencies rather than beta ones.

## Migrating from v2 to v3

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Primary mixin

Like our other components, the preferred way to use `o-quote` is through the primary mixin, called `oQuote`. It takes an optional options parameter (called `$opts`) that can be a map of booleans to enable or disable features, the default is:

```
oQuote($opts: (cite: true, editorial: true))
```

Which will output the base styles, the citation styles and the special editorial styles for articles.

### Other mixins

- The deprecated `oQuoteStandardIcon` has been removed

### Placeholders

This shouldn't affect how you work, but the mixins in this component have been implemented using Sass's [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors). This should be transparent to you, the user, but it means multiple uses of the non-primary mixins will end up in the same place in the outputted CSS and if you're reading the outputted CSS when debugging that might just be something to bear in mind.

### Colour Usecases

The `o-quote` colour usecases have been removed, please contact the team if your projects needs `o-quote` colour usecases.

## Migrating from v1 to v2

- v2 brings in the new majors of `o-colors` and `o-typography` and introduces a new dependency on `o-icons`. Some of these components may result in bower conflicts if you're using other Origami components which require different versions. The solution to this is to update your other dependencies.
- v2 deletes the extends that were deprecated in v1. If you were using the extends, then you should update your code to the mixins.
