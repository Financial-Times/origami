# Colours

Colour communicates our brand identity and supports usability through feedback, warnings, and status messages. Below is the different colour palettes for each brand.

## Primary Palette

### FT Pink (Core)

These are the FT primary brand colours. They are established colours that make up the FT corporate identity and FT brand. FT pink and FT grey are not used for digital UI, but may be helpful for use alongside FT branded static assets such as the FT logo. For example, FT Pink could be used to prevent a flash of the wrong colour as a logo loads.

| `o3/color/palette/${name}` | css                        | description                     |
| -------------------------- | -------------------------- | ------------------------------- |
| ft-pink                    | --o3-color-palette-ft-pink | FT Pink is used for the FT logo |
| ft-grey                    | --o3-color-palette-ft-grey | …                               |
| white                      | --o3-color-palette-white   | …                               |
| black                      | --o3-color-palette-black   | …                               |

### FT Professional

Has the same primary palette as [FT Pink](#ft-pink-core) but with the additional Professional brand colour.

| `o3/color/palette/${name}` | css                     | description |
| -------------------------- | ----------------------- | ----------- |
| mint                       | --o3-color-palette-mint | …           |

### Internal

| `o3/color/palette/${name}` | css                       | description |
| -------------------------- | ------------------------- | ----------- |
| black                      | --o3-color-palette-black  | …           |
| white                      | --o3-color-palette-white  | …           |
| oxford                     | --o3-color-palette-oxford | …           |
| teal                       | --o3-color-palette-teal   | …           |

### Sustainable Views

| `o3/color/palette/${name}` | css                          | description |
| -------------------------- | ---------------------------- | ----------- |
| oceanwave                  | --o3-color-palette-oceanwave | …           |
| white                      | --o3-color-palette-white     | …           |
| black                      | --o3-color-palette-black     | …           |


## Secondary Palette

Secondary colours provide visual hierarchy to differentiate content and are brand identifiers of the FT.

### FT Pink (Core) + FT Professional

| `o3/color/palette/${name}` | css                       | description                                                                                                                                                                                                                  |
| -------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| claret                     | --o3-color-palette-claret | Claret is the main branding colour for MyFT related products. It should be used sparingly and never be used as a background colour. Usage example: MyFT branding; MyFT CTAs                                                  |
| teal                       | --o3-color-palette-teal   | Teal is the most striking colour and main CTA colour on ft.com. It is reserved for important action items that need to stand out: buttons, text links and other critical functional use cases.                               |
| oxford                     | --o3-color-palette-oxford | Oxford is used to denote opinion pieces (in combination with Sky). It is used on the homepage and in articles. Use for information and callouts in general. Usage example: opinion branding; opinion topic tags.             |
| slate                      | --o3-color-palette-slate  | Slate is a warmer version of black. It is used as inverse backgrounds for editorial content and as a theme option(Mono) for buttons.                                                                                         |
| paper                      | --o3-color-palette-paper  | Paper, as it’s name implies, is the FT’s main background colour. It is the main expression of the brand colour on product. It is a lighter, more legible shade of FT Pink and can be seen as a kind of replacement of white. |

### Internal

| `o3/color/palette/${name}` | css                               | description |
| -------------------------- | --------------------------------- | ----------- |
| slate                      | --o3-color-palette-slate          | …           |
| slate-white-5              | --o3-color-palette-slate-white-5  | …           |
| slate-white-15             | --o3-color-palette-slate-white-15 | …           |
| lemon                      | --o3-color-palette-lemon          | …           |


### Sustainable Views

| `o3/color/palette/${name}` | css                       | description |
| -------------------------- | ------------------------- | ----------- |
| teal                       | --o3-color-palette-teal   | …           |
| slate                      | --o3-color-palette-slate  | …           |
| claret                     | --o3-color-palette-claret | …           |

## Tertiary Palette

### FT Pink (Core) + FT Professional

| `o3/color/palette/${name}` | css                                   | description |
| -------------------------- | ------------------------------------- | ----------- |
| mandarin                   | --o3-color-palette-mandarin           | …           |
| light-blue                 | --o3-color-palette-light-blue         | …           |
| crimson                    | --o3-color-palette-crimson            | …           |
| graphics-dark-blue         | --o3-color-palette-graphics-dark-blue | …           |
| wheat                      | --o3-color-palette-wheat              | …           |
| candy                      | --o3-color-palette-candy              | …           |
| wasabi                     | --o3-color-palette-wasabi             | …           |
| jade                       | --o3-color-palette-jade               | …           |
| velvet                     | --o3-color-palette-velvet             | …           |
| lemon                      | --o3-color-palette-lemon              | …           |
| sky                        | --o3-color-palette-sky                | …           |
| matisse-blue               | --o3-color-palette-matisse-blue       | …           |


### Internal

| `o3/color/palette/${name}` | css                         | description |
| -------------------------- | --------------------------- | ----------- |
| jade                       | --o3-color-palette-jade     | …           |
| mandarin                   | --o3-color-palette-mandarin | …           |
| crimson                    | --o3-color-palette-crimson  | …           |


## Usecases

Also known as, semantic tokens, are tokens imbued with purposeful intent. They build on top of your primitives by assigning meaningful, context-aware roles reusable across 2+ components. These are the tokens to pick from as you design to ensure visual consistency across products. Examples Include: link, background colour etc.

| `o3/color/use-case/${name}`  | css                                              | description                                                             |
| ---------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| link/text                    | --o3-color-use-case-link-text                    | …                                                                       |
| link/text/hover              | --o3-color-use-case-link-text-hover              | …                                                                       |
| link/underline               | --o3-color-use-case-link-underline               | …                                                                       |
| link/underline/hover         | --o3-color-use-case-link-underline-hover         | …                                                                       |
| link/inverse/text            | --o3-color-use-case-link-inverse-text            | …                                                                       |
| link/inverse/text/hover      | --o3-color-use-case-link-inverse-text-hover      | …                                                                       |
| link/inverse/underline       | --o3-color-use-case-link-inverse-underline       | …                                                                       |
| link/inverse/underline/hover | --o3-color-use-case-link-inverse-underline-hover | …                                                                       |
| page/background              | --o3-color-use-case-page-background              | …                                                                       |
| page/inverse/background      | --o3-color-use-case-page-inverse-background      | …                                                                       |
| body/text                    | --o3-color-use-case-body-text                    | …                                                                       |
| body/inverse/text            | --o3-color-use-case-body-inverse-text            | …                                                                       |
| support/text                 | --o3-color-use-case-support-text                 | …                                                                       |
| support/inverse-text         | --o3-color-use-case-support-inverse-text         | …                                                                       |
| muted/text                   | --o3-color-use-case-muted-text                   | "Muted" text is less prominent, for example credits and captions.       |
| muted/inverse/text           | --o3-color-use-case-muted-inverse-text           | "Muted" text is less prominent, for example credit and captions.        |
| heading/text                 | --o3-color-use-case-heading-text                 | …                                                                       |
| heading/inverse-text         | --o3-color-use-case-heading-inverse-text         | …                                                                       |
| footer/text                  | --o3-color-use-case-footer-text                  | …                                                                       |
| caption/text                 | --o3-color-use-case-caption-text                 | …                                                                       |
| button/foreground            | --o3-color-use-case-button-foreground            | …                                                                       |
| button/foreground/disabled   | --o3-color-use-case-button-foreground-disabled   | …                                                                       |
| button/default               | --o3-color-use-case-button-default               | …                                                                       |
| button/hover                 | --o3-color-use-case-button-hover                 | …                                                                       |
| button/pressed               | --o3-color-use-case-button-pressed               | …                                                                       |
| button/disabled              | --o3-color-use-case-button-disabled              | …                                                                       |
| error/background             | --o3-color-use-case-error-background             | …                                                                       |
| error/text                   | --o3-color-use-case-error-text                   | …                                                                       |
| error                        | --o3-color-use-case-error                        | [DEPRECATED] This token is going to be looked at in the upcoming audit. |
| success/background           | --o3-color-use-case-success-background           | …                                                                       |
| success/foreground           | --o3-color-use-case-success-foreground           | …                                                                       |

## Tints

| `o3/color/palette/${name}` | css                           | description |
| -------------------------- | ----------------------------- | ----------- |
| black-5                    | --o3-color-palette-black-5    | …           |
| black-10                   | --o3-color-palette-black-10   | …           |
| black-20                   | --o3-color-palette-black-20   | …           |
| black-30                   | --o3-color-palette-black-30   | …           |
| black-40                   | --o3-color-palette-black-40   | …           |
| black-50                   | --o3-color-palette-black-50   | …           |
| black-60                   | --o3-color-palette-black-60   | …           |
| black-70                   | --o3-color-palette-black-70   | …           |
| black-80                   | --o3-color-palette-black-80   | …           |
| black-90                   | --o3-color-palette-black-90   | …           |
| white-10                   | --o3-color-palette-white-10   | …           |
| white-20                   | --o3-color-palette-white-20   | …           |
| white-40                   | --o3-color-palette-white-40   | …           |
| white-60                   | --o3-color-palette-white-60   | …           |
| white-80                   | --o3-color-palette-white-80   | …           |
| oxford-30                  | --o3-color-palette-oxford-30  | …           |
| oxford-40                  | --o3-color-palette-oxford-40  | …           |
| oxford-50                  | --o3-color-palette-oxford-50  | …           |
| oxford-60                  | --o3-color-palette-oxford-60  | …           |
| oxford-70                  | --o3-color-palette-oxford-70  | …           |
| oxford-80                  | --o3-color-palette-oxford-80  | …           |
| oxford-90                  | --o3-color-palette-oxford-90  | …           |
| oxford-100                 | --o3-color-palette-oxford-100 | …           |
| teal-20                    | --o3-color-palette-teal-20    | …           |
| teal-30                    | --o3-color-palette-teal-30    | …           |
| teal-40                    | --o3-color-palette-teal-40    | …           |
| teal-50                    | --o3-color-palette-teal-50    | …           |
| teal-60                    | --o3-color-palette-teal-60    | …           |
| teal-70                    | --o3-color-palette-teal-70    | …           |
| teal-80                    | --o3-color-palette-teal-80    | …           |
| teal-90                    | --o3-color-palette-teal-90    | …           |
| teal-100                   | --o3-color-palette-teal-100   | …           |
| claret-30                  | --o3-color-palette-claret-30  | …           |
| claret-40                  | --o3-color-palette-claret-40  | …           |
| claret-50                  | --o3-color-palette-claret-50  | …           |
| claret-60                  | --o3-color-palette-claret-60  | …           |
| claret-70                  | --o3-color-palette-claret-70  | …           |
| claret-80                  | --o3-color-palette-claret-80  | …           |
| claret-90                  | --o3-color-palette-claret-90  | …           |
| claret-100                 | --o3-color-palette-claret-100 | …           |
| wheat-100                  | --o3-color-palette-wheat-100  | …           |
