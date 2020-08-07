# o-viewport [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Utility for attaching debounced listeners to resize, scroll, orientation and visibility events on `window`.

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-viewport`.

*Note: within the component's API and in the documentation below `orientation` and `visibility` are used instead of `orientationchange` or `visibilitychange`, but the actual browser event listened to is `orientationchange` or `visibilitychange`*

## Methods

### `o-viewport#listenTo(eventType)`
Attaches a debounced/throttled (as appropriate) listener to events on window [`resize`, `scroll`, `orientation`, `visibility` or `all`] which in turn fires events within the `oViewport` namespace (see **Events** below).

*Note: all will enable all o-viewport events.*

```js
import oViewport from './../main.js';

// Fire for orientation events.
oViewport.listenTo('orientation');

// Listener for debounced orientation events via o-viewport.
document.body.addEventListener('oViewport.orientation', function(event) {
	console.log(event.type); // oViewport.orientation
	console.log(event.viewport); // { height, width }
	console.log(event.orientation); // 'portrait' or 'landscape'
	console.log(event.originalEvent); // the original browser event
});
```

See [events](#events) for more examples.

### `o-viewport#stopListeningTo(eventType)`
Remove the attached listener from the window for the named event [`resize`, `scroll`, `orientation`, `visibility` or `all`].

*Note: all will disable all o-viewport events.*

```js
// Stop listening to the orientation event.
oViewport.stopListeningTo('orientation');
```

### `o-viewport#getOrientation()`
Provides a reasonably reliable way (more so than `window.orientation`) of obtaining the current orientation of the viewport.

```js
oViewport.getOrientation(); // 'portrait' or 'landscape'
```

### `o-viewport#getVisibility()`
Provides a reasonably reliable way of obtaining the current visibility of the viewport.

```js
oViewport.getVisibility(); // boolean, true if visible
```

### `o-viewport#getSize(ignoreScrollbars)`
Provides a reliable way of obtaining the current dimensions of the browser window. Returns an object with the properties `width` and `height`.

By default or if no parameters are passed the method will return the size of the viewport inclusive of the scrollbars. However in certain cases (e.g. adverts) you may want to get the size of the viewport without the scroll bars. In such case pass `true` to the method in order to ignore the scrollbars.

```js
oViewport.getSize(); // {width: 100, height: 100} without scrollbars
oViewport.getSize(true); // {width: 108, height: 100} including scrollbar width
```

### `o-viewport#getScrollPosition()`
Provides a reliable way of obtaining the current scroll position of the viewport. returns an object with the properties `width`, `height`, `left` and `top`

```js
oViewport.getScrollPosition(); // {width: 100, height: 100, left: 0, top: 10}
```

### `o-viewport#setThrottleInterval(eventType, interval)` *Product use only*
Sets the debounce/throttle interval for a given event [`scroll`, `resize` or `orientation`].
As a shorthand, calling `setThrottleInterval` with 1 - 3 numbers will set the intervals for `scroll`, `resize` and `orientation` in that order e.g. `setThrottleInterval(100, undefined, 300)` is equivalent to:

```js
setThrottleInterval('scroll', 100)
setThrottleInterval('resize') // which does nothing
setThrottleInterval('orientation', 300)
setThrottleInterval('visibility', 30)
```

The default value for each of these is 100ms

### `o-viewport#debug()`
Turns on debug mode (logging event details to the console).

## Events
Each of these custom events are fired on `document.body`. For each custom event `event.detail.originalEvent` contains a reference to the original browser event and `event.detail.viewport` the result of `o-viewport#getSize()`. For example:

```js
import oViewport from './../main.js';

// Fire for all viewport events.
oViewport.listenTo('all');

// Listener for debounced visibility events via o-viewport.
document.body.addEventListener('oViewport.visibility', function(event) {
	console.log(event.type); // oViewport.resize
	console.log(event.detail.viewport); // { height, width }
	console.log(event.detail.hidden); // boolean
});
```

Note `event.detail.hidden` is unique to the `oViewport.visibility` event. Additional unique properties for `o-viewport` events are detailed below.

### `oViewport.resize`

- No additional properties.

### `oViewport.orientation`

- data.orientation: 'portrait' or 'landscape'

### `oViewport.visibility`

- data.hidden: true or false

### `oViewport.scroll`

- data.scrollLeft: unitless px value of scroll position
- data.scrollTop: unitless px value of scroll position
- data.scrollHeight: unitless px value of scroll height
- data.scrollWidth: unitless px value of scroll width

## Throttling

* `oViewport.resize`, `oViewport.orientation` and  `oViewport.visibility` are debounced i.e. if the native event fires several times in quick succession the custom event will fire only once `n` milliseconds after the last event, where `n` is the throttle interval
* `oViewport.scroll` is throttled i.e. if the native `scroll` event fires several times in quick succession the custom event will fire at most once every `n` milliseconds, where `n` is the throttle interval

Use the [setThrottleInterval](#o-viewportsetthrottleintervaleventtype-interval-product-use-only) method to customise throttling.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
⚠ maintained | 3 | 3.3 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.5 | N/A |

----

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
