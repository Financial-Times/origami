# o-labels [![build status](https://travis-ci.org/Financial-Times/o-labels.svg)](https://travis-ci.org/Financial-Times/o-labels)

Standard labels

----

Labels have 3 states:

- `normal`: standard blue
- `active`: active/success state, default green
- `error`: error/failure state, default red

```html
<span class="o-labels">Label</span>
<span class="o-labels o-labels--active">Active</span>
<span class="o-labels o-labels--error">Error</span>
```

and two sizes:

- default (`medium`): 10px font size/16px high
- `big`: 12px font size/18px high

```html
<span class="o-labels">Default</span>
<span class="o-labels o-labels--big">Big</span>
```

## Browser support

The following browser feature is used but will degrade gracefully:

- `border-radius`: older browsers will show square corners

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
