# o-ft-affiliate-ribbon [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

A ribbon denoting affiliation with the Financial Times. This ribbon should be used in products that are owned by the Financial Times but have a separate brand identity to the Financial Times.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-ft-affiliate-ribbon`.

## Markup

Use the following HTML to get a full-width FT affiliation ribbon. This should be placed beneath a footer.

```html
<div class="o-ft-affiliate-ribbon">
	<div class="o-ft-affiliate-ribbon__container">
		<div class="o-ft-affiliate-ribbon__row">
			<a class="o-ft-affiliate-ribbon__logo" href="https://www.ft.com/" title="The Financial Times" target="_blank">
				<span class="o-ft-affiliate-ribbon__visually-hidden">A service from the Financial Times</span>
			</a>
		</div>
	</div>
</div>
```

## Sass

Call the primary mixin `oFtAffiliateRibbon` to include all CSS for the o-ft-affiliate-ribbon component:

```scss
	@import 'o-ft-affiliate-ribbon/main';
	@include oFtAffiliateRibbon();
```

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
⚠ maintained | 3 | 3.1 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-ft-affiliate-ribbon/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
