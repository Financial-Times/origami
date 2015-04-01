# o-errors

[![Build Status](https://travis-ci.org/Financial-Times/o-errors.svg?branch=master)](https://travis-ci.org/Financial-Times/o-errors)

This module provides a decoupled events-based mechanism for modules to report errors and an API for products to report client-side errors.

## Requirements

Error tracking in a product requires a project to be configured with
[Sentry](//getsentry.com) as `o-errors` uses the service to report errors.

See the [Sentry documentation](https://app.getsentry.com/docs/platforms/) for
setup specifics.

----

## Quick Start

Include `o-errors` in your build and include a `<link>` tag configured
to point towards the [DSN specific to your application](https://app.getsentry.com/docs/platforms/)
provided by Sentry (see [Requirements](#Requirements)).

```HTML
<link rel="oErrors:sentryEndpoint" href="https://dsn@app.getsentry.com/appid" />
```

This will automatically configure `o-errors` and any
uncaught errors will be reported by setting the `window.onerror` event handler.

## Usage

`o-errors` can be used and configured in a declarative style, using `<meta>`
and `<link>` tags, or it can be initialised as a library to
better integrate error tracking into a product.

Components that are included on the page might throw uncaught exceptions or
emit an `oErrors.log` `CustomEvent`.  `o-errors` listens on the `document`
root for this event and logs errors appropriately.

Component developers should ensure that `{ bubbles: true }` is used when
constructing the `CustomEvent`.

Any uncaught errors are handled by a `window.onerror` function that `o-errors`
installs when it is initialised. *Note* uncaught errors will not be reported
if they occur _before_ initialisation.

### Configuration

Configure `o-errors` using the `oErrors.init` method, or using `<meta>` and
`<link>` tags.

#### Available options

##### sentryEndpoint - required

The [DSN specific to your application](https://app.getsentry.com/docs/platforms/).

```JS
{
	sentryEndpoint: "https:/dsn@app.getsentry.com/appid"
}
```

##### siteVersion   - optional

The version of the product or site on which `o-errors` is configured.  This
is useful for associating errors with releases in the Sentry interface.

```JS
{
	siteVersion: "v1.0.0"
}
```

##### logLevel     - optional

Control the operation of the `oErrors.log`, `oErrors.warn` and `oErrors.error` API.

Could be one of the following options:

`off` - Turns off all logging by turning the logging API into
a no-operation. This is the default and is reccommended for most production
scenarios as most environments will optimise the no-operation away.

`contextonly` - Turns on log context tracking, `oErrors.log`, `oErrors.warn`, and `oErrors.error`
will store the last 10 log messages in a fast circular buffer, when an error
is reported, these log lines are attached to the error as additional context
in the `context:log` field.  This can be particularly useful when
understanding what the state of the application was before an error occurs.
While this has a very low overhead it can increase the size of the error
payload so is not the default.

`debug` - Turns on context tracking and outputs the messages through
`console.warn`, `console.log`, and `console.error` for `oErrors.warn`,
`oErrors.log`, and `oErrors.error`
respectively.  This should not be used in production.

```JS
{
	logLevel: "off"
}
```


#### Using markup to configure oErrors

Include `<meta>` or `<link>` tags to define the additional configuration options.  The
meta tag names follow a standard convention where the name is
`oErrors:configVarName`, where `configVarName` is as defined in the
[configuration options](#available-options) section.

The `sentryEndpoint` is an example of a `<link>` configuration.  Because the
value should be an http endpoint, it is configured using a `<link>` tag where
the `rel` attribute is `oErrors:sentryEndpoint`, following the same convention
as the `name` attribute for the `<meta>` tags.

For example, to tag each error with the current version of your application
using the `siteVersion` configuration option include:

```HTML
<meta name="oErrors:siteVersion" content="v1.0.0">
```

#### Using `oErrors.init`

Pass an object literal to `oErrors.init` with the appropriate configuration.
If a configuration option is missing, `o-errors` will fall back to the markup
before giving up.  If `sentryEndpoint` is not configured in the DOM or
through the `init` method, an `Error` is thrown.

```JS
var oErrors = require('o-errors');
oErrors.init({
	sentryEndpoint: "https://dsn@app.getsentry.com/appid",
	siteVersion:    "v1.0.0",                              // Optional
	logLevel:       "off"                                  // Optional
});
```

### Product usage


This section outlines some typical use cases when integrating `oErrors` into a
product.

Due to the nature of the `Raven` Sentry client, `o-errors` is a singleton.
This means when you `require` it using browserify you'll get the same instance.

#### Wrapping functions in an error handler

`o-errors` allows you to add context to errors to help the debug process.
This is difficult to do when only using the global `window.onerror` method of
catching uncaught errors.

Instead you can wrap blocks of code in an error handler and assign additional
context to it:

`oErrors.wrapWithContext(context, fn)` - Wrap a function so that any uncaught
errors thrown while executing the function are caught and reported to the
error aggregator, along with the additional context data.

```JS
function renderAll(components) {
  components.forEach(render);
}

var components = [ componentA, componentB ];

var wrappedFunction = oErrors.wrapWithContext({ componentsToRender: components }, renderAll);

wrappedFunction(components);
```

Similar to `wrapWithContext` is `wrap` which does not accept a context
argument.


`wrapWithContext` and `wrap` do no execute the given function, instead they
return a wrapped version of the function.

`oErrors.wrap(fn)` - Wrap a function so that any uncaught errors thrown while
executing the function are caught and reported.

#### Log data and associating logs with errors

`o-errors` allows you to log arbitrary strings using a `console.log`,
`console.warn`, and `console.error` like API.

Instead of logging to the console however, if the `logLevel` configuration
option is set to `contextonly`, the last few log lines are kept in
memory.  Then, when an uncaught error is logged to the error aggregator, the
log lines are included as additional context.

In this example, a message is logged before calling `exampleSyncData`.  If
`exampleSyncData` errors, then `"Syncing data to APIs"` would be attached to
the error context and sent to the error aggregator.

```JS
oErrors.log("Syncing data to APIs")'
exampleSyncData();
```

This is not always desirable and extensive logging could affect performance.
It can be turned on and off using the `logLevel` configuration variable
when initialising the module.  When `logLevel` is `"off"` the operations
become 'noops' which are compiled out of your code by modern javascript
engines.

`oErrors.log(message)`   - Creates a 'log' level message, semantically equivalent to `console.log`
`oErrors.warn(message)`  - Creates a 'warn' level message, semantically equivalent to `console.warn`
`oErrors.error(message)` - Creates a 'error' level message, semantically equivalent to `console.error`

## Events

Events are primarily useful for reporting errors from components.  If a
component fires an `oErrors.log` event, if `o-errors` is configured the error
can be reported.

### `oErrors.log`

A component can fire an `oErrors.log` event on its owned DOM to send an error report if
`oErrors` has been configured on the page.

`details`:

```JS
{
   error: e,  // the Error object that's been caught
   info:  i   // an object with further useful debug info
}
```

Because `o-errors` listens on `document`, the event must bubble.

Example:

`o-mycomponent` uses Promises to handle async events, it lives inside the DOM
element, `myComponentElement`:

```JS
doThis().then(that).catch(function(e) {
	// Send error to oErrors
	var event = new CustomEvent('oErrors.log', {
		bubbles: true,
		details: {
			error: e,
			info: { additional: "context" }
		}
	});

	// Dispatch on owned DOM
	myComponentElement.dispatchEvent(event);

	// re-throw event
	throw e;
});

```
# License

Copyright (c) 2015 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
