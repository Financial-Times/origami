# o-message Sass Documentation

- [o-message Sass Documentation](#o-message-sass-documentation)
  - [Mixins](#mixins)
    - [oMessage](#omessage)
    - [oMessageAddState](#omessageaddstate)
  - [Variables](#variables)
    - [o-message-is-silent (`Boolean`)](#o-message-is-silent-boolean)
    - [o-message-states (`List`)](#o-message-states-list)
    - [o-message-types (`List`)](#o-message-types-list)

## Mixins

### oMessage

Output all o-message features. Accepts an options map to include features granularly.
Options include which types, states, and layouts of o-message to include.
See the README for more details.

| Parameter | Type | Default                                                                                                                                                                    | Description |
| --------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| opts      | Map  | 'types': ('alert', 'notice', 'action), 'states': ('error', 'success', 'inform', 'neutral', 'inform-inverse', 'warning', 'warning-light', 'feedback'), 'layouts': ('inner') |             |

#### Examples

##### Example 1

include all o-message styles.

```To
@include oMessage();
```

##### Example 2

include only error and success alert styles.

```To
@include oMessage($opts: (
	'types': ('alert'),
	'states': ('error', 'success'),
));
```

### oMessageAddState

Output a new message state (i.e. theme) which supports one or more types of messages.

| Parameter | Type   | Default | Description                                                                |
| --------- | ------ | ------- | -------------------------------------------------------------------------- |
| opts      | String | -       | the name of the state e.g. 'success'                                       |
| opts      | List   | -       | a map of options for the state                                             |
| types     | List   | -       | the types of message the state supports e.g. ('alert', 'notice', 'action') |

#### Examples

##### Example 1

a Pikachu (lemon/slate) state for notice and alert messages.

```Output
// Outputs CSS for a custom message state called "pikachu"
// Outputs a modifier class `o-message--pikachu`
@include oMessageAddState(
	$name: 'pikachu', // the custom state is named "pikachu"
	$opts: (
	    'background-color': 'slate', // slate message
	    'foreground-color': 'white', // white text
	    'highlight-color': 'lemon', // lemon highlights with `o-message__content-highlight-color` and a lemon button
	    'button-type': 'primary', // a primary button`o-message__content-highlight` highlight copy
	    'icon': 'user', // show a 'user' o-icons icon if used as an alert
), $types: ('notice', 'alert')); // this state should work with notice and alert message types
```

## Variables

### o-message-is-silent (`Boolean`)

Silent mode: on (true) or off (false)
Set to false to output default message classes

### o-message-states (`List`)

List of states that can be applied to alert type messages

### o-message-types (`List`)

List of message types
