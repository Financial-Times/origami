# o-loading Sass Documentation
## Variables
### o-loading-is-silent (`Boolean`)
Silent mode: on (true) or off (false)
Set to false to output default button classes


## Mixins
### oLoadingCustomize
Helper for `whitelabel` variable customisation


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variables | Map | - |Brand variables to customise |
#### Examples
##### Example 1
```scss
@include oLoadingCustomize((
	'light': (
		default-color: hotpink
	),
	'dark': (
		default-color: black
	)
))
```
