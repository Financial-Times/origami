# o-utils [![Build Status](https://circleci.com/gh/Financial-Times/o-utils.png?style=shield&circle-token=6ec89d992032f3ccbe4a85e6e5359857bf732502)](https://circleci.com/gh/Financial-Times/o-utils)

Origami JS helpers.

## Getting started

### JavaScript

```JS
    import * as Utils from 'o-utils';
    const myFunction = () => {};
    Utils.throttle(myFunction, 100);
    Utils.debounce(myFunction, 100)
```

For more detailed explanation, refer to our [JSDoc](http://codedocs.webservices.ft.com/v1/jsdoc/o-utils@^1.0.0)

## Development

This module is suitable for helper functions that need to be used commonly in other modules like throttle and debounce. These **must** be kept to a minimum.

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
