# o-icons Sass Documentation
## Variables
### o-icons-is-silent (`Bool`)
Silent mode

## Mixins
### oIcons


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('icons': ('arrow-down', 'audio', 'book')) |A map of o-icons options, including all icons to include (defaults to all icons, see the README for a full list). |
#### Examples
##### Example 1
all o-icons css.

```Include
@include oIcons();
```
##### Example 2
only css for the up and down arrows.

```Include
@include oIcons($opts: ('icons': ('arrow-down', 'arrow-up')));
```
### oIconsContent
Output styles for an SVG icon.
Styles the icon as a background image, setting a width and height on the element as requested.
A fallback background for Windows High Contrast mode is also output.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| icon-name | String | - |This should be a reference to an icon included in o-icons eg arrow-down |
| color | String | - |This should be a hex colour value. Used to color the icon. We suggest using an o-colors function. |
| size | Number,Null | 128 |The width and height of the icon (units optional, defaults to px). Set to `null` to set no width or height. |
| include-base-styles | Bool | true |If true, will output style rules for the container. If false will only output the background-image property |
| high-contrast-fallback | Bool | true |To output Microsoft High Contrast fallback for accessibility reasons or not. |
| iconset-version | Number | 1 |At present only 1 version of the icon set is available. |
### oIconsContentBaseStyles
Base styles for all icons

