## Migration guide

### Migrating from v3 to o3-editorial-typography

#### Brands and themes

`o-big-number` has been deprecated and moved to be part of `o3-editorial-typography`. Brands are now applied using parent data attribute `data-o3-brand`. Currently supported brands for `o3-editorial-typography` are `core` and `sustainable-views`.

New big number also supports inverse theme that can be placed on the parent element or on the element itself with `data-o3-theme="inverse"`.

e.g. Core brand with inverse theme will have following markup:

```html
<div data-o3-brand="core" data-o3-theme="inverse">
 <div class="o3-editorial-typography-big-number">
	<div class="o3-editorial-typography-big-number__title">£27,5m</div>
	<div class="o3-editorial-typography-big-number__content">
		Cost expected to increase by £13.7m a year.
	</div>
 </div>
</div>
```

e.g Sustainable Views brand with inverse theme specifically applied on the element will have following markup:

```html
<div data-o3-brand="sustainable-views">
 <!-- OTHER HTML -->
 <div class="o3-editorial-typography-big-number" data-o3-theme="inverse">
	<div class="o3-editorial-typography-big-number__title">£27,5m</div>
	<div class="o3-editorial-typography-big-number__content">
		Cost expected to increase by £13.7m a year.
	</div>
 </div>
 <!-- OTHER HTML -->
</div>
```

#### Markup

`o3-editorial-typography` includes a JSX template for big number for React users. We recommend using JSX templates instead of copy-pasting HTML markup where possible, though both approaches are supported.

See [Storybook for full o3-editorial-typography JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-editorial-typography--jsx-documentation). If you choose not to use the `o3-editorial-typography` JSX template, ensure you update your HTML following the [oBigNumber mixin guide](#oBigNumber).

#### Mixins

##### oBigNumber, oBigNumberTitle, oBigNumberContent

`oBigNumber` mixin was used to include all o-big-number CSS. `o3-editorial-typography` includes all o-big-number CSS by default and can be used by applying correct class names. `oBigNumberTitle` and `oBigNumberContent` mixins are also replaced by new class names. Steps to migrate are as follows:

First of all replace `o-big-number-*` classes with `o3-editorial-typography-big-number-*` classes.

|class to replace | replacement class |
|-----------------|-------------------|
|o-big-number | o3-editorial-typography-big-number |
|o-big-number__title | o3-editorial-typography-big-number__title |
|o-big-number__content | o3-editorial-typography-big-number__content |

For example, replace:

```diff
-<div class="o-big-number">
-    <div class="o-big-number__title">&pound;350m</div>
-    <div class="o-big-number__content">Cost of the rights expected to increase by one-third — or about £350m a year — although some anticipate inflation of up to 70%</div>
-</div>
+<div class="o3-editorial-typography-big-number">
+ <div class="o3-editorial-typography-big-number__title">&pound;350m</div>
+ <div class="o3-editorial-typography-big-number__content">
+  Cost of the rights expected to increase by one-third — or about £350m a year — although some anticipate inflation of up to 70%
+ </div>
+</div>
```

Second step will be to import `o3-editorial-typography` styles:

```css
@import '@financial-times/o3-editorial-typography/css/[YOUR BRAND].css';
```

Third and final step will be to remove `oBigNumber`, `oBigNumberTitle` and `oBigNumberContent` mixins from your Sass files.


### Migrating from v2 to v3

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v1 to v2

v2 updates its o-colors dependency to a new major and introduces a dependency on o-typography and o-spacing. Ensure your project dependencies do not conflict and update these components if required.

v2 also updates the Sass mixin `oBigNumber` to output all o-big-number CSS. We recommend including CSS using `oBigNumber` and using default o-big-number markup. If you are unable to update your to o-big-number markup, use `oBigNumberTitle` to style the title element and continue to use `oBigNumberContent` to style the content element.

#### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).
