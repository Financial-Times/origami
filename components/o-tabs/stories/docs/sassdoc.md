# o-tabs Sass Documentation
## Mixins
### oTabs
Outputs all available features and styles for tabs.


The output includes the `.o-tabs` class definition as well as class definitions for every variant.

| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('sizes': ('big'), 'themes': ('primary', 'inverse')) |Tab options including themes to output styles for. |
#### Examples
##### Example 1
All tab styles

```scss
@include oTabs();
```
##### Example 2
Base styles and primary theme

```scss
@include oTabs($opts: ('themes': ('primary'));
```
## Variables
### o-tabs-is-silent (`Boolean`)
Silent mode: on (true) or off (false)
Set to false to output default tabs classes


