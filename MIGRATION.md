## Migration

### Migrating from v5 to v6

In version 6 the commenting provider has been updated from Livefyre to [Coral Talk](https://coralproject.net/talk/) and as a result version 6 is a complete rewrite.

### Migrating from v4 to v5

The dependency `dom-delegate` has been replaced by `ftdomdelegate`. If your project depends on `dom-delegate`, switch to `ftdomdelegate@^3.0.0` instead -- their api is the same, but `dom-delegate` is now deprecated. Ensure your project builds without conflicts.
