## Migration guide

### Migrating from v1 to v2

v2 updates its o-colors dependency to a new major and introduces a dependency on o-typography and o-spacing. Ensure your project dependencies does not conflict and update these components if required.

v2 also updates the Sass mixin `oBigNumber` to output all o-big-number CSS. We recommend including CSS using `oBigNumber` and using default o-big-number markup. If you are unable to update your to o-big-number markup, use `oBigNumberTitle` to style the title element and continue to use `oBigNumberContent` to style the content element.
