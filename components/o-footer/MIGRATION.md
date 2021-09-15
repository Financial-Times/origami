# Migration guide

## Migrating from v8 to v9

Markup has been updated to support 2 extra columns of links, one for Community Events and another for "More from the FT Group". All nav items are now behind a dropdown on mobile devices.

Update `o-footer` markup in your project according to the README and component demos. The changes are as follows:

1. Each `o-footer__matrix-link` element must now include a child element `o-footer__matrix-link__copy`.
```diff
<a class="o-footer__matrix-link" href="#">
+        <span class="o-footer__matrix-link__copy"><!-- link 1 --></span>
-        <!-- link 1 -->
</a>
```
2. The markup for the "More from the FT Group" link has changed. It has been moved inside the `nav` element alongside other links, within  it's matrix group. Unlike other matrix title elements there is an extra class `o-footer__matrix-title--link`, to indicate the title contains a link. The link itself also has an extra class `o-footer__matrix-link--more`, which applies the right arrow, etc. Note in the diff below some classes such as `o-footer__more-from-ft` are deleted.
```diff
<!-- ... more o-footer markup ...  -->
<nav>
<!-- ... o-footer links ...  -->
+       <div class="o-footer__matrix-group o-footer__matrix-group--1">
+           <h3 class="o-footer__matrix-title o-footer__matrix-title--link">
+               <a class ='o-footer__matrix-link o-footer__matrix-link--more' id="o-footer-section-5" href="#">
+                   <span class="o-footer__matrix-link__copy"><!-- link  --></span>
+               </a>
+           </h3>
+       </div>
</nav>
-
-<h3 class="o-footer__external-link o-footer__matrix-title">
-        <a class="o-footer__more-from-ft o-footer__matrix-title" href="#"><!-- link --></a>
-</h3>
<!-- ... more o-footer markup ...  -->
```

_Note: These changes have also been released in `v9.0.0-bower`, a temporary backport which includes Bower and Origami Build Service v2 support which was dropped in v8. `v9.0.0-bower` is not recommended outside a temporary measure for those unable to complete the [v7 to v8 migration](MIGRATION.md#migrating-from-v7-to-v8) immediately._

## Migrating from v7 to v8

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

_Note: If you are not able to upgrade to `v8` immediately, you may temporarily skip this upgrade and instead [upgrade to `v9.0.0-bower`](MIGRATION.md#migrating-from-v8-to-v9). `v9.0.0` introduces new features which are backported in `v9.0.0-bower` to support Bower and version 2 of the Origami Build Service. We do not recommend this as you may miss future updates, and will be [required to upgrade by July 2022](https://origami.ft.com/blog/2021/01/18/deprecating-bower-and-origami-via-npm/)._

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
