# o-top-banner

o-top-banner is used for marketing or enhancement messages along the top of the page. For similar messaging as an overlay, typically bottom left, see [o-banner](https://registry.origami.ft.com/components/o-banner). For service messaging such as "success" or "error" see [o-message](https://registry.origami.ft.com/components/o-message).

- [Usage](#usage)
- [Themes](#theme)
- [Markup](#markup)
- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-components-in-your-project) to get started with `o-top-banner`.

## Themes

By default, `o-top-banner` supports 2 themes:

- `professional-inverse` – Exclusive used to advertise FT Professional.
- `new-world`

## Markup

Use the following markup for `o-top-banner`. Replace `o-top-banner--[theme]` with your [theme](#themes) and include relevant copy for the heading, copy, and button elements.

```html
<div class="o-top-banner o-top-banner--[theme]">
	<div class="o-top-banner__container">
		<div class="o-top-banner__content">
			<h2 class="o-top-banner__heading">Your heading</h2>
			<p class="o-top-banner__copy">You main copy goes here.</p>
		</div>

		<div class="o-top-banner__actions">
			<a href="#" class="o-top-banner__button">Your CTA</a>
		</div>
	</div>
</div>
```

## Sass

Use `@include oTopBanner()` to include styles for all `o-top-banner` [themes](#themes).

```scss
@import '@financial-times/o-top-banner';

@include oTopBanner();
```

Or use the `$opts` argument to output only the specific [themes](#themes) you need:

```scss
@import '@financial-times/o-top-banner';

@include oTopBanner(
	$opts: (
		'themes': (
			'new-world',
			'professional-inverse',
		),
	)
);
```

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
| ⚠ maintained |       2       |        N/A         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.1         |                           -                           |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-top-banner,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
