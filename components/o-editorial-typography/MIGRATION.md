# Migration

## Migrating from v2 to o3-editorial-typography

### Themes and brands

`o-editorial-typography` has been replaced by `o3-editorial-typography`. Brands are now applied using parent data attribute `data-o3-brand`. Currently supported brands for `o3-editorial-typography` are `core` and `sustainable-views`.

New typography also supports inverse theme that can be placed on the parent element or on the element itself with `data-o3-theme="inverse"`.

e.g. Core brand with inverse theme will have following markup:

```html
<div data-o3-brand="core" data-o3-theme="inverse">
	<h1 class="o3-editorial-typography__headline">Heading</h1>
</div>
```

e.g Sustainable Views brand with inverse theme specifically applied on the element will have following markup:

```html
<div data-o3-brand="sustainable-views">
	<!-- OTHER HTML -->
	<h1 class="o3-editorial-typography__headline" data-o3-theme="inverse">
		Heading
	</h1>
	<!-- OTHER HTML -->
</div>
```

### Markup

`o3-editorial-typography` includes a JSX template for typography for React users. We recommend using JSX templates instead of copy-pasting HTML markup where possible, though both approaches are supported.

See [Storybook for full o3-editorial-typography JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-editorial-typography--jsx-documentation). If you choose not to use the `o3-editorial-typography` JSX template, ensure you update your HTML following the [oEditorialTypography mixin guide](#oEditorialTypography).

#### Mixins

migrating for each mixin remove the mixin from your Sass files. and import `o3-editorial-typography` css instead. For example, replace:

```diff
-@import '@financial-times/o3-editorial-typography/main';
-@include oEditorialTypographyHeadline;

+@import '@financial-times/o3-editorial-typography/css/[YOUR BRAND].css';
```

#### oEditorialTypography

`oEditorialTypography` mixin was used to include all o-editorial-typography CSS. `o3-editorial-typography` includes all o-editorial-typography CSS by default and can be used by applying correct class names.

There is no need to include `oEditorialTypography` mixin in your Sass files any more but few things changed in class names.

#### oEditorialTypographyHeadline

This mixin outputs large headline text. This style has high visual prominence. This was replaced by a class name `o3-editorial-typography-headline-large`. so:

```html
<h1 class="o-editorial-typography-headline">
	Don't settle for black and white
</h1>
```

becomes:

```html
<h1 class="o3-editorial-typography-headline-large">
	Don't settle for black and white
</h1>
```

#### oEditorialTypographyHeading

This mixin outputs header elements from level 1 to 5. Headings are replaced and renamed to more specific names:

| oEditorialTypographyHeading    | o3-editorial-typography class      |
| ------------------------------ | ---------------------------------- |
| oEditorialTypographyHeading(1) | o3-editorial-typography-headline   |
| oEditorialTypographyHeading(2) | o3-editorial-typography-chapter    |
| oEditorialTypographyHeading(3) | o3-editorial-typography-subheading |
| oEditorialTypographyHeading(4) | No direct replacement              |
| oEditorialTypographyHeading(5) | o3-editorial-typography-label      |

So:

```html
<h1 class="o-editorial-typography-heading-level-1">Heading level 1</h1>
<h2 class="o-editorial-typography-heading-level-2">Heading level 2</h2>
<h3 class="o-editorial-typography-heading-level-3">Heading level 3</h3>
<h4 class="o-editorial-typography-heading-level-4">Heading level 4</h4>
<h5 class="o-editorial-typography-heading-level-5">Heading level 5</h5>
```

becomes:

```html
<h1 class="o3-editorial-typography-headline">Heading level 1</h1>
<h2 class="o3-editorial-typography-chapter">Heading level 2</h2>
<h3 class="o3-editorial-typography-subheading">Heading level 3</h3>
<h3 class="o3-editorial-typography-label">Heading level 5</h3>
```

o3-editorial-typography also improves semantic html markup by using the correct heading level for the content. And we recommend using the correct heading level for the content.

#### oEditorialTypographyBody

This mixin outputs body text. To replace this mixin, use the class name `o3-editorial-typography-body` on the content element.

```diff
-<p class="o-editorial-typography-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
+<p class="o3-editorial-typography-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

#### oEditorialTypographyList

This mixin outputs list styles. Mixin can be removed once markup is updated with the correct class names.

| oEditorialTypographyList              | o3-editorial-typography class           |
| ------------------------------------- | --------------------------------------- |
| oEditorialTypographyList('ordered')   | o3-editorial-typography-list--ordered   |
| oEditorialTypographyList('unordered') | o3-editorial-typography-list--unordered |

```diff
-<div class="o-editorial-typography-body">
-    <ul class="o-editorial-typography-list o-editorial-typography-list--unordered">
-        <li>Lorem ipsum&nbsp;adipiscing elit.</li>
-        <li>Sed feugiat turpis at massa tristique.</li>
-        <li>Curabitu r accumsan elit luctus.</li>
-    </ul>
-</div>
+<div class="o3-editorial-typography-body">
+    <ul class="o3-editorial-typography-list--unordered">
+        <li>Lorem ipsum&nbsp;adipiscing elit.</li>
+        <li>Sed feugiat turpis at massa tristique.</li>
+        <li>Curabitu r accumsan elit luctus.</li>
+    </ul>
+</div>
```

#### oEditorialTypographyCaption

This mixin outputs caption text. To replace this mixin, use the class name `o3-editorial-typography-caption` on the content element.

```diff
-<figure>
-    <img alt="" src="#">
-    <figcaption class="o-editorial-typography-caption">
-        ©Lorem John Doe
-    </figcaption>
-</figure>
+<figure>
+    <img alt="" src="#">
+    <figcaption class="o3-editorial-typography-caption">
+        ©Lorem John Doe
+    </figcaption>
+</figure>
```

#### oEditorialTypographyStandFirst

This mixin outputs standfirst text. To replace this mixin, use the class name `o3-editorial-typography-standfirst` on the content element.

```diff
-<p class="o-editorial-typography-standfirst">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
+<p class="o3-editorial-typography-standfirst">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

#### oEditorialTypographyByline

This mixin outputs byline text styles. To replace this mixin, use `o3-editorial-typography-byline-*` classnames on the content element.

```diff
-<div class="o-editorial-typography-byline">
-    <a class="o-editorial-typography-author" href="#">Joe Doe</a>
-    in London
-    <time class="o-editorial-typography-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
-</div>
+<div class="o3-editorial-typography-byline">
+    <a class="o3-editorial-typography-author" href="#">Joe Doe</a>
+    <span class="o3-editorial-byline-location">
+				in London
+			</span>
+    <time class="o3-editorial-typography-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
+</div>
```

#### oEditorialTypographyTimestamp

This mixin outputs timestamp text styles. To replace this mixin, use the class name `o3-editorial-typography-timestamp` on the content element.

```diff
-<time class="o-editorial-typography-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
+<time class="o3-editorial-typography-byline-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
```

#### oEditorialTypographyTag

This mixin outputs tag text styles. To replace this mixin, use one of the following classes on the content element:

| oEditorialTypographyTag  |  o3-editorial-typography class  |
| ---------------------------------- | ------------------------------------ |
| oEditorialTypographyTag('author') | o3-editorial-typography-byline-author |
| oEditorialTypographyTag('topic') | o3-editorial-typography-topic-tag |

```diff
-<a class="o-editorial-typography-author" href="#">Joe Doe</a>
-<span class="o-editorial-typography-author">Joe Doe</span>
+<a class="o3-editorial-typography-byline-author" href="#">Joe Doe</a>
+<span class="o3-editorial-typography-topic-tag">Joe Doe</span>
```

#### oEditorialTypographyDecorated

There is no direct replacement for `oEditorialTypographyDecorated` mixin.

### Variables

`$o-editorial-typography-load-fonts` is no longer needed and font are loaded from `o3-foundation` component.

## Migrating from v1 to v2

V2 drops support for Bower and version 2 of Origami Build Service.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).
