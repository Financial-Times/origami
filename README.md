# o-errors

This module provides a decoupled events-based mechanism for modules and products to report client-side errors.

## Events

### `oErrors.log`

To be fired on a module's owned DOM or `document.body`

`details`: 

```
{
   error: // the error that's been caught
   stack: // [] array of modules through which the error has passed. e.g. the module catching the error will 
            set this to [o-modulename#method]. Parent modules *may* listen for `oErrors.log` within their 
            owned DOM and use array.shift() to add their module name to this stack
   info: // an object or string with further useful debug info e.g. params originally passed in to the method
            that caught the error
}
```

## API (product use only)

### `oErrors#report(appName, url, filter)`

Each error will be reported with name `appName + ': ' + detail.stack.join(': ') or similar

If url is set will post each error back to the given url. If not set will log to a default service e.g. one that jsut forwards everything to splunk. If set to 'console' will simply log to console

Filter is a function that gets passed the detail object from the custom event to determine whether the error should be reported



