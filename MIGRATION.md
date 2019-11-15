# Migration guide

## Migrating from v6.x.x to v7.x.x

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
$twitter-color: oColorsByName('facebook', $from: 'o-share')
```

### Mixins

`o-share v7` no longer has public mixins other than the primary mixin `oShare()`. It accepts a map `$opts` that allows you to include only the styles you need. Replace previous calls that used the mixins with one using `oShare` with an optional `$opts` map.

### Google Plus is gone

Google Plus was deprecated during the previous major version. It has now been removed.

### Custom classnames

It's no longer possible to customise the class name used in `o-share`, use the `o-share` classes instead.

## Migrating from v5.x.x to v6.x.x

o-share v6 introduces a breaking change that you may need to update in your product:

It may help to look at the [changes made to the demo markup](https://github.com/Financial-Times/o-share/pull/100/commits/a7bb5de62d16bd4b4610d80e1c863e32335bf548#diff-bf0fb135efa69a14d71d3a973a919ad5)

- CSS type selectors that were used to apply styles to the `<i>` tag have been removed so an additional class is required.
- We recommended you also use a semantically correct tag instead of the `<i>`.

```diff
<a href="#">
-	<i>
+	<span class="o-share__text">
		Share on Twitter
-	</i>
+	</span>
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

## Migrating from v4.x.x to v5.x.x

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

## Migrating from v3.x.x to v4.x.x

o-share v4 introduces a few breaking changes that you may need to update in your product:

  - V4 introduces the new major version of `o-colors`. Updating to this new version will mean updating any other components that you have which are using `o-colors`
  - the link share option has been removed

## Migrating from v2.x.x to v3.x.x

o-share v3 introduces a few breaking changes that you may need to update in your product:


  - button size has increased from 36px to 40px which might effect the surrounding elements of your design
  - the Reddit share option has been removed
  - the URL share option has been renamed from `o-share__action--url` to `o-share__action--link`
