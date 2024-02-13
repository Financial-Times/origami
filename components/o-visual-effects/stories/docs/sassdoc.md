# o-visual-effects Sass Documentation
## Mixins
### oVisualEffects
Outputs styles for visual effects.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | list | ('shadows': ('ultralow', 'low', 'mid', 'high'), 'timing-custom-properties': true) |A map of which visual effects to include. |
#### Examples
##### Example 1
all o-visual-effect styles.

```Output
@include oVisualEffects();
```
##### Example 2
only mid shadow styles from o-visual-effect.

```Output
@include oVisualEffects($opts: ('shadows': ('mid')))
```
##### Example 3
only timing css custom properties from o-visual-effect.

```Output
@include oVisualEffects($opts: ('timing-custom-properties': true))
```
### oVisualEffectsShadowContent
Elevation

A repeating linear gradient background

| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| elevation | String | - |'ultra', 'low', 'mid' or 'high' |
| color | Color | - | |
## Functions
### oVisualEffectsShadow (...)
Elevation


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| elevation | String | - |'ultra', 'low', 'mid' or 'high' |
| color | Color | - | |
## Variables
### o-visual-effects-timing-slide
Timing function for elements that slide in and out

### o-visual-effects-timing-expand
Timing function for elements that expand and contract

### o-visual-effects-timing-fade
Timing function for elements that fade in and out

### o-visual-effects-shadow-color (`Color`)
The base dropdown shadow colour.
Used with opacity for shadows of different levels.

