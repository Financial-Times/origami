# o3-tooling-tokens

`o3-tooling-token` provides Origami design tokens with meta data. This is intended for tooling and documentation.

- [o3-tooling-tokens](#o3-tooling-tokens)
	- [Usage](#usage)
	- [Migration](#migration)
	- [Contact](#contact)
	- [Licence](#licence)


## Usage

`o3-foundation` provides an object with design token information for the following supported brands:
- `core`
- `internal`
- `professional`
- `sustainable views`
- `whitelabel`

``

Import the ESM module as so, replacing `[brand]` for the supported brand you are interested in:

```js
import {default as brandTokens} from `@financial-times/o3-tooling-token/[brand].js`);
```

Keys include:
- `shortName`: The last segment of the token name. E.g. `o3.color.palette.ft-pink` would return `ft-pink`
- `value`: The final, resolved token value e.g. `#000000`.
- `type`: The token type e.g. `color`.
- `description`: A description for the token, if one exists.
- `origamiKeys`: An array of keys to further categorise or tag tokens in a computer friendly way e.g. `["palette", "primary"]`.
- `path`: The full token path as an array e.g. `["o3", "color", "palette", "ft-pink"]`
- `origamiTint`: An object to describe tint colour tokens e.g. `{"base": "teal", "value": 40}`
- `css`: The CSS Custom Property for the token e.g. `--${o3-color-palette-ft-pink}`
- `figma`: A Figma reference for the token e.g. `o3/color/palette/ft-pink`


## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       0       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-buttons-experimental,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
