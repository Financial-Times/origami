## Migration Guide

### Migrating from v3 to Origami 3

o-normalise is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to the latest version of o3-foundation (v3). Be sure to check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

To migrate, ensure o3-foundation is installed.

```bash
npm i --save @financial-times/o3-foundation
```

Replace any sass mixins initialising o-normalise with the o3-foundation import.

```diff
- @use '@financial-times/o-normalise';
+ @import '@financial-times/o3-foundation'; //This will import all foundation components including normalise.
- @include oNormalise();
```

Remove any other mixins from o-normalise and use the o3-foundation/normalise classes in HTML, or templating language instead:

#### oNormaliseVisuallyHidden

**Sass**
```diff
    .myClass {
-    @include oNormaliseVisuallyHidden();
    /* other styling */
    }
```
**HTML**
```html
<div class="myClass o3-visually-hidden">
  <p>My content</p>
</div>
```

#### oNormaliseClearFix

This has been removed in o3-foundation, and is rarely needed these days. This can be removed from your code.

If you still need a clearfix solution, start a conversation on Slack in #origami-support.

#### oNormaliseBoxSizing

**Sass**
```diff
    .myclass {
-        @include oNormaliseVisuallyHidden();
         padding: 20px;
         width: 300px;
     }
```
**HTML**
```html
<div class="myClass o3-box-sizing-border-box">
  <p>Content is sized by border box!</p>
</div>
```

#### Focus States

Focus states are provided as standard when importing o3-foundation.

#### oNormaliseFocusApply and oNormaliseFocusContent

Replace with classes in HTML

**Sass**
```diff
button {
-    @include oNormaliseFocusApply() {
-    @include oNormaliseFocusContent();
    /* other styles */
}
}
```
**HTML**
```html
<button class="o3-apply-focus-rings">My Button</button>
```

### Migrating from v2 to v3

V3 drops support for Bower and version 2 of the Origami Build Service.

If you were already using npm, no changes should be required.

If you have been using Bower or the Origami Build Service, follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/)

### Migrating from v1 to v2

`o-normalise` now depends on `o-colors`. Ensure your project builds successfully and upgrade `o-colors` if there is a conflict.

#### Primary Mixin

The following mixins have been removed or made private. Replace them with a single call to the `oNormalise` primary mixin, with appropriate options passed as an argument.

- `oNormaliseHTML`: set the 'body' option with 'font-smoothing', and 'focus' features.
- `oNormaliseLinks`: add 'links' to the 'elements' option.
- `oNormaliseText`: add 'text' to the 'elements' option.
- `oNormaliseImages`: add 'images' to the 'elements' option.
- `oNormaliseForms`: add 'forms' to the 'elements' option.

E.g.
```diff
- @include oNormaliseHTML();
- @include oNormaliseForms();
+ @include oNormalise((
+     'elements': ('forms'),
+     'body': ('font-smoothing', 'focus', 'reduce-motion')
+ ));
```

#### Reduced Motion

v2 introduces a `reduce-motion` option which removes transition duration, animation duration, and animation iteration on all elements for users who have a "prefers reduced motion option" set. Confirm your project functions as expected with the [prefers reduced motion setting on in your browser](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). If not remove the o-normalise `reduce-motion` option from your project in favour of a [custom solution](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) to reduced motion, or consider using `!important` to override `o-normalise`.

#### Removed Variables

- `$o-normalise-focus-color` has been removed. Use the [o-colors](https://github.com/Financial-Times/o-colors) instead  `oColorsByUsecase('focus', 'outline')`.
- `$o-normalise-grid-gutters` has been removed. Use [$o-grid-gutters](https://github.com/Financial-Times/o-grid#variables) instead.
- `$o-normalise-border-radius` has been removed. It was set to `0` so the border radius may be removed instead.
