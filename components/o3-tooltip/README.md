# o3-tooltip[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o3-tooltip is a component usually used for annotating or highlighting bits of user interface.

- [o3-tooltip](#o3-tooltip)
	- [Markup](#markup)
		- [Branding](#branding)
	- [JavaScript](#javascript)
	- [css](#css)
	- [JSX](#jsx)
	- [Migration Guide](#migration-guide)
	- [Contact](#contact)
	- [Licence](#licence)

## Markup

`o3-tooltip` currently supports two variants, which is determined by `render-on-open` attribute on custom element. If attribute is enable the tooltip will be rendered once the DOM is loaded and will have a close button. Close button remove the tooltip from the DOM and it can re-triggered only reload.

If the attribute `render-on-open` is not present the tooltip will be rendered once the target element is hovered, focused or clicked. The tooltip will be removed from the DOM once the target element is no longer hovered, focused or clicked.

Bellow is a markup example of how to use `o3-tooltip` with `render-on-open` attribute:

```html
<div class="o3-brand-whitelabel">
 <!-- DEMO BUTTON ELEMENT TARGETED BY o3-tooltip -->
 <button id="demo-o3-tooltip-id" aria-describedby="o3-tooltip-content">
  Share
 </button>

 <!-- TOOLTIP CUSTOM ELEMENT -->
 <o3-tooltip
  role="tooltip"
  render-on-open
  placement="top"
  target-id="demo-o3-tooltip-id"
  class="o3-tooltip"
 >
  <div class="o3-tooltip-wrapper">
   <div data-tooltip-arrow></div>
   <div class="o3-tooltip-content" id="o3-tooltip-content">
    <div class="o3-tooltip-content-title">Title</div>
    <div>This tooltip renders once DOM is loaded and has close button</div>
   </div>
  </div>
  <button
   class="o3-tooltip-close"
   aria-label="Close tooltip"
   title="Close tooltip"
  ></button>
 </o3-tooltip>
</div>
```

and this is example of how to use `o3-tooltip` without `render-on-open` attribute:

```html
<div class="o3-brand-whitelabel">
 <!-- DEMO BUTTON ELEMENT TARGETED BY o3-tooltip -->
 <button id="demo-o3-tooltip-id" aria-describedby="o3-tooltip-content">
  Share
 </button>

 <!-- TOOLTIP CUSTOM ELEMENT -->
 <o3-tooltip
  role="tooltip"
  placement="top"
  target-id="demo-o3-tooltip-id"
  class="o3-tooltip"
 >
  <div class="o3-tooltip-wrapper">
   <div data-tooltip-arrow></div>
   <div class="o3-tooltip-content" id="o3-tooltip-content">
    <div class="o3-tooltip-content-title">Title</div>
    <div>
     This tooltip renders only when target element is hovered, clicked or
     focused
    </div>
   </div>
  </div>
 </o3-tooltip>
</div>
```

### Branding

To apply a brand theme wrap your tooltip element inside an element that has a class name of `o3-brand-{yourBrand}`. E.g. to output a tooltip for the professional theme:

```html
<div class="o3-brand-professional">
 <o3-tooltip></o3-tooltip>
</div>
```

You will need to install [o3-web-token](https://www.npmjs.com/package/@financial-times/o3-web-token) package to use the branding feature.

## JavaScript

No code will run automatically unless you import the JavaScript. To import the JavaScript, you can use the following code:

```javascript
import o3Tooltip from '@financial-times/o3-tooltip';
```

## css

To style `o3-tooltip` you can use import brand specific css file from `@financial-times/o3-tooltip` package. You can use the following code:

```javascript
import '@financial-times/o3-tooltip/css/whitelabel.css';
```

## JSX

`o3-tooltip` has a JSX component exported as well. To use it, you can use the following code:

```jsx
import {Tooltip} from '@financial-times/o3-tooltip/jsx';

import '@financial-times/o3-tooltip'; // import the JavaScript needed for custom element

import '@financial-times/o3-web-token/whitelabel.css'; // brand styling
import '@finacial-times/o3-tooltip/css/whitelabel.css'; // tooltip styling

<div clssName="o3-brand-whitelabel">
 <Tooltip {...props} />;
</div>
```

|     Prop     |  type   | required | default |             description             |
| :----------: | :-----: | :------: | :-----: | :---------------------------------: |
|   targetId   | string  |   true   |    -    | Target element to attach tooltip to |
|   content    | string  |   true   |    -    |       Content of the tooltip        |
|    title     | string  |  false   |    -    |        Title of the tooltip         |
|  contentId   | string  |   true   |    -    |  id for `aria-describedby` element  |
|  placement   | string  |  false   |  'top'  |      Placement of the tooltip       |
| renderOnOpen | boolean |  false   |  false  |       Render tooltip on open        |

## Migration Guide

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       0       |       0.0.1        |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-tooltip/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
