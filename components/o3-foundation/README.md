# o3-foundation

- [o3-foundation](#o3-foundation)
  - [Usage](#usage)
  - [Normalisation](#normalisation)
    - [Normalisation](#normalisation)
    - [Focus rings](#focus-rings)
    - [Fonts](#fonts)
    - [Helper classes](#helper-classes)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

`o3-foundation` provides CSS Custom Properties for design tokens representing colours, typographic scale, spacing, and iconography.

`o3-foundation` supports brands: `core`, `internal`, `professional`, `sustainable-views` and `whitelabel`.

Import your chosen brand to begin using tokens in your CSS/SCSS:

```css
@import '@financial-times/o3-foundation/css/core.css';

body {
 background-color: var(--o3-color-use-case-page-background);
 font-size: var(--o3-font-size-1);
 line-height: var(--o3-font-lineheight-1);
}
```

To add support for another brand, import its tokens too:

```diff
+@import '@financial-times/o3-foundation/css/core.css';
+@import '@financial-times/o3-foundation/css/internal.css';

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

### Normalisation

`o3-foundation` provides a set of CSS Custom Properties for normalising the default browser styles and also applies a set of defaults to elements. This is to ensure a consistent starting point for all projects and respective brands. The list of normalisations includes:

- Normalising styles for `<html>, <body>`
- Adding font-smoothing to mozilla and webkit browsers
- Reducing motion for users who have requested it
- Normalising links
- Normalising text related elements
- Normalising form elements

### Focus rings

`o3-foundation` provides visually consistent focus rings across all brands. The focus rings consist of two rings: an outer black ring and an inner white ring. By default, the outer ring is black and the inner ring is white. However, if you are using an inverse theme, the colors will be inverted. Focus rings are automatically applied to `buttons`, `inputs`, `selects`, and `textareas`.

If you need to apply a focus ring to a different element than the ones mentioned above, you can use the `o3-apply-focus-ring` class on that element.

Users can also revert the focus rings by using the `o3-revert-focus` class on the element.

For other elements, such as links, text, and multiline text, we use focus as an outline.

### Fonts

`o3-foundation` defines two `@font-face`-s. The first one is `Metric2-VF` and it is used fot all brands. The second one is `FinancierDisplayWeb` and currently used by core brand only.

### Helper classes

`o3-foundation` provides a set of helper classes to help with common tasks. The list of helper classes includes:

- `o3-visually-hidden`: Hides an element visually, but leaves it available to screen readers
- `o3-box-sizing-border-box`: Applies `box-sizing: border-box` to the current element and all its children

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       1       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o3-foundation,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
