# o-autoinit [![Circle CI](https://circleci.com/gh/Financial-Times/o-autoinit/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-autoinit/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)


Auto initalise Origami components

- [Usage](#usage)
	- [JavaScript](#javascript)
- [Contact](#contact)
- [Licence](#licence)

## Usage

This module comprises a standard way of firing the `o.DOMContentLoaded` and `o.load` events when their equivalent browser-native events fire, and will fire the Origami events even if the native ones have already been and gone, making this suitable for bundling with modules that are loaded asyncronously.

### JavaScript

```javascript
import 'o-autoinit';
```

The `autoinit` module must be imported after all modules that bind to the initialisation events.  If it is imported more than once, subsequent imports will not have any effect, and the initialisation events may be emitted as early as the first import point.


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autoinit/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
