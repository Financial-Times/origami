o-lazy-load [![CircleCI](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

This component provides lazy loading functionality for images, pictures, iframes, and more. It is powered by the Intersection Observer API to detect when the visibility of elements changes.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The most common use case for lazy loading is to delay the loading of images until they enter the viewport. To do this start by adding the component to the document `<body>`. For each target `<img>` element add the `o-lazy-load` and optionally `o-lazy-load--transition` class names and change the `src` attribute to `data-src`. Because these changes will prevent the images from loading without JavaScript it is recommended to only lazy load decorative images which are "below the fold" of the page and _you should always consider the features you must provide as part of your [core experience]_.

[core experience]: https://origami.ft.com/docs/components/compatibility/

```diff
- <body>
-   <img src="path/to/image.jpg">
+ <body data-o-component="o-lazy-load">
+   <img class="o-lazy-load o-lazy-load--transition" data-src="path/to/image.jpg">
</body>
```

When images load it can cause a jarring reflow of the page. If you are working on a page with a static width you may wish to apply `width` and `height` attributes to your images to prevent this. If you are building a responsive site then o-lazy-load provides styles which can reserve a fixed aspect ratio space for content to load into.

By default classes are provided to preserve space for content with either a 16:9, 16:10, 3:2, 4:3, or 1:1 aspect ratio. If you are including o-lazy-load into your own build process you may configure the placeholder classes to generate.

```html
<div class="o-lazy-load-placeholder o-lazy-load-placeholder--16x9">
	<img class="o-lazy-load o-lazy-load--transition" data-src="path/to/image.jpg" alt="">
</div>
```

If you are using the Build Service, or are calculating aspect ratios dynamically, you can also use a placeholder element to apply a percentage based height [using the padding hack](https://css-tricks.com/aspect-ratio-boxes/).

```html
<div class="o-lazy-load-placeholder">
	<!-- Create custom 16:9 placeholder -->
	<div style="padding-bottom: 56.25%"></div>
	<img class="o-lazy-load o-lazy-load--transition" data-src="path/to/image.jpg" alt="">
</div>
```

To lazy load a `<picture>` element add the `o-lazy-load` class and prefix the `src` and `srcset` attributes for each of the `<source>` and `<img>` elements contained inside:

```html
<picture class="o-lazy-load o-lazy-load--transition">
	<source data-srcset="path/to/image-small.jpg" media="screen and (max-width: 480px)">
	<source data-srcset="path/to/image-medium.jpg" media="screen and (max-width: 800px)">
	<img data-src="path/to/image-large.jpg" alt="">
</picture>
```

o-lazy-load is also capable of lazy loading iframes and toggle class names. [See the component demos](https://registry.origami.ft.com/components/o-lazy-load) for more information about these features.

## JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an o-lazy-load instance or fire the `o.DOMContentLoaded` event, which each oComponent listens for.

_Note: If the o-lazy-load root is set to the `<html>` or `<body>` element o-lazy-load will assume you want to base element visibility on the viewport._

### Constructing an o-lazy-load instance

To initialise o-lazy-load programmatically you can import the `oLazyLoad` class into your script:

```js
import LazyLoad from 'o-lazy-load';

const root = document.documentElement;
const options = {};

const lazyLoader = new LazyLoad(root, options);
```

The `oLazyLoad` class constructor accepts two arguments - the `root` element and a map of `options`. The current o-lazy-load options are:

- `selector` A CSS selector to match the elements to lazy load, these must be descendents of the `root`
- `loaded` A callback function which receives the element just loaded

All other options will be passed to the intersection observer, so check [the `IntersectionObserver` documentation](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) for more information about its configuration.

### Firing an oDomContentLoaded event

To use o-lazy-load declaratively you must start by declaring the `root` element by appending the `data-o-component="o-lazy-load"` attribute to it. You can also add options to this element.

```html
<div
	class="scrollable-area"
	data-o-component="o-lazy-load"
	data-o-lazy-load-selector=".js-target">
	<div class="js-target">…</div>
	<div class="js-target">…</div>
	<div class="js-target">…</div>
</div>
```

In your JavaScript you can then dispatch the `o.DOMContentLoaded` event:

```js
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Updating observed elements

If you are loading new or extra content into your document, for example using AJAX or building a single-page application, you may need to update the elements being observed. To do this you can call the `.observe()` method on the o-lazy-load instance you have previously constructed.

```js
import LazyLoad from 'o-lazy-load';

const lazyLoader = new LazyLoad(document.documentElement);

// ... some logic to update the page ...

lazyLoader.observe();
```

Calling this method will find all the elements matching the original options and append any new ones to the set to observe.

## Sass

To include all o-lazy-load CSS make a single call to `oLazyLoad`:

```scss
@include oLazyLoad();
```

o-lazy-load features may be included granularly using an options `$opts` map:

- `transition`: Outputs the class `o-lazy-load--transition` to create a fade in transition effect for when content is loaded, which works best for image or picture elements.
- `placeholder`: Outputs the class `o-lazy-load-placeholder` which provides basic styles for all placeholder elements.
- `placeholder-ratios`: Outputs modifier classes for placeholder elements to match the loaded elements aspect ratio.

```scss
@include oLazyLoad($opts: (
    'placeholder': true, // .o-lazy-load-placeholder
    'placeholder-ratios': ((16, 9), (1, 1)), // e.g. .o-lazy-load-placeholder--16x9
    'transition': true // .o-lazy-load--transition
));
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
⚠ maintained | 1 | 1.0 | - |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-lazy-load/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
