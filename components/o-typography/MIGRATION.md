## Migration guide

### Migrating to v7.7.0

v7.7.0 includes a change to use Image Service V3. Whilst the change should be unobtrusive, there are some checks you will need to perform.

Image service V3 uses a hosts configuration, meaning **a valid system code must be used in order to make image requests** this can be set in your Sass configuration as a global.

```scss
//global scope of your Sass code
$system-code: 'next-article';
```

Your system must appear in the valid hosts for the Image Service, please refer to the [Image Service documentation](https://github.com/Financial-Times/image-service?tab=readme-ov-file#systems--hosts).

### Migrating from v7 to o3-foundation

o-typography is now replaced by [o3-foundation](../o3-foundation/README.md).

This guide will update to the latest version of o3-foundation (v3). Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

#### Themes

Brands are now applied using a parent data attribute `data-o3-brand`. Likewise, themes are applied using `data-o3-theme` – this may be placed on the on a parent element or the `o3-typography` component directly.

E.g. An FT Professional brand Link, brand inherited from a parent element.
```html
<body data-o3-brand="professional">
	<a href="#" class="o3-typography-link">To somewhere.</a>
</body>
```

E.g. An FT Core brand Link with inverse theming, brand and theme inherited from a parent element.
```html
<body data-o3-brand="professional" data-o3-theme="inverse">
	<a href="#" class="o3-typography-link">To somewhere.</a>
</body>
```
#### Markup

Replace `o-typography` classes in your HTML code with the `o3-typography` alternative described below.

Note that we now use two scales, see our [typography guidelines](https://origami-beta.ft.com/guides/typography/) for more information. We also recommend using use case classes where apropriate, and using scale tokens where there is not a close enough use case equivalent.

###### Body elements

```html
<p class="o-typography-body">Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	<a href="#" class="o-typography-link">Link</a>
	a rem <strong class="o-typography-bold">excepturi</strong>
	consequuntur commodi dolores ad <em class="o-typography-italic">laboriosam</em> qui odit
</p>

<figcaption class="o-typography-caption">
	John Doe
</figcaption>

<footer class="o-typography-footer">Footer such as copyright notice.</footer>
```

Replace with:

**HTML**

```html
<p class="o3-typography-use-case-body-base">Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	<a href="#" class="o3-typography-link">Link</a>
	a rem <strong class="o3-typography-use-case-body-highight">excepturi</strong>
	consequuntur commodi dolores ad <em class="o3-typography-italic">laboriosam</em> qui odit </p>
<p class="o3-type-body-base">Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	a rem <strong class="o3-type-body-highight">excepturi</strong>
	consequuntur commodi dolores ad <em class="o3-type-body-content-emphasis">laboriosam</em> qui odit </p>

<figcaption class="o3-typography-caption">
	John Doe
</figcaption>

<footer class="o3-typography-footer">Footer such as copyright notice.</footer>
```

###### Wrapper

The wrapper class is exported by the oTypography mixin. And the previous CSS classes can be replaced with the new classes.

```html
<div class="o-typography-wrapper">
	<h1>Heading</h1>
	<p>Content</p>
</div>
```

Replace with:

**HTML**
```html
<div class="o3-typography-wrapper">
	<h1>Heading</h1>
	<p>Content</p>
</div>
```

**JSX**

```jsx
import {Wrapper} from '@financial-times/o3-foundation';

<Wrapper>
	<h1>Heading</h1>
	<p>Content</p>
</Wrapper>
```

##### Headings

Headings use a BEM modifier to style the heading level:

```html
<h1 class="o-typography-heading-level-1">Heading 1</h1>
<h2 class="o-typography-heading-level-2">Heading 2</h2>
<h3 class="o-typography-heading-level-3">Heading 3</h3>
<h4 class="o-typography-heading-level-4">Heading 4</h4>
<h5 class="o-typography-heading-level-5">Heading 5</h5>
<h6 class="o-typography-heading-level-6">Heading 6</h6>
```

Replace with typography use cases where apropriate. Please consult with the design team to decide the best match for your context:

**HTML**
```html
<h1 class="o3-type-title-lg">Welcome to Origami</h1>
<h2 class="o3-type-title-mdl">Our guidelines</h2>
<h3 class="o3-type-display-sm">What to expect in Origami 3</h3>

```

##### List

```html
	<ul class="o-typography-list o-typography-list--unordered">
		<li>List</li>
		<li>List</li>
	</ul>

	<ol class="o-typography-list o-typography-list--ordered">
		<li>List ordered</li>
		<li>List ordered</li>
	</ol>
```

Replace with:

**HTML**

```html
<ul class="o3-typography-ul">
	<li>List item</li>
	<li>List item</li>
</ul>

<ol class="o3-typography-ol">
	<li>List ordered</li>
	<li>List ordered</li>
</ol>
```

**JSX**

```jsx
import {UnorderedList, OrderedList } from '@financial-times/o3-foundation';

<UnorderedList>
	<li>List item</li>
	<li>List item</li>
</UnorderedList>

<OrderedList>
	<li>List ordered</li>
	<li>List ordered</li>
</OrderedList>
```

#### Mixins

##### oTypography

This includes `oTypographyBody`, `oTypographySub`, `oTypographySuper`, `oTypographyLink`, `oTypographyFooter`, and `oTypographyCaption`.

There are no direct replacements for these mixins. Instead, use the css classes in the [markup](#markup) section above.

##### oTypographySerif

```scss
p {
	@include oTypographySerif();
}
```

Replace with:

```css
p {
	font-family: var(--o3-font-family-georgia);
}
```

For uses of `oTypographySerif` with options, use the equivalent css rules directly:

**Sass**
```scss
p {
	@include oTypographySerif($scale: 1,
	$weight: 'semibold',
	$style: 'italic');
}
```

Replace with:

**CSS**
```css
p {
	font-family: var(--o3-font-family-georgia);
	font-size: var(--o3-font-size-1);
	font-weight: var(--o3-font-weight-semibold);
	line-height: var(--o3-font-lineheight-1);
	font-style: italic;
}
```

##### oTypographyDisplay

```scss
p {
	@include oTypographyDisplay();
}
```

Replace with:

```css
p {
	font-family: var(--o3-font-family-financier-display);
}
```

For uses of `oTypographyDisplay` with options, use the equivalent css rules directly:

**Sass**
```scss
p {
	@include oTypographyDisplay($scale: 1,
	$weight: 'semibold',
	$style: 'italic');
}
```

Replace with:

**CSS**
```css
p {
	font-family: var(--o3-font-family-financier-display);
	font-size: var(--o3-font-size-1);
	font-weight: var(--o3-font-weight-semibold);
	line-height: var(--o3-font-lineheight-1);
	font-style: italic;
}
```
##### oTypographySans

```scss
p {
	@include oTypographySans();
}
```

Replace with:

```css
p {
	font-family: var(--o3-font-family-metric);
}
```



For uses of `oTypographySans` with options, please consult with the design team to decide the best match for your context.

**Sass**
```scss
p {
	@include oTypographySans($scale: 1,
	$weight: 'semibold',
	$style: 'italic');
}
```

**CSS**
```css
p {
	font-family: var(--o3-font-family-metric); // outputs: 'Metric VF', sans
	font-size: var(--o3-type-body-base-font-size);
	line-height: var(--o3-type-body-base-line-height);
	font-weight: var(--o3-type-body-base-font-weight);
}
```

For all other scale uses, use the equivalent css rules directly. Note that there are multiple font scales in o3. Use the Metric font scale `--o3-font-size-metric2-[scale]` where the font family is set to `--o3-font-family-metric`.

**NOTE:** When migrating the scale option in `oTypographySans`, the value used with `--o3-font-family-metric` must be offset by -1 to preserve the same sizing and line height.

E.g:

**Sass**
```scss
p {
	@include oTypographySans($scale: 1,
	$weight: 'semibold',
	$style: 'italic');
}
```

Replace with:

**CSS**
```css
p {
	font-family: var(--o3-font-family-metric); // outputs: 'Metric VF', sans
	font-size: var(--o3-font-size-metric2-0);
	line-height: var(--o3-font-lineheight-metric2-0);
	font-weight: var(--o3-font-weight-semibold);
	font-style: italic;
}
```

##### oTypographySetFont

This can now be set by defining your own font family in CSS.


```scss
@include oTypographySetFont('my-font', 'sans');
```

Replace with:

```css
@font-face {
	font-family: 'my-font';
	src: url('my-font.woff2') format('woff2');
	font-weight: auto;
	font-weight: 400;
	font-style: normal;
}

p {
	font-family: 'my-font';
}
```

##### oTypographyDefineFontScale

There is no direct replacement for this mixin. Instead, a default scale is provided as part of [o3-foundation](https://github.com/Financial-Times/origami/tree/main/components/o3-foundation), or define your own font scale in your code:

```css

:root {
	--my-custom-font-size-0: 1.1rem;
	--my-custom-font-font-size-1: 1.125rem;
	--my-custom-font-font-size-2: 1.28rem;
	--my-custom-font-font-size-3: 1.6rem;
}

.my-font-class {
	font-size: var(--my-custom-font-size-1);
}

.my-font-class--large  {
	font-size: var(--my-custom-font-size-3);
}
```
#### Functions

##### oTypographyGetScale

Scale is now part of [o3-foundation](https://github.com/Financial-Times/origami/tree/main/components/o3-foundation). Two font scales exist, one for Financier and Georgia, and another for Metric. Please refer to [Origami Design System documentation](https://origami-beta.ft.com/guides/typography/#metric-scale) for details on these scales.

CSS Custom Properties can be used to apply scale values. For example:

**Sass**
```scss
.my-class {
	font-size: oTypographyGetScale(1);
}
```

Can be replaced with:

**CSS**
```css
.my-class {
	font-size: var(--o3-font-size-1);
}
```

##### oTypographyMaxLineWidth

This has been replaced with a CSS Custom Property with one static value:

**Sass**

```scss
.my-class {
	max-width: oTypographyMaxLineWidth(65);
}
```

Use `--o3-typography-max-line-width` or set a [custom length using a "ch" value](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

**CSS**

```css
.my-class {
	max-width: var(--o3-typography-max-line-width);
}
```

##### oTypographyGetFontFamily

This can be removed and replaced with fonts from [o3-foundation](https://github.com/Financial-Times/origami/tree/main/components/o3-foundation).


#### Variables

The following variables are no longer necessary:

* o-typography-is-silent
* o-typography-relative-units
* o-typography-error-for-missing-fonts
* o-typography-load-fonts
* o-typography-progressive-font-loading - fallbacks are now provided through our font-face design tokens. See [Fonts](#fonts).
* o-typography-baseline-unit

### Migrating from v6 to v7

V7 drops support for Bower and version 2 of Origami Build Service.

If you were already using npm, no changes should be required.

If you have been using Bower or the Origami Build Service, follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v5 to v6

#### Progressive Font Loading

The class `o-typography--loading-sansBold` is now `o-typography--loading-sans-bold` and `o-typography--loading-displayBold` is now `o-typography--loading-display-bold`. If you are using progressive font loading from o-typography update these classes on your root element (`html`) and check for any JavaScript snippet in your project which removes them by searching for `displayBold` and `sansBold`.

#### Markup

- `o-typography-wrapper` used to style any number of nested child elements. To avoid conflicting with other components `o-typography-wrapper` now only styles direct children plus the direct children of any paragraph element. If your project nests multiple elements under an element with the `o-typography-wrapper` class, check typography styling on nested elements has not been lost.
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
- `o-typography-read-next` has no direct replacement, but there is a mixin in the editorial typography component `oEditorialTypographyDecorated` to apply the decorative underline. Please speak to Origami if your team uses this class.

The previous default wrapper `o-typography-wrapper` has been removed. Consider using [o-editorial-layout](https://registry.origami.ft.com/components/o-editorial-layout) and [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography) classes, or contact the Origami team to discuss this feature. No changes are required by internal or whitelabel brand products.

The product wrapper is now the default wrapper:
- `o-typography-wrapper--product` is now `o-typography-wrapper`
- the wrapper no longer styles blockquotes, instead use [o-quote](https://github.com/Financial-Times/o-quote/)

For master brand products, the previous default headings have been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your markup:
- `o-typography-headline--large` is now `o-editorial-typography-headline`
- `o-typography-heading-level-1--large` is now `o-editorial-typography-headline`
- `o-typography-headline` is now `o-editorial-typography-heading-level-1`
- `o-typography-heading-level-1` is now `o-editorial-typography-heading-level-1`
- `o-typography-heading-level-2` is now `o-editorial-typography-heading-level-2`
- `o-typography-heading-level-3` is now `o-editorial-typography-heading-level-3`
- `o-typography-heading-level-4` is now `o-editorial-typography-heading-level-4`
- `o-typography-heading-level-5` is now `o-editorial-typography-heading-level-5`

For master brand products, the "product" headings are now the default o-typography heading. Note the size and weight of these headings have changed, so you may wish to choose a different heading level:
- `o-typography-product-heading-level-1` is now `o-typography-heading-level-1`
- `o-typography-product-heading-level-2` is now `o-typography-heading-level-2`
- `o-typography-product-heading-level-3` is now `o-typography-heading-level-3`
- `o-typography-product-heading-level-4` is now `o-typography-heading-level-4`
- `o-typography-product-heading-level-5` is now `o-typography-heading-level-5`
- `o-typography-product-heading-level-6` is now `o-typography-heading-level-6`
- `o-typography-product-heading-level-7` is now `o-typography-heading-level-6` (level 7 is removed)
- `o-typography-product-heading-level-8` is now `o-typography-heading-level-6` (level 8 is removed)

#### Sass

##### Variables

`$o-typography-loading-prefix` is now private. Update your markup to use the `o-typography--loading` class.

`$o-typography-font-scale` is now private. Use the function `oTypographyGetScale` to get font scale information; use `oTypographyDefineFontScale` to customise the scale.

The font family variables `$o-typography-sans`, `$o-typography-serif`, `$o-typography-display` are now private. To set a custom font use `oTypographySetFont` instead; to set `font-family` only include `oTypographySans`, `oTypographySerif`, or `oTypographyDisplay`.

```diff
-font-family: $o-typography-display;
+@include oTypographyDisplay();
```

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

##### oTypographyWrapper

The mixin `oTypographyWrapper` has been removed. Instead include the wrapper class `.o-typography-wrapper` using the `oTypography` mixin. Alternatively use the other typography mixins provided to style elements directly.

##### Editorial Sass (Master Brand Only)

- `oTypographyCollectionHeader` has been removed. Please contact Origami if your project requires this style to discuss using [o-teaser-collection](https://registry.origami.ft.com/components/o-teaser-collection) styles.
- `oTypographyBigNumber` is replaced by [o-big-number](https://github.com/Financial-Times/o-big-number/) sass.
- `oTypographyBlockquote` is replaced by [o-quote](https://github.com/Financial-Times/o-quote/) sass.

Editorial typography, such as that used in article pages, has moved to a new component [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your Sass:

- `oTypographyTag` becomes `oEditorialTypographyTag($type: null)`
- `oTypographyTopic` becomes `oEditorialTypographyTag($type: 'topic')`
- `oTypographyAuthor` becomes `oEditorialTypographyTag($type: 'author')`
- `oTypographyStandfirst` becomes `oEditorialTypographyStandfirst`
- `oTypographyTimestamp` becomes `oEditorialTypographyTimestamp`
- `oTypographyReadNext` has no direct replacement as it didn't appear to be used, but `oEditorialTypographyDecorated` may be used to apply a decorative underline to typography of any size in the style of "read next".

For master brand products, the previous default headings have been moved to [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography). No changes are required by internal or whitelabel brand products. Include `o-editorial-typography` in your project and update your Sass:

- `oTypographyHeadlineLarge` becomes `oEditorialTypographyHeadline` (plus margin)
- `oTypographyHeadline` becomes `oEditorialTypographyHeading($level: 1)` (plus margin)
- `oTypographyHeadingLevel1` becomes `oEditorialTypographyHeading($level: 1)` (plus margin)
- `oTypographyHeadingLevel2` becomes `oEditorialTypographyHeading($level: 2)` (plus margin)
- `oTypographyHeadingLevel3` becomes `oEditorialTypographyHeading($level: 3)` (plus margin)
- `oTypographyHeadingLevel4` becomes `oEditorialTypographyHeading($level: 4)` (plus margin)
- `oTypographyHeadingLevel5` becomes `oEditorialTypographyHeading($level: 5)` (plus margin)
- `oTypographyHeadingLevel6` becomes `oEditorialTypographyHeading($level: 6)` (plus margin)

_Note: `o-editorial-typography` does not apply margin as it makes no assumption about where the editorial typography is being used -- it could be a page, another component, or email for example. Include margin as required by your project or, for article and article-like pages, use [o-editorial-layout](https://registry.origami.ft.com/components/o-editorial-layout) instead._

For master brand products, the "product" headings are now the default o-typography heading. Note the size and weight of these headings have changed, so you may wish to choose a different heading level:
- `oTypographyProductHeadingLevel1` becomes `oTypographyHeading($level: 1)`
- `oTypographyProductHeadingLevel2` becomes `oTypographyHeading($level: 2)`
- `oTypographyProductHeadingLevel3` becomes `oTypographyHeading($level: 3)`
- `oTypographyProductHeadingLevel4` becomes `oTypographyHeading($level: 4)`
- `oTypographyProductHeadingLevel5` becomes `oTypographyHeading($level: 5)`
- `oTypographyProductHeadingLevel6` becomes `oTypographyHeading($level: 6)`
- `oTypographyProductHeadingLevel7` becomes `oTypographyHeading($level: 6)` (level 7 is removed)
- `oTypographyProductHeadingLevel8` becomes `oTypographyHeading($level: 6)` (level 8 is removed)

#### JavaScript

The option `fontLoadingPrefix` has been removed. Update your markup to use the default `o-typography--loading-` prefix instead.

The legacy option `fontLoadedStorageName` has also been removed. Use `fontLoadedCookieName` instead.

#### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

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
