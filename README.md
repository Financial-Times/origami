# o-errors [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This module provides a decoupled events-based mechanism for modules to report errors and an API for products to report client-side errors.

## Important note
o-errors has an event driven API so it can be used without tightly coupling any application to using sentry & raven (which is a fairly large js library). When using o-errors within a component, prefer to use the event driven API over its methods. This leaves the decision about whether to include the library up to the application that consumes your component.

## Requirements

Error tracking requires a project to be configured with
[Sentry](//getsentry.com) as `o-errors` reports errors to this service.

See the [Sentry documentation](https://app.getsentry.com/docs/platforms/) for
setup specifics.

----

## Quick Start

Include `o-errors` in the build and include a configuration `<script>` tag on your page
configuring the Sentry [DSN specific to your application](https://app.getsentry.com/docs/platforms/)
(see [Requirements](#requirements)).

```HTML
<script type="application/json" data-o-errors-config>
{
	"sentryEndpoint": "https://dsn@app.getsentry.com/appid"
}
</script>
```

This will automatically configure `o-errors` on the `o.DOMContentLoaded` event and
any uncaught errors will be reported.

## Usage

Components that are included on the page might throw uncaught exceptions or
emit an `oErrors.log` `CustomEvent`.  `o-errors` listens on the `document`
root for this event and aggregates errors to the configured Sentry endpoint.

Component developers should ensure that `{ bubbles: true }` is set when
constructing the `CustomEvent` and should dispatch it on the component's owned DOM.

Uncaught errors are handled by a `window.onerror` function
installed on initialisation. *Note* uncaught errors will not be reported
automatically if they occur *before* initialisation, although any errors reported using the
`o-errors` API *will* be buffered and reported once initialised.

### Reporting errors

Report errors using the [`oErrors.report`](http://codedocs.webservices.ft.com/v1/jsdoc/o-errors/Errors.html#report) method.

```JS
import oErrors from 'o-errors';

oErrors.report(new Error("My error"));
```

If the module has not been initialised, these errors are buffered and sent
once initialised.  Following initialisation uncaught errors are automatically recorded.

### Configuration

Configure `o-errors` using the `oErrors.init` method, or using a `<script>`
tag (see [Using markup to configure `o-errors`](#using-markup-to-configure-oerrors)).

Some options are only configurable when using the `init` method as they must accept a function.

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

##### environment   - optional

Track the environment name inside Sentry for the product or site on which `o-errors`
is configured.  This is useful for highlighting new issues in lower environments in the
Sentry interface.

```JS
{
	environment: "production"
}
```

##### tags   - optional

A hash of tags to apply to each error event. This is useful for associating
errors to specfic parts of your application and the ability to filter within
the Sentry interface.

```JS
{
	tags: {
		appName: "o-errors"
	}
}
```

##### logLevel     - optional

`o-errors` provides a logging API specific to logging console messages.  These
messages are recorded so that additional contextual information can be added
to any reported errors.  Calling one of these functions does not report
anything.

The log level could be one of the following options:

`off` - Turns off all logging by turning the logging API into
a no-operation. This is the default and is reccommended for most production
scenarios as most javascript environments will optimise the no-operation away.

`contextonly` - Turns on log context tracking, `oErrors.log`, `oErrors.warn`, and `oErrors.error`
will store the last 10 log messages in a fast circular buffer. When an error
is reported, these log lines are attached to the error as additional context
in the `context:log` field and can be viewed in the Sentry interface.  This can be particularly useful when
understanding what the state of the application was before an error occurs.
While this has a very low overhead it can increase the size of the error
payload so is not the default.

`debug` - Turns on context tracking and outputs the messages through
`console.warn`, `console.log`, and `console.error` for `oErrors.warn`,
`oErrors.log`, and `oErrors.error`
respectively.  This should not be used in production as it will call the
native `console` APIs.

`consoleonly` - Turns on console only logging. This will stop the Raven client from
being initialised and reporting errors to sentry. Messages will be output through
`console.warn`, `console.log`, and `console.error` for `oErrors.warn`,
`oErrors.log`, and `oErrors.error`
respectively.  This should not be used in production.

```JS
{
	logLevel: "off"
}
```

##### enabled - optional

If `false` `oErrors` will be configured with no-operation methods, and errors
will not be reported. Defaults to `true`.

```JS
{
	enabled: false
}
```

##### filterError - optional

A `function` that can be used to filter errors before they are reported.  The function
should accept one argument, a complicated looking `object` that comes from the `n-raven` client, with a bunch of fields, of
which the most important is `exception`:

```
{
  ...
  "exception": {
    "values": [
      {
        "type": "TypeError",
        "value": "_nUi is undefined",
        "stacktrace": {
          "frames": [
            {
              "filename": "http://local.ft.com:5005/__dev/assets/public/main.js",
              "lineno": 1,
              "colno": 11,
              "function": "?",
              "in_app": true
            },
            ...
          ]
        }
      }
    ]
  },
  ...
}
```



The function should return a boolean inidicating whether the error should be
sent or not, if `true` or coerced to a truthy value, the error will be sent,
if `false` the error will be filtered.

This function should not mutate the data object or its fields. See
`transformError` if you wish to mutate the data.

`filterError` is run after `transformError`.

Note: this may only be configured through the `init` method, it will report an
`Error` and continue without filtering enabled if this is configured
declaratively.

```JS
{
	filterError: function(data) { return true; }
}
```

##### transformError - optional

A `function` that can be used to transform errors before they are reported -
this may be to add/remove data, or alter its format.  The function should
accept one argument, an `object` with two fields: an `error` field which
contains the reported `error`, and a `context` field, which contains any
additional reported context.

The function may return an object with at least an `error` field, if
`context` is missing it will be filled in with an empty object.  If no return
type is given, the input value is used.  Because the input value is an object,
any fields or references that are mutated in the transform function are
preserved.

This function may mutate the data object.

`transformError` is run before `filterError`.

Note: this may only be configured through the `init` method, it will report an
`Error` and continue without transforms enabled if this is configured
declaratively.

```JS
{
	transformError: function(data) { return data; }
}
```

##### errorBuffer - optional

An additional `array` of error objects which will be pushed into the internal
buffer queue to be sent on initialisation. This can be useful if you have
caught errors inline on your page before oErrors.init() has been ran.
Each error in the array should be an `object` with two fields: an `error` field
which contains the reported `Error`, and a `context` field, which contains any
additional reported context.

Note: this may only be configured through the `init` method.

```JS
{
	errorBuffer: [
		{
			error: new Error(),
			context: {
				additional: "info"
			}
		}
	]
}
```

##### transportFunction - optional

Function to override Sentry's HTTP transport handler. It accepts one `options` argument which is an `object`.

This function is passed on directly to Sentry to its `transport` configuration option and you can find the documentation for it [here](https://docs.getsentry.com/hosted/clients/javascript/config/).

#### Using markup to configure oErrors

Include a `<script>` tag containing 'JSON' describing the configuration
object.

```HTML
<script type="application/json" data-o-errors-config>
{
	sentryEndpoint: "https:/dsn@app.getsentry.com/appid"
}
</script>
```

#### Using `oErrors.init`

Pass an object to `oErrors.init` with the appropriate configuration.
If `sentryEndpoint` is not configured in the options,
an `Error` is thrown.

```JS
import oErrors from 'o-errors';
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
This means when you `require` it using browserify you'll always get the same instance.

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
log lines are included as additional context.  Calling these APIs does not
report anything to the aggregator by themselves.

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
component fires an `oErrors.log` event, if `o-errors` is configured, the error
can be reported.

### `oErrors.log`

A component can fire an `oErrors.log` event on its owned DOM to send an error report if
`oErrors` has been configured on the page.

`detail`:

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
		detail: {
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


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | N/A |
⚠ maintained | 3 | 3.8 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.0 | N/A |
╳ deprecated | 2 | 2.0 | N/A |
╳ deprecated | 1 | 1.7 | N/A |


# License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
