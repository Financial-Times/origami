## Migration Guide

### Migrating from v3 to v4

V4 has dropped support for use through Bower. If you have been using Bower, you will need to follow the [bower to npm migration guide](https://origami.ft.com/docs/tutorials/bower-to-npm/).

When using Sass, you will need to add `node_modules` to your `includePath` as well as either:

- Update your code to use the fully qualified package name, i.e.: `@import "@financial-times/o-brand/main"`, or
- Also add `node_modules/@financial-times` to the Sass include path


### Migrating from v2 to v3

All [o-syntax-highlight colour usecases](https://github.com/Financial-Times/o-syntax-highlight/blob/v2.1.0/src/scss/colors.scss) have been removed. Ensure your project is not using these colours by checking for build errors. If so replace with an [o-colors](https://registry.origami.ft.com/components/o-colors) colour.

#### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Migrating from v1 to v2

This major introduces the primary mixin, and enables branding for 'master' and 'internal' brands.
The main change is how to output syntax-specific styling:

```diff
- oSyntaxHighlightBase()
- oSyntaxHighlightBASH()
- oSyntaxHighlightCSS()
- oSyntaxHighlightDIFF()
- oSyntaxHighlightHTML()
- oSyntaxHighlightJS()
- oSyntaxHighlightJSON()
- oSyntaxHighlightSCSS()
+ oSyntaxHighlight()
```

The primary mixin requires an `$opts` parameter that accepts a 'languages' list. That list can contains any or all of the following:
- 'bash'
- 'css'
- 'diff'
- 'html'
- 'js' or 'javascript'
- 'json'
- 'scss' or 'sass'
- 'yaml'

There are no changes to the markup or the JavaScript.
