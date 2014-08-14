# Colours [![Build Status](https://travis-ci.org/Financial-Times/o-colors.png?branch=master)](https://travis-ci.org/Financial-Times/o-colors)

This is an [Origami](http://financial-times.github.io/ft-origami/) module that provides variables to define the FT digital colour palette.

## Usage

Install the module and `@import` the SASS, or use the [build service](http://financial-times.github.io/ft-origami/docs/developer-guide/build-service) to load it into your page.

### Using via SASS import

The preferred way of using __o-colors__ is to use colour _use cases_ rather than access the palette directly. This is done via the `oColorsGetColorFor` function:

```scss
.my-thing {
    color: oColorsGetColorFor(article-life-arts-body article-body body, text);
}
```

The `oColorsGetColorFor` function takes two arguments:

* **Use case list**: a list of colour use cases in order of preference.  The first one that is defined will be returned (similar behaivour to the CSS `font-family` property)
* **Property**: The property that you want to use the colour for (background, border, or text)

Alternatively, you may extend placeholder classes:

```scss
.my-thing {
  @extend %o-colors-article-body-text;
}
```
    
You can also add use cases for your particular module or product. This is done using the `oColorsSetUseCase` mixin:

```scss
@include oColorsSetUseCase(email, text, grey-tint-5);
```

It takes three arguments:

* **Use case**: your particular use case
* **Property**: the property for which the color should be used for (background, border, or text)
* **Color**: a color from the palette

Sometimes you may need to access the palette directly, in which case the `oColorsGetPaletteColor` function should be used:

```scss
.my-thing {
    color: oColorsGetPaletteColor(grey-tint4);
}
```

`oColorsGetPaletteColor` takes a single argument: the name of the palette colour.

In case you would prefer to get all three default CSS properties for a specific use case list, you can use the `oColorsFor` mixin:

```scss
.my-thing {
    @include oColorsFor(body);
}
```

It takes two arguments:

* **Use case list**: a list of colour use cases in order of preference.  The first one that is defined will be returned.
* **Property list**: a list of all the properties you want the colour applied to (background, border, text). They each correspond to `background-colour`, `border-color` and `color`. Default is _all_ which includes all three properties.

#### Silent mode

This module supports silent mode and will be silent by default.

In silent mode it will output no concrete selectors, only functions and placeholders. You can then use these in your own CSS to import only the elements of the module that you need.

It is not recommended, but silent mode can be turned off by setting the following variable before the import in your SASS:

```scss
    $o-colors-is-silent: false;
```

With silent mode turned off, concrete classes will be output. See "Using via the build service".

### Using via the build service

Use concrete classes directly in your HTML (not recommended, except for prototypes and demos):

```html
    <p class='o-colors-article-body-text'>Article text</p>
```

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
1. Create a new branch by clicking the `+` icon at the right end of the `master` branch, and name it after your proposed change (using just letters, numbers and underscores) eg `forms_use_cases`.
1. Make sure your new branch is ticked, if not, double click it.
1. Open the file you want to edit (created by Github on your computer) in a text editor such as [Sublime Text](http://www.sublimetext.com/) or [Brackets](http://brackets.io/) (don't just double click the file unless you've set up one of these editors to open `.scss` files by default)
	* If you want to add or remove palette colours, the file you want is `src/scss/palette.scss`
	* If you want to add or remove use cases for colours, the file you want is `src/scss/use-cases.scss`
1. Edit the file, following the instructions in the comments at the top of the file
1. Switch back to the Github app and click the 'Changes' tab.  Verify that it says 'committing to <your new branch name>' and that the list shows the files with the changes you made.
1. Type a description of your change, and press 'Commit & Sync'
1. Load the [GitHub website page for this module](https://github.com/Financial-Times/o-colors).  If you're logged in, there should be a 'You recently pushed branches' label, and a button to 'Compare and pull request'.  Click that button.
1. Modify your description, if you wish, and click 'Send pull request'.  GitHub will now run automated tests on your commit to ensure that the module still works correctly.  The pull request should not be merged until it shows "All is well — The Travis CI build passed".
