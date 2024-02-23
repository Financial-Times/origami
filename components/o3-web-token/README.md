# o3-web-tokens

- [o3-web-tokens](#o3-web-tokens)
  - [Usage](#usage)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

`o3-web-token` provides CSS Custom Properties for design tokens representing colours, typographic scale, spacing, and iconography.

`o3-web-token` supports brands: `core`, `internal`, `professional` and `whitelabel`.

Import your chosen brand to begin using tokens in your CSS:

```css
@import '@financial-times/o3-web-tokens/core.css';

.example-custom-link {
	color: var(--o3-color-link);
	font-size: var(--o3-font-size-3);
	line-height: var(--o3-lineheight-3);
}
```

To add support for another brand, import its tokens too:

```diff
+@import '@financial-times/o3-web-tokens/core.css';
+@import '@financial-times/o3-web-tokens/internal.css';

.example-custom-link {
	color: var(--o3-color-link);
	font-size: var(--o3-font-size-3);
	line-height: var(--o3-lineheight-3);
}
```

Then apply the brand data selector `data-o3-brand="[BRAND]"` on a container element within your HTML.

```html
<body data-o3-brand="core">
	<a href="#" class="example-custom-link">Example</a>
</body>
```

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       0       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-buttons-experimental,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
