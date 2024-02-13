# o-banner Sass Documentation
## Mixins
### oBanner
Output `o-banner` CSS.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - |The o-banner features to output. See the [readme](https://registry.origami.ft.com/components/o-banner) for a full list of options. |
#### Examples
##### Example 1
all `o-banner` styles.

```Output
@include oBanner();
```
##### Example 2
only the small layout

```Output
@include oBanner($opts: (
	'layouts': ('small')
));
```
##### Example 3
the small layout and marketing theme

```Output
@include oBanner($opts: (
	'layouts': ('small'),
	'themes': ('marketing'),
));
```
### oBannerAddTheme
Add a theme modifier for banners.


The output includes the `.o-banner--THEME` modifier class definition, which includes all overrides.

| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| theme-name | String | - |The banner theme to output styles for. See README for available themes, or specify a custom one if providing $opts. |
| opts | Map | null |A brand configuration which can be used to create a custom banner theme. See README for more examples. |
#### Examples
##### Example 1
Existing banner theme

```scss
@include oBannerAddTheme('marketing');
```
##### Example 2
Custom banner theme

```scss
@include oBannerAddTheme('bubblegum', (
    background-color: oColorsMix('candy', 'white', 75),
    text-color: oColorsByName('oxford-90')
));
```
