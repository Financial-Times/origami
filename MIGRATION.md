## Migration guide

### Migrating from v3 to v4

Origami components now require a `$system-code` Sass variable is set by the project, which must be a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).

v4 removes the mixin `oFtAffiliateRibbonVisuallyHidden`. Replace with the o-normalise mixin [oNormaliseVisuallyHidden](https://registry.origami.ft.com/components/o-normalise/sassdoc). The mixin `oFtAffiliateRibbonBrandImage` has also been removed, there is no replacement, please contact the Origami team if your project has a usecase for this mixin.

Custom colours and colour usecases have also been removed from the palette and should not be used. Please contact Origami if your project does have a usecase for these however:
- removed colour: affiliate-ribbon-text
- removed usecases: ribbon-background, ribbon-text, ribbon-logo

The following Sass variables were unused and removed. Do not set these in your project:
- o-ft-affiliate-ribbon-image-base-url
- o-ft-affiliate-ribbon-image-service-version

### Migrating from v2 to v3

V2 -> V3 changes the design to align with the Marketing team's new design for Specialist Titles and services which replaces "Published by FINANCIAL TIMES" with "A service from the Financial Times".
The markup has changed for this component. To upgrade, make the following change:

```diff
<div class="o-ft-affiliate-ribbon">
	<div class="o-ft-affiliate-ribbon__container">
		<div class="o-ft-affiliate-ribbon__row">
---			<span class="o-ft-affiliate-ribbon__text">Published by</span>
			<a class="o-ft-affiliate-ribbon__logo" href="https://www.ft.com/" title="The Financial Times" target="_blank">
+++				<span class="o-ft-affiliate-ribbon__visually-hidden">A service from the Financial Times</span>
			</a>
		</div>
	</div>
</div>
```

### Migrating from v1 to v2

V1 -> V2 introduces the new major of o-colors. Updating to this new version will mean updating any other components that you have which are using `o-colors`. There are no other breaking changes in this release.
