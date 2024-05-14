# Migration guide

### Migrating from v5 to o3-editorial-typography

#### Brands and themes

`o-quote` has been deprecated and moved to be part of `o3-editorial-typography`. Brands are now applied using parent data attribute `data-o3-brand`. Currently supported brands for `o3-editorial-typography` are `core` and `sustainable-views`.

New quote also supports inverse theme that can be placed on the parent element or on the element itself with `data-o3-theme="inverse"`.

`o-quite` exported styling for two types of quote: `standard` and `editorial`. They were replaced by `block` and `pull` types in `o3-editorial-typography`.

|o-quote type | replacement type |
|-----------------|-------------------|
|standard | block |
|editorial | pull |

e.g. Core brand with inverse theme using `pull` type quote will have following markup:

```html
<div data-o3-brand="core" data-o3-theme="inverse">
 <blockquote class="o3-editorial-typography-quote__pull">
	<p class="o3-editorial-typography-quote__pull-content">“The future is already here — it's just not very evenly distributed.”</p>
	<cite class="o3-editorial-typography-quote__pull-source">William Gibson</cite>
 </blockquote>
</div>
```

e.g Sustainable Views brand with inverse theme specifically applied on the element using `block` type will have following markup:

```html
<div data-o3-brand="sustainable-views">
 <!-- OTHER HTML -->
 <blockquote class="o3-editorial-typography-quote__block" data-o3-theme="inverse">
	<p class="o3-editorial-typography-quote__block-content">“The future is already here — it's just not very evenly distributed.”</p>
	<cite class="o3-editorial-typography-quote__block-source">William Gibson</cite>
 </blockquote>
 <!-- OTHER HTML -->
</div>
```

#### Markup

`o3-editorial-typography` includes a JSX template for quote for React users. We recommend using JSX templates instead of copy-pasting HTML markup where possible, though both approaches are supported.

See [Storybook for full o3-editorial-typography JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-editorial-typography--jsx-documentation). If you choose not to use the `o3-editorial-typography` JSX template, ensure you update your HTML following the [oQuote mixin guide](#oQuote).

#### Mixins

##### oQuote

`oQuote` mixin was used to include all o-quote CSS. `o3-editorial-typography` includes all o-quote CSS by default and can be used by applying correct class names on a markup.

Replace `o-quote` class with `o3-editorial-typography-quote__block` for `standard` type quote and `o3-editorial-typography-quote__pull` for `editorial` type quote.

You will also need to import the `o3-editorial-typography` css file in your project instead of `o-quote` mixins.

```diff
-@import '@financial-times/o-quote/main';
-@include oQuote();
+@import '@financial-times/o3-editorial-typography/css/[YOUR BRAND].css';
```

`Standard` quote becomes:

```diff
-<blockquote class="o-quote o-quote--standard">
-    <p>
-        The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
-    </p>
-    <cite class="o-quote__cite">
-        <span class="o-quote__author">Henry Mance</span>
-        <span class="o-quote__source">Financial Times</span>
-    </cite>
-</blockquote>

+<blockquote class="o3-editorial-typography-quote__block" >
+    <p>
+        The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
+    </p>
+    <cite>
+        <span class="o3-editorial-typography-quote__block-author">Henry Mance</span>
+        <span class="o3-editorial-typography-quote__block-source">Financial Times</span>
+    </cite>
+</blockquote>
```

and `Editorial` quote becomes:

```diff
-<blockquote class="o-quote o-quote--editorial">
-    <p>
-        The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
-    </p>
-    <cite class="o-quote__cite">
-        <span class="o-quote__author">Henry Mance</span>
-        <span class="o-quote__source">Financial Times</span>
-    </cite>
-</blockquote>

+<blockquote class="o3-editorial-typography-quote__pull" >
+    <p>
+        The prize for this century’s worst technology product probably belongs to Google Glass, a pair of spectacles with an inbuilt camera and a tiny lens on which you could browse the internet. Suddenly you could film everybody you met, or silently ignore them and read Wikipedia.
+    </p>
+    <cite>
+        <span class="o3-editorial-typography-quote__pull-author">Henry Mance</span>
+        <span class="o3-editorial-typography-quote__pull-source">Financial Times</span>
+    </cite>
+</blockquote>
```

##### oQuoteEditorial

This mixin was used to include all o-quote editorial CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__pull` class to achieve the same effect on your markup.

##### oQuoteEditorialCite

This mixin was used to include all o-quote editorial cite CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use  combination of `o3-editorial-typography-quote__pull-source` and `o3-editorial-typography-quote__pull-author` class to achieve the same effect on your markup.

##### oQuoteEditorialCiteSource

This mixin was used to include all o-quote editorial cite source CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__pull-source` class to achieve the same effect on your markup.

##### oQuoteEditorialCiteAuthor

This mixin was used to include all o-quote editorial cite author CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__pull-author` class to achieve the same effect on your markup.

##### oQuoteStandard

This mixin was used to include all o-quote standard CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__block` class to achieve the same effect on your markup.

##### oQuoteStandardCite

This mixin was used to include all o-quote standard cite CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use  combination of `o3-editorial-typography-quote__block-source` and `o3-editorial-typography-quote__block-author` class to achieve the same effect on your markup.

##### oQuoteStandardCiteSource

This mixin was used to include all o-quote standard cite source CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__block-source` class to achieve the same effect on your markup.

##### oQuoteStandardCiteAuthor

This mixin was used to include all o-quote standard cite author CSS under custom css classes. There is no direct replacement for this mixin in `o3-editorial-typography`. You can use `o3-editorial-typography-quote__block-author` class to achieve the same effect on your markup.

#### Variables

`o-quote-is-silent`: Follow the migration steps above to safely delete this variable. If set to `false` update your markup, as outlined in the [oQuote](#oQuote) mixin guide.

### Migrating from v4 to v5

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

## Migrating from v3 to v4

This major version was released to correct an error in the publishing of v3.0.0. There are no changes, aside from using stable major releases in dependencies rather than beta ones.

## Migrating from v2 to v3

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Primary mixin

Like our other components, the preferred way to use `o-quote` is through the primary mixin, called `oQuote`. It takes an optional options parameter (called `$opts`) that can be a map of booleans to enable or disable features, the default is:

```
oQuote($opts: (cite: true, editorial: true))
```

Which will output the base styles, the citation styles and the special editorial styles for articles.

### Other mixins

- The deprecated `oQuoteStandardIcon` has been removed

### Placeholders

This shouldn't affect how you work, but the mixins in this component have been implemented using Sass's [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors). This should be transparent to you, the user, but it means multiple uses of the non-primary mixins will end up in the same place in the outputted CSS and if you're reading the outputted CSS when debugging that might just be something to bear in mind.

### Colour Usecases

The `o-quote` colour usecases have been removed, please contact the team if your projects needs `o-quote` colour usecases.

## Migrating from v1 to v2

- v2 brings in the new majors of `o-colors` and `o-typography` and introduces a new dependency on `o-icons`. Some of these components may result in bower conflicts if you're using other Origami components which require different versions. The solution to this is to update your other dependencies.
- v2 deletes the extends that were deprecated in v1. If you were using the extends, then you should update your code to the mixins.
