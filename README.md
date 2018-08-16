o-lazy-load [![Circle CI](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master)
=================

This component provides lazy loading functionality for images, pictures, iframes, and more. It is powered by the Intersection Observer API to detect when the visibility of elements changes.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

The most common use case for lazy loading is to delay the loading of images until they enter the viewport. To do this start by adding the component to the document `<body>` and then for each target `<img>` add the `o-lazy-load` class name and change the `src` attribute to `data-src`. These changes will now prevent the image from loading when the page is visited so it is recommended to only lazy load decorative images which are "below the fold" of the page.

```diff
- <body>
-   <img src="path/to/image.jpg">
+ <body data-o-component="o-lazy-load">
+   <img class="o-lazy-load" data-src="path/to/image.jpg">
</body>
```

When images are loaded it can cause a jarring reflow of the page. If you are implementing a page with a static width you may wish to apply `width` and `height` attributes to your image elements to prevent this. If you are working on a responsive site o-lazy-load provides placeholder styles which can reserve space of a fixed aspect ratio for content to load into.

By default classes are provided for content with 16:9, 16:10, 3:2, 4:3, or 1:1 aspect ratios. If you are including o-lazy-load into your own build process you may configure the aspect ratios.

```html
<div class="o-lazy-load-placeholder o-lazy-load-placeholder--16:9">
	<img class="o-lazy-load" data-src="path/to/image.jpg" alt="">
</div>
```

If you are using the Build Service, or are calculating aspect ratios dynamically, you can also use a placeholder `<div>` element to apply percentage based heights [using the padding hack](https://css-tricks.com/aspect-ratio-boxes/).

```html
<div class="o-lazy-load-placeholder">
	<!-- Create custom 16:9 placeholder -->
	<div style="padding-bottom: 56.25%"></div>
	<img class="o-lazy-load" data-src="path/to/image.jpg" alt="">
</div>
```

Picture elements can also be lazy loaded, to do so add the `o-lazy-load` class to the `<picture>` and switch the `src` and `srcset` attributes for each of the `<source>` and `<img>` elements inside.

```js
<picture class="o-lazy-load">
	<source data-srcset="path/to/image-small.jpg" media="screen and (max-width: 480px)">
	<source data-srcset="path/to/image-medium.jpg" media="screen and (max-width: 800px)">
	<img data-srcset="path/to/image-large.jpg" alt="">
</picture>
```

This component is also capable of lazy loading iframes, background images, and toggle class names when elements scroll into view. See the component demos for more information about these features.

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an o-lazy-load instance or fire the `o.DOMContentLoaded` event, which each oComponent listens for. By default either method will initialise this component and observe all  elements matching the selector `.o-lazy-load` in the document.

#### Constructing o-lazy-load

```js
import oLazyLoad from 'o-lazy-load';

const root = document.documentElement;
const options = {};

const lazyLoader = new oLazyLoad(root, options);
```

The `oLazyLoad` constructor accepts two arguments - the root element and a map of options. If the `root` element is set to the `<html>` or `<body>` element o-lazy-load will assume you want to base lazy loading on the viewport.

The current options are:

- `selector` A CSS selector to match the elements to lazy load, these must be descendents of the `root`
- `loaded` A callback function which receives the element just loaded

All options will be passed to the intersection observer,

- `rootMargin` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
- `threshold` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

You will need to

#### Updating observed elements

If you are loading new or extra content into your document, for example using AJAX or when building a single-page application you may need to update the elements being observed. To do this you can call the `.observe()` method on the o-lazy-load instance.

```js
import oLazyLoad from 'o-lazy-load';

const lazyLoader = new oLazyLoad(document.documentElement);

// ... some logic to update the page ...

lazyLoader.observe();
```

### Sass

As with all Origami components, o-lazy-load has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-lazy-load-is-silent : false;` in your Sass before you import the o-lazy-load Sass.

This component currently provides two mixins for styling image and picture elements:

- `oLazyLoadImage($class)` applies a fade in effect when image elements are loaded
- `oLazyLoadPlaceholder($class)` provides basic styles for creating placeholder elements

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-lazy-load/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
