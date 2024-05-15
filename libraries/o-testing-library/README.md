# o-testing-library [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Origami testing helper.

- [o-testing-library ](#o-testing-library-)
	- [Usage](#usage)
	- [Migration Guide](#migration-guide)
	- [Contact](#contact)
	- [Licence](#licence)

## Usage

We are using [web-test-runner](https://modern-web.dev/docs/test-runner/overview/) to run our component tests. `web-test-runner` does not like NPM packages published as commonjs modules and we started getting errors that `require is not defined`. Investigating issue it seemed that error originated from two packages `@testing-library/dom` and `@testing-library/user-event`.

This module is bundling the [DOM testing library](https://testing-library.com/docs/dom-testing-library) and [user-event](https://testing-library.com/docs/ecosystem-user-event/) modules to `ESM` modules. It is intended to be used in Origami components and applications to provide a consistent way of testing. Now you can import both modules from the same place with the following import:

```JS
import userEvent, {dom} from '@financial-times/o-testing-library';

```

## Migration Guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 1 | N/A |  --- |

***

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-utils/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

***

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
