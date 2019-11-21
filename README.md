# o-autoinit [![Circle CI](https://circleci.com/gh/Financial-Times/o-autoinit/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-autoinit/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)


Auto initalise Origami components

- [JavaScript](#javascript)
- [Contact](#contact)
- [Licence](#licence)

This component comprises a standard way of firing the `o.DOMContentLoaded` event when the equivalent browser-native event fire, and will fire the Origami events even if the native ones have already been and gone, making this suitable for bundling with components that are loaded asyncronously.

## JavaScript

```javascript
import 'o-autoinit';
```

The `autoinit` component must be imported after all components that bind to the initialisation events. If it is required more than once, subsequent requires will not have any effect, and the initialisation events may be emitted as early as the first require point.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A  | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
⚠ maintained | 1 | 1.5 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autoinit/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
