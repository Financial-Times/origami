# Migration Guide

## Migrating from v3 to v4
o-date is an esm module now, so if you are using commonjs you'll want to import it like this:

```js
let ODate = require("o-date").default // note the .default
```
esm users can import it as so:

```js
import ODate from "o-date"
```

## Migrating from v2 to v3
We removed the ability to use o-date on the server in v3, the npm package `@financial-times/ft-date-format` is the server version of o-date, it is a drop-in replacement for o-date's server use.
