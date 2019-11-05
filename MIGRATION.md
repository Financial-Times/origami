## Migration guide

### Migrating from v1 to v2

#### Markup

The default opacity based transition is now applied with the class `o-lazy-load--transition`. If your project uses non-silent mode to include all o-lazy-load or calls `oLazyLoadTransition` then add the modifier class `o-lazy-load--transition` to your lazy loading elements.

```diff
-<img class="o-lazy-load" data-src="#" alt="">
+<img class="o-lazy-load o-lazy-load--transition" data-src="#" alt="">
```

#### Sass

Replace `oLazyLoadTransition` and `oLazyLoadPlaceholder` with a single call to `oLazyLoad`:

```diff
-@include oLazyLoadTransition();
-@include oLazyLoadPlaceholder();
+@include oLazyLoad();
```

Use the options `$opts` map to include lazy load features granularly, including placeholder ratios:

```scss
@include oLazyLoad($opts: (
    'placeholder': true, // e.g. .o-lazy-load-placeholder
    'placeholder-ratios': ((16, 9), (1, 1)), // e.g. .o-lazy-load-placeholder--16x9
    'transition': true
));
```

`$o-lazy-load-placeholder-ratios` is now private and must not be used, instead use the `oLazyLoad` option map above.
