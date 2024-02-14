# o-footer-services Sass Documentation

- [o-footer-services Sass Documentation](#o-footer-services-sass-documentation)
  - [Mixins](#mixins)
    - [oFooterServices](#ofooterservices)

## Mixins

### oFooterServices

Outputs all features and styles available for o-footer-services.

| Parameter           | Type | Default                                                                          | Description                                                                                                                            |
| ------------------- | ---- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| opts                | map  | ('logo': 'ftlogo-v1:origami', 'icons': ('slack', 'github'), 'brand-strip': true) | A map of optional footer features to output, including the footer logo, list of social icon links, and "a Nikkei company" brand strip. |
| include-base-styles | bool | true                                                                             | Whether to output fundamental o-footer-services styles required by the optional features.                                              |
