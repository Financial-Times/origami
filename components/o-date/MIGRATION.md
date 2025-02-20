# Migration Guide

## Migrating from v5 to v6

We have introduced a `t` format symbol that renders a full ft-style time 10:43pm for the time.

Custom formats which use the string 't' will no longer render as a string literal "t".

To add the literal 't' update the custom date format string from `t` to `\t`.

**Before**

```
<time data-o-component="o-date" class="o-date" datetime="Tue Mar 21 2023 10:38:05 GMT+0000 (Greenwich Mean Time)" data-o-date-format="d MMM yyyy, t" title="March 21 2023 10:38 am" data-o-date-js="">21 Mar 2023, t</time>
```

**After**
```
<time data-o-component="o-date" class="o-date" datetime="Tue Mar 21 2023 10:38:05 GMT+0000 (Greenwich Mean Time)" data-o-date-format="d MMM yyyy, t" title="March 21 2023 10:38am" data-o-date-js="">March 21 2023 10:38am</time>
```

### Migrating from v4 to v5

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

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
