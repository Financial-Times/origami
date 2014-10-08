# o-livefyre-comment-client

Integration of the commenting widget provided by Livefyre.

---

## How to use it
There are two ways of using this module:

### Build tool
Include the script provided by the build tool.
The script exposes a global variable named `oLivefyreCommentClient`.

### Bower
As a bower dependency:

```javascript
var oLivefyreCommentClient = require('o-comment-client');
```

The module should be built using `browserify` (with `debowerify` transform).

---

## Configuration
**The methods which are meant to configure the module are the following:**

### init
This method is responsible for changing the default configuration used by this module. Calling this method with an object will merge the default configuration with the object specified (deep merge, primitive type values of the same key will be overwritten).

In order to use this module with authentication enabled, you should specify the user's session ID:

```javascript
oLivefyreCommentClient.init({
    sessionId: 'sessID'
});
```

##### Default configuration

```javascript
{
    "livefyre": {
        "network": "ft.fyre.co",
        "domain": "ft.auth.fyre.co",
        "resourceDomainBase": "http://zor.livefyre.com"
    },
    "resourceUrls": {
        "livefyreJs": "/wjs/v3.0/javascripts/livefyre.js"
    }
}
```


##### Change the environment
In order to change to the TEST environment, use the following code:

```javascript
oLivefyreCommentClient.init({
    "livefyre": {
        "network": "ft-1.fyre.co",
        "domain": "ft-1.auth.fyre.co",
        "resourceDomainBase": "http://zor.livefyre.com"
    },
    dependencies: {
        "o-comment-data": {
            "suds": {
                "baseUrl": "http://test.session-user-data.webservices.ft.com"
            },
            "ccs": {
                "baseUrl": "http://test.comment-creation-service.webservices.ft.com"
            },
            "cacheConfig": {
                "authBaseName": "comments-test-auth-",
                "initBaseName": "comments-test-init-"
            }
        }
    }
});
```

---

## Integration
### Programatically
This integration considers that you have included the script using one of the methods mentioned in the `How to use it` section.

The following functions are used only for purpose of illustration, but they are not available as part of this module:
 - readCookie
 - login


Read the user's session:

```javascript
var userSession = readCookie('FTSession');
```


Set the user's session if one is available:

```javascript
oLivefyreCommentClient.init({
    sessionId: userSession
});
```


Listen on the 'login required' event, and try to log in the user within the page:

```javascript
oLivefyreCommentClient.auth.on('loginRequired.authAction', function (delegate) {
    // the user is not logged in, but an action was performed within the comment widget that requires the user to be logged in

    login();
    if (loggedIn) {
        delegate.success();
    } else if (loginRefused) {
        delegate.failure();
    } else if (loginFailure) {
        delegate.failure();
    }
});
```

**Important: if the log in needs a page reload, don't call the failure function!**



Listen the events the widget triggers (optional):

```javascript
widgetInstance.on(commentPosted.tracking, function (siteId, eventData) {
    // a comment is posted, do something, track it
});
```


Create an instance of the Widget with the parameters that are available:

```javascript
var widgetInstance = new oLivefyreCommentClient.Widget({
    elId: 'container-id',
    title: document.title,
    url: document.location.href,
    articleId: 'ID-of-the-article',
    initExtension: {
        datetimeFormat: {
            minutesUntilAbsoluteTime: -1,
            absoluteFormat: 'MMM dd hh:mm a'
        }
    }
});
```



Load the widget:

```javascript
widgetInstance.load();
```


### Using DOM element
The Widget will be created using data from a DOM element.

Example:

```html
<div class="o-livefyre-comment-client" id="comments-livefyre" data-o-livefyre-comment-client-autoconstruct="true" data-o-livefyre-comment-client-config-title="Banks rewrite derivatives rules to cope with future crisis - FT.com" data-o-livefyre-comment-client-config-url="http://www.ft.com/intl/cms/s/0/aeb57e26-4e6d-11e4-bfda-00144feab7de.html" data-o-livefyre-comment-client-config-articleId="aeb57e26-4e6d-11e4-bfda-00144feab7de"></div>
```

In order a Widget to be created, do the following steps:
1. Follow the steps from the `How to use it` section
2. Add class o-livefyre-comment-client to the container element
3. Add attribute `data-o-livefyre-comment-client-autoconstruct="true"`
4. Specify a unique ID
5. Add configuration options that you want to pass to the widget in the following form: data-o-livefyre-comment-client-{configName}="{configValue}". Replace `{configName}` and `{configValue}` with the name of the configuration and value you want to pass.
6. When you are done (e.g. sessionId is set with the init function, default configuration is changed if desired), call the following function:

```javascript
oLivefyreCommentClient.initDomConstruct();
```

**You don't have to wait until the document is fully loaded, call it whenever you are done with the configurations.**

---

## More about the submodules

### Widget

In order to load comments on a page, you should create an instance of `Widget`.

```javascript
var widgetInstance = new oLivefyreCommentClient.Widget({
    elId: 'commentWrapper',
    articleId: 'post12315',
    url: 'http://www.example.com/post12315',
    title: 'Test comments'
});

widgetInstance.on('loginRequired.authAction', function (delegate) {
    // Login is required, handle the login process.
    if (delegate) {
        if (loginSuccessful) {
            delegate.success();
        } else {
            delegate.failure();
        }
    }
}
});

widgetInstance.load();
```

