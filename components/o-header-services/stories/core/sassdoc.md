# o-header-services Sass Documentation

- [o-header-services Sass Documentation](#o-header-services-sass-documentation)
  - [Mixins](#mixins)
    - [oHeaderServices](#oheaderservices)

## Mixins

### oHeaderServices

Outputs all features and styles available to o-header-services

| Parameter | Type | Default                                                                                                                                                                             | Description |
| --------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| opts      | Map  | 'types':('primary-nav', 'secondary-nav', 'b2b', 'b2c'), 'features': ('bleed', 'drop-down'), 'drawer-breakpoint': 'M', 'logo': default to ft-logo depending on brand (pink or white) |             |

#### Examples

##### Example 1

This example outputs styles for a header with an origami logo, and a primary navigation with dropdowns.

```scss
@include oHeaderServices(
	$opts: (
		'types': (
			'primary-nav',
		),
		'features': (
			'drop-down',
		),
		'logo': 'origami',
	)
);
```

##### Example 2

This example changes the breakpoint at which the primary navigation is hidden behind a drawer.

```scss
@include oHeaderServices(
	$opts: (
		'types': (
			'primary-nav',
		),
		'features': (
			'drop-down',
		),
		'logo': 'origami',
		'drawer-breakpoint': 'L',
	)
);
```
