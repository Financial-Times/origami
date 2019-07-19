## Migration Guide

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