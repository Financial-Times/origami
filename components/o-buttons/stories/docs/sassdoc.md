# o-buttons Sass Documentation

- [o-buttons Sass Documentation](#o-buttons-sass-documentation)
  - [Mixins](#mixins)
    - [oButtons](#obuttons)
    - [oButtonsAddTheme](#obuttonsaddtheme)
    - [oButtonsContent](#obuttonscontent)
  - [Functions](#functions)
    - [oButtonsGetColor (...)](#obuttonsgetcolor-)
  - [Variables](#variables)
    - [o-buttons-is-silent (`Boolean`)](#o-buttons-is-silent-boolean)

## Mixins

### oButtons

Output o-buttons classes.

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| opts      | List | -       |             |

#### Examples

##### Example 1

default o-buttons styles.

```All
@include oButtons();
```

##### Example 2

and secondary button classes, plus the big button modifier class.

```Primary
@include oButtons($opts: (
    'types': ('primary', 'secondary', 'ghost'),
    'sizes': ('big')
));
```

##### Example 3

and secondary button classes, plus an inverse theme modifier class, and classes for arrow left and arrow right icon buttons.

```Primary
@include oButtons($opts: (
    'types': ('primary', 'secondary', 'ghost'),
    'themes': ('inverse'),
    'icons': ('arrow-left', 'arrow-right')
));
```

##### Example 4

button classes, plus classes to support button groups and pagination.

```Secondary
@include oButtons($opts: (
    'types': ('secondary', 'ghost'),
    'pagination': true,
    'groups': true
));
```

### oButtonsAddTheme

Styles for a custom button theme `.o-buttons--[$name]`.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| name | String | - |A theme name e.g. `my-special-button`. |
| opts | Map | - |A custom theme map with a `color` and optional `context` key. The context key indicates the background colour your button is placed on, it defaults to the page colour (paper for the core brand, white otherwise). See [the README](https://registry.origami.ft.com/components/o-buttons/readme) for more details. |
| types | List | - |The types of button to output the theme for e.g. ('primary', 'secondary'). |
| icons | List,Null | null |The button icons to output for this theme. |

#### Examples

##### Example 1

a new claret theme for both primary and secondary buttons.

```Add
// Outputs class .o-buttons--my-special-button
@include oButtonsAddTheme(
    $name: 'my-special-button',
    $opts: ('color': 'claret-80'),
    $types: ('primary', 'secondary')
);
```

##### Example 2

a new claret theme to go on a slate background.

```Add
// Outputs class .o-buttons--my-special-button
@include oButtonsAddTheme(
    $name: 'my-special-button',
    $opts: ('color': 'claret-80', 'context': 'slate'),
    $types: ('primary', 'secondary')
);
```

##### Example 3

a new claret theme for buttons with icons.

```Add
// Outputs class .o-buttons--my-special-button
@include oButtonsAddTheme(
    $name: 'my-special-button',
    $opts: ('color': 'claret-80'),
    $types: ('primary', 'secondary'),
    $icons: ('arrow-up', 'arrow-down')
);
```

### oButtonsContent

Create a single button with a custom class. To avoid duplicate CSS this is
not recommended unless `o-buttons` default classes cannot be used. See [the
README](https://registry.origami.ft.com/components/o-buttons/readme) for
more details.

Button CSS declarations without any selectors.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('type': 'null', 'theme': null, 'size': null, 'icon': null, 'icon-only': false) |The kind of button styles to output. |
| include-base-styles | Boolean | true |Whether to include base button styles, shared by all buttons. |
| include-base-icon-styles | Boolean | true |Whether to include base icon button styles, shared by all icon buttons (defaults to true only when outputting an icon button). |

#### Examples

##### Example 1

a primary button with right arrow.

```Output
.my-button {
    @include oButtonsContent($opts: (
        'type': 'primary',
        'icon': 'arrow-right'
    ));
}
```

##### Example 2

a primary button with a custom lemon theme.

```Output
.my-lemon-button {
    @include oButtonsContent($opts: (
        'type': 'primary',
        'theme': ('color': 'lemon')
    ));
}
```

##### Example 3

base button styles.

```Share
// output base button styles only
.my-button {
    @include oButtonsContent($opts: ());
}
// output modifier classes for button types, without duplicating base styles
.my-button--secondary {
    @include oButtonsContent($opts: (
        'type': 'secondary'
    ), $include-base-styles: false);
}
.my-button--primary {
    @include oButtonsContent($opts: (
        'type': 'primary'
    ), $include-base-styles: false);
}
```

## Functions

### oButtonsGetColor (...)

Gets the color of a button property for a given theme and state.

| Parameter | Type            | Default | Description                           |
| --------- | --------------- | ------- | ------------------------------------- |
| state     | String          | -       |                                       |
| property  | String          | -       |                                       |
| type      | String          | -       |                                       |
| theme     | String,Map,Null | -       | A theme string or a custom theme map. |

#### Examples

##### Example 1

```scss
background: oButtonsGetColor(
	$state: 'default',
	$property: 'color',
	$type: 'primary'
);
```

##### Example 2

```scss
background: oButtonsGetColor(
	$state: 'hover',
	$property: 'border',
	$type: 'secondary'
);
```

## Variables

### o-buttons-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default button classes
