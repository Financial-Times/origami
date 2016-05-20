# o-viewport [![Build Status][![Build Status](https://circleci.com/gh/Financial-Times/o-viewport.png?style=shield&circle-token=c8c2a8774bda9e188fe1dbc65dc39fa412e1c656)](https://circleci.com/gh/Financial-Times/o-viewport)

Utility for attaching debounced listeners to resize, scroll, orientation and visibility events on `window`.

*Note: within the module's API and in the documentation below `orientation` and `visibility` are used instead of `orientationchange` or `visibilitychange`, but the actual browser event listened to is `orientationchange` or `visibilitychange`*

## Methods

### `o-viewport#listenTo(eventType)`
Attaches a debounced/throttled (as appropriate) listener to events on window [`resize`, `scroll`, `orientation`, `visibility` or `all`] which in turn fires events within the `oViewport` namespace (see **Events** below).

*Note: all will enable all o-viewport events.*

### `o-viewport#stopListeningTo(eventType)`
Remove the attached listener from the window for the named event [`resize`, `scroll`, `orientation`, `visibility` or `all`].

*Note: all will disable all o-viewport events.*

### `o-viewport#getOrientation()`
Provides a reasonably reliable way (more so than `window.orientation`) of obtaining the current orientation of the viewport.

### `o-viewport#getVisibility()`
Provides a reasonably reliable way of obtaining the current visibility of the viewport.

### `o-viewport#getSize(ignoreScrollbars)`
Provides a reliable way of obtaining the current dimensions of the browser window. Returns an object with the properties `width` and `height`.

By default or if no parameters are passed the method will return the size of the viewport inclusive of the scrollbars. However in certain cases (e.g. adverts) you may want to get the size of the viewport without the scroll bars. In such case pass `true` to the method in order to ignore the scrollbars.


### `o-viewport#getScrollPosition()`
Provides a reliable way of obtaining the current scroll position of the viewport. returns an object with the properties `width`, `height`, `left` and `right`

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
Each of these custom events are fired on `document.body`. For each custom event `event.detail.originalEvent` contains a reference to the original browser event and `event.detail.viewport` the result of `o-viewport#getSize()`. Additional properties in `event.detail` are detailed below:

### `oViewport.resize`
No additional properties

### `oViewport.orientation`

	orientation: 'portrait' or 'landscape'

### `oViewport.visibility`

	hidden: true or false

### `oViewport.scroll`

```js
scrollLeft: body.scrollLeft // or documentElement.scrollLeft in < ie10
scrollTop: body.scrollTop //  or documentElement.scrollTop in < ie10
scrollHeight: body.scrollHeight
scrollWidth: body.scrollWidth
```

## Throttling

* `oViewport.resize`, `oViewport.orientation` and  `oViewport.visibility` are debounced i.e. if the native event fires several times in quick succession the custom event will fire only once `n` milliseconds after the last event, where `n` is the throttle interval
* `oViewport.scroll` is throttled i.e. if the native `scroll` event fires several times in quick succession the custom event will fire at most once every `n` milliseconds, where `n` is the throttle interval

----

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
