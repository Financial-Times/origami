# o-tabs [![Build Status](https://travis-ci.org/Financial-Times/o-tabs.png?branch=master)](https://travis-ci.org/Financial-Times/o-tabs)

> A single content area with multiple panels, each associated with a header in a list.

## Markup

This is an example of an HTML structure that __o-tabs__ expects:

    <div data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs">
        <ul data-o-tabs>
            <li data-o-tabs-tab><a href="#tabContent1">Tab 1</a></li>
            <li data-o-tabs-tab><a href="#tabContent2">Tab 2</a></li>
            <li data-o-tabs-tab><a href="#tabContent3">Tab 3</a></li>
        </ul>
        <div id="tabContent1">
            Tab content 1
        </div>
        <div id="tabContent2">
            Tab content 2
        </div>
        <div id="tabContent3">
            Tab content 3
        </div>
    </div>

The key things are:

* the `data-o-component="o-tabs"` attribute and `o-tabs` class on the root element.
* the `data-o-tabs` attribute on the container of the tabs
* the `data-o-tab` attribute on each of the tab elements
* the tab elements contain a link whose `href` attribute points to the ID of a content element.

To set the initially selected tab, add a `o-tabs__tab--selected` class to a tab element, otherwise the first tab will be selected.

### Core experience

When the browser has JavaScript disabled, or the 'cuts-the-mustard' fails, the tabs will be left as a basic list of links, and each tab content element will remain unstyled. It's recommended that the default styling is to have each of the content elements displayed one below the other.

A product may choose to hide the tabs by doing something like this:

    .o-tabs [data-o-tabs] { display: none; }
    .o-tabs--js [data-o-tabs] { display: block; }

### Full experience

The _full experience_ will show as functional tabs, and only the content element for the selected tab will be shown.

If the heights of the content elements vary, then any content below will move up and down as the user switches between tabs. If this is not desired, it is the responsibility of the consumer to address this.

## Construction

### Declarative

When the __o-tabs__ script loads, tabs instances are automatically constructed for each element in the `<body>` declaring itself to be an __o-tabs__ element (via the `data-o-component="o-tabs"` attribute).

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

To apply the __buttontabs__ styling, also add a `o-tabs--buttontabs` class to the root element, and `o-tabs__tab` to each `<li>`:

    <div data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs o-tabs--buttontabs">
        <ul data-o-tabs>
            <li data-o-tabs-tab class="o-tabs__tab"><a href="#tabContent1">Tab 1</a></li>
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

* __Align right__: Add `o-tabs--alignright` to the root element.
* __Big__: Add `o-tabs--big` to the root element.

Additional CSS classes will be added to indicate interaction states:

* `o-tabs__tab--selected` added to the tab element when it is selected
* `o-tabs--selected` added to the tab contents element when it is selected
* `o-tabs--hidden` added to the tab contents element when it is not selected

## Events

The following events will be dispatched on the Tabs' root DOM element:

* `oTabsReady`: The Tabs object has initialised. Event properties:
    * `detail.tabs`: The __o-tabs__ object.
* `oTabsTabSelected`: A tab has been selected. Event properties:
    * `detail.tabs`: The __o-tabs__ object.
    * `detail.selected`: The index of the selected tab.
    * `detail.lastSelected`: The index of the last selected tab.

## API

Tabs are indexed starting from 0.

The following API methods are provided:

* `selectTab(idx)`: Select tab `idx`. Does nothing if tab `idx` does not exist or is already selected.
* `destroy()`: Unbind events, remove `o-tabs--js` class.