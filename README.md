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


## Development

Instructions for maintaining the color palette for non-developers:

### Getting started

1. If you don't already have an account on GitHub, get one by filling in the big registration form on the homepage of [GitHub.com](http://github.com).
1. If you do not already have commit rights on this module, ask one of the FT's GitHub administrators to give you access.
1. If you haven't already got the GitHub app installed on your computer, download it [for Windows](http://windows.github.com/) or [for mac](http://mac.github.com/).
1. Run the Github app on your computer and sign in using your GitHub account
1. Clone the **o-colors** project to your computer (GitHub will ask you where you want to put it on your system; it's a good idea to have a folder in which you keep all your repos, so if in doubt, create a folder called `sandboxes` in your home directory and clone the module there)

### Making a change

1. Open the GitHub app, go into the **o-colors** module and click the 'Branches' tab.
1. Create a new branch by clicking the `+` icon at the right end of the `master` branch, and name it after your proposed change (using just letters, numbers and underscores) e.g. `forms_use_cases`.
1. Make sure your new branch is ticked, if not, double click it.
1. Open the file you want to edit (created by Github on your computer) in a text editor such as [Sublime Text](http://www.sublimetext.com/) or [Brackets](http://brackets.io/) (don't just double click the file unless you've set up one of these editors to open `.scss` files by default)
	* If you want to add or remove palette colours, the file you want is `src/scss/_palette.scss`
	* If you want to add or remove use cases for colours, the file you want is `src/scss/_use-cases.scss`
1. Edit the file, following the instructions in the comments at the top of the file
1. Switch back to the Github app and click the 'Changes' tab.  Verify that it says 'committing to <your new branch name>' and that the list shows the files with the changes you made.
1. Type a description of your change, and press 'Commit & Sync'
1. Load the [GitHub website page for this module](https://github.com/Financial-Times/o-colors).  If you're logged in, there should be a 'You recently pushed branches' label, and a button to 'Compare and pull request'.  Click that button.
1. Modify your description, if you wish, and click 'Send pull request'.  GitHub will now run automated tests on your commit to ensure that the module still works correctly.  The pull request should not be merged until it shows "All is well — The Travis CI build passed".

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
