
# Migration

## Migrating from v2 to v3

- V3 introduces a new dependency on `o-grid`. `o-grid` enables us to position `o-tooltip` dependent on the current breakpoint. To upgrade your project confirm your version of `o-grid`, if your project has one, is compatible. You may do this by installing V3 of `o-tooltip` and confirming there are no build failures. If your project is not compatible update the version of `o-grid` used in your project. Your current use of `o-grid` may be a direct dependency on the `o-grid` component or a sub-dependency of a different component.
- The deprecated events `o.tooltipShown` and `o.tooltipClosed` are no longer fired. Use `oTooltip.show` and `oTooltip.close` instead.
- The deprecated `rectObject` property and `getEdge` method of the `Target` object no longer exist.

## Migrating from v1 to v2

V1 -> V2 introduces the new majors of `o-overlay` and `o-visual-effects`. Updating to this new version will mean updating any other components that you have which are using `o-overlay` or `o-visual-effects`. There are no other breaking changes in this release.
