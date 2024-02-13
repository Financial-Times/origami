# o-spacing Sass Documentation
## Mixins
### oSpacing
Output all o-spacing features.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - | |
#### Examples
##### Example 1
```scss
@include oSpacing($opts: (
	'margin-bottom-utilities': true, // Output CSS classes such as `o-spacing-s1`.
	'custom-properties': true // Output CSS variables.
));
```
## Functions
### oSpacingByName (...)


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| size-name | String | - |Get a recommended space size by name. |
### oSpacingByIncrement (...)


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| increment | Number | - |The number to multiply the baseline size by. |
### oSpacingGetBaselineValue (...)

## Variables
### o-spacing-is-silent (`Boolean`)

### o-spacing-relative-units (`Bool`)
When true output relative `rem` space values, not `px`.
Relative spaces will respect the browser's configured font size.

For legacy reasons, this defaults to `false` (outputs px units).
Projects may need to be updated to support relative units.

### o-spacing-names (`Map`)
All space names supported by o-spacing.

