# Auto initalise Origami components

This module comprises a standard way of firing the `o.DOMContentLoaded` and `o.load` events when their equivalent browser-native events fire, and will fire the Origami events even if the native ones have already been and gone, making this suitable for bundling with modules that are loaded asyncronously.

Usage is trivial:

```javascript
require('o-autoinit');
```

The `autoinit` module must be imported after all modules that bind to the initialisation events.  If it is required more than once, subsequent requires will not have any effect, and the initialisation events may be emitted as early as the first require point.
