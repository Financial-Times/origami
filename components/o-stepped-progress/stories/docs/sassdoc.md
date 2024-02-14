# o-stepped-progress Sass Documentation

- [o-stepped-progress Sass Documentation](#o-stepped-progress-sass-documentation)
  - [Mixins](#mixins)
    - [oSteppedProgress](#osteppedprogress)
      - [Examples](#examples)
  - [Variables](#variables)
    - [o-stepped-progress-is-silent (`Boolean`)](#o-stepped-progress-is-silent-boolean)

## Mixins

### oSteppedProgress

Outputs all available features and styles for stepped progress.

The output includes the `.o-stepped-progress` class definition as well as class definitions for every available theme.

#### Examples

##### Example 1

All stepped progress styles

```scss
@include oSteppedProgress();
```

##### Example 2

Base styles with 'heavy' theme

```scss
@include oSteppedProgress(
	(
		'themes': (
			'heavy',
		),
	)
);
```

## Variables

### o-stepped-progress-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default stepped progress classes
