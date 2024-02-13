# o-tooltip Sass Documentation
## Mixins
### oTooltip
Outputs all available features and styles for tooltips.


The output includes the `.o-tooltip` class definition.
#### Examples
##### Example 1
All tooltip styles

```scss
@include oTooltip();
```
##### Example 2
Tooltip styles without extra themes such as for ft professional

```scss
@include oTooltip($opts: ());
```
### oTooltipAddTheme
Output styles for a custom o-tooltip theme.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| name | string | - |The name of the custom theme. This is used to create a new CSS class name so should be descriptive and include the project name. |
| opts | map | - |A map of theme options including "background-color" (color), "foreground-color" (color), and optionally "close-foreground-color" (color). |
#### Examples
##### Example 1
a custom tooltip theme named "my-product-modifier" with a slate background, and white foreground. Outputs a class 'o-tooltip--my-product-modifier'

```Output
// Outputs CSS class "o-tooltip--my-product-modifier"
@include oTooltipAddTheme('my-product-modifier', (
	'background-color': oColorsByName('slate'),
	'foreground-color': oColorsByName('white'),
	'close-foreground-color': oColorsByName('white') // optional
));
```
## Variables
### o-tooltip-is-silent (`Boolean`)
Silent mode: on (true) or off (false)
Set to false to output default tooltip classes


