## Migration Guide

### Migrating from v7 to v8

#### Sass Mixins

The following mixins have been removed and should be replaced with a single call to `oHeader` and the appropriate `$features` argument.

- `oHeaderBase`: included by default in base styles
- `oHeaderTop`: included by default in base styles
- `oHeaderAnon`: 'anon' feature
- `oHeaderDrawer`: 'drawer' feature
- `oHeaderMegaMenu`: 'megamenu' feature
- `oHeaderNav`: 'nav' feature
- `oHeaderSearch`: 'search' feature
- `oHeaderSimple`: 'simple' feature
- `oHeaderSticky`: 'sticky' feature
- `oHeaderSubnav`: 'subnav' feature
- `oHeaderSubbrand`: 'subbrand' feature
- `oHeaderTransparent`: 'transparent' feature

E.g. to output the header with select features:
```diff
-@include oHeaderBase;
-@include oHeaderTop;
-@include _oHeaderDrawer;
-@include _oHeaderSticky;
+@include oHeader($features: ('drawer', 'sticky');
```

Or to output only base styles:
```diff
-@include oHeaderBase;
-@include oHeaderTop;
+@include oHeader($features: ());
```

Or to output only extra features without the base styles required by all features:
```diff
-@include _oHeaderDrawer;
-@include _oHeaderSticky;
+@include oHeader($features: ('drawer', 'sticky'), $include-base-styles: false);
```

There is no direct replacement for the following mixins. Please contact the Origami team if you have a usecase for these:
- `oHeaderLink`
- `oHeaderFancyLink`
- `oHeaderItemSeparator`
- `oHeaderLogoSize`
- `oHeaderBrandImage`

Finally replace `oHeaderVisuallyHidden` with the o-normalise mixin [oNormaliseVisuallyHidden](https://registry.origami.ft.com/components/o-normalise/sassdoc).

### Migrating from v6 to v7

V7 introduces new major versions of `o-colors`, `o-typography`, `o-buttons` and `o-visual-effects`. Updating to this new version will mean updating any other components that you have which are using `o-colors`, `o-typography`, `o-buttons`, or `o-visual-effects`. There are no other breaking changes in this release.

### Migrating from v5 to v6

This is a complete change in the markup and usage of the module, so we advise to look at the markup in the demos and go over the readme. If any issues come up, please let us know.
