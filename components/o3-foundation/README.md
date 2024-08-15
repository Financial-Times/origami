# o3-foundation

- [o3-foundation](#o3-foundation)
  - [Usage](#usage)
    - [Normalisation](#normalisation)
    - [Focus rings](#focus-rings)
    - [Fonts](#fonts)
    - [Icons](#icons)
    - [Colours](#colours)
    - [Spacing](#spacing)
    - [Grid](#grid)
    - [Helper classes](#helper-classes)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

`o3-foundation` provides CSS Custom Properties for design tokens representing colours, typographic scale, spacing, iconography and grid.

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
- Adding font-smoothing to Mozilla and WebKit browsers
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

### Icons

CSS Custom Properties for icons are included for each brand in the format: `--o3-icons-ft-icon-[ICON NAME]`.

The icon CSS Custom Property is a [url() CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/url) for the encoded icon SVG. It may be used anywhere [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) may be used such as within `background-image` and `mask`.

For example, to create a `1rem` sized icon which inherits its colour from the current text colour:

```css
.example-icon-use {
 /* Create a square the size we want an icon */
 display: inline-block;
 width: 1rem;
 height: 1rem;
 /* Set the icon colour, In this case match the
     current foreground text colour. */
 background-color: currentColor;
 /* Mask the square with an Origami icon. */
 mask-image: var(--o3-icons-ft-icon-plus);
 mask-repeat: no-repeat;
 mask-size: contain;
}
```

See our documentation website for a [full list of icons](https://origami-for-everyone.ft.com/guides/icons/) and more details.

### Colours

o3-foundation provides CSS Custom Properties for 3 types of colours:

- Palette: Base colours such as `--o3-color-palette-paper`, `--o3-color-palette-teal`.
- Usecase: Semantic colours such as `--o3-color-use-case-page-background`, `--o3-color-use-case-page-inverse-background`.
- Tints: Modified palette colours `--o3-color-palette-black-10`, `--o3-color-palette-teal-100`.

We recommend using a usecase token where one exists, as this allows us flexibility to update the underlying colour based on how it is used. However it is preferable to use a palette or tint colour directly rather than mis-use a usecase token.

See our documentation website for a [full list of colours and where to use them](https://origami-for-everyone.ft.com/guides/colours/).

### Spacing

o3-foundation provides CSS Custom Properties for standard spacing values in the format: `--o3-spacing-[spacing size]`. These follow t-shirt sizes from `5xs` to `4xl`.

Example:

```css
.example-spacing {
 margin: var(--o3-spacing-2xs);
}
```

See our documentation website for a [full list of spacing tokens](https://origami-for-everyone.ft.com/guides/spacing/).

### Grid

The `o3-grid` system, provided by `o3-foundation`, standardises usage of grid across ft. The `o3-grid` is responsive on different screen sizes and differs from [`o-grid`](https://o2.origami.ft.com/?path=/docs/o2-core_components-o-grid-readme--docs) component. For more detailed guidelines on grid system check our documentation for [`o3-grid`](https://origami-beta.ft.com/guides/grid/).

For a convenient and standardized grid layout, apply the `o3-grid` class to your element:

```html
<div class="o3-grid">
 <!-- Grid Items -->
</div>
```

The `o3-grid` layout template follows a specific structure:

```txt
`bleed-start content-start [REST_OF_THE_COLUMNS] content-end bleed-end`,
```

The o3-grid system adapts to different screen sizes, the number of columns is variable according to viewport size, see design guidelines for [details](https://origami-beta.ft.com/guides/grid/).

- Content-area: The grid's main content area is defined by `content-start` and `content-end` boundaries.
- Bleed Columns for Extended Layouts: `bleed-start` & `bleed-end`: These special columns extend beyond the 12-column grid, reaching the edges of the viewport. This allows you to create "full-bleed" layouts where content extends off the screen. These columns are used as margin areas, providing visual breathing room around your central content.
- `[REST_OF_THE_COLUMNS]`: This represents any additional columns you might need in your grid.

#### Positioning grid items

You can precisely control the positioning of grid items using the `grid-column` style or css property:

```html
<div class="o3-grid">
 <div style="grid-column: content-start / content-end;">
  Spans the entire content area
 </div>
 <div style="grid-column: content-start / span 4;">
  Starts at `content-start`, spans 4 columns
 </div>
 <div style="grid-column: content-start / span 2;">
  Starts at `content-start`, spans 2 columns
 </div>
 <div style="grid-column: span 1 / content-end;">
  Ends at `content-end`, spans 1 column back
 </div>
 <div style="grid-column: bleed-left / bleed-right;">
  Spans the entire viewport (full bleed)
 </div>
 <div style="grid-column: bleed-left / content-end;">
  Starts at the left edge, ends at `content-end`
 </div>
</div>
```

#### Advanced usage of grid

For advanced usage `o3-foundation` provides CSS Custom Properties for grid that you can set on your class:

```css
.example-class {
 display: grid;
 /* Controls the column structure of your grid. */
 grid-template-columns: var(--o3-grid-template);
 /* Defines named areas for grid item placement. */
 grid-template-areas: var(--o3-grid-area);
 /* Manages the spacing between grid columns. */
 column-gap: var(--o3-grid-gap);
}
```

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
