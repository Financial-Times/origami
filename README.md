# o-errors

This module provides a decoupled events-based mechanism for modules and an API
for products to report client-side errors.

## Usage

### Declarative Instantiation

Include `o-errors` via the [build service](https://registry.origami.ft.com/components/o-errors#section-usage) and include a `<link>` tag configured
to point towards the [DSN specific to your application](https://app.getsentry.com/docs/platforms/) provided by the error aggregator, Sentry.

```HTML
<link rel="oErrors:sentryEndpoint" href="https://dsn@app.getsentry.com/appid" />
```

This will automatically configure `o-errors` and will begin reporting any
uncaught errors using `window.onerror`.

#### Additional configuration options

Include a `<meta>` tag to define the additional configuration options.  The
meta tag names follow a standard convention where the name is
`oErrors:configVarName`, where `configVarName` is as defined in the [configuration options](#configuration) section.

For example, to tag each error with the current version of your application
include:

```HTML
<meta name="oErrors:siteVersion" content="v1.0.0">
```

### Imperative usage

Due to the nature of the `Raven` Sentry client, `o-errors` is a singleton.
This means when you `require` it using browserify you'll get the same instance.

#### Initialisation

`oErrors.init` must be called before using the library.  It can be called
without arguments, in which case it is configured using the declarative
`<link>` and `<meta>` tags, or you can pass a config object.

Example:

```JS
var oErrors = require('o-errors');
oErrors.init({
	sentryEndpoint: "https://dsn@app.getsentry.com/appid",
	siteVersion:    "v1.0.0",                              // Optional
	logLevel:       "off"                                  // Optional
});
```

If a config option is missing, `o-errors` will look for the configuration in
the DOM, config options passed to the `init` method take precedence.

#### Configuration

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

Control the operation of the `oErrors.log` and `oErrors.warn` API.

Could be one of the following options:

`off` - Turns off all logging by turning `oErrors.log` and `oErrors.warn` into
a no-operation. This is the default and is reccommended for most production
scenarios.

`contextonly` - Turns on log context tracking, `oErrors.log` and `oErrors.warn`
will store the last 10 log messages in a fast circular buffer, when an error
is reported, these log lines are attached to the error as additional context
in the `context:log` field.  This can be particularly useful when
understanding what the state of the application was before an error occurs.
While this has a very low overhead it can increase the size of the error
payload so is not the default.

`debug` - Turns on context tracking and outputs the messages through
`console.warn` and `console.log` for `oErrors.warn` and `oErrors.log`
respectively.  This should definitely not be used in production.

```JS
{
	logLevel: "off"
}
```

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

`oErrors.wrap(fn)` - Wrap a function so that any uncaught errors thrown while
executing the function are caught and reported.

#### Log data and associating logs with errors

`o-errors` allows you to log arbitrary strings using a `console.log`, and
`console.warn` like API.

Instead of logging to the console however, the last few log lines are kept in
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

`oErrors.log(message)`  - Creates a 'log' level message, semantically equivalent to `console.log`
`oErrors.warn(message)` - Creates a 'warn' level message, semantically equivalent to `console.warn`

## Events

Events are primarily useful for components.

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
