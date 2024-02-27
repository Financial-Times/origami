# o3-tooltip[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o3-tooltip is hosting two components: `o3-tooltip-onboarding` and `oe-tooltip-toggle`. Onboarding Tooltips help for a smoother introduction to new features or functionality. Toggletips are compact pieces of information designed to offer additional insights when needed.

- [o3-tooltip](#o3-tooltip)
- [Markup](#markup)
- [JavaScript](#javascript)
- [css](#css)
- [JSX](#jsx)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

We provide custom elements `<o3-tooltip-onboarding>` and `<o3-tooltip-toggle>` to be used in your markup but we also equivalent provide [JSX components](#jsx) to be used in React.

`<o3-tooltip-onboarding>` is used to display a tooltip on a HTML target element that can have `aria-describedby` attribute. It is used to provide additional information about the target element and is shown immediately once the page is loaded. It can be only closed by clicking the close button.

`o3-tooltip-toggle` does not have a close button and is used with info icon. It can be triggered by clicking on the info icon and will be removed from the DOM if user clicks outside of the tooltip, press ESC or click the info icon again.

Bellow is a markup examples of how to use `<o3-tooltip-onboarding>` and `<o3-tooltip-toggle>` custom elements:

```html
<!-- <o3-tooltip-onboarding> -->
<div data-o3-brand="[your brand]">
 <button
  id="demo-o3-tooltip-id"
  class="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
  aria-describedby="o3-tooltip-content"
 >
  Share
 </button>
 <o3-tooltip-onboarding
  role="tooltip"
  placement="top"
  target-id="demo-o3-tooltip-id"
  class="o3-tooltip"
  content="Tool tip content that is quite long, Tool tip content that is quite long, Tool tip content that is quite long"
  title="Title"
  content-id="o3-tooltip-content"
 >
 </o3-tooltip-onboarding>
</div>
```

`content-id` is used to link the tooltip to the target element. It is used to provide additional information about the target element.

```html
<!-- <o3-tooltip-toggle> -->
<div data-o3-brand="[your brand]">
 <o3-tooltip-toggle
  placement="bottom"
  class="o3-tooltip"
  content="click the button to see the tooltip"
  title="Title">
 </o3-tooltip-toggle>
</div>
```

## JavaScript

No code will run automatically unless you import the JavaScript. To import the JavaScript, you can use the following code:

```javascript
import o3Tooltip from '@financial-times/o3-tooltip';
```

## css

To style `o3-tooltip` you can use import brand specific css file from `@financial-times/o3-tooltip` package. You can use the following code:

```javascript
import '@financial-times/o3-tooltip/css/[your brand].css';
```

## JSX

`o3-tooltip` has a two JSX component exported that implement `<o3-tooltip-onboarding>` and `<o3-tooltip-toggle>` under the hood and export `TooltipOnboarding` and `TooltipToggle` respectively. To use it, you can use the following code:

```jsx
import {
 TooltipOnboarding,
 TooltipToggle,
} from '@financial-times/o3-tooltip/jsx';

import '@financial-times/o3-tooltip'; // import the JavaScript needed for custom elements

import '@financial-times/o3-web-token/[your brand].css'; // brand styling
import '@finacial-times/o3-tooltip/css/[your brand].css'; // tooltip styling

<div className="o3-brand-[your brand]">
 <button id="target" aria-describedby="contentId">
  Target element
 </button>
 <TooltipOnboarding {...props} />;
 <TooltipToggle {...props} />
</div>;
```

### Props

`TooltipOnboarding` component accept the following props:

```ts
type Placement =
 | 'top'
 | 'bottom'
 | 'left'
 | 'right'
 | 'top-start'
 | 'top-end'
 | 'bottom-start'
 | 'bottom-end'
 | 'left-start'
 | 'left-end'
 | 'right-start'
 | 'right-end';
```

|   Prop    |    type     | required | default |             description             |
| :-------: | :---------: | :------: | :-----: | :---------------------------------: |
| targetId  |   string    |   true   |    -    | Target element to attach tooltip to |
|  content  |   string    |   true   |    -    |       Content of the tooltip        |
|   title   |   string    |  false   |    -    |        Title of the tooltip         |
| contentId |   string    |   true   |    -    |  id for `aria-describedby` element  |
| placement | `Placement` |  false   |  'top'  |      Placement of the tooltip       |

`ToggleTooltip` component accept the following props:

```ts
type Placement = 'top' | 'bottom' | 'left' | 'right';
```

|   Prop    |    type     | required | default |       description        |
| :-------: | :---------: | :------: | :-----: | :----------------------: |
|  content  |   string    |   true   |    -    |  Content of the tooltip  |
|   title   |   string    |  false   |    -    |   Title of the tooltip   |
| placement | `Placement` |  false   |  'top'  | Placement of the tooltip |

## Migration Guide

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       0       |       0.0.1        |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-tooltip/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
