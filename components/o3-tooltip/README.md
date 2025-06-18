# o3-tooltip[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o3-tooltip is hosting two components: `o3-tooltip-onboarding` and `o3-tooltip-toggle`. Onboarding Tooltips help for a smoother introduction to new features or functionality. Toggletips are compact pieces of information designed to offer additional insights when needed. See our [design guidelines for usage information and brand support](https://origami-for-everyone.ft.com).

- [o3-tooltip](#o3-tooltip)
- [Markup](#markup)
- [JavaScript](#javascript)
- [css](#css)
- [JSX](#jsx)
  - [TooltipOnboarding](#tooltiponboarding)
  - [TooltipToggle](#tooltiptoggle)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

We provide custom elements `<o3-tooltip-onboarding>` and `<o3-tooltip-toggle>`. React users may include these using our [JSX template](#jsx).

`<o3-tooltip-onboarding>` is used to display a tooltip on a HTML target element that can have an `aria-describedby` attribute. It is used to provide additional information about the target element and is shown immediately once the page is loaded. It can be only closed by clicking the close button.

`<o3-tooltip-toggle>` does not have a close button and is used with an information icon. It can be triggered by clicking on the information icon and will be removed from the DOM if the user clicks outside the tooltip, presses ESC, or clicks the info icon again.

Below are examples of how to use `<o3-tooltip-onboarding>` and `<o3-tooltip-toggle>` custom elements:

```html
<!-- <o3-tooltip-onboarding> -->
<div data-o3-brand="[your brand]">
	<button
		id="demo-o3-tooltip-id"
		class="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
		aria-describedby="demo-o3-tooltip-content"
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
		content-id="demo-o3-tooltip-content"
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
		title="Title"
		info-label="more information"
	>
	</o3-tooltip-toggle>
</div>
```

`info-label` attribute is used to provide a label for info icon to have better screen reader experience. By default, it is set to "more information".

## JavaScript

No code will run automatically unless you import the client side JavaScript. To import the JavaScript, you can use the following code:

```javascript
import '@financial-times/o3-tooltip';
```

## css

To style `o3-tooltip` import brand specific css, this varies depending on your project. For example:

```scss
@import '@financial-times/o3-tooltip/css/[your brand].css';
```

## JSX

`o3-tooltip` exports two JSX templates, `TooltipOnboarding` and `TooltipToggle` for each tooltip component. JSX templates are exported as `cjs` (common JS) and `esm` (ECMAScript) modules, so depending on your system configuration, you may need to import the correct module type. TSX templates can help to avoid copy-pasting html. For example:

```jsx
import {
	TooltipOnboarding,
	TooltipToggle,
} from '@financial-times/o3-tooltip/cjs';

import '@financial-times/o3-tooltip'; // import the JavaScript needed for custom elements on client side

import '@financial-times/o3-tooltip/css/[your brand].css'; // tooltip styling

<div className="o3-brand-[your brand]">
	<button id="target" aria-describedby="contentId">
		Target element
	</button>
	<TooltipOnboarding {...props} />;
	<TooltipToggle {...props} />
</div>;
```

### TooltipOnboarding

The `TooltipOnboarding` JSX element accepts the following `props`:

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

### TooltipToggle

The `ToggleTooltip` JSX element accepts the following `props`:

```ts
type Placement = 'top' | 'bottom' | 'left' | 'right';
```

|   Prop    |    type     | required |     default      |       description        |
| :-------: | :---------: | :------: | :--------------: | :----------------------: |
|  content  |   string    |   true   |        -         |  Content of the tooltip  |
|   title   |   string    |  false   |        -         |   Title of the tooltip   |
| placement | `Placement` |  false   |      'top'       | Placement of the tooltip |
| infoLabel |   string    |  false   | more information | Label for screen readers |

## Migration Guide

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       3       |        N/A         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.3         |                           -                           |
| ╳ deprecated |       1       |         -          |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-tooltip/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
