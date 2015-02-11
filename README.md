# o-comments

Integration of the commenting widget provided by Livefyre.

---

## How to use it
There are two ways of using this module:

### Build tool
Include the script provided by the build tool and the CSS file.
The script exposes a global variable named `oComments`.

### Bower
As a bower dependency:

**Javascript:**

```javascript
var oComments = require('o-comments');
```

**SCSS:**

```ccs
@import 'o-comments/main';
```

The module should be built using `browserify` (with `debowerify` and `textrequireify` transform).

---

## Configuration
**The methods which are meant to configure the module are the following:**

### init
This method is responsible for changing the default configuration used by this module. Calling this method with an object will merge the default configuration with the object specified (deep merge, primitive type values of the same key will be overwritten).

Call this function before loading the widgets, preferably right after the loading script (How to use it section).

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
oComments.init({
    "livefyre": {
        "network": "ft-1.fyre.co",
        "domain": "ft-1.auth.fyre.co",
        "resourceDomainBase": "http://zor.livefyre.com"
    },
    dependencies: {
        "o-comment-api": {
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
This integration considers that you have included the script using one of the methods mentioned in the `How to use it` section.


**Common steps:**
First the module needs to be integrated with the page's authentication process. The default behavior when the user is not logged in, but the action the user does requires to be logged in (e.g. posting a comment), is to redirect to the FT's login page (https://registration.ft.com).

If the page has a better login process (e.g. show an overlay) instead of redirecting the page, the default behavior can be overridden. There are 2 ways to do this:

1. Override the auth.loginRequiredDefaultBehavior function

Example:

```javascript
oComments.auth.loginRequiredDefaultBehavior = function (callback) {
    // do login in a nicer way

    if (success) {
        callback();
    } else {
        callback(new Error("Failed")); // provide an error as parameter
    }
}
```

**Important: if the log in needs a page reload, don't call the callback at all (there's no success/failure, it's still pending)!**

2. Add an event handler and stop executing other handlers

Example:

```javascript
oComments.on('auth.loginRequired', function (evt) {
    // the user is not logged in, but an action was performed within the comment widget that requires the user to be logged in

    login();
    if (loggedIn) {
        evt.detail.callback();
    } else if (loginRefused) {
        evt.detail.callback(new Error("Refused")); // provide an error as parameter
    } else if (loginFailure) {
        evt.detail.callback(new Error("Failed")); // provide an error as parameter
    }

    // stop the fallback behavior which redirects the page
    evt.stopImmediatePropagation();
});
```

**Important: if the log in needs a page reload, don't call the callback at all (there's no success/failure, it's still pending)!**




### Integration - programatically
Create an instance of the Widget with the parameters that are available:

```javascript
var widgetInstance = new oComments.Widget({
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

Instead of elId (ID of a DOM element), you can specify a selector or a DOM element:

```javascript
{
    container: '.selector' || domElement
}
```

If the element doesn't have an ID, a random ID will be generated.

<br/>

Listen the events the widget triggers (optional):

```javascript
widgetInstance.on('tracking.postComment', function (evt) {
    // a comment is posted, do something, track it
});
```

Load the widget:

```javascript
widgetInstance.load();
```


### Integration - using DOM element
The Widget will be created using data from a DOM element.

Include this where you want the widget to load:

```html
<div class="o-comments" id="commentWidget" data-o-comments-autoconstruct="true" data-o-comments-config-title="title-of-the-article" data-o-comments-config-url="page-url" data-o-comments-config-articleId="ID-of-the-article"></div>
```

In order to build the DOM element, follow the steps:

1. Add class `o-comments` to the container element
2. Add attribute `data-o-chat-autoconstruct="true"` if you want the widget to be automatically instantiated on document ready, otherwise don't add it.
3. The ID is optional, if not specified, it will be generated.
4. Add configuration options that you want to pass to the widget in the following form: data-o-comments-{configName}="{configValue}". Replace `{configName}` and `{configValue}` with the name of the configuration and value you want to pass.

If you need a reference of the JavaScript object created, you can listen the event on the body element the following way:

```javascript
var widgetInstance;
document.body.addEventListener('oComments.domConstruct', function (evt) {
    if (evt.detail.id === 'commentWidget') {
        widgetInstance = evt.detail.instance;
    }
});
```

where evt.detail.id is the ID of the DOM element (in this example `commentWidget`).

In order to instantiate widgets that weren't picked up on document ready (without autoconstruct attribute), call the following function:

```javascript
oChat.initDomConstruct();
```

---

## Events

### Widget level events
Widget level events are triggered on the container of the widget. They have the following format:
`oComments.nameOfTheEvent`, where 'nameOfTheEvent' is one of the following mentioned below.

All events has also a payload data to identify the widget from which the event is coming from, and also specific event data if there's some, which has the following format:

```javascript
{
    detail: {
        id: "idOfTheWidget",
        widget: widgetInstance,
        data: {...} //data specific to the event
    }
}
```


There's also an easier way to listen to widget level events, with the following function:

```javascript
widgetInstance.on('nameOfTheEvent', function (evt) {
    // event handler
});
```

*Please note that you should omit the namespace (oComments.) before the event name.*

Using the `off` method event handlers can be removed.

The list of events are:
##### widget.timeout
Triggered when loading the widget exceeded a given time.

##### error.resources
Triggered when the necessary resource files (e.g. Livefyre's core JS library) couldn't be loaded.
Event detail data: error object/message.

##### error.init
Error while loading the initialization data and the comments.
Event detail data: error object/message.

##### error.widget
Triggered when any error appear (triggered together with the above mentioned error events).
Event detail data: error object/message.

##### data.init
Loaded when the initialization is finished and the necessary data is obtained.
Event detail data: initialization data in the following form:

```javascript
{
    "articleId": "e8cc08c6-cf4f-11e2-be7b-00144feab7de",
    "el": "commentWidget",
    "siteId": "359898",
    "collectionMeta": "eyJhbGciOiJIUzI1NiJ9.eyJjaGVja3N1bSI6ImUwZDA4MTFmNTM0ODY2NWYwODlkZjI2ZGM0MGZkZTFiIiwiYXJ0aWNsZUlkIjoiZThjYzA4YzYtY2Y0Zi0xMWUyLWJlN2ItMDAxNDRmZWFiN2RlIiwidGl0bGUiOiJMaXZlZnlyZSB0ZXN0IHBhZ2UgLSBGVC5jb20iLCJ1cmwiOiJodHRwOi8vd3d3LmZ0LmNvbS9jbXMvcy8wL2U4Y2MwOGM2LWNmNGYtMTFlMi1iZTdiLTAwMTQ0ZmVhYjdkZS5odG1sIiwidHlwZSI6ImxpdmVjb21tZW50cyIsInN0cmVhbV90eXBlIjoibGl2ZWNvbW1lbnRzIiwidGFncyI6WyJzZWN0aW9ucy5HcmVhdCBKb3VybmV5cyIsInNlY3Rpb25zLkxpZmUgXHUwMDI2IEFydHMiLCJzZWN0aW9ucy5UcmF2ZWwiLCJzZWN0aW9ucy5FdXJvcGVhbiBkZXN0aW5hdGlvbnMiXX0.dvYd1K0FJAL6wmmTAlQ8peTyFP9M2GORoN7ZO9PvEYE",
    "checksum": "e0d0811f5348665f089df26dc40fde1b"
}
```

##### data.auth
The first time the auth object is loaded, it is broadcasted using this event. Event detail data: authentication and user detail data in the following form:

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJkb21haW4iOiJmdC0xLmZ5cmUuY28iLCJleHBpcmVzIjoxNDE3MTE2Nzk5LCJ1c2VyX2lkIjoiODk0ODc0MzkiLCJkaXNwbGF5X25hbWUiOiJyb2xpIG1haW4ifQ.maN1bKWvDQLA-mvgNp9lSKdI9Izj9rmX3XrEaVwUTNY",
    "expires": 1417116799,
    "displayName": "user pseudonym",
    "settings": {
        "emailcomments": "never",
        "emailreplies": "never",
        "emaillikes": "never",
        "emailautofollow": "off"
    }
}
```

##### widget.ready
The widget is ready to be rendered, the initialization process has finished.

##### widget.load
The Livefyre widget has loaded the necessary data and created a `Livefyre widget` instance, but not yet rendered it. The handler receives the Livefyre widget object as a parameter, access it using `detail.data.lfWidget`.

##### widget.renderComplete
The UI is fully rendered.

##### tracking.postComment
A comment is posted.
Event detail data: siteId, eventData, where eventData has the following structure:

```javascript
{
  authorId: "_u2012@livefyre.com" // The ID of the Author of the comment 
  parent: "893549" // The ID of the comment that this new comment is in reply to, else null
  bodyHtml: "<p>42</p>" // The HTML of the submitted Content
  sharedToFacebook: true // Whether the comment was also posted to Facebook
  sharedToTwitter: false // Whether the comment was also posted to Twitter
}
```

##### tracking.likeComment
A comment is recommended.
Event detail data: siteId, lfEventData, where lfEventData has the following structure:

```javascript
{
  targetId: "245625" // The ID of the comment that was liked
  targetAuthorId: "i_am_author@livefyre.com" // The ID of the author of the comment that was liked
}
```

##### tracking.shareComment
A comment is shared.
Event detail data: siteId, eventData, where eventData has the following structure:

```javascript
{
  targetId: "256255" // The ID of the comment that was shared
  sharedToFacebook: false // Whether the comment was shared to Facebook
  sharedToTwitter: true // Whether the comment was shared to Twitter
}
```

##### tracking.socialMention
A user sent a social mention through a comment.
Event detail data: siteId, eventData, where eventData has the following structure:

```javascript
{
  id: '111111@fb.gw.livefyre.com' // ID of the mentioned user
  displayName: 'testUser' // Display name of mentioned user
  message: "@testUser Wow, I can't believe it either!" // Message that was sent to the particular user
  provider: 'twitter' // Provider to which the mention was shared
}
```


### Module level events
These events are triggered on the `body` element. They have the same format as the widget level events: `oComments.nameOfTheEvent`, where nameOfTheEvent is one of the following below.

The payload data consists only of event specific data:

```javascript
{
    detail: {...} // event specific data
}
```

The events are the following:
##### auth.login
Triggered when a user is successfully logged in.
Payload is the jwt token with which the user is logged in.

##### auth.logout
Triggered when a user is logged out.

##### auth.loginRequired
Triggered on any activity which explicitly requires a logged in status. This could mean from the product perspective that the user is not logged in, or his/her login status expired (e.g. session expire).

The payload data contains an object with a callback function. Based on the outcome of the login process, one of these should be called by the handler.
**Important: if the log in needs a page reload, don't call the callback at all (there's no success/failure, it's still pending)!**

```javascript
oComments.on('auth.loginRequired', function (evt) {
    if (logInSuccess) {
        evt.detail.callback();
    }

    if (logInFails || logInRefused) {
        evt.detail.callback(new Error("Failed or cancelled."));
    }

    // stop the fallback behavior which redirects the page
    evt.stopImmediatePropagation();
});
```

---

## More about the submodules

### Widget
Widget incorporates all aspects of a commenting Widget: handling data and creating the UI.

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

###### on
With this method you can listen to events generated by the widget instance.

###### off
With this method event handlers attached with `on` can be deleted.



### auth
This module is handling the authentication into the Livefyre system.

##### Methods
###### getAuthDelegate
Creates an object based on the model that Livefyre requires.
See See http://docs.livefyre.com/developers/identity-integration/#AuthDelegateObject

###### login
This method tries to obtain authentication data about the user, and decides if the user is logged in or not.

Example:

```javascript
auth.login(function (loginStatus, authData) {
    if (loginStatus) {
        // make it visible in the UI
        ui.login(authData.token, authData.displayName, authData.moderator);
    } else {
        if (authData.pseudonym === false) {
            // the user doesn't have a pseudonym, but basically the user could be logged in.
            ui.hideSignInLink();
        }
    }
});
```

The login method should be provided with a callback parameter, which will get two paramters:
 - loginStatus: true if the user is logged in, false if isn't.
 - authData: authData 

###### logout
This method broadcasts a logout event to every module that are listening to it.

###### loginRequired
Using this method you can explicitly request an authenticated status. It handles different scenarios:

 - user already has authentication data, so it can be logged in
 - user has no pseudonym, ask for pseudonym
 - user has session expired, ask to log in again
 - user is not authenticated, ask to log in

Parameters:
 - callback: Optional. A function which will be called if the login succeded or failed. The parameters that it will get: err, authData. If the login process fails or it is refused by the user, the function is called with an error. If the login process ends successfully, callback is called with the authentication data: callback(null, {...}).
 - force: Optional. If true, the local cache is ignored and the web service is directly asked for the login status.

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
