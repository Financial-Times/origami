## Migration Guide

### Migrating from v3 to v4

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

### Migrating from v2 to v3

v3 removes the `throttle` and `debounce` methods. These were later reintroduced, but we recommend [o-utils](https://github.com/Financial-Times/o-utils/) instead.

### Migrating from v1 to v2

v2 introduces ES6 syntax. Ensure your project compiles ES6 syntax according to your browser support needs.
