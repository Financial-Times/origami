# o-forms Sass Documentation
## Mixins
### oForms

Styles for form elements.

| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('elements': ('checkbox', 'date', 'password', 'radio-round', 'radio-box', 'select', 'textarea', 'text', 'toggle'), 'features': ('disabled', 'inline', 'inverse', 'error-summary', 'right', 'small', 'state', 'suffix')) |The o-form features to include styles for (see the README for a full list). |
#### Examples
##### Example 1
```scss
@include oForms($opts: (
	'elements': ('text', 'checkbox'),
	'features': ('inline')
));
```
### oFormsAddCustom


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| input | String | - |Type of input to customise, one of 'anchor' or 'radio' |
| icons | List | - |A list of icons to render |
| theme | Map,null | - |Custom theme map |
