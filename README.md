# o-tabs [![Build Status](https://travis-ci.org/Financial-Times/o-tabs.png?branch=master)](https://travis-ci.org/Financial-Times/o-tabs)

> A single content area with multiple panels, each associated with a header in a list.

---

__Status__: Gathering requirements. Not yet implemented.

---

## Styles

Tabs should be available in two main themes, each with two variants, giving a total of four possible styles:

### Style 1: Tab buttons

This uses buttons from [o-ft-buttons](https://github.com/Financial-Times/o-ft-buttons).

#### Style 1, variant 1: Default

![tab buttons](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons.png)

#### Style 1, variant 2: "Big"

![tab buttons big](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-buttons-big.png)

These examples show "John" as the selected tab.

The horizontal line extends to the full width of its container.

__Options__

* Align right
* Titling (designs required)

### Style 2: Header tabs

Based on Velcro's [Header Medium with Small Tabs](http://financial-times.github.io/ft-velcro/#headersMedium).

#### Style 2, variant 1: Default

![tab header](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-header.png)

#### Style 2, variant 2: Tint

![tab header](https://raw.githubusercontent.com/Financial-Times/o-tabs/master/files/tab-header-tint.png)

These examples show "Second tab title" as the selected tab.

It will expand to the full width of its container.

__Options__

* Tint (or transparent)

__Issues__

The selected tab arrow colour is based on an assumption about the background colour of the content below.

## Markup

The following HTML structure is expected:

    <div data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs">
        <h3>Optional title</h3>
        <ul>
            <li><a href="#tabContent1">Tab 1</a></li>
            <li><a href="#tabContent2">Tab 1</a></li>
            <li><a href="#tabContent3">Tab 1</a></li>
        </ul>
    </div>
    <div id="tabContent1" class="o-tabs_content"></div>
    <div id="tabContent2" class="o-tabs_content"></div>
    <div id="tabContent3" class="o-tabs_content"></div>

The _core experience_ (no-JS or 'cuts-the-mustard' fail) will show the tabs as a basic list of links, with each tab content element displayed one below the other.

The _full experience_ will show styled tabs and only the tab content for the selected tab.

If the heights of the content elements vary, then any content below will move up and down as the user switches between tabs. If this is not desired, it is the responsibility of the product to address this.

## Events

The following events will be dispatched on the Tabs' root DOM element:

* `oTabsReady`: The Tabs object has initialised and has made all required DOM changes
* `oTabsTabSelected`: A tab has been selected. Passes two arguments: the indexes of the selected tab and last selected tab.

## API

Tabs are indexed starting from 0.

The following API methods will be provided:

* `selectTab(idx)`: Select tab `idx`. Does nothing if tab `idx` does not exist or is already selected.
* `destroy()`: Unbind events, return DOM to previous state.