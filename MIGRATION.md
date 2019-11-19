## Migration Guide

### Migrating from v2 to v3

All [o-syntax-highlight colour usecases](https://github.com/Financial-Times/o-syntax-highlight/blob/v2.1.0/src/scss/colors.scss) have been removed. Ensure your project build is not using these colours by checking for build errors. If so replace with an [o-colors](https://registry.origami.ft.com/components/o-colors) colour.

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