##### Configuration
To create an instance, you will need to provide a configuration object. This should have the following structure:

###### Mandatory fields:
 - elId: ID of the HTML element in which the widget should be loaded
 - articleId: ID of the article, any string
 - url: canonical URL of the page
 - title: Title of the page
    
###### Optional fields:
 - authPageReload: true or false. True if the login process reloads the page. Default value is false.
 - emailAlert: if a user has not yet saved the email preferences, an alert is shown after each post. This flag can have true/false values meaning if the email alert should be shown or not. The default value is true.
 - stream_type: livecomments, livechat, liveblog
 - initExtension: object which contains key-value pairs which should be added to the init object
 - stringOverrides: key-value pairs which override default Livefyre strings
 - timeout: time in seconds which when exceeded an "unable to load" message is displayed. Default value is 15.

##### Methods
###### load
This method loads the Widget on the page.

##### Events
You can listen to the events using the `on` method, which works similar to the one in jQuery.

```javascript
widgetInstance.on('nameOfTheEvent', function () {
    // event handler
});
```

Using the `off` method event handlers can be removed.

The list of events are:

###### timeout.widget
Triggered when loading the widget exceeded a given time.

###### error.resources
Triggered when the necessary resource files (e.g. Livefyre's core JS library) couldn't be loaded.

###### error.init
Triggered when the initialization process ended up with errors.

###### error.widget
Triggered when any error appear (triggered together with the above mentioned error events).

###### loaded.init
Init object is loaded. The handler receives as a parameter the object.

###### loaded.auth
The first time the auth object is loaded, it is broadcasted using this event. The handler receives as a parameter the object.

###### ready.widget
The widget is ready to be loaded, the initialization process has finished.

###### loaded.widget
The Livefyre widget has loaded the necessary data and created a `Livefyre widget` instance, but not yet rendered it. The handler receives the Livefyre widget object as a parameter.

###### initialRenderComplete.widget
The widget is rendered, the DOM is populated with the elements of the widget.

###### commentPosted.tracking
A comment is posted.
Arguments of the handler: siteId, eventData, where eventData has the following structure:

```javascript
{
  authorId: "_u2012@livefyre.com" // The ID of the Author of the comment 
  parent: "893549" // The ID of the comment that this new comment is in reply to, else null
  bodyHtml: "<p>42</p>" // The HTML of the submitted Content
  sharedToFacebook: true // Whether the comment was also posted to Facebook
  sharedToTwitter: false // Whether the comment was also posted to Twitter
}
```

###### commentLiked.tracking
A comment is recommended.
Arguments of the handler: siteId, eventData, where eventData has the following structure:

```javascript
{
  targetId: "245625" // The ID of the comment that was liked
  targetAuthorId: "i_am_author@livefyre.com" // The ID of the author of the comment that was liked
}
```

###### commentShared.tracking
A comment is shared.
Arguments of the handler: siteId, eventData, where eventData has the following structure:

```javascript
{
  targetId: "256255" // The ID of the comment that was shared
  sharedToFacebook: false // Whether the comment was shared to Facebook
  sharedToTwitter: true // Whether the comment was shared to Twitter
}
```

###### socialMention.tracking
A user sent a social mention through a comment.
Arguments of the handler: siteId, eventData, where eventData has the following structure:

```javascript
{
  id: '111111@fb.gw.livefyre.com' // ID of the mentioned user
  displayName: 'testUser' // Display name of mentioned user
  message: "@testUser Wow, I can't believe it either!" // Message that was sent to the particular user
  provider: 'twitter' // Provider to which the mention was shared
}
```

###### loginRequired.authAction
Triggered when the user tries to post a comment without being logged in, or simply the user clicks the sign in link without being logged in (or with session expired, but it's up to the product to handle this case).

The cases when the user is logged in but doesn't have a pseudonym is automatically covered.

###### logout.authAction
Triggered when the user logs out.


### auth
This module is handling the authentication into the Livefyre system.

##### Methods
###### getAuthDelegate
Creates Livefyre RemoteAuthDelegate, also provides login and logout into Livefyre.
See http://docs.livefyre.com/developers/user-auth/remote-profiles/#BuildingAuthDelegate

###### login
Logs in a livefyre user.

###### logout
###### on
###### off

### userDialogs

### resourceLoader
This is responsible for loading Livefyre's core JS libraries, and it also provides a helper to load CSS override.

##### Methods:
###### loadLivefyreCore
###### loadCssOverrides



### i18n
It exposes the following objects:
##### lfStringOverride
Contains FT preferred string overrides for the default Livefyre Comments widget.
##### messages
Contains several custom messages, e.g. error messages


### utils
Contains helper functions.

Methods that are available:
##### emptyLivefyreActionQueue
Livefyre creates a queue in localStorage when a user posts a comment without being logged in. This method clears the queue.
##### isPermalinkPresent
Detects if the URL is a Livefyre permalink.
##### cloneObject
Deferences a plain Object and returns a deep copy (same content with different references).

---

## Logging
Logging can be enabled for debugging purposes. It logs using the global 'console' if available (if not, nothing happens and it degrades gracefully).
By default logging is disabled.

### enableLogging
This method enables logging of the module.

### disableLogging
This method disables logging of the module.

### setLoggingLevel
This method sets the logging level. This could be a number from 0 to 4 (where 0 is debug, 4 is error), or a string from the available methods of 'console' (debug, log, info, warn, error).
Default is 3 (warn).