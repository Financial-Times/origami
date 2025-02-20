# Migration guide

## Migrating from v10 to v11

This major release introduces a new design language and visually breaking changes. This includes mobile optimised typography, icons, and buttons. It also removes peer dependencies from deprecated "o2" components.

To upgrade, replace the following "o2" components with their "o3" equivalent:

- [o-normalise](../o-normalise/MIGRATION.md)
- [o-spacing](../o-spacing/MIGRATION.md)
- [o-colors](../o-colors/MIGRATION.md)
- [o-icons](../o-icons/MIGRATION.md)
- [o-buttons](../o-buttons/MIGRATION.md)
- [o-typography](../o-typography/MIGRATION.md)
- [o-editorial-typography](../o-editorial-typography/MIGRATION.md)
- [o-big-number](../o-big-number/MIGRATION.md)
- [o-quote](../o-quote/MIGRATION.md)
- [o-fonts](../o-fonts/MIGRATION.md)

## Migrating from v9 to v10

o-share v10 replaces the "Twitter" brand for "X". As this is a major change due to inlined SVG markup, we have also decided to update the o-share API to remove references to "Twitter". To migrate make the following changes.

### Update your Sass

If your project is using Sass and the `oShare` mixin to selectively include social share icons, replace "twitter" with "x". For example:

```diff
@include oShare($opts: (
+    'icons': ('x', 'facebook'),
-    'icons': ('twitter', 'facebook'),
    'sizes': ('small'),
    'vertical': true,
    'inverse': true
));
```

### Update your markup

Update your markup according to whether your project is using o-share TSX templates or copying HTML directly.

#### Copying HTML

If copying component HTML, update:

1. The share icon class name.
2. The icon SVG.
3. The share text description.

