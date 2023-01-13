# Migration Guide

## Migrating from v10 to v11

o-header v11 includes markup changes in the drawer menu. Update your markup as described below or [use o-header's tsx template](https://github.com/Financial-Times/origami/tree/main/components/o-header/src/tsx).

In addition the `subbrand` variant has been removed, as it appears to no longer be used. Ensure there is no use of the `subbrand` variant in your project:
- Check there is no `o-header__subbrand` class reference in your markup.
- Check that the `subbrand` feature is not specifically included with the `oHeader` Sass mixin.
Remove the `subbrand` variant from your project if possible, else contact the Origami team if you still need this feature.
### Markup visual drawer headings

Update your drawer markup to semantically represent visually grouped navigation items. This approach improves the experience for users of assistive technologies.

1. Split the drawer `ul` into multiple lists.
2. Add a `h2` tag to describe each list.
3. Associate both elements with the `aria-labelledby` attribute.

Before:
```html
<nav>
	<ul>
	<!-- more list items without heading -->
	</ul>
</nav>
```

After:
```html
<nav>
	<h2 id="o-header-drawer-top-sections" id='top-sections'>Top sections</h2>
	<ul aria-labelledby="top-sections">
	    <!-- list items -->
	</ul>
	<h2 id="o-header-drawer-top-sections" id='ft-recommends'>FT recommends</h2>
	<ul aria-labelledby="ft-recommends">
	    <!-- list items -->
	</ul>
	<!-- more list items without heading -->
	<ul>
	<!-- more list items without heading -->
	</ul>
</nav>
```

### Markup drawer divider

Remove the CSS class `o-header__drawer-menu-item--divide` from the last list item of a drawer menu and instead apply `o-header__drawer-menu-list--divide` to the menu list itself.

### Update labels for drawers

For consistency and accessibility label for drawer's close button is `Close side navigation menu`. Changes can be observed in this [PR](https://github.com/Financial-Times/origami/pull/903). You might need to update your markup accordingly.

### Update ARIA attributes

To update the `.o-header__drawer` element for improved accessibility:

1. Add the `aria-modal` attribute with a value of "true".
2. Update the `role` attribute to have a value of "modal" instead of "navigation".

Make sure to include [these updates](https://github.com/Financial-Times/origami/pull/939) in any instances of the .o-header__drawer element in your project. This will ensure that the element is properly understood by assistive technologies and provides a better experience for users who rely on these technologies.

## Migrating from v9 to v10

o-header v10 includes markup changes. Use demo markup to update your project. Changes to be aware of include:
- Deprecated markup for the old style of edition switcher has changed. The following classes no longer exist `.o-header__drawer-editions` and `.o-header__drawer-editions-link`. Check the markup of the header drawer is correct.
- Add "icon" to classes `o-header__top-link o-header__top-link--[icon]`, where `[icon]` is "menu", "search", or "myft". E.g. `o-header__top-link o-header__top-link--menu` becomes `o-header__top-icon-link o-header__top-icon-link--[icon]`.
- Add signup and subscribe links to `o-header__top-column--right`.
## Migrating from v8 to v9

v9 drops support for Bower and version 2 of the Origami Build Service.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).


## Migrating from v7 to v8

v8 removes support for the internal brand. Consider using [o-header-services](https://github.com/Financial-Times/o-header-services) instead, or contact the Origami team to discuss bring back support for the internal brand.

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Markup

`aria-selected` is no longer used to style current links. If your project is still using `aria-selected` in header markup replace it with `aria-current="page"`.

### Sass

Origami components now require a `$system-code` Sass variable is set by the project, which must be a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).

The following Sass variables have been removed:
- `$o-header-image-service-version`
- `$o-header-image-base-url`

The first `oHeader` argument is now an options map `$opts`, rather than `$features`, to align with other Origami components.

```diff
-@include oHeader($features: ('drawer', 'sticky'));
+@include oHeader($opts: ('drawer', 'sticky'));
```

The following Sass mixins have been removed and should be replaced with a single call to `oHeader` and the appropriate `$opts` argument.

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
+@include oHeader($opts: ('drawer', 'sticky');
```

Or to output only base styles:
```diff
-@include oHeaderBase;
-@include oHeaderTop;
+@include oHeader($opts: ());
```

Or to output only extra features without the base styles required by all features:
```diff
-@include _oHeaderDrawer;
-@include _oHeaderSticky;
+@include oHeader($opts: ('drawer', 'sticky'), $include-base-styles: false);
```

There is no direct replacement for the following mixins. Please contact the Origami team if you have a usecase for these:
- `oHeaderLink`
- `oHeaderFancyLink`
- `oHeaderItemSeparator`
- `oHeaderLogoSize`
- `oHeaderBrandImage`

Also replace `oHeaderVisuallyHidden` with the o-normalise mixin [oNormaliseVisuallyHidden](https://registry.origami.ft.com/components/o-normalise/sassdoc).

Finally [all deprecated colour usecases](https://github.com/Financial-Times/o-header/blob/v7.8.12/src/scss/_deprecated.scss) have been removed. Please contact the Origami team if your project requires these.

## Migrating from v6 to v7

V7 introduces new major versions of `o-colors`, `o-typography`, `o-buttons` and `o-visual-effects`. Updating to this new version will mean updating any other components that you have which are using `o-colors`, `o-typography`, `o-buttons`, or `o-visual-effects`. There are no other breaking changes in this release.

## Migrating from v5 to v6

This is a complete change in the markup and usage of the module, so we advise to look at the markup in the demos and go over the readme. If any issues come up, please let us know.
