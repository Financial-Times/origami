o-lazy-load [![Circle CI](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master)
=================

This component provides lazy loading functionality for images, pictures, iframes, and more. It is powered by [lozad] which uses the Intersection Observer API to detect when elements enter the viewport.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

[lozad]: (https://github.com/ApoorvSaxena/lozad.js)

## Usage

### Markup

The most common use case for lazy loading is to delay the loading of images. To do this start by appending each image element with the `o-lazy-load` class name and change the `src` attribute to `data-src`.

```diff
- <img src="path/to/image.jpg">
+ <img class="o-lazy-load" data-src="path/to/image.jpg">
```

When the content is loaded it can cause a jarring reflow of the page. If you are implementing a page with a static width you may wish to apply `width` and `height` attributes to your image elements to prevent this. If you are working on a responsive site o-lazy-load provides placeholder styles which can reserve space for content to load into.

By default classes are provided for content with 16:9, 16:10, 3:2, 4:3, or 1:1 aspect ratios. If you are including o-lazy-load into your own build process you may configure the aspect ratios to generate classes for.

```html
<div class="o-lazy-load-placeholder o-lazy-load-placeholder--16:9">
	<img class="o-lazy-load" data-src="path/to/image.jpg" alt="">
</div>
```

If you are using the Build Service, or are calculating aspect ratios dynamically, you can also use a placeholder `<div>` element to apply percentage based heights [using the padding hack](https://css-tricks.com/aspect-ratio-boxes/):

```html
<div class="o-lazy-load-placeholder">
	<!-- Create custom 16:9 placeholder -->
	<div style="padding-bottom: 56.25%"></div>
	<img class="o-lazy-load" data-src="path/to/image.jpg" alt="">
</div>
```

This component is also capable of lazy loading iframes, background images, and add class names when elements scroll into view. See the [lozad] documentation for more information.

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an o-lazy-load instance or fire the `o.DOMContentLoaded` event, which each oComponent listens for. By default either method will initialise this component and observe all  elements matching the selector `.o-lazy-load` in the document.

#### Constructing o-lazy-load

```js
import OLazyLoad from 'o-lazy-load';

const lazyInstance = new OLazyLoad({});
```

The `OLazyLoad` constructor accepts a map of options, the options currently available are:

- `selector` A CSS selector to match the elements to lazy load
- `rootMargin` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
- `threshold` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds
- `loaded` A callback function which receives the element loaded

See the [lozad] documentation for full usage information and examples.

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

#### Updating observed elements

If you are loading new or extra content into your document, for example using AJAX or when building a single-page application you may need to update the elements being observed. To do this you can call the `.observe()` method on the o-lazy-load instance.

```js
import OLazyLoad from 'o-lazy-load';

const lazyInstance = new OLazyLoad();

// ... some logic to update the page ...

lazyInstance.observe();
```

#### Manually triggering content to load

In cases where you need to force content to load before it moves into the viewport you can manually pass the observed element to the `.triggerLoad()` method.

```js
const el = document.querySelector('.target-el');
lazyInstance.triggerLoad(el);
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
