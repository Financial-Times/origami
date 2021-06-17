# o-autoinit [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)


Auto initalise Origami components

- [Usage](#usage)
- [JavaScript](#javascript)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

This component comprises a standard way of firing the `o.DOMContentLoaded` event when the equivalent browser-native event fire, and will fire the Origami events even if the native ones have already been and gone, making this suitable for bundling with components that are loaded asyncronously.

## Usage

`o-autoinit` is included automatically by the [Origami Build Service](https://www.ft.com/__origami/service/build/v2/). Manual build users may include `o-autoinit` to initialise Origami components but it is not the only option. See the component [initialisation documentation](https://origami.ft.com/docs/components/initialising/) for more information.

## JavaScript

```javascript
import 'o-autoinit';
```

The `autoinit` component must be imported after all components that bind to the initialisation events. If it is required more than once, subsequent requires will not have any effect, and the initialisation events may be emitted as early as the first require point.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A  | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.0.7  | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.5 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autoinit/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
