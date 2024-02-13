# o-toggle Sass Documentation
## Mixins
### oToggle
Outputs toggle stlyes.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | list | ('display': true, 'visibility': true) |A map of which default toggle classes to output, i.e. `o-toggle-display`, `o-toggle-visibility`. |
#### Examples
##### Example 1
all default o-toggle features.

```Output
@include oToggle();
```
##### Example 2
only the styles for a toggle which applies `display: none` when inactive.

```Output
@include oToggle($opts: ('display': true));
```
##### Example 3
only the styles for a toggle which applies `visibility: hidden` when inactive.

```Output
@include oToggle($opts: ('visibility': true));
```
##### Example 4
```scss
Output all o-toggle features.
```
## Variables
### o-toggle-is-silent (`Bool`)

