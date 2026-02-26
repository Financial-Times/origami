# Colours

Colour tokens are available as CSS variables within @financial-times/o3-foundations. See the [getting started _Import CSS_](/docs/o3-getting-started.md#import-css) to use the tokens in your application.

Figma Dev mode will show the CSS variables. The variables closely resemble the Figma variable formate but replaces `/` with `-`. For example:

| Figma Variable                      | CSS Variable                          |
| ----------------------------------- | ------------------------------------- |
| o3/color/palette/ft-pink            | --o3-color-palette-ft-pink            |
| o3/color/palette/ft-grey            | --o3-color-palette-ft-grey            |
| o3/color/palette/white              | --o3-color-palette-white              |
| o3/color/palette/black              | --o3-color-palette-black              |
| o3/color/use-case/body/text         | --o3-color-use-case-body-text         |
| o3/color/use-case/body/inverse/text | --o3-color-use-case-body-inverse-text |
| o3/color/use-case/error/background  | --o3-color-use-case-error-background  |
| o3/color/use-case/error/text        | --o3-color-use-case-error-text        |
| …                                   | …                                     |

See all Colour CSS Variables available in each brand's `_variables.css` file:

* [FT Pink (Core)](../src/css/tokens/core/_variables.css)
* [FT Professional](../src/css/tokens/core/professional/_variables.css)
* [White-label](../src/css/tokens/white-label/_variables.css)
* [Internal](../src/css/tokens/internal/_variables.css)
* [Sustainable Views](../src/css/tokens/sustainable-views/_variables.css)

## Resources

* Origami site - https://origami.ft.com/foundations/colours/
* Storybook - https://o3.origami.ft.com/?path=/story/o3-foundation-o3-color--primary-palette
* Figma - https://www.figma.com/design/VVM0PixrY3IRZq2ZUTdWfU/%F0%9F%92%A0-Core---Origami--o3-?node-id=0-1&m=dev
