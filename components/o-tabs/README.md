# o-tabs

Tabs component for dividing content into meaningful sections.

- [Usage](#usage)
- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Keyboard Support](#keyboard-support)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-tabs`.

## Markup

The _tablist_, _tabs_ and _tabpanels_ must be identified by [ARIA](http://www.w3.org/TR/wai-aria/) `role` attributes.

The _tab_ elements must contain a link whose `href` attribute points to the ID of a _tabpanel_ element.

The _tabpanel_ elements must have a `o-tabs__tabpanel` class added to them.

This is an example of an HTML structure that **o-tabs** will accept:

```html
<div
	data-o-component="o-tabs"
	class="o-tabs o-tabs--buttontabs  o-tabs--secondary"
	role="tablist"
>
	<a role="tab" aria-controls="tabContent1" href="#tabContent1">Tab 1</a>
	<a role="tab" aria-controls="tabContent2" href="#tabContent2">Tab 2</a>
	<a role="tab" aria-controls="tabContent3" href="#tabContent3">Tab 3</a>
</div>
<div id="tabContent1" class="o-tabs__tabpanel">Tab content 1</div>
<div id="tabContent2" class="o-tabs__tabpanel">Tab content 2</div>
<div id="tabContent3" class="o-tabs__tabpanel">
	<div>
		Note: first elements of each tab will get focused when it is selected. In
		this case, this div will receive focus.
	</div>
	Tab content 3
</div>
```

To set the initially selected tab, add an `aria-selected="true"` attribute to a tab element, otherwise the first tab will be selected automatically.

### Config

You can set config options declaratively by using `[data-o-tabs-]` prefixed data attributes.

Options consist of:

- `data-o-tabs-update-url="true"` - update the URL with the `#` of the selected panel.

### Core experience

Without the accompanying JavaScript, the _tabs_ will receive no styling, and all _tabpanels_ will remain visible. It's recommended that the default styling is to have each of the _tabpanels_ displayed one below the other.

A product may choose to hide the tabs like this:

```css
.o-tabs {
	display: none;
}
.o-tabs--js {
	display: block;
}
```

### ARIA

ARIA attributes will be set on elements as follows:

**On init**, `aria-controls` is added to each tab element, with value being the ID of the associated tabpanel.

**On init and selected tab change** these attributes are set and updated as appropriate:

- `aria-selected` is set on the tab elements
- `aria-hidden` and `aria-expanded` are set on the tabpanels

These state attributes are used by the **o-tabs** CSS.

## JavaScript

### Declarative

A `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct a **o-tabs** object for each element with a `data-o-component="o-tabs"` attribute:

```javascript
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Auto-construction can be disabled for a specific element via another data attribute (`data-o-tabs-autoconstruct="false"`).

Note that for browsers that do not support `DOMContentLoaded` (IE8 etc), the event could be polyfilled, or construction can be manually invoked:

```javascript
import Tabs from '@financial-times/o-tabs';
const tabsObjects = Tabs.init(document.body);
```

An array of any constructed Tabs objects will be returned.

`Tabs.init(config)` will not create Tabs objects for elements that already have Tabs objects constructed on them, therefore it's safe to call more than once on the same page region.

### Imperative

```javascript
import Tabs from '@financial-times/o-tabs';
const myTabs = new Tabs(document.getElementById('myTabsRootElement'), {});
```

### Events

The following events will be dispatched on the Tabs' root DOM element:

- `oTabs.ready`: The Tabs object has initialised. Event detail:
  - `tabs`: The **o-tabs** object.
- `oTabs.tabSelect`: A tab has been selected. Event detail:
  - `tabs`: The **o-tabs** object.
  - `selected`: The index of the selected tab.
  - `lastSelected`: The index of the last selected tab.

### API

Tabs are indexed starting from 0.

The following API methods are provided:

- `init(config)`: Set attributes/classes, bind events. Called automatically on construction. Does nothing if already been called. `config` object accepts:
- `selectTab(idx)`: Select tab `idx`. Does nothing if tab `idx` does not exist or is already selected.
- `destroy()`: Unbind events, remove `o-tabs--js` class. After calling this, `init()` can be called again to re-initialise the tabs.

## Sass

**o-tabs** comes with either _base styling_, which should be used as a base for you to add your own styling. Or _full styling_ called **buttontabs**; based on standard buttons.

To apply the **buttontabs** styling, add a `o-tabs--buttontabs` class to the root element:

```html
<ul
	data-o-component="o-tabs"
	class="o-tabs o-tabs--buttontabs"
	role="tablist"
></ul>
```

The **buttontabs** style comes in two sizes that conform to standard button sizes. Apply the "big" style by default `o-tabs--big`.

### Options

- **Align right**: Add `o-tabs--alignright` to the root element.

### Mixin: `oTabs`

Output all default `oTabs` styles using `oTabs`.

```scss
@include oTabs();
```

Set `oTabs` options to output more [sizes](#sizes) and variations of button tabs ([types](#types) and [themes](#themes) of buttons.

```scss
@include oTabs(
	$opts: (
		'sizes': (
			'big',
		),
		//.o-tabs--big
		'button-tabs':
			(
				('type': 'primary'),
				//.o-tabs--primary
				('type': 'secondary'),
				//.o-tabs--secondary
				('type': 'secondary', 'theme': 'inverse'),
				//.o-tabs--secondary.o-tabs--inverse
			),
	)
);
```

### Sizes

This table outlines all of the possible sizes you can request in the [`oTabs` mixin](#mixin-otabs):

| Size | Notes               | Brand support              |
| ---- | ------------------- | -------------------------- |
| big  | Included by default | core, internal, whitelabel |

### Types

This table outlines the button types you can request in the [`oTabs` mixin](#mixin-otabs):

| Type      | Notes               | Brand support              |
| --------- | ------------------- | -------------------------- |
| secondary | Included by default | core, internal, whitelabel |
| primary   | Included by default | core, internal, whitelabel |

### Themes

This table outlines some of the possible button themes you can request in the [`oTabs` mixin](#mixin-otabs) along with [button types](#types):

| Theme                | Notes                   | Brand support  |
| -------------------- | ----------------------- | -------------- |
| inverse              | Included by default     | core, internal |
| mono                 | Not included by default | core, internal |
| professional         | Not included by default | core           |
| professional-inverse | Not included by default | core           |

## Keyboard Support

### When focus is within the tab list

| Key            | Function                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tab            | When focus moves into the tab list, places focus on the active tab element. When the tab list already contains the focus, moves focus to the next element in the page tab sequence outside the tablist. |
| Left Arrow     | Moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Activates the tabpanel which is associated with the newly focused tab.                                      |
| Right Arrow    | Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Activates the tabpanel which is associated with the newly focused tab.                                  |
| Space or Enter | Activates the tabpanel which is associated with the focused tab if it was not already activated.                                                                                                        |

## Migration Guide

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       6       |        N/A         | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
| ⚠ maintained |       6       |        6.2         | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
| ⚠ maintained |       5       |        5.0         | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
| ⚠ maintained |       4       |        4.3         | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
| ╳ deprecated |       3       |        3.0         |                          N/A                          |
| ╳ deprecated |       2       |        2.2         |                          N/A                          |
| ╳ deprecated |       1       |        1.0         |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tabs/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
