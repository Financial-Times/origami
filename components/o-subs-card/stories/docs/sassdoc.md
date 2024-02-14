# o-subs-card Sass Documentation

- [o-subs-card Sass Documentation](#o-subs-card-sass-documentation)
  - [Mixins](#mixins)
    - [oSubsCard](#osubscard)

## Mixins

### oSubsCard

Outputs all available features and styles for o-subs-card.

| Parameter | Type | Default                         | Description                                                                       |
| --------- | ---- | ------------------------------- | --------------------------------------------------------------------------------- |
| opts      | Map  | ('themes': ('b2b', 'discount')) | o-subs-card options including themes to output styles for. Defaults to all theme. |

#### Examples

##### Example 1

All themes

```scss
@include oSubsCard();
```

##### Example 2

Base theme only

```scss
@include oSubsCard($opts:( 'themes': ('b2b'));
```
