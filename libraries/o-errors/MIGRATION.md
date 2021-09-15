## Migration guide

### Migrating from v4 to v5

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Migrating from v3 to v4
`o-errors` has been updated to use ES modules. Unfortunately, this means it to use with `require` you need to return the `default` property `require('o-errors').default`.
