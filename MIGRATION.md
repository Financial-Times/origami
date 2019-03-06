## Migrating from v3 to v4
`o-errors` has been updated to use ES modules. Unfortunately, this means it to use with `require` you need to return the `default` property `require('o-errors').default`.
