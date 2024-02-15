# o-footer-services Sass Documentation

- [o-footer-services Sass Documentation](#o-footer-services-sass-documentation)
  - [Mixins](#mixins)
    - [oFooterServices](#ofooterservices)
    - [oFooterServicesCustomize](#ofooterservicescustomize)

## Mixins

### oFooterServices

Outputs all features and styles available for o-footer-services.

| Parameter           | Type | Default                                                                          | Description                                                                                                                            |
| ------------------- | ---- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| opts                | map  | ('logo': 'ftlogo-v1:origami', 'icons': ('slack', 'github'), 'brand-strip': true) | A map of optional footer features to output, including the footer logo, list of social icon links, and "a Nikkei company" brand strip. |
| include-base-styles | bool | true                                                                             | Whether to output fundamental o-footer-services styles required by the optional features.                                              |

### oFooterServicesCustomize

Helper for `whitelabel` varibale customisation

| Parameter | Type | Default | Description                  |
| --------- | ---- | ------- | ---------------------------- |
| variables | Map  | -       | Brand variables to customise |

#### Examples

##### Example 1

```scss
@include oFooterServicesCustomize(
	(
		'text-color': rgb(73, 0, 39),
		'background-color': rgb(251, 238, 240),
		'border-color': hotpink,
		'link-color': rgb(156, 4, 85),
		'link-hover-color': rgb(156, 4, 85),
		'legal-text-color': rgb(214, 73, 148),
		'brand-background-color': oColorsByName('black'),
		'brand-foreground-color': oColorsByName('white'),
	)
);
```
