# n-header-footer [![Circle CI](https://circleci.com/gh/Financial-Times/n-header-footer/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-header-footer/tree/master)

Header and footer for next.ft.com sites

## Installation

```
bower install --S Financial-Times/n-header-footer
```

```js
var headerFooter = require('n-header-footer');

headerFooter.init();
```

```scss
@import 'n-header-footer/main';
```

## Build

To build the n-header-footer run

```
make build
```

This will also rebuild the navigation templates using data from `next-navigation`.

## Feature flags

To use feature flags pass in an instance of the next-feature-flags-client (which should already have been initialised) like so:

```js
headerFooter.init(flags)`;
```

## Custom data

When rendering templates the following can optionally be defined on the viewData

```javascript
headerData: {
	isStream: Boolean,
	section: {
		url: '/blah/blah',
		title: 'Blah Blah',
		conceptId: 'taxonomy:&quot;name&quot;'
	}
}
```
