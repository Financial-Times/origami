# o-header [![Circle CI](https://circleci.com/gh/Financial-Times/o-header/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-header/tree/master)

Header for FT branded sites

## Installation

```
bower install --S o-header
```

```js
var oHeader = require('o-header');

oHeader.init();
```

```scss
$o-header-is-silent: false;
@import 'o-header/main';
```

## API

config:

* editionswitchClassName:
* headerClassName:
* dataSrc

## Data attributes

* data-o-header-search
* data-o-header--js
* data-o-header-form-search
    - input
    - label
* data-o-header-togglable-search
* data-o-header-edition-switch-button
* data-o-header-selectable
* data-o-header-togglable
* data-o-header-togglable-nav

There is intentionally no class to switch between logged in and out as we don't want to do that in the client side
search and menu point outside of header in core