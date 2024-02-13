# o-normalise Sass Documentation
## Mixins
### oNormalise
Outputs all o-normalise styles.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | list | - |A map of which normalise styles and helper classes to output. |
#### Examples
##### Example 1
all o-normalise styles.

```Output
@include oNormalise();
```
##### Example 2
all o-normalise styles, without css class helpers such as `o-normalise-visually-hidden`.

```Output
@include oNormalise($opts: (
	'elements': ('forms', 'images', 'text', 'links'),
	'body': ('font-smoothing', 'focus', 'reduce-motion')
));
```
### oNormaliseVisuallyHidden
Visually hide an element while still
allowing it to be read by a screenreader

### oNormaliseClearfix
Clearfix helper styles
Outputs clearfix styles on the current element

### oNormaliseBoxSizing
Adds box sizing to current and all child elements

### oNormaliseFocusApply
Apply a focus style using `:focus-visible` with `:focus` fallback.


#### Examples
##### Example 1
Apply a focus style to a button using `:focus-visible` with `:focus` fallback.

```scss
button {
	@include oNormaliseFocusApply() {
		@include oNormaliseFocusContent();
	};
}
```
### oNormaliseFocusContent
Output focus state styles to apply explicitly to a given element.


### oNormaliseFocusContentInverse
Output focus state styles to apply explicitly to a given element with "inverse" theme (light on dark background).


### oNormaliseFocusContentForElementColour
Output focus state styles for a block element of a given colour.
Where the given colour refers to the background colour of the focused element,
not the page background.

This is useful when dynamically creating new themes, where the colour of the
element is not known in advance. Otherwise set either `oNormaliseFocusContent` or
`oNormaliseFocusContentInverse` explicitly instead.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | String,Color | - |The background colour of the focused element. |
### oNormaliseFocusUnsetContent
Undo a focus style applied by o-normalise.

## Variables
### o-normalise-is-silent
Silent mode variable

