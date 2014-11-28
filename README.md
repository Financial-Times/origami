# o-tabs [![Build Status](https://travis-ci.org/Financial-Times/o-tabs.png?branch=master)](https://travis-ci.org/Financial-Times/o-tabs)

A single content area with multiple panels, each associated with a header in a list.

## Browser Support

Tested and working on:

|  Browsers  | Primary Experience | Core Experience |
|:----------:|:------------------:|:---------------:|
|   Chrome   |        35+         |       35+       |
|   Firefox  |        30+         |       30+       |
|   Safari   |        7+          |       7+        |
|   IE       |        8+          |       8+        |

Known issues:

* IE8+ need the polyfill for `CustomEvent`
* IE8 also needs the polyfill for `addEventListener`

## Markup

The _tablist_, _tabs_ and _tabpanels_ must be identified by [ARIA](http://www.w3.org/TR/wai-aria/) `role` attributes.

The _tab_ elements must contain a link whose `href` attribute points to the ID of a _tabpanel_ element.

The _tabpanel_ elements must have a `o-tabs__tabpanel` class added to them.

This is an example of an HTML structure that __o-tabs__ will accept:

```html
<ul data-o-component="o-tabs" class="o-tabs" role="tablist">
	<li role="tab"><a href="#tabContent1">Tab 1</a></li>
	<li role="tab"><a href="#tabContent2">Tab 2</a></li>
	<li role="tab"><a href="#tabContent3">Tab 3</a></li>
</ul>
<div id="tabContent1" class="o-tabs__tabpanel">
	Tab content 1
</div>
<div id="tabContent2" class="o-tabs__tabpanel">
	Tab content 2
</div>
<div id="tabContent3" class="o-tabs__tabpanel">
	Tab content 3
</div>
```

To set the initially selected tab, add an `aria-selected="true"` attribute to a tab element, otherwise the first tab will be selected automatically.

### Core experience

Without the accompanying JavaScript, the _tabs_ will receive no styling, and all _tabpanels_ will remain visible. It's recommended that the default styling is to have each of the _tabpanels_ displayed one below the other.

A product may choose to hide the tabs like this:

```css
.o-tabs { display: none; }
.o-tabs--js { display: block; }
```

### Primary experience

The _primary experience_ will show as functional tabs, and only the _tabpanel_ for the selected tab will be shown.

The JavaScript will add `role="tabpanel"` attributes to each _tabpanel_. These will be used in conjunction with the `aria-hidden="true"` attributes, to hide _tabpanels_ as appropriate. This means that without JS, all _tabpanels_ will remain visible.

If the heights of the _tabpanels_ vary, then any content below will move up and down as the user switches between tabs. If this is not desired, it is the responsibility of the consumer to address this.

## Construction

### Declarative

A `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct a __o-tabs__ object for each element with a `data-o-component="o-tabs"` attribute:

```javascript
document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Auto-construction can be disabled for a specific element via another data attribute (`data-o-tabs-autoconstruct="false"`).

Note that for browsers that do not support `DOMContentLoaded` (IE8 etc), the event could be polyfilled, or construction can be manually invoked:

```javascript
var Tabs = require('o-tabs');
var tabsObjects = Tabs.init();
```

An array of any constructed Tabs objects will be returned.

`Tabs.init()` will not create Tabs objects for elements that already have Tabs objects constructed on them, therefore it's safe to call more than once on the same page region.

### Imperative

```javascript
var Tabs = require('o-tabs');
var myTabs = new Tabs(document.getElementById('myTabsRootElement'));
```

## Styles

__o-tabs__ comes with either _base styling_, which is just the minimum to be functional or _full styling_ (called __buttontabs__ as it's based on the buttons from [o-ft-buttons](https://github.com/Financial-Times/o-ft-buttons)).

To apply the __buttontabs__ styling, add a `o-tabs--buttontabs` class to the root element:

```html
<ul data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs o-tabs--buttontabs" role="tablist">
```

The __buttontabs__ style comes in two sizes:

#### Default

![tab buttons](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons.png)

#### "Big"

![tab buttons big](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons-big.png)

These examples show "John" as the selected tab. The horizontal line extends to the full width of its container.

__Options__

* __Align right__: Add `o-tabs--alignright` to the root element.
* __Big__: Add `o-tabs--big` to the root element.

## ARIA

ARIA attributes will be set on elements as follows:

__On init__, `aria-controls` is added to each tab element, with value being the ID of the associated tabpanel.

__On init and selected tab change__ these attributes are set and updated as appropriate:

* `aria-selected` is set on the tab elements
* `aria-hidden` and `aria-expanded` are set on the tabpanels

These state attributes are used by the __o-tabs__ CSS.

## Events

The following events will be dispatched on the Tabs' root DOM element:

* `oTabs.ready`: The Tabs object has initialised. Event detail:
	* `tabs`: The __o-tabs__ object.
* `oTabs.tabSelect`: A tab has been selected. Event detail:
	* `tabs`: The __o-tabs__ object.
	* `selected`: The index of the selected tab.
	* `lastSelected`: The index of the last selected tab.

## API

Tabs are indexed starting from 0.

The following API methods are provided:

* `init()`: Set attributes/classes, bind events. Called automatically on construction. Does nothing if already been called.
* `selectTab(idx)`: Select tab `idx`. Does nothing if tab `idx` does not exist or is already selected.
* `destroy()`: Unbind events, remove `o-tabs--js` class. After calling this, `init()` can be called again to re-initialise the tabs.
