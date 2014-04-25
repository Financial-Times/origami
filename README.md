o-viewport
==========

Utility for moderating listeners for browser events on window

## Methods

### `o-viewport#debug()` *Product use only*
Tuns on debug mode (logging event details to the console). 

### `o-viewport#resize()`
Attaches a debounced listener to the window resize event, which broadcasts a namespaced custom event.

### `o-viewport#orientation()`
Attaches a debounced listener to the window orientationchange event, which broadcasts a namespaced custom event.

### `o-viewport#scroll()`
Attaches a throttled listener to the window scroll event, which broadcasts a namespaced custom event.

### `o-viewport#setInterval(event, interval)` *Product use only*
Sets the debounce/throttle interval for a given event [`scroll`, `resize` or `orientation`]. 
As a shorthand, calling `setInterval` with 1 - 3 numbers will set the intervals for `scroll`, `resize` nad `orientation` in that order e.g. `setInterval(100, 200, 300)`is equivalent to

    setInterval('scroll', 100)
    setInterval('resize', 200)
    setInterval('orientation', 300)

## Events
Each of these custom events are fired on `document.body` and `event.detail.originalEvent` contains a reference to the original browser event. Additiional properties in `event.detail` are detailed below:

### `oViewport.resize`
    clientHeight: body.clientHeight
    clientWidth: body.clientWidth

### `oViewport.orientation`

    clientHeight: body.clientHeight
    clientWidth: body.clientWidth
    orientation: 'portrait' or 'landscape'

### `oViewport.scroll`

    clientHeight: body.clientHeight
    clientWidth: body.clientWidth
    scrollHeight: body.scrollHeight
    scrollLeft: body.scrollLeft
    scrollTop: body.scrollTop
    scrollWidth: body.scrollWidth