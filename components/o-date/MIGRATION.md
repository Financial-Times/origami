# Migration Guide

### Migrating from v4 to v5

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Migrating from v3 to v4
`o-date` is an [esm module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) now. We recommend using the esm syntax:

```js
import ODate from 'o-date'
```

But to continue using commonjs add `.default`:
```js
let ODate = require("o-date").default // note the .default
```

## Migrating from v2 to v3
We removed the ability to use o-date on the server in v3, the npm package `@financial-times/ft-date-format` is the server version of o-date, it is a drop-in replacement for o-date's server use.
