# Colours [![Build Status](https://circleci.com/gh/Financial-Times/o-colors.png?style=shield&circle-token=0d3884dacba2fdd8aec8afbd2eaa84c79040ddd5)](https://circleci.com/gh/Financial-Times/o-colors)

This is an [Origami](http://origami.ft.com/) module that provides variables defining the FT digital colour palette, and helpers to use them in your products.  For installation instructions, see the [registry page](http://registry.origami.ft.com/components/o-colors).

## Usage

There are a number of ways of using colours in your component or product.  Here they are from most to least preferred.  All mixin and function approaches require you to import the module into your own build, while the final method of using predefined classes is compatible with using the build service.

### Use case mixin

Use the `oColorsFor` mixin to add colour-related properties to your ruleset:

```scss
.my-thing {
	@include oColorsFor(custom-box box, background border);
}
```

It takes two arguments:

* **Use case list**: a list of colour use cases in order of preference.  The first one that is defined will be returned.
* **Property list**: a list of all the properties you want the colour applied to (background, border, text). They each correspond to `background-colour`, `border-color` and `color`. Default is _all_ which includes all three properties.

In the example above, the background and border colours are set, preferably from the *custom-box* use case, and if either of those properties are not available for that use case, from the *box* use case.

### Use case function

If you need to use a color value as part of a more complex CSS rule, e.g. a border color for just one side, or a gradient background, use the `oColorsGetColorFor` function:

```scss
.my-thing {
	color: oColorsGetColorFor(article-life-arts-body article-body body, text, (default: blue));
}
```

The `oColorsGetColorFor` function takes three arguments:

* **Use case list**: a list of colour use cases in order of preference.  The first one that is defined for the specified property will be returned
* **Property**: The property that you want to use the colour for (background, border, or text).  Note that in contrast to the `oColorsFor` mixin, you must specify only one property.   Options are `background`, `border`, `text`, and `all`.
* **Options**: A Sass *map* of additional options, all of which are optional, and may comprise:
	* **default**: The name of a palette colour to return if none of the specified use cases are defined for the desired property.  May also be set to `null` or `undefined` to return that instead of the built in default (which is transparent)

### Palette colour function

If you have a colour use case not covered by those built into the colors module, consider defining a custom use case (see below) and then using the use case mixin or function described above.  However, if you need to use a particular colour in one single place only, it may be worth using the `oColorsGetPaletteColor` function, which returns the CSS color for a palette colour name:

```scss
.my-thing {
	color: oColorsGetPaletteColor('pink-tint4');
}
```

### Predefined classes

By default, o-colors is **silent**, so it outputs **no classes**.  To use helper classes, you must disable silent mode before importing the colors module (if you are using the build service, it will do this for you):

```scss
$o-colors-is-silent: false;
```

You can then use predefined classes in your HTML.  All palette colors are available as `.o-colors-palette-[NAME]` (which style just `background-color`) and use cases are available as `.o-colors-[USECASE]-[PROPERTY]` (which style the appropriate property):

```html
<p class="o-colors-body-text">Article text</p>
```

## Defining custom use cases

You can add use cases for your particular component or product. This is done using the `oColorsSetUseCase` mixin:

```scss
@include oColorsSetUseCase(email, text, 'grey-tint5');
```

It takes three arguments:

* **Use case**: your particular use case
* **Property**: the property for which the color should be used for (background, border, or text)
* **Color**: a color from the palette

If you are creating a use case for a component, you *must* namespace your use case name with the name of your component.


----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-colors/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
