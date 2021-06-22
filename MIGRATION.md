# Migration guide

## Migrating from v7 to v8

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Migrating from v6 to v7

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Sass

Origami components now require a `$system-code` variable is set by the project, which must be a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).

The mixin `oFooter` has been updated. By default it now outputs all o-footer styles. To upgrade explicitly include the styles your project needs using the options `$opts` map:

`oFooter` previously included the complex "matrix" navigation structure with dark theme by default:
```diff
-@include oFooter;
+@include oFooter($opts: (
+    'themes': ('dark'),
+    'matrix': true,
+));
```

Instead of setting `$theme` update the `theme` key in the options map:
```diff
-@include oFooter($theme: 'light');
+@include oFooter($opts: (
+    'themes': ('light'),
+    'matrix': true,
+));
```

Instead of turning off output for the matrix of links by setting `$simple: true`, do not set the `matrix` option:
```diff
- @include oFooter($simple: true);
+@include oFooter($opts: (
+    'themes': ('dark')
+));
```

To remove the default margin set the `margin` option to false (alternatively set the top margin value):
```diff
- @include oFooter($margin: false);
+@include oFooter($opts: (
+    'margin': null
+));
```

The following Sass mixins have been removed and must not be used. Instead use the `oFooter` mixin with related options:
    - `oFooterBrandImage`
    - `oFooterMatrix`
    - `oFooterThemeDark`
    - `oFooterThemeLight`

The following Sass variables have been removed without a direct replacement. Please contact the Origami team if your project relies on these:
    - `$o-footer-image-base-url`
    - `$o-footer-image-service-version`
    - `$o-footer-matrix`
    - `$o-footer-spacing-unit`

All custom o-footer [colours and colour usecases](https://github.com/Financial-Times/o-footer/blob/v6.1.4/src/scss/_colors.scss) have also been removed. Please contact Origami if your project requires these colours.

## Migrating from v5 to v6

V5 -> V6 introduces the new majors of o-colors and o-typography. Updating to this new version will mean updating any other components that you have which are using o-colors and o-typography. There are no other breaking changes in this release.

## Migrating from v4 to v5
Version 5 has significant markup changes compared to version 4. If you want to upgrade, the best option is to look at the demos: [footer](https://github.com/Financial-Times/o-footer/blob/master/demos/src/footer.mustache) and [simple footer](https://github.com/Financial-Times/o-footer/blob/master/demos/src/simple-footer.mustache).
If you don't want to upgrade, some superficial visual changes have been back-ported to a minor version on 4.x.x.


## Migrating from v3 to v4


Note that o-footer v4 relies on o-grid v4.

## Markup changes

```diff
 <nav class="o-footer__row o-footer__nav">
 	<div class="o-footer__col o-footer__col--full-width">
 		…
+ 		<div class="o-footer__divider"></div>
 	</div>
 </nav>
```
