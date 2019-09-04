## Migration Guide

### Migrating from v3 to v4

#### Removed Methods

`detectVisiblityAPI` has been removed, we recommend [document.visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) or [document.hidden](https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden) instead.

#### ES Modules over CommonJS

v4 uses [ES Modules over CommonJS](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) syntax. We recommend to include `o-viewport` using the es modules syntax.

```diff
-const oViewport = require('o-viewport');
+import oViewport from 'o-viewport';
```

However to use the CommonJS syntax, without a plugin like [babel-plugin-transform-es2015-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs), add `.default` to access `o-viewport` methods.

```diff
-const oViewport = require('o-viewport');
+const oViewport = require('o-viewport').default;
```

#### Browser Support

The inbuilt polyfill for `screen.orientation` has been removed. `o-viewport` will infer screen orientation without it, but for more accurate support across browsers add the polyfill to your project using [polyfill.io](https://polyfill.io/v3/url-builder/).

The in built polyfill for `document.visibilityState` has also been removed. It is supported by IE10 and above, so no action is needed.

`getScrollPosition` no longer supports IE < 9.

### Migrating from v2 to v3

v3 removes the `throttle` and `debounce` methods from `o-viewport`. We recommend [o-utils](https://github.com/Financial-Times/o-utils/) instead.

### Migrating from v1 to v2

v2 introduces ES6 syntax. Ensure your project compiles ES6 syntax according to your browser support needs.
