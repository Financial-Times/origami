# Migration

## Migrating from v2 to o3-editorial-typography

### Themes and brands

`o-editorial-typography` has been replaced by `o3-editorial-typography`. Brands are now applied using parent data
attribute `data-o3-brand`. Currently supported brands for `o3-editorial-typography` are `core` and `sustainable-views`.

New typography also supports inverse theme that can be placed on the parent element or on the element itself
with `data-o3-theme="inverse"`.

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

`o3-editorial-typography` includes a JSX template for typography for React users. We recommend using JSX templates
instead of copy-pasting HTML markup where possible, though both approaches are supported.

See [Storybook for full o3-editorial-typography JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-editorial-typography--jsx-documentation).
If you choose not to use the `o3-editorial-typography` JSX template, ensure you update your HTML following
the [oEditorialTypography mixin guide](#oEditorialTypography).

#### Mixins

To migrate each mixin first import `o3-editorial-typography` css. For example:

```diff
-@import '@financial-times/o3-editorial-typography/main';
+@import '@financial-times/o3-editorial-typography/css/[YOUR BRAND].css';
```

#### oEditorialTypography

`oEditorialTypography` mixin was used to include all o-editorial-typography CSS. `o3-editorial-typography` includes all
o-editorial-typography CSS by default and can be used by applying correct class names.

There is no need to include `oEditorialTypography` mixin in your Sass files any more. Using new class names replaced
mixins that output css.

class name replacements are as follows:

| oEditorialTypography                                               | o3-editorial-typography class                                                                  |
|--------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| o-editorial-typography-heading-level-1                             | o3-editorial-typography-headline                                                               |
| o-editorial-typography-heading-level-2                             | o3-editorial-typography-chapter                                                                |
| o-editorial-typography-heading-level-4                             | No direct replacement<strong>*</strong>                                                        |
| o-editorial-typography-heading-level-5                             | o3-editorial-typography-label                                                                  |
| o-editorial-typography-body                                        | o3-editorial-typography-body                                                                   |
| o-editorial-typography-list o-editorial-typography-list--unordered | o3-editorial-typography-list-unordered                                                         |
| o-editorial-typography-list o-editorial-typography-list--ordered   | o3-editorial-typography-list-ordered                                                           |
| o-editorial-typography-caption                                     | o3-editorial-typography-caption                                                                |
| o-editorial-typography-standfirst                                  | o3-editorial-typography-standfirst                                                             |
| o-editorial-typography-byline                                      | Replace with o3-editorial-typography-byline-timestamp and o3-editorial-typography-byline-author |
| o-editorial-typography-timestamp                                   | o3-editorial-typography-byline-timestamp                                                       |
| o-editorial-typography-author                                      | o3-editorial-typography-byline-author                                                          |
| o-editorial-typography-topic                                       | o3-editorial-typography-topic-tag                                                              |
| o-editorial-typography-link                                        | o3-typography-use-case-body-content-highlight                                                  |
***Note:** Please contact the Origami team to discuss best migration path where no replacement for a heading style is available.

#### oEditorialTypographyHeadline

This mixin outputs large headline text. This style has high visual prominence. To replace the usage of this mixin,
replace custom class names with exported class from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-headline {
- @include oEditorialTypographyHeadline();
-}
```

Then, replace the custom class with the `o3-editorial-typography-headline-large` class:

```html
<h1 class="my-headline">
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

This mixin outputs header elements from level 1 to 5. This mixin has been replaced by a set of classes that are more
semantic and have better visual hierarchy. To remove the mixin, replace custom class names with exported class
from `o3-editorial-typography`.

First remove the mixin and custom class from your Sass file:

```diff
-.my-heading-1 {
- @include oEditorialTypographyHeading(1);
-}
-.my-heading-2 {
- @include oEditorialTypographyHeading(2);
-}
-.my-heading-3 {
- @include oEditorialTypographyHeading(3);
-}
-.my-heading-5 {
- @include oEditorialTypographyHeading(5);
-}
```

Then, replace the custom class with
the `o3-editorial-typography-headline`, `o3-editorial-typography-chapter`, `o3-editorial-typography-subheading`,
or `o3-editorial-typography-label` class:

```html
<h1 class="my-heading-1">Heading level 1</h1>
<h2 class="my-heading-2">Heading level 2</h2>
<h3 class="my-heading-3">Heading level 3</h3>
<h4 class="my-heading-4">Heading level 4</h4>
<h5 class="my-heading-5">Heading level 5</h5>
```

becomes:

```html
<h1 class="o3-editorial-typography-headline">Heading level 1</h1>
<h2 class="o3-editorial-typography-chapter">Heading level 2</h2>
<h3 class="o3-editorial-typography-subheading">Heading level 3</h3>
<h3 class="o3-editorial-typography-label">Heading level 5</h3>
```

o3-editorial-typography also improves semantic html markup by using the correct heading level for the content. And we
recommend using the correct heading level for the content.

#### oEditorialTypographyBody

This mixin outputs body text styles. To replace the usage of this mixin, replace custom class names with exported class
from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-body-text {
- @include oEditorialTypographyBody();
-}
```

Then, replace the custom class with the `o3-editorial-typography-body` class:

```diff
-<p class="my-body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
+<p class="o3-editorial-typography-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

#### oEditorialTypographyList

This mixin outputs list styles. Mixin can be removed once markup is updated with the correct class names. Users used
this mixin to output ordered and unordered list styles in their custom classes.

First, remove the mixin from your Sass file:

```diff
-.my-list {
- @include oEditorialTypographyList();
-}
-
-.my-list--ordered {
- @include oEditorialTypographyList('ordered', $include-base-styles: false);
-}
-
-.my-list--unordered {
- @include oEditorialTypographyList('unordered', $include-base-styles: false);
-}
```

Then, replace the custom class with the `o3-editorial-typography-list--ordered`
or `o3-editorial-typography-list--unordered` class:

```diff
-<div class="o-editorial-typography-body">
-    <ul class="my-list my-list--unordered">
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

This mixin outputs caption text styles. To replace the usage of this mixin, replace custom class names with exported
class from `o3-editorial-typography`.

first, remove the mixin and custom class from your Sass file:

```diff
-.my-caption-text {
- @include oEditorialTypographyCaption();
-}
```

Then, replace the custom class with the `o3-editorial-typography-caption` class:

```diff
-<figure>
-    <img alt="" src="#">
-    <figcaption class="my-caption-text">
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

This mixin outputs standfirst text. To replace the usage of this mixin, replace custom class names with exported class
from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-standfirst-text {
- @include oEditorialTypographyStandFirst();
-}
```

Then, replace the custom class with the `o3-editorial-typography-standfirst` class:

```diff
-<p class="my-standfirst-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
+<p class="o3-editorial-typography-standfirst">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

#### oEditorialTypographyByline

This mixin outputs byline text styles. To replace usage of this mixin, replace custom class names with exported class
from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-byline-wrapper {
- @include oEditorialTypographyByline();
-}

```

Then, replace the custom class with the `o3-editorial-typography-byline` classes:

```diff
-<div class="my-byline-wrapper">
-  # byline content
-</div>
+<div>
+				<a className="o3-editorial-typography-byline-author" href="#">
+					Joe Doe&nbsp;
+				</a>
+				<time
+					className="o3-editorial-typography-byline-timestamp"
+					dateTime="2019-10-11T20:51:54Z"
+					title="October 11 2019 9:51 pm">
+					October 11 2019
+				</time>
+</div>
```

#### oEditorialTypographyTimestamp

This mixin outputs timestamp text styles. To replace the usage of this mixin, replace custom class names with exported
class from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-timestamp {
- @include oEditorialTypographyTimestamp();
-}
```

Then, replace the custom class with the `o3-editorial-typography-byline-timestamp` class:

```diff
-<time class="my-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
+<time class="o3-editorial-typography-byline-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm">October 11 2019</time>
```

#### oEditorialTypographyTag

This mixin outputs tag text styles. To replace usage of this mixin, replace custom class names with exported class
from `o3-editorial-typography`.

First, remove the mixin and custom class from your Sass file:

```diff
-.my-topic-tag {
- @include oEditorialTypographyTag('topic');
-}

-.my-author-tag {
- @include oEditorialTypographyTag('author');
-}
```

Then, replace the custom class with the `o3-editorial-typography-topic-tag` class:

```diff
-<span class="my-topic-tag">Topic</span>
+<span class="o3-editorial-typography-topic-tag">Topic</span>
```

Or replace the custom class with the `o3-editorial-typography-byline-author` class:

```diff
-<span class="my-author-tag">Author</span>
+<span class="o3-editorial-typography-byline-author">Author</span>
```

#### oEditorialTypographyDecorated

There is no direct replacement for `oEditorialTypographyDecorated` mixin.

### Variables

`$o-editorial-typography-load-fonts` is no longer needed and font are loaded from `o3-foundation` component.

## Migrating from v1 to v2

V2 drops support for Bower and version 2 of Origami Build Service.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).
