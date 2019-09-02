## Migration Guide

### Migrating from v1 to v2

#### Markup

The `data-o-toggle-callback` attribute must now reference a named function, rather than the contents of a function. E.g.

```diff
+<script>
+    window.myToggleCallback = function(state, event) {
+        console.log('toggled!');
+    };
+</script>
+<button data-o-component="o-toggle" data-o-toggle-target="#my-target" data-o-toggle-callback="myToggleCallback">My button</button>
-<button data-o-component="o-toggle" data-o-toggle-target="#my-target" data-o-toggle-callback="console.log('toggled!');">My button</button>
<div id='my-target' class="o-toggle">Some toggleable content</div>
```

#### Styles

Optionally, you may be able to remove CSS from your project and use one of two new CSS classes `o-toggle` now provides to help hide a target when the toggle is not active (`o-toggle-display` and `o-toggle-visibility`).
