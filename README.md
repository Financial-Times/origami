# o-tabs [![Build Status](https://travis-ci.org/Financial-Times/o-tabs.png?branch=master)](https://travis-ci.org/Financial-Times/o-tabs)

> A single content area with multiple panels, each associated with a header in a list.

---

__Status__: Gathering requirements. Not yet implemented.

---

## Markup

The following HTML structure is expected:

    <div data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs">
        <ul>
            <li data-o-tabs-tab><a href="#tabContent1">Tab 1</a></li>
            <li data-o-tabs-tab><a href="#tabContent2">Tab 2</a></li>
            <li data-o-tabs-tab><a href="#tabContent3">Tab 3</a></li>
        </ul>
        <div id="tabContent1" class="o-tabs__content">
            Tab content 1
        </div>
        <div id="tabContent2" class="o-tabs__content">
            Tab content 2
        </div>
        <div id="tabContent3" class="o-tabs__content">
            Tab content 3
        </div>
    </div>

The `data-o-tabs-tab` attributes tell __o-tabs__ which elements are the tab controls. The `href`s of the links they contain are used to associate content elements with their tab elements.

To set the initially selected tab, add a `o-tabs__tab--selected` class to a `<li>`, otherwise the first tab will be selected.

The _core experience_ (no-JS or 'cuts-the-mustard' fail) will show the tabs as a basic list of links, with each tab content element displayed one below the other.

The _full experience_ will show as functional tabs and only the tab content for the selected tab.

If the heights of the content elements vary, then any content below will move up and down as the user switches between tabs. If this is not desired, it is the responsibility of the product to address this.

## Construction

### Declarative

When the __o-tabs__ script loads, tabs instances are automatically constructed for each element in the `body` declaring itself to be an __o-tabs__ element (via the `data-o-component=o-tabs` attribute).

Auto-construction can be disabled for a specific element via another data attribute `data-o-tabs-autoconstruct="false"`.

Auto-construction can be invoked for a given page region, like so:

    var Tabs = require('o-tabs');
    var tabsObjects = Tabs.createAllIn(document.querySelector('.myPageRegion'));

An array of any constructed Tabs objects will be returned.

### Imperative

    var Tabs = require('o-tabs');
    var myTabs = new Tabs(document.querySelector('.myTabs'));

## Styles

__o-tabs__ can be used with or without its built-in tab styling, called __buttontabs__ (based on the buttons from [o-ft-buttons](https://github.com/Financial-Times/o-ft-buttons)).

To apply the __buttontabs__ styling, simply also add a `o-tabs--buttontabs` class to the root element, and `o-tabs__tab` to each `<li>`:

    <div data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs o-tabs--buttontabs">
        <ul>
            <li data-o-tabs-tab class="o-tabs__tab o-tabs__tab--selected"><a href="#tabContent1">Tab 1</a></li>
            <li data-o-tabs-tab class="o-tabs__tab"><a href="#tabContent2">Tab 2</a></li>
            <li data-o-tabs-tab class="o-tabs__tab"><a href="#tabContent3">Tab 3</a></li>
        </ul>
        ...

The __buttontabs__ style comes in two sizes:

#### Default

![tab buttons](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons.png)

#### "Big"

![tab buttons big](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons-big.png)

These examples show "John" as the selected tab. The horizontal line extends to the full width of its container.

__Options__

* Align right: Add `o-tabs--alignright` to the root element.
* Big: Add `o-tabs--big` to the root element.

Additional CSS classes will be added to indicate interaction states:

* `o-tabs__tab--selected` applied to the tab element when it is selected
* `o-tabs__content--selected` applied to the tab contents element when it is selected
* `o-tabs__content--hidden` applied to the tab contents element when it is not selected

## Events

The following events will be dispatched on the Tabs' root DOM element:

* `oTabsReady`: The Tabs object has initialised and has made all required DOM changes
* `oTabsTabSelected`: A tab has been selected. Passes two arguments: the indexes of the selected tab and last selected tab.

## API

Tabs are indexed starting from 0.

The following API methods will be provided:

* `selectTab(idx)`: Select tab `idx`. Does nothing if tab `idx` does not exist or is already selected.
* `destroy()`: Unbind events, return DOM to previous state.