# o-layout Sass Documentation

- [o-layout Sass Documentation](#o-layout-sass-documentation)
  - [Variables](#variables)
    - [o-layout-is-silent (`Boolean`)](#o-layout-is-silent-boolean)
  - [Mixins](#mixins)
    - [oLayout](#olayout)

## Variables

### o-layout-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default layour classes

## Mixins

### oLayout

| Parameter | Type | Default | Description                                                                                                                                                                                             |
| --------- | ---- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opts      | Map  | -       | A map of configuration, with "layouts" ('documentation', 'landing', 'query', 'bleed'), "features" ('linked-headings', 'typography'), and "hero-image" (an image for the background of the "hero" area). |