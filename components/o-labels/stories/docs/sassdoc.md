# o-labels Sass Documentation

- [o-labels Sass Documentation](#o-labels-sass-documentation)
  - [Mixins](#mixins)
    - [oLabels](#olabels)
    - [oLabelsAddState](#olabelsaddstate)
    - [oLabelsContent](#olabelscontent)
    - [oLabelsTimestampContent](#olabelstimestampcontent)
    - [oLabelsIndicatorContent](#olabelsindicatorcontent)
  - [Variables](#variables)
    - [o-labels-is-silent (`Boolean`)](#o-labels-is-silent-boolean)

## Mixins

### oLabels

Outputs all available features and styles for labels.

The output includes the `.o-labels` class definition as well as class definitions for every variant.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | 'sizes': ('big', 'small'), 'states': ( ... ) |Label options including sizes and states to output styles for. |

#### Examples

##### Example 1

All label styles

```scss
@include oLabels();
```

##### Example 2

Standard label styles including big size and gold tier state variants

```scss
@include oLabels($opts:( 'sizes': ('big'), 'states': ('tier-gold'));
```

##### Example 3

Indicator label styles including live and new variants

```scss
@include oLabels($opts:( 'indicators': ('status': ('live', 'new')));
```

##### Example 4

Indicator label styles with inverse modifier class

```scss
@include oLabels($opts:( 'indicators': ('status': ('live', 'new'), 'inverse': true));
```

##### Example 5

Timestamp label with inverse modifier class

```scss
@include oLabels($opts:( 'timestamp': ('inverse': true));
```

### oLabelsAddState

Add a state modifier for standard labels.
Note this mixin is dor standard labels only, not indicator labels.

The output includes the `.o-labels--STATE` modifier class definition, which includes all overrides.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| state-name | String,Map | - |The standard label state to output styles for. See README for available states. |
| opts | Map | null |A brand configuration which can be used to create custom standard label states. See README for more examples. |

#### Examples

##### Example 1

Existing standard label state

```scss
@include oLabelsAddState('tier-gold');
```

##### Example 2

Custom standard label state

```scss
@include oLabelsAddState(
	'citrus-fruit',
	(
		background-color: oColorsByName('lemon'),
	)
);
```

### oLabelsContent

Styles for a standard label without an `o-labels` CSS class.
Recommended only when a custom class name is required, for example within another component.

Styles for a label without a CSS selector.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - |A map containing a boolean to output base label styles, plus the label size and state (a state name or custom state map). |

#### Examples

##### Example 1

existing label.

```An
.o-example-my-label {
	@include oLabelsContent($opts: ('base': true, 'size': 'big', 'state': 'tier-gold'));
}
```

##### Example 2

custom label.

```A
.o-example-my-custom-label {
	@include oLabelsContent($opts: (
		'base': true,
		'size': 'big',
		'state': (
			'background-color': oColorsByName('lemon')
		)
	));
}
```

### oLabelsTimestampContent

Styles for a timestamp label i.e. .o-labels-timestamp.
This mixin is not recommend. Instead the the `oLabels` primary mixin and
o-labels markup. This should only be used where using o-labels markup is
not possible.

If outputting a timestamp in a non-label context see
[o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography).

#### Examples

##### Example 1

a timestamp label with custom markup.

```Output
.my-timestamp-label {
    @include oLabelsTimestampContent();
}
```

### oLabelsIndicatorContent

Styles for indicator label elements e.g. .o-labels-indicator.
This mixin is not recommend. Instead the the `oLabels` primary mixin and
o-labels markup. This should only be used where using o-labels markup is
not possible.

| Parameter | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| ops       | Sting,Map | -       | the BEM element to output styles for, see example. |

#### Examples

##### Example 1

indicator labels with custom markup.

```Output
.my-indicator-label {
    @include oLabelsIndicatorContent($opts: ('block': true));
}
.my-indicator-label--new {
    @include oLabelsIndicatorContent($opts: ('block': true, 'modifier': 'new'));
}
.my-indicator-label--updated {
    @include oLabelsIndicatorContent($opts: ('block': true, 'modifier': 'updated'));
}
.my-indicator-label--closed {
    @include oLabelsIndicatorContent($opts: ('block': true, 'modifier': 'closed'));
}
.my-indicator-label--live {
    @include oLabelsIndicatorContent($opts: ('block': true, 'modifier': 'live'));
}
.my-indicator-label__status {
    @include oLabelsIndicatorContent($opts: ('element': 'status'));
}
.my-indicator-label__timestamp {
    @include oLabelsIndicatorContent($opts: ('element': 'timestamp'));
}
```

## Variables

### o-labels-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default label classes
