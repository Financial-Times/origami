# o-errors

This module provides a decoupled events-based mechanism for modules and products to report client-side errors.

## Usage

### Declarative Instantiation

Include `o-errors` via the build service and include a `<link>` tag configured
to point towards the [DSN specific to your application](https://app.getsentry.com/docs/platforms/)
provided by the error aggregator, Sentry.

This will automatically configure `o-errors` and will begin reporting any
uncaught errors using `window.onerror`.

```
<link rel="oErrors:sentryEndpoint" href="https://dsn@app.getsentry.com/appid" />
```

#### Additional configuration options

Include a `<meta>` tag to define the additional configuration options.  The
meta tag names follow a standard convention where the name is
`oErrors:configVarName`, where `configVarName` is as defined in the (TODO)
configuration options section.

For example, to tag each error with the current version of your application
include:

```
<meta name="oErrors:siteVersion" content="v1.0.0">
```

### Imperative usage

Due to the nature of the `Raven` Sentry client, `o-errors` is a singleton.
This means when you `require` it you'll get the same instance.

#### Initialisation

```
var oErrors = require('o-errors');
oErrors.init({
	sentryEndpoint: "https://dsn@app.getsentry.com/appid",
	siteVersion:    "v1.0.0",                              // Optional
	enableLogging:  true                                   // Optional
});
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

```
function renderAll(components) {
  components.forEach(render);
}

var components = [ componentA, componentB ];

var wrappedFunction = oErrors.wrapWithContext({ componentsToRender: components }, renderAll);

wrappedFunction(components);
```



## Events

### `oErrors.log`

To be fired on a module's owned DOM or `document.body`

`details`:

```
{
   error: // the error that's been caught
   stack: // [] array of modules through which the error has passed. e.g. the module catching the error will
            set this to [o-modulename#method]. Parent modules *may* listen for `oErrors.log` within their
            owned DOM and use array.shift() to add their module name to this stack... or come to think of it,
            o-errors could construct this stack by traversing the DOM upwards from the el the event was fired on
   info: // an object or string with further useful debug info e.g. params originally passed in to the method
            that caught the error
}
```

## API (product use only)

### `oErrors#report(appName, url, filter)`

Each error will be reported with name `appName + ': ' + detail.stack.join(': ') or similar

If url is set will post each error back to the given url. If not set will log to a default service e.g. one that jsut forwards everything to splunk. If set to 'console' will simply log to console

Filter is a function that gets passed the detail object from the custom event to determine whether the error should be reported



