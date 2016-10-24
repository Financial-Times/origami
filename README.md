# o-labels [![Build Status](https://circleci.com/gh/Financial-Times/o-labels.png?style=shield&circle-token=baf3bd7fe9625dfc5c7e24a5451253b348cd9102)](https://circleci.com/gh/Financial-Times/o-labels)

Standard labels

----

Labels can have one of several states:

- `normal`: standard blue
- `active`: active/success state, default green
- `error`: error/failure state, default red
- `pending`: an indeterminate state, default orange
- `live`: current in-progress state, default red
- `closed`: old closed content state, default grey
- `premium`: premium content state, default black
- `brand`: FT brand label state, default claret

```html
<span class="o-labels">Label</span>
<span class="o-labels o-labels--active">Active</span>
<span class="o-labels o-labels--error">Error</span>
<span class="o-labels o-labels--pending">Pending</span>
<span class="o-labels o-labels--live">Live</span>
<span class="o-labels o-labels--closed">Closed</span>
<span class="o-labels o-labels--premium">Premium</span>
<span class="o-labels o-labels--brand">Brand</span>
```

Use [o-typography](https://registry.origami.ft.com/components/o-typography) to control the sizing of labels. Use a label one size smaller than surrounding text, e.g. an `s` label with `m` text.

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
