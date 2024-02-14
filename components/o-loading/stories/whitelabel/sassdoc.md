# o-loading Sass Documentation

- [o-loading Sass Documentation](#o-loading-sass-documentation)
  - [Variables](#variables)
    - [o-loading-is-silent (`Boolean`)](#o-loading-is-silent-boolean)
  - [Mixins](#mixins)
    - [oLoadingCustomize](#oloadingcustomize)

## Variables

### o-loading-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default button classes

## Mixins

### oLoadingCustomize

Helper for `whitelabel` variable customisation

| Parameter | Type | Default | Description                  |
| --------- | ---- | ------- | ---------------------------- |
| variables | Map  | -       | Brand variables to customise |

#### Examples

##### Example 1

```scss
@include oLoadingCustomize(
	(
		'light': (
			default-color: hotpink,
		),
		'dark': (
			default-color: black,
		),
	)
);
```
