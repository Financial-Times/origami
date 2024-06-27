# o3-figma-sb-links

`o3-figma-sb-links` provides links for Storybook and Figma that are related to the O3 components. This package can be used by other components to provide Figma files and is source of truth for the Figma and Storybook links. Main purpose of this package is to provide a links to Figma files for the O3 components and also to origami-for-everyone site.

- [o3-figma-sb-links](#o3-figma-sb-links)
  - [Usage](#usage)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

`o3-figma-sb-links` exports a json file that contains links to Figma and Storybook for the O3 components. The links can be retrieved by story ids. Story ids are retrieved using [@storybook/csf-tools](https://www.npmjs.com/package/@storybook/csf-tools) package. Example of `.stories` file:

```jsx
export default {
 title: 'Core/o3-button'
};
export const Button = ButtonStories.Button;
export const ButtonSmall = ButtonStories.ButtonSmall;
```

The story IDs are composite of title and exported component name. In our case title is combination of `BRAND` and `COMPONENT` and component name is `VARIANT`. The story ID is then:

```txt
core-o3-button--button
[BRAND]-[COMPONENT]--[VARIANT]

core-o3-button--button-small
[BRAND]-[COMPONENT]--[VARIANT]

```

To use the links in your project, import the links from the package:

```js
import links from "@financial-times/o3-figma-sb-links";
```

json structure:

```json
{
 "STORY-ID-1": {
  "figma": "FIGMA-LINK",
  "sb": "STORYBOOK-LINK"
 },
 "STORY-ID-2": {
  "figma": "FIGMA-LINK",
  "sb": "STORYBOOK-LINK"
 }
}
```

where figma links are absolute links to the Figma files and sb links are relative paths to provided hostname.

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       0       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-buttons-experimental,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