To do this, obtain the full markup required from [the o-share demos](https://registry.origami.ft.com/components/o-share@10.0.0). Here is a simplified example:

```diff
+<a class="o-share__icon o-share__icon--x" href="#" rel="noopener">
-<a class="o-share__icon o-share__icon--twitter" href="#" rel="noopener">
  <div class="o-share__icon__image">
+    <!-- twitter icon svg -->
-    <!-- x icon svg, see component demos -->
  </div>
	<span class="o-share__text">
+    Share [title] on X (opens a new window)
-    Share [title] on Twitter (opens a new window)
  </span>
</a>
```

#### TSX templates

If using TSX templates:

1. Replace any "twitter" icon for "x".
2. Update your `urlProps` to remove Twitter references.

- The key `relatedTwitterAccounts` becomes `relatedXAccounts`
- We recommend referring to "X, formally known as Twitter" in title and summary text descriptions for now.

```diff
<Share {...shareProps}>
+  <ShareIcon icon="twitter" urlProps={shareIconProps} />
-  <ShareIcon icon="x" urlProps={shareIconProps} />
  <ShareIcon icon="facebook" urlProps={shareIconProps} />
  <ShareIcon icon="linkedin" urlProps={shareIconProps} />
  <ShareIcon icon="whatsapp" urlProps={shareIconProps} />
</Share>
```

## Migrating from v8 to v9

o-share v9 incudes a number of changes to improve accessibility. To migrate follow these steps and see below for more details:

- o-share no longer provides client side JavaScript to generate markup. New markup can be copied from the [Origami registry](https://registry.origami.ft.com/components/o-share) or [StoryBook](https://origami.ft.com/storybook/) via the `HTML` tab.

### Inlined SVG icons

Icons in version 9 use inline SVGs. In order to use them with `o-share`, we recommend using the following structure:

```html
<li class="o-share__action">
	<a
		class="o-share__icon o-share__icon--{{className}}"
		href="{{link}}"
		rel="noopener"
	>
		<div class="o-share__icon__image">
			<!-- SVG code -->
		</div>
		<span class="o-share__text">
			Share {{title}} on {{name}} (opens a new window)
		</span>
	</a>
</li>
```

### Deprecate autogenerate share links

Usage of `o-share` with client side Javascript initialisation is now deprecated. Projects that use this will no longer work:

```html
<div
	data-o-component="o-share"
	class="o-share"
	data-o-share-links="{{links}}"
	data-o-share-url="{{url}}"
	data-o-share-title="{{title}}"
	data-o-share-titleExtra="{{titleExtra}}"
	data-o-share-summary="{{summary}}"
	data-o-share-location="{{locationOfShareComponent}}"
></div>
```

Instead use full markup of the component:

```html
<!-- see the registry demos for full markup -->
<div data-o-component="o-share" class="o-share">
	<ul>
		<!-- a share to twitter action example -->
		<!-- href tag is not shown, see the registry demos for full markup  -->
		<li class="o-share__action">
			<a
				class="o-share__icon o-share__icon--twitter"
				href="#twitter-link-here"
				rel="noopener"
			>
				<span class="o-share__text">Twitter</span>
			</a>
		</li>
		<!-- more o-share actions -->
	</ul>
</div>
```

## Migrating from v7 to v8

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

## Migrating from v6 to v7

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Palette Colours

Social palette colours have been renamed:

- `o-share-color-twitter` is now `o-share/twitter`.
- `o-share-color-facebook` is now `o-share/facebook`.
- `o-share-color-linkedin` is now `o-share/linkedin`.
- `o-share-color-pinterest` is now `o-share/pinterest`.
- `o-share-color-whatsapp` is now `o-share/whatsapp`.

```diff
-$color: oColorsGetPaletteColor('o-share-color-twitter');
+$color: oColorsByName('o-share/twitter');
```

### Colour Usecases

The `tooltip` colour usecases have been removed. If used replace with `white` for text and `black-80` for backgrounds, e.g:

```diff
-$color: oColorsGetColorFor('tooltip', background);
+$color: oColorsByName('black-80');
```

The colour usecases for social icons have been renamed:

- `o-share-twitter-color` is now `o-share/twitter-icon`.
- `o-share-facebook-color` is now `o-share/facebook-icon`.
- `o-share-linkedin-color` is now `o-share/linkedin-icon`.
- `o-share-pinterest-color` is now `o-share/pinterest-icon`.
- `o-share-whatsapp-color` is now `o-share/whatsapp-icon`.
- `o-share-mail-color` is now `o-share/ft-icon`.
- `o-share-link-color` is now `o-share/ft-icon`.
- `o-share-share-color` is now `o-share/ft-icon`.

```diff
-border-color: oColorsGetColorFor('o-share-mail-color', 'background');
+border-color: oColorsByUsecase('o-share/ft-icon', 'background');
```

The following usecases have been removed. Please contact the Origami Team if your project requires these:

- `o-share-button-inverse`
- `o-share-button-hover`

### Variables

The variable `$o-share-colors` is now private ans must not be used. Instead use colour usecases, e.g:

```scss
$twitter-color: oColorsByName('facebook', $from: 'o-share');
```

### Mixins

`o-share v7` no longer has public mixins other than the primary mixin `oShare()`. It accepts a map `$opts` that allows you to include only the styles you need. Replace previous calls that used the mixins with one using `oShare` with an optional `$opts` map.

### Google Plus is gone

Google Plus was deprecated during the previous major version. It has now been removed.

### Custom classnames

It's no longer possible to customise the class name used in `o-share`, use the `o-share` classes instead.

## Migrating from v5 to v6

o-share v6 introduces a breaking change that you may need to update in your product:

It may help to look at the [changes made to the demo markup](https://github.com/Financial-Times/o-share/pull/100/commits/a7bb5de62d16bd4b4610d80e1c863e32335bf548#diff-bf0fb135efa69a14d71d3a973a919ad5)

- CSS type selectors that were used to apply styles to the `<i>` tag have been removed so an additional class is required.
- We recommended you also use a semantically correct tag instead of the `<i>`.

```diff
<a href="#">
- <i>
+ <span class="o-share__text">
  Share on Twitter
- </i>
+ </span>
</a>
```

- CSS type selectors that were used to apply styles to `<a>` and `<button>` tag have been removed so an additional class is required.
- The original class names on `<a>` and `<button>` tags have been removed.

```diff
<a
-class="o-share__action--icon"
+class="o-share__icon o-share__icon--twitter"
href="#">
 <span class="o-share__text">
  Share on Twitter
 </span>
</a>
```

```diff
<button
-class="o-share__action--icon"
+class="o-share__icon o-share__icon--mail"
>
 <span class="o-share__text">
  Share via Email
 </span>
</button>
```

- The BEM modifier used to vary the social platform type has been removed from the element with the `o-share__action` class.

```diff
<li class="o-share__action
-o-share__action--twitter
">
 <a class="o-share__icon o-share__icon--twitter" href="#">
     <span class="o-share__text">
         Share on Twitter
     </span>
 </a>
</li>
```

## Migrating from v4 to v5

o-share v5 introduces a breaking change that you may need to update in your product:

- buttons and anchor elements require an extra class (`o-share__action--icon`) to avoid specificity issues with other components that use `o-icons`

```diff
<a
+class="o-share__action--icon"
href="#"><i>Icon</i></a>
<button
+class="o-share__action--icon"
><i>Icon</i></button>
```

## Migrating from v3 to v4

o-share v4 introduces a few breaking changes that you may need to update in your product:

- V4 introduces the new major version of `o-colors`. Updating to this new version will mean updating any other components that you have which are using `o-colors`
- the link share option has been removed

## Migrating from v2 to v3

o-share v3 introduces a few breaking changes that you may need to update in your product:

- button size has increased from 36px to 40px which might effect the surrounding elements of your design
- the Reddit share option has been removed
- the URL share option has been renamed from `o-share__action--url` to `o-share__action--link`
