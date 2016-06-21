# o-toggle [![CircleCI](https://circleci.com/gh/Financial-Times/o-toggle.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-toggle)

Module to add toggle behaviour to a `<button>` or `<a>` tag. It supports multiple toggles for one target element. A click event listener is added to the toggles with the `#toggle` function as the handler.

## Getting started guide

Install the module:

```
bower install --S o-toggle
```

Load the JS:

```js
const oToggle = require('o-toggle');

oToggle.init();
```

Add some markup:

```html
<button data-o-component="o-toggle" data-o-toggle-target=".my-toggle-target">My button</button>
```

## API

### JavaScript

An o-toggle object must be constructed for every element you have on your page that uses this module.

```js
const OToggle = require('o-toggle');
const toggleEl = document.querySelector('.o-toggle');
const toggle = new OToggle(toggleEl, {
        target: '.my-target',
        callback: function(state, event) {
            if (state === 'open') {
                console.log('Target opened');
            } else if (state === 'close') {
                console.log('Target closed');
            }
        }
    });
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the document to auto-construct an o-toggle object for each element with a `data-o-component="o-toggle"` attribute:

```js
require('o-toggle');
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Additionally, a second paramater can be passed to the toggle constructor or to the `.init()` function with a config object that has the following options:

* *target*: HTMLElement or selector of the element that will be toggled
* *callback*: Function or content of a function as _string_ that will be executed every time a toggle happens. It has the following parameters:
    - State. 'open' or 'close'
    - Click event object if it comes from the event handler on the toggle


### Markup

All config options can also be passed as data attributes. These are:

* data-o-toggle-target: Selector of the element that will be toggled
* data-o-toggle-callback: Content of a function as _string_ that will be executed every time a toggle happens

Copyright (c) 2016 Financial Times Ltd. All rights reserved.
