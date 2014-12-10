# o-viewport [![Build Status](https://travis-ci.org/Financial-Times/o-dom.svg?branch=master)](https://travis-ci.org/Financial-Times/o-viewport)

Utility for attaching debounced listeners to resize, scroll and orientation events on `window`.

*Note: within the module's API and in the documentation below `orientation` is used instead of `orientationchange`, but the actual browser event listened to is `orientationchange`*

## Methods

### `o-viewport#listenTo(eventType)`
Attaches a debounced/throttled (as appropriate) listener to events on window [`resize`, `scroll` or `orientation`] which in turn fires events within the `oViewport` namespace (see **Events** below). This musn't be called before the `body` has been initialised, as the events are dispatched from `document.body`.

### `o-viewport#getOrientation()`
Provides a reasonably reliable way (more so than `window.orientation`) of obtaining the current orientation of the viewport.

### `o-viewport#getSize()`
Provides a reliable way of obtaining the current dimensions of the viewport. returns and object with the properties `width` and `height`

### `o-viewport#setThrottleInterval(eventType, interval)` *Product use only*
Sets the debounce/throttle interval for a given event [`scroll`, `resize` or `orientation`]. 
As a shorthand, calling `setThrottleInterval` with 1 - 3 numbers will set the intervals for `scroll`, `resize` and `orientation` in that order e.g. `setThrottleInterval(100, undefined, 300)` is equivalent to:

```js
setThrottleInterval('scroll', 100)
setThrottleInterval('resize') // which does nothing
setThrottleInterval('orientation', 300)
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

### `oViewport.scroll`

```js
scrollLeft: body.scrollLeft // or documentElement.scrollLeft in < ie10 
scrollTop: body.scrollTop //  or documentElement.scrollTop in < ie10 
scrollHeight: body.scrollHeight
scrollWidth: body.scrollWidth
```

## Throttling

* `oViewport.resize` and `oViewport.orientation` are debounced i.e. if the native event fires several times in quick succession the custom event will fire only once `n` milliseconds after the last event, where `n` is the throttle interval
* `oViewport.scroll` is throttled i.e. if the native `scroll` event fires several times in quick succession the custom event will fire at most once every `n` milliseconds, where `n` is the throttle interval
