# o-utils [![Build Status](https://circleci.com/gh/Financial-Times/o-utils.png?style=shield)](https://circleci.com/gh/Financial-Times/o-utils)

Origami JS helpers.

- [Usage](#usage)
	- [JavaScript](#javascript)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### JavaScript

```JS
    import * as Utils from 'o-utils';
    const myFunction = () => {};
    Utils.throttle(myFunction, 100);
    Utils.debounce(myFunction, 100)
```

For more detailed explanation, refer to our [JSDoc](http://codedocs.webservices.ft.com/v1/jsdoc/o-utils)


## Contributing

This module is suitable for helper functions that need to be used commonly in other modules like throttle and debounce. These **must** be kept to a minimum.


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-utils/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
