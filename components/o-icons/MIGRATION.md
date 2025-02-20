## Migration guide

### Migrating from v7 to o3-foundation@3

o-icons is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to o3-foundation@3. Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

#### Utility Classes

Replace utility class usages with CSS Custom Properties in classes:

**HTML**
```diff
- <span class="o-icons-icon o-icons-icon--arrow-down"></span>
+ <span class="icon-plus"></span>
```

**CSS**
```css
.icon-plus {
	/* Create a square the size we want an icon */
	display: inline-block;
	width: 1rem;
	height: 1rem;
	/* Set the icon colour, In this case match the
     current foreground text colour. */
	background-color: currentColor;
	/* Mask the square with an Origami icon. */
	mask-image: var(--o3-icon-plus);
	mask-repeat: no-repeat;
	mask-size: contain;
}
```

#### Mixins

**oIconsContent**
Replace mixins with CSS Custom Properties and additional css properties. We recommend using 24px icons by default. Please consult the design team if there is a need to deviate:

**Sass**
```diff
- @import "@financial-times/o-icons/main";
- @import "@financial-times/o-colors/main";

.my-icon-plus {
-	@include oIconsContent(
-		$icon-name: 'plus',
-		$color: oColorsByName('claret'),
-		$size: 32
-	);
+ display: inline-block;
+ width: 24px;
+ height: 24px;
+ background-color: var(--o3-color-palette-black);
+ mask-image: var(--o3-icon-plus);
+ mask-repeat: no-repeat;
+ mask-size: contain;
}
```

**oIconsContentBaseStyles**

Replace mixins with CSS Custom Properties and additional css properties.
This approach can also be used to reduce duplication from use of `oIconsContent`.

```diff
.my-icon {
-	@include oIconsContentBaseStyles();
+	display: inline-block;
+	width: 32px;
+	height: 32px;
+	background-color: var(--o3-color-palette-black);
+	mask-repeat: no-repeat;
+	mask-size: contain;
}

.my-icon--plus {
-@include oIconsContent(
-	$icon-name: 'plus',
-	$color: oColorsByName('claret'),
-	$size: 32,
-	$include-base-styles: false // do not duplicate the base styles
-);
+ mask-image: var(--o3-icon-plus);
}
```

**CSS**
```css
.my-icon {
	display: inline-block;
	width: 32px;
	height: 32px;
	background-color: var(--o3-color-palette-black);
	mask-repeat: no-repeat;
	mask-size: contain;
}

.my-icon--plus {
	mask-image: var(--o3-icon-plus);
}

.my-icon--chat {
    mask-image: var(--o3-icon-chat);
}
```

**HTML**
```html
<span class="my-icon my-icon--plus"></span>
<span class="my-icon my-icon--chat"></span>
```

### Migrating from v6 to v7


Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v5 to v6


The `vertical-align` property of icons is now `middle` by default (previously `baseline`), as the icon svg includes whitespace around the icon glyph ([related issue](https://github.com/Financial-Times/o-icons/issues/58)). Confirm your icons align with surrounding text, you may need to adjust margin/padding or restore `vertical-align: baseline;`.

The following variables have been removed:
- `$o-icons-use-local-assets` has been removed; icons always come via the image service. Local icons could not be coloured, and new icons are published to the image service via fticons, before being included by `o-icons`.
- `$o-icons-service-base-url` and `$o-icons-service-version` have also been removed.

The following mixins have been renamed:
- `oIconsBaseStyles` is now `oIconsContentBaseStyles`.
- `oIconsGetIcon` is now named `oIconsContent`. Its arguments have also changed:
	- `$container-width` and `$container-height` have been replaced with a single `$size` argument (our icons are square).
	- `$apply-width-height` has been removed. So not to set a width/height set `$size: null` instead.
	- `$apply-base-styles` has been renamed `$include-base-styles` to match other components.

### Migrating from v4 to v5

The jump from 4 to 5 introduces an entirely new set of icons. Using these icons should be a lot easier as they have a uniform amount of white-space around them, so you don't need to individually size icons to work in your application harmoniously.

That said, because the icons have all changed, you will need to adjust the sizing and alignment of them in your application as things that aligned before may be out of whack now.


#### Deprecated icons
The new icon set has deprecated some icons, added some, and renamed some others. For a full list of these icons please see the [fticon README](http://github.com/financial-times/fticon).

#### Logos and Mastheads
The logos and masthead that were deprecated in version 4 have now moved completely. Please use the [Logo Images set](http://github.com/financial-times/logo-images) via the image service for these.

### Migrating from v3 to v4

#### Important changes

* `o-ft-icons` has been renamed to `o-icons`
* Icon font has been removed, now it's SVGs all the way. This changes the behaviour for silent mode turned off users which includes Build Service users
* Some icons have been removed, and as mentioned above, others have been deprecated. The list of deleted icons is:
	- brand-always-learning
	- brand-fast-ft
	- brand-fast
	- brand-myft
	- brand-pearson
	- eye
	- font-size
	- gift
	- section-columnists
	- section-house-and-home
	- section-leader-and-letters
	- section-lex
	- section-markets-data
	- section-money
	- section-uk

#### Markup changes

CSS now doesn't add any pseudoclasses, so all the styling is applied directly on the element

#### CSS Changes

* Class prefixes need to be renamed from `o-ft-icons` to `o-icons`

	e.g.

	`o-ft-icons-icon` to `o-icons-icon`
	`o-ft-icons-icon--arrow-down` to `o-icons-icon--arrow-down`

* As it's an SVG instead of a font, size is now set using the CSS properties `width` and `height`

#### Sass Changes

* All icon font related mixins have been removed
* `oFtIconsBaseIconStyles` has been renamed to `oIconsContentBaseStyles`
* `oFtIconsGetSvg` has been renamed to `oIconsGetIcon`

#### Silent mode off Changes

When using the [Build Service](https://origami-build.ft.com), you're using this module with silent mode turned off. Due to the removal of the icon font, there are a couple things to keep in mind in the new implementation:

* There is a PNG fallback, and when using the default CSS classes, the size of the image served is _128px_ so it can be resized down, but not up
* The colour of the icon served is _black_. This cannot be changed. If you need a custom colour (or even a custom size), [option 3](#3-manually-using-the-responsive-image-service) of the suggested ways of using this module is the way to go
