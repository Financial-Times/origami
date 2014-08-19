# o-livefyre-comment-client

Integration of the widget provided by Livefyre. The integration means 

---

## How to use it
### Standalone
Using the build tool, the script exposes a global variable named `oLivefyreCommentClient`.

### Bower
As a bower dependency:

```javascript
var oLivefyreCommentClient = require('o-livefyre-comment-client');
```

## Configuration
<strong>The methods which are meant to configure the module are the following:</strong>

### init
This method is responsible for changing the default configuration used by this module. Calling this method with an object will merge the default configuration with the object specified (deep merge, only primitive type values of the same key will be overwritten).
Adding a `dependencies` field will set the configuration of dependency modules.

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

## Logging
Logging can be enabled for debugging purposes. It logs using the global 'console' if available (if not, nothing happens and it degrades gracefully).
By default logging is disabled.

###### enableLogging
This method enables logging of the module.

###### disableLogging
This method disables logging of the module.

###### setLoggingLevel
This method sets the logging level. This could be a number from 0 to 4 (where 0 is debug, 4 is error), or a string from the available methods of 'console' (debug, log, info, warn, error).
Default is 3 (warn).

---

## How to include comments on the page

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

List of events:
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

###### login.authAction
Triggered when the user tries to post a comment without being logged in, or simply the user clicks the sign in link without being logged in (or with session expired, but it's up to the product to handle this case).

The cases when the user is logged in but doesn't have a pseudonym is automatically covered.

###### logout.authAction
Triggered when the user logs out.


### auth
This module is handling the authentication into the Livefyre system.

##### Methods of auth
###### getInstance
As auth is a singleton module, it has just one instance. This method should be called only when the Livefyre resources are loaded and the `fyre` object is available.

##### Methods of the single instance
###### getAuthDelegate
Creates Livefyre RemoteAuthDelegate, also provides login and logout into Livefyre.
See http://docs.livefyre.com/developers/user-auth/remote-profiles/#BuildingAuthDelegate

###### login
###### logout

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