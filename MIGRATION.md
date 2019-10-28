## Migration guide

### Migrating from v5 to v6

The class `o-typography--loading-sansBold` is now `o-typography--loading-sans-bold` and `o-typography--loading-displayBold` is now `o-typography--loading-display-bold`.

The `o-typography-link--external` class must be used with the `o-typography-link` class.

The following mixins have been replaced:
- oTypographySansBold: oTypographySans($weight: 'semibold')
- oTypographyDisplayBold: oTypographyDisplay($weight: 'bold')
- oTypographySerifBold: oTypographySerif($weight: 'bold')
- oTypographySerifItalic: oTypographySerif($style: 'italic')
- oTypographyBold('sans'): oTypographySans($weight: 'semibold', $opts: ('font-family': false))
- oTypographyBold('serif'): oTypographySerif($weight: 'bold', $opts: ('font-family': false))
- oTypographyItalic: Use the `$style` argument of other mixins. Eg. `oTypographySerif($style: 'italic')`.
- oTypographyLinkCustom: oTypographyLink($theme: ('base': 'claret', 'hover': 'claret-30'));
- oTypographyLinkExternal: oTypographyLink($external: true);
- oTypographyLinkExternalIcon: oTypographyLink($external: true, $include-base-styles: false);
- oTypographySize: oTypographySans($scale: 1, $opts: ('font-family': false))
- oTypographyListOrdered: oTypographyList($type: 'ordered', $include-base-styles: false)
- oTypographyListUnordered: oTypographyList($type: 'unordered', $include-base-styles: false)

The following mixins have been updated:
- oTypographyMaxLineWidth: Returns a relative `ch` rather than `px` value. The `$scale` and `$font` parameters are redundant and have been removed.
The following mixins have been removed:
- oTypographyProgressiveFontFallback: progressive font fallbacks are output by other mixins

### Editorial Typography

Editorial typography, such as that used in article pages, has moved to a new component [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography).

The following mixins have been removed:
- oTypographyTopic
- oTypographyAuthor
- oTypographyStandfirst
- oTypographyTimestamp
- oTypographyTag
- oTypographyBigNumber
- oTypographyWrapper
- oTypographyHeadline
- oTypographyHeadlineLarge
- oTypographyProductHeadingLevel1
- oTypographyProductHeadingLevel2
- oTypographyProductHeadingLevel3
- oTypographyProductHeadingLevel4
- oTypographyProductHeadingLevel5
- oTypographyProductHeadingLevel6
- oTypographyProductHeadingLevel7
- oTypographyProductHeadingLevel8
- oTypographyCollectionHeader
- oTypographyReadNext
- oTypographyBlockquote
- oTypographyPadding
- oTypographyMargin

The following functions have been removed:
- oTypographySpacingSize

The following css classes have been removed:
- o-typography-topic
- o-typography-author
- o-typography-standfirst
- o-typography-timestamp
- o-typography-big-number
- o-typography-wrapper--product
- o-typography-headline
- o-typography-headline--large
- o-typography-heading-level-1--large
- o-typography-product-heading-level-1
- o-typography-product-heading-level-2
- o-typography-product-heading-level-3
- o-typography-product-heading-level-4
- o-typography-product-heading-level-5
- o-typography-product-heading-level-6
- o-typography-product-heading-level-7
- o-typography-product-heading-level-8
- o-typography-product-heading-level-7--thin-rule
- o-typography-collection-heading
- o-typography-read-next
- o-typography-blockquote

The following colour usecases have been removed. Replace `o-typography-body` with the default o-colors usecase `body`. If your project requires any other usecase please contact the Origami team:
- o-typography-timestamp
- o-typography-headline
- o-typography-body
- o-typography-standfirst
- o-typography-caption
- o-typography-list-prefix
- o-typography-blockquote
- o-typography-author
- o-typography-author-hover

Headings are now sans-seif "product" headings by default.

Only direct children of `o-typography-wrapper` are styled.

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
