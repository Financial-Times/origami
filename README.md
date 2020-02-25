o-meter [![Circle CI](https://circleci.com/gh/Financial-Times/o-meter/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-meter/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

Use the meter element to measure data within a given range. The `<meter>` tag defines a scalar measurement within a known range, or a fractional value. This is also known as a gauge.

- [Markup](#markup)
- [Sass](#sass)
- [Support](#support)
- [Contact](#contact)
- [Licence](#licence)

### Markup

This HTML demonstrates a way to use a basic o-meter

```html
<meter class="o-meter" aria-label="a meter component" data-o-component="o-meter" min="0" max="100" value="25">
	25
</meter>
```

This HTML demonstrates a way to use an extended o-meter with an additional value indicator
```html
<div class="o-meter-container">
	<meter class="o-meter" aria-label="a meter component" data-o-component="o-meter" min="0" max="100" value="75">
	75
	</meter>
	<span class="o-meter-value" style="left: 75%">
		75
	</span>
</div>
```

This HTML demonstrates a way to use a basic o-meter with customised colours. Colours are used to indicate how close the meter is to its [optimum value](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-optimum).

To customise meter colours set the following CSS Customer Properties:
- `--o-meter-low-color` (bad): The CSS colour for the meter element when its value is at its worse, less than sub optimal. E.g:
	- value < low and optimum > high; or
	- value > high and optimum < low
- `--o-meter-high-color` (suboptimal): The CSS colour for the meter element when its value is suboptimal. E.g:
	- value > low, value < high, and optimum > high
	- value < high, value > lower, and optimum < low
- `--o-meter-optimum-color` (good): The CSS colour for the meter element when its value is optimal. E.g:
	- value > high and optimum > high
	- value < low and optimum < low

This example uses inline styles but you may want to create a custom CSS class to share these styles with other meter elements in your project.

```html
	<meter class="o-meter" style="
		--o-meter-background-color: hotpink;
		--o-meter-optimum-color: deeppink;
		--o-meter-low-color: pink;
		--o-meter-high-color: red;" aria-label="a meter component" data-o-component="o-meter" min="0" max="100" value="35">
	35
	</meter>
```
This HTML demonstrates a way to use an extended o-meter with customised width and height
```html
	<div class="o-meter-container" style="--o-meter-width: 70%; --o-meter-height: 2em">
		<meter class="o-meter" aria-label="a meter component" data-o-component="o-meter" min="0" max="10" value="2.5">
		2.5
		</meter>
		<span class="o-meter-value" style="left: 25%">
			2.5
		</span>
	</div>
```

#### Sass
```scss
@include oMeter;
```

## Support
The `meter` tag is currently supported by Chrome, Safari, Firefox, Edge browsers. It is not supported by IE.
If `o-meter` needs to be used on IE, please use a fallback - include the value in the meter tag, for example:
```html
<meter data-o-component="o-meter" class='o-meter' value="0.6">60%</meter>
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-meter/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
