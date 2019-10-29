## Migration guide

### Migrating from v5 to v6

#### Progressive Font Loading

The class `o-typography--loading-sansBold` is now `o-typography--loading-sans-bold` and `o-typography--loading-displayBold` is now `o-typography--loading-display-bold`. If you are using progressive font loading from o-typography update these classes on your root element (`html`) and check for any JavaScript snippet in your project which removes them by searching for `displayBold` and `sansBold`.

#### Markup

- Only direct children of `o-typography-wrapper` are styled. If your project nests multiple elements under an element with the `o-typography-wrapper` class, check typography styling on nested elements has not been lost.
- `o-typography-link--external` class must be used along with the `o-typography-link` class.
- `o-typography-big-number` is removed, replace with [o-big-number](https://github.com/Financial-Times/o-big-number/) markup.
- `o-typography-blockquote` is removed, replace with [o-quote](https://github.com/Financial-Times/o-quote/) markup.
- `o-typography-product-heading-level-7--thin-rule` is removed. Please contact Origami if your project requires this style.
- `o-typography-collection-heading` has been removed. Please contact Origami if your project requires this style to discuss using [o-teaser-collection](https://registry.origami.ft.com/components/o-teaser-collection) styles.

##### Editorial Markup (Master Brand Only)

The following editorial style css classes have been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your markup:
- `o-typography-topic` is now `o-editorial-typography-topic`
- `o-typography-author` is now `o-editorial-typography-author`
- `o-typography-standfirst` is now `o-editorial-typography-standfirst`
- `o-typography-timestamp` is now `o-editorial-typography-byline-timestamp`
- `o-typography-read-next` is now `o-editorial-typography-read-next`

The previous default wrapper has been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your markup:
- `o-typography-wrapper` is now `o-editorial-typography-wrapper`
- the wrapper no longer styles blockquotes, instead use [o-quote](https://github.com/Financial-Times/o-quote/)

The product wrapper is now the default wrapper:
- `o-typography-wrapper--product` is now `o-typography-wrapper`
- the wrapper no longer styles blockquotes, instead use [o-quote](https://github.com/Financial-Times/o-quote/)

For master brand products, the previous default headings have been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your markup:
- `o-typography-headline--large` is now `o-editorial-typography-headline`
- `o-typography-heading-level-1--large` is now `o-editorial-typography-headline`
- `o-typography-headline` is now `o-editorial-typography-heading-1`
- `o-typography-heading-level-1` is now `o-editorial-typography-heading-level-1`
- `o-typography-heading-level-2` is now `o-editorial-typography-heading-level-2`
- `o-typography-heading-level-3` is now `o-editorial-typography-heading-level-3`
- `o-typography-heading-level-4` is now `o-editorial-typography-heading-level-4`
- `o-typography-heading-level-5` is now `o-editorial-typography-heading-level-5`

For master brand products, the "product" headings are now the default o-typography heading:
- `o-typography-product-heading-level-1` is now `o-typography-heading-level-1`
- `o-typography-product-heading-level-2` is now `o-typography-heading-level-2`
- `o-typography-product-heading-level-3` is now `o-typography-heading-level-3`
- `o-typography-product-heading-level-4` is now `o-typography-heading-level-4`
- `o-typography-product-heading-level-5` is now `o-typography-heading-level-5`
- `o-typography-product-heading-level-6` is now `o-typography-heading-level-6`
- `o-typography-product-heading-level-7` is now `o-typography-heading-level-6` (level 7 is removed)
- `o-typography-product-heading-level-8` is now `o-typography-heading-level-6` (level 8 is removed)

#### Sass

##### Colour Usecases

The following colour usecases have been removed. Replace the `o-typography-body` usecase with the default o-colors usecase `body`. If your project requires any other usecase please contact the Origami team:
- `o-typography-timestamp`
- `o-typography-headline`
- `o-typography-body` (replace with the default o-colors `body` usecase)
- `o-typography-standfirst`
- `o-typography-caption`
- `o-typography-list-prefix`
- `o-typography-blockquote`
- `o-typography-author`
- `o-typography-author-hover`

##### oTypographySansBold, oTypographySerifBold, oTypographyDisplayBold

Replace with the one of the standard `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay` type mixins and include a `$weight` argument. Set `$weight: 'semibold'` for `oTypographySans` and `bold` otherwise.

```diff
- @include oTypographySansBold();
+ @include oTypographySans($weight: 'semibold');

- @include oTypographySerifBold();
+ @include oTypographySerif($weight: 'bold');

- @include oTypographyDisplayBold();
+ @include oTypographyDisplay($weight: 'bold');
```

##### oTypographyBold

If `oTypographyBold` has been used along with `oTypographySans` add `$weight: 'semibold'` to `oTypographySans` and remove  `oTypographyBold`. If used alongside `oTypographySerif` or `oTypographyDisplay` do the same but set `$weight: 'bold'`.

```diff
- @include oTypographySans();
- @include oTypographyBold('sans');
+ @include oTypographySans($weight: 'semibold');

- @include oTypographySerif();
- @include oTypographyBold(); // with or without 'serif' argument
+ @include oTypographySerif($weight: 'bold');

- @include oTypographyDisplay();
- @include oTypographyBold(); // with or without 'serif' argument
+ @include oTypographyDisplay($weight: 'bold');
```

If `oTypographyBold` has been used without one of the three type mixins `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay` swap it for a type mixin according to the font family it will style. For example if the selector using `oTypographyBold` is applied to a sans-serif element use `oTypographySans`. Set the `$include-font-family` argument to `false` so not to repeat the font family declaration.

```diff
- @include oTypographyBold('sans');
+ @include oTypographySans($weight: 'semibold', $include-font-family: false);

- @include oTypographyBold(); // with or without 'serif' argument
+ @include oTypographySerif($weight: 'bold', $include-font-family: false);

- @include oTypographyBold(); // with or without 'serif' argument
+ @include oTypographyDisplay($weight: 'bold', $include-font-family: false);
```

##### oTypographySerifItalic

Replace with `oTypographySerif` and a `$style: 'italic'` argument.

```diff
- @include oTypographySerifItalic();
+ @include oTypographySerif($style: 'italic');
```

##### oTypographyItalic

If `oTypographyItalic` has been used along with a type mixin `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay` add a `$style: 'italic'` argument to the type mixin and remove `oTypographyItalic`.

```diff
- @include oTypographySans();
- @include oTypographyItalic();
+ @include oTypographySans($style: 'italic');

- @include oTypographySerif();
- @include oTypographyItalic();
+ @include oTypographySerif($style: 'italic');

- @include oTypographyDisplay();
- @include oTypographyItalic();
+ @include oTypographyDisplay($style: 'italic');
```

If `oTypographyItalic` has been used without one of the three type mixins `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay` swap it for a type mixin according to the font family it will style. For example if the selector using `oTypographyItalic` is applied to a sans-serif element use `oTypographySans`. Set the `$include-font-family` argument to `false` so not to repeat the font family declaration.

```diff
- @include oTypographyItalic();
+ @include oTypographySans($style: 'italic', $include-font-family: false);

- @include oTypographyItalic();
+ @include oTypographySerif($style: 'italic', $include-font-family: false);

- @include oTypographyItalic();
+ @include oTypographyDisplay($style: 'italic', $include-font-family: false);
```

Note: If it aids your projects migration you may swap oTypographyItalic for the css property `font-style: italic;` directly instead. We don't recommend this approach because you will not be warned if the required italic font does not exist.

##### oTypographySize

Different fonts may have different scales. Instead of `oTypographySize` use one of the type mixins `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay` instead. Set `$include-font-family: false` to avoid repeating the font-family property.

To scale a sans font:
```diff
- @include oTypographySize($scale: 4);
+ @include oTypographySans($scale: 4, $include-font-family: false);
```

To scale a serif font:
```diff
- @include oTypographySize($scale: 4);
+ @include oTypographySerif($scale: 4, $include-font-family: false);
```

To scale a display font:
```diff
- @include oTypographySize($scale: 4);
+ @include oTypographyDisplay($scale: 4, $include-font-family: false);
```

##### oTypographyLinkCustom

Replace `oTypographyLinkCustom` with `oTypographyLink` and a `$theme` map. The theme map accepts an o-colors palette colour name.

The arguments of `oTypographyLinkCustom` map to `$theme` keys:
- `$baseColor` becomes a `base` key
- `$hoverColor` becomes a `hover` key
- `$outlineColor` is removed, do not customise the focus outline colour. Contact the Origami team if this is required by your project.
- `$backgroundColor` becomes a `context` key

```diff
-@include oTypographyLinkCustom(
-    $baseColor: oColorsGetUseCase(claret),
-    $hoverColor: oColorsGetUseCase(claret-30),
-    $outlineColor: oColorsGetUseCase(claret-30),
-    $backgroundColor: oColorsGetUseCase(white)
-);
+@include oTypographyLink($theme: (
+    'base': 'claret',
+    'hover': 'claret-30',
+    'context': 'white'
+));
```

##### oTypographyLinkExternal

Instead of `oTypographyLinkExternal` use `oTypographyLink($external: true)`

##### oTypographyLinkExternalIcon

Instead of `oTypographyLinkExternalIcon` use `oTypographyLink($external: true, $include-base-styles: false)`.

##### oTypographyListOrdered, oTypographyListUnordered

`oTypographyList` remains the same by default. It outputs shared list styles. If used along with either `oTypographyListOrdered` or `oTypographyListUnordered`, remove these and instead pass a `$type` argument of 'ordered' or 'unordered'.

```diff
-@include oTypographyList();
-@include oTypographyListOrdered();
+@include oTypographyList($type: 'ordered');

-@include oTypographyList();
-@include oTypographyListUnordered();
+@include oTypographyList($type: 'unordered');
```

If `oTypographyListOrdered` or `oTypographyListUnordered` have been used independently of `oTypographyList` also pass a `$include-base-styles: false` argument so not to repeat styles which are shared between lists.

```diff
.my-list {
    @include oTypographyList();
}

.my-list--ordered {
-   @include oTypographyListOrdered();
+   @include oTypographyList($type: 'ordered',  $include-base-styles: false);
}

.my-list--unordered {
-   @include oTypographyListUnordered();
+   @include oTypographyList($type: 'unordered', $include-base-styles: false);
}
```

##### oTypographyMaxLineWidth

`oTypographyMaxLineWidth` now returns a relative `ch` rather than `px` value. The `$scale` and `$font` parameters are redundant, remove these.

##### oTypographyProgressiveFontFallback

Progressive font fallback styles are now consistently output by other typography mixins by default, unless explicitly disabled. Remove calls to `oTypographyProgressiveFontFallback`.

##### oTypographySpacingSize, oTypographyPadding, oTypographyMargin

The deprecated mixins `oTypographySpacingSize`, `oTypographyPadding`, and `oTypographyMargin` have been removed. Instead set `margin` and `padding` properties manually using the [o-spacing](https://registry.origami.ft.com/components/o-spacing) functions.

For more consistent spacing use a [named space](https://registry.origami.ft.com/components/o-spacing@2.0.0#demo-named-spaces) `oSpacingByName` if possible, or any o-space increment `oSpacingByIncrement` for a more direct migration.

```diff
-@include oTypographyPadding($top: 1, $bottom: 2);
+padding-top: oSpacingByName('s1');
+padding-bottom: oSpacingByName('s2');
```

```diff
-@include oTypographyMargin($top: 1, $bottom: 2);
+margin-top: oSpacingByName('s1');
+margin-bottom: oSpacingByName('s2');
```

```diff
-$size: oTypographySpacingSize(1);
+$size: oSpacingByName('s1');
```

##### Editorial Sass (Master Brand Only)

- `oTypographyCollectionHeader` has been removed. Please contact Origami if your project requires this style to discuss using [o-teaser-collection](https://registry.origami.ft.com/components/o-teaser-collection) styles.
- `oTypographyBigNumber` is replaced by [o-big-number](https://github.com/Financial-Times/o-big-number/) sass.
- `oTypographyBlockquote` is replaced by [o-quote](https://github.com/Financial-Times/o-quote/) sass.

Editorial typography, such as that used in article pages, has moved to a new component [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your Sass:

- `oTypographyTag` becomes `oEditorialTypographyTag($type: null)`
- `oTypographyTopic` becomes `oEditorialTypographyTag($type: 'topic')`
- `oTypographyAuthor` becomes `oEditorialTypographyTag($type: 'author')`
- `oTypographyStandfirst` becomes `oEditorialTypographyStandfirst`
- `oTypographyTimestamp` becomes `oEditorialTypographyBylineTimestamp`
- `oTypographyReadNext` becomes `oEditorialTypographyReadNext`

The previous default wrapper has been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your Sass:
- `oTypographyWrapper` becomes `oEditorialTypographyWrapper`

The product wrapper is now the default. Previously for the master brand this styled headings in the sans-serif "product" style and everything else in the serif editorial style. This is now consistently non-editorial.
- `oTypographyWrapper($style: 'product')` becomes `oTypographyWrapper`

For master brand products, the previous default headings have been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your markup:

- `oTypographyHeadlineLarge` becomes `oEditorialTypographyHeadline`
- `oTypographyHeadline` becomes `oEditorialTypographyHeading($level: 1)`
- `oTypographyHeadingLevel1` becomes `oEditorialTypographyHeading($level: 1)`
- `oTypographyHeadingLevel2` becomes `oEditorialTypographyHeading($level: 2)`
- `oTypographyHeadingLevel3` becomes `oEditorialTypographyHeading($level: 3)`
- `oTypographyHeadingLevel4` becomes `oEditorialTypographyHeading($level: 4)`
- `oTypographyHeadingLevel5` becomes `oEditorialTypographyHeading($level: 5)`
- `oTypographyHeadingLevel6` becomes `oEditorialTypographyHeading($level: 6)`

For master brand products, the "product" headings are now the default o-typography heading:
- `oTypographyProductHeadingLevel1` becomes `oTypographyHeading($level: 1)`
- `oTypographyProductHeadingLevel2` becomes `oTypographyHeading($level: 2)`
- `oTypographyProductHeadingLevel3` becomes `oTypographyHeading($level: 3)`
- `oTypographyProductHeadingLevel4` becomes `oTypographyHeading($level: 4)`
- `oTypographyProductHeadingLevel5` becomes `oTypographyHeading($level: 5)`
- `oTypographyProductHeadingLevel6` becomes `oTypographyHeading($level: 6)`
- `oTypographyProductHeadingLevel7` becomes `oTypographyHeading($level: 6)` (level 7 is removed)
- `oTypographyProductHeadingLevel8` becomes `oTypographyHeading($level: 6)` (level 8 is removed)

### Migrating from v4 to v5

V5 of o-typography is a complete overhaul of the typographic system for FT products. The update includes:

- introducing a **new typographic scale**, replacing the type matrix system in the previous version. This affects the [mixins and sizes](#mixins-and-sizes) provided by the API.
- new use cases, updated to reflect the latest master brand styles. These are available via new [CSS classes](#css-classes) and mixins.
- removing access to the `FinancierText` font family and replace serif font with `Georgia`.

#### Mixins and sizes

To help you migrate from the v4 mixins to the v5 mixins. We have provided a [table recommending the mixins and font scale](#v4-to-v5-font-scale) you should use when migrating from v4 to v5.

The following mixins are now renamed:

```diff
- oTypographySerifDisplayBold
+ oTypographyDisplayBold

- oTypographySerifDisplay
+ oTypographyDisplay

- oTypographySansDataBold
+ oTypographySansBold

- oTypographySansData
+ oTypographySans

- font-size
+ oTypographySize

- oTypographyProgressiveFont
+ oTypographyProgressiveFontFallback

- oTypographyFallbackFontSize
+ _oTypographyProgressiveFontFallbackSize

- oTypographyHeading1
+ oTypographyHeadline

- oTypographyHeading2
+ oTypographyHeadingLevel2

- oTypographyHeading3
+ oTypographyHeadingLevel3

- oTypographyHeading4
+ oTypographyHeadingLevel4

- oTypographyHeading5
+ oTypographyHeadingLevel5

- oTypographyLinkTopic
- oTypographyLinkTopicMedium
+ oTypographyTopic
```

v5 also removes the following mixins:

```diff
- oTypographySansSize
- oTypographySansBoldSize
- oTypographySansDataSize
- oTypographySansDataBoldSize
- oTypographySansDataItalicSize
- oTypographySerifSize
- oTypographySerifBoldSize
- oTypographySerifItalicSize
- oTypographySerifDisplaySize
- oTypographySerifDisplayBoldSize
- oTypographySerifDisplayItalicSize
```

#### CSS classes

v5 introduces several changes to the CSS classes that are available. Whether using the build service or Sass with silent mode switched off you will need to update to the new classnames. The following diff shows removed class and what classname you should use instead, if available.

```diff
- .o-typography-block
+ .o-typography-body

- .o-typography-lead
- .o-typography-lead--small
+ .o-typography-standfirst

- o-typography-heading1
+ o-typography-headline

- o-typography-heading2
+ o-typography-heading-level-2

- o-typography-heading3
+ o-typography-heading-level-3

- o-typography-heading4
+ o-typography-heading-level-4

- o-typography-heading5
+ o-typography-heading-level-5

- .o-typography-link-topic
- .o-typography-link-topic--medium
+ .o-typography-topic

- .o-typography-body-wrapper
+ .o-typography-wrapper


// The following classnames do not have like-for-like replacements
- .o-typography-flyline
- .o-typography-subhead
- .o-typography-subhead--standard
- .o-typography-subhead--crosshead
- .o-typography-aside__title
- .o-typography-aside__title--large
- .o-typography-aside__headline
- .o-typography-aside__headline--small
- .o-typography-aside__headline--large
- .o-typography-aside__body
- .o-typography-aside__body--small
- .o-typography-aside-wrapper
```

#### v4 to v5 font scale

If you are unsure about any of the suggested replacements, either speak to a designer or contact the Origami team.

| V4 Mixin | V4 size | V4 font-size (px) | V4 line-height (px) | V5 mixin | V5 scale size | V5 font-size (px) | V5 line-height (px) |
|--------- |--------- |---------:|---------:|--------- |--------- |---------:|---------:|
| oTypographySansData | xs	 | 11 | 13 | oTypographySans | -2 | 12 | 12 |
|  | s	 | 12 | 14 |  | -2 | 12 | 12 |
|  | m	 | 14 | 16 |  | -1 | 14 | 16 |
|  | l	 | 21 | 24 |  | 2 | 20 | 24 |
|  | xl	 | 28 | 32 |  | 4 | 28 | 32 |
| oTypographySansDataBold | xs	 | 11 | 13 | oTypographySansBold | -2 | 12 | 12 |
|  | s	 | 12 | 14 |  | -2 | 12 | 12 |
|  | m	 | 14 | 16 |  | -1 | 14 | 16 |
|  | l	 | 21 | 24 |  | 2 | 20 | 24 |
|  | xl	 | 28 | 32 |  | 4 | 28 | 32 |
| oTypographySansDataItalic | xs	 | 11 | 13 | oTypographySansItalic | -2 | 12 | 12 |
|  | s	 | 12 | 14 |  | -2 | 12 | 12 |
|  | m	 | 14 | 16 |  | -1 | 14 | 16 |
|  | l	 | 21 | 24 |  | 2 | 20 | 24 |
|  | xl	 | 28 | 32 |  | 4 | 28 | 32 |
| oTypographySerifDisplay | xs	 | 11 | 12 | oTypographyDisplay | -2 | 12 | 12 |
|  | s	 | 16 | 19 |  | 0 | 16 | 24 |
|  | m	 | 20 | 24 |  | 2 | 20 | 24 |
|  | l	 | 26 | 31 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
| oTypographySerifDisplayBold | xs	 | 11 | 12 | oTypographyDisplayBold | -2 | 12 | 12 |
|  | s	 | 16 | 19 |  | 0 | 16 | 24 |
|  | m	 | 20 | 24 |  | 2 | 20 | 24 |
|  | l	 | 26 | 31 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
| oTypographySerifDisplayItalic | xs	 | 11 | 12 | oTypographyDisplayItalic | -2 | 12 | 12 |
|  | s	 | 15 | 17 |  | 0 | 16 | 24 |
|  | m	 | 22 | 22 |  | 2/3 | 20/24 | 24/28 |
|  | l	 | 26 | 27 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
| oTypographySerif | xs	 | 12 | 12 | oTypographySerif | -2 | 12 | 12 |
|  | s	 | 16 | 19 |  | 0 | 16 | 24 |
|  | m	 | 20 | 24 |  | 2 | 20 | 24 |
|  | l	 | 26 | 31 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
| oTypographySerifBold | xs	 | 12 | 12 | oTypographySerifBold | -2 | 12 | 12 |
|  | s	 | 16 | 19 |  | 0 | 16 | 24 |
|  | m	 | 20 | 24 |  | 2 | 20 | 24 |
|  | l	 | 26 | 31 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
| oTypographySerifItalic | xs	 | 11 | 12 | oTypographySerifItalic | -2 | 12 | 12 |
|  | s	 | 15 | 17 |  | 0 | 16 | 24 |
|  | m	 | 22 | 22 |  | 2/3 | 20/24 | 24/28 |
|  | l	 | 26 | 27 |  | 3/4 | 24/28 | 28/32 |
|  | xl	 | 40 | 40 |  | 6 | 40 | 40 |
