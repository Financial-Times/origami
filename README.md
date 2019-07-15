# o-comments [![Build Status](https://travis-ci.org/Financial-Times/o-comments.svg?branch=master)](https://travis-ci.org/Financial-Times/o-comments) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

📢 **The commenting platform for ft.com, the app, interactive graphics & alphaville is currently being replaced. Please speak to the [Comments team](https://github.com/orgs/Financial-Times/teams/comments) if you intend to start using this component or wish to make any changes to it.**

A fully featured commenting client integrated with FT's membership systems. If you simply wish to add comments or a comment count to some content this is the component to use.

## Contents

 * <a href="#prereq">Prerequisites</a>
 * <a href="#markup">Markup</a>
     * <a href="#comments">Comments</a>
     * <a href="#count">Comment Count</a>
 * <a href="#js">Javascript</a>
     * <a href="#comments-js">Comments</a>
     * <a href="#count-js">Comment Count</a>
 * <a href="#login">Login integration</a>
 * <a href="#events">Events</a>
 * <a href="#configuration">Global configuration</a>
     * <a href="#confdecl">Declaratively</a>
     * <a href="#confimper">Imperatively</a>
 * <a href="#jsapi">JavaScript API</a>
     * <a href="#logging">Logging</a>
     * <a href="#messages">UI Messages</a>
 * <a href="#sassapi">Sass API</a>
     * <a href="#fontfamily">Font family</a>
 * <a href="#browser">Browser support</a>

## <div id="prereq"></div> Prerequisites

* You must be on an FT.com domain or sub-domain for authentication to work

## <div id="markup"></div> Markup
### <div id="comment"></div> Comments
Use the following markup to enable comments:

```html
<div data-o-component="o-comments"
    id="{idOfTheElement}"
    data-o-comments-auto-init="true|false"
    data-o-comments-config-article-id="{article-id}"
    data-o-comments-config-title="{article-title}"
    data-o-comments-config-url="{page-url}">

    <div class="o--if-no-js">To participate in this chat, you need to upgrade to a newer web browser. <a href="http://help.ft.com/tools-services/browser-compatibility/">Learn more.</a></div>
</div>
```


 * `data-o-comments-config-title` the title of your article/post/thing
 * `data-o-comments-config-article-id` a unique id for your content, ideally a UUID for FT content
 * `data-o-comments-config-url` The canonical URL for your article/page/thing
 * `data-o-comments-config-livefyre--{key}` for Livefyre specific `Conv` configuration mentioned here: http://answers.livefyre.com/developers/app-integrations/comments/#convConfigObject.
 *Note that due to the fact that data attributes are case-insensitive, it would be impossible to set a property like 'disableAvatars'. There livefyre configuration objects with camelCase should be set in the following way: e.g. data-o-comments-config-livefyre--disable-avatars. This is automatically transformed to the right format.*
 * `data-o-comments-config-{key}` for any other configuration. `{key}` has the following rule: `--` means new object level, `-` means camel case. Example: `data-o-comments-config-livefyre--data-format--absolute="value"` is transformed to: ```{"livefyre": {"dataFormat": {"absolute": "value"}}}```
 * `data-o-comments-auto-init="false"` a module which has this attribute with a `false` value will not be initialized on the `o.DOMContentLoaded` event. This allows you to defer component initialisation.
 * `id` preferable to be set, but if missing it will be generated


Those elements which don't have the `data-o-comments-auto-init="false"` attribute will be automatically initialized on the `o.DOMContentReady` event.

If you defer initialising oComments by using `data-o-comments-auto-init="false"` then you can initialise the component whenever you want by calling

```javascript
oComments.init();
```

The init function may take an optional parameter: a context (this could be DOM element or a valid selector). The search would be performed only inside of this context element. If none is specified, it defaults to document.body.

### <div id="count"></div> Comment Count

Use the following markup to enable comments:

```diff
<div data-o-component="o-comments"
-   id="{idOfTheElement}"
+   data-o-comments-count
    data-o-comments-auto-init="true|false"
    data-o-comments-config-article-id="{article-id}"
-   data-o-comments-config-title="{article-title}"
-   data-o-comments-config-url="{page-url}"
+   data-o-comments-config-template="{count} Comment{plural}">

-   <div class="o--if-no-js">To participate in this chat, you need to upgrade to a newer web browser. <a href="http://help.ft.com/tools-services/browser-compatibility/">Learn more.</a></div>
+   <div class="o--if-no-js">0 Comments</div>
```

For the full list of configuration, see the <a href="#config">available configurations</a>.

## <div id="js"></div> JavaScript
### <div id="comments-js"></div> Comments
Create an instance of the comment component with the parameters that are available:

```javascript
var oComments = new oComments(document.querySelector('.comments'), {
    title: document.title,
    url: document.location.href,
    articleId: 'article-id',
    livefyre: {
        datetimeFormat: {
            minutesUntilAbsoluteTime: -1,
            absoluteFormat: 'MMM dd hh:mm a'
        }
    }
});
```

*The widget is automatically initialized, unless you specify in the configuration `autoInit: false`. In this case you can initialize this particular object at a later time by calling the following:*

```javascript
oComments.init();
```

#### More about the constructor config object
The configuration object which is passed to the contructor can/should have the following fields:

##### Mandatory fields:

 - articleId: ID of the article, any string
 - url: canonical URL of the page
 - title: Title of the page

##### Optional fields:

 - stream_type: livecomments, livechat, liveblog
 - livefyre: object which contains key-value pairs which will be added to the Livefyre init object. For more information visit http://docs.livefyre.com/developers/app-integrations/comments/#convConfigObject
 - stringOverrides: key-value pairs which override default LF strings. For more information visit http://docs.livefyre.com/developers/reference/customization/string-customizations/
 - authPageReload: if authentication needs a page reload. By default this is false.
 - tags: Tags which will be added to the collection (term used by Livefyre to articles) in Livefyre
 - autoInit: if this is set to false, the object will be created, but it will not be initialized automatically (the DOM will not be populated, call to backend services will not be made). In this case you should call the `init` method on the instance when you want to initialize it.

### <div id="count-js"></div> Comment Count
Create an instance of the comment count component with the parameters that are available:

```javascript
var oComments = new oComments(document.querySelector('.comments-count'), {
    articleId: 'article-id'
});
```

#### <div id="config"></div> More about the constructor config object
The configuration object which is passed to the contructor can/should have the following fields:

##### Mandatory fields:

 - articleId: ID of the article, any string

##### Optional fields:
 - template: can be used if you want to override the global template for this widget. `{count}` will be replaced with the count, and `{plural}` will be replaced with blank for a count of 0 or 1, and with 's' for a count > 1.
 - autoInit: can be used to avoid initializing the widget automatically by setting this to false
 - autoRefresh: it refreshes the widget with the latest count if set to true
 - hideIfZero: if true, hides the dom element of the widget (visibility: hidden)

## <div id="login"></div> Login integration
Users need to have a valid FT session in order to post comments. The default behavior for a user without a valid session is to redirect to the FT's login page (https://accounts.ft.com/login). However you may wish to integrate with your product's authentication process for a slicker UX in which case you can override the default behaviour.

 1. Override the `auth.loginRequiredDefaultBehavior` function

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

    evt.stopImmediatePropagation();
});
```

**Important: if the log in needs a page reload, don't call the failure function!**

## <div id="events"></div> Events
### Local events
These events are triggered on the instance's DOM element.
All events have a payload of data which helps getting the ID of the instance and the instance object itself:

```javascript
{
    detail: {
        id: "idOfTheComponent",
        instance: componentInstance,
        data: {...} //data specific to the event
    }
}
```

#### oComments.widget.timeout
Triggered when loading the widget exceeded a given time.

#### oComments.error.init
Error while loading the initialization data and the comments.
Event detail data: error object/message.

#### oComments.error.widget
Triggered when any error appear (triggered together with the above mentioned error events).
Event detail data: error object/message.

#### oComments.data.init
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

#### oComments.data.auth
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

#### oComments.widget.ready
The widget is ready to be rendered, the initialization process has finished.

#### oComments.widget.load
The Livefyre widget has loaded the necessary data and created a `Livefyre widget` instance, but not yet rendered it. The handler receives the Livefyre widget object as a parameter, access it using `detail.data.lfWidget`.

#### oComments.widget.renderComplete
The UI is fully rendered.

#### oComments.tracking.postComment
A comment is posted.
Event detail data: (evt.detail.data)

```javascript
{
    lfEventData: {
        authorId: "89488565@ft-1.fyre.co",
        bodyHtml: "<p>test123</p>",
        parent: "",
        sharedToFacebook: false,
        sharedToTwitter: false
    },
    siteId: 359898
}
```

#### oComments.tracking.likeComment
A comment is recommended.
Event detail data: (evt.detail.data)

```javascript
{
    lfEventData: {
        targetId: "245625" // The ID of the comment that was liked
        targetAuthorId: "i_am_author@livefyre.com" // The ID of the author of the comment that was liked
    },
    siteId: 359898
}
```

#### oComments.tracking.shareComment
A comment is shared.
Event detail data: (evt.detail.data)

```javascript
{
    lfEventData: {
        targetId: "256255" // The ID of the comment that was shared
        sharedToFacebook: false // Whether the comment was shared to Facebook
        sharedToTwitter: true // Whether the comment was shared to Twitter
    },
    siteId: 359898
}
```

#### oComments.tracking.socialMention
A user sent a social mention through a comment.
Event detail data: (evt.detail.data)

```javascript
{
    lfEventData: {
        id: '111111@fb.gw.livefyre.com' // ID of the mentioned user
        displayName: 'testUser' // Display name of mentioned user
        message: "@testUser Wow, I can't believe it either!" // Message that was sent to the particular user
        provider: 'twitter' // Provider to which the mention was shared
    },
    siteId: 359898
}
```


### Global events
These events are triggered on the `body` element and are relevant to all oComments components on a page. They have the same format as the component level events: `oComments.nameOfTheEvent`.

The payload data consists only of event specific data:

```javascript
{
    detail: {...} // event specific data
}
```

The events are the following:
#### oComments.auth.login
Triggered when a user is successfully logged in.
Payload is the jwt token with which the user is logged in.

#### oComments.auth.logout
Triggered when a user is logged out.

#### oComments.auth.loginRequired
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
});
```

#### oComments.error.livefyreJs
Triggered when the core Livefyre resource file (e.g. Livefyre's core JS library) couldn't be loaded.
Event detail data: error object/message.

## <div id="configuration"></div> Global configuration
This module uses global configuration. These are related configurations for Livefyre.

The default configuration is the production one:

```json
{
    "loginUrl": "https://accounts.ft.com/login",
    "livefyre": {
        "network": "ft.fyre.co",
        "domain": "ft.auth.fyre.co",
        "resourceDomainBase": "//cdn.livefyre.com/"
    },
    "resourceUrls": {
        "livefyreJs": "Livefyre.js"
    },
    "emailNotifications": true
}
```

In order to change to the settings of the TEST environment, then this configuration should be used:

```json
{
    "loginUrl": "https://accounts-test.ft.com/login",
    "livefyre": {
        "network": "ft-1.fyre.co",
        "domain": "ft-1.auth.fyre.co"
    }
}
```


There are two ways for changing the environment:

### <div id="confdecl"></div> Declaratively
In order to change the configuration, you can add a script tag in your page source with the format in the example below:

```javascript
<script data-o-comments-config type="application/json">
    {
        "loginUrl": "https://accounts-test.ft.com/login",
        "livefyre": {
            "network": "ft-1.fyre.co",
            "domain": "ft-1.auth.fyre.co"
        }
    }
</script>
```

This configuration will be loaded on the `o.DOMContentLoaded` event.

**Also, don't forget to also add the configuration for `o-comment-api` (http://registry.origami.ft.com/components/o-comment-api#configuration).**



### <div id="confimper"></div> Imperatively
#### oComments.setConfig(config)
The configuration can be changed be using the `setConfig` static method. Calling this method with an object will merge the current configuration with the object specified (deep merge, primitive type values of the same key will be overwritten).

Example:

```javascript
oComments.setConfig({
    "loginUrl": "https://accounts-test.ft.com/login",
    "livefyre": {
        "network": "ft-1.fyre.co",
        "domain": "ft-1.auth.fyre.co"
    }
});
```

*As on the event `o.DOMContentLoaded` the widgets declared in the DOM are automatically initialized, it is preferred to call this function **before** the `o.DOMContentLoaded` event is triggered.*


**Also, don't forget to also add the configuration for `o-comment-api` (http://registry.origami.ft.com/components/o-comment-api#configuration).**
The API of o-comment-api is available by using `oComments.dataService`.

### <div id="messages"></div> UI messages
You can override the messages shown to a user in various parts of the UI:
#### oComments.i18n.lfStringOverride
An object with the following messages:

    commentTombstone: "This comment has been removed"
    errorLikeOwnComment: "You cannot recommend your own comment"
    featuredCommentsTitlePlural: "Editor's picks"flagButton: "Report"
    flagCommentTooltip: "Report"
    flagConfirmationMessage: "Report %s's comment as %s?"
    flagSubtitle: "Report as"
    flagSuccessMsg: "Comment has been reported."
    flagTitle: "Report %s's comment"
    likeButton: "Recommend"
    moderator: "Moderator"
    postAsButton: "Submit Comment"
    postButton: "Submit Comment"
    postReplyAsButton: "Submit Comment"
    postReplyButton: "Submit Comment"
    shareDefaultText: "Read %s's comment on FT.com"
    showMore: "Show more comments"
    sortBackButton: "Back to active discussions"
    sortHotThreads: "Active discussions"
    sortTopComments: "Most recommended"
    topCommentsContentNotFoundMsg: "There aren't any recommendations yet."
    unlikeButton: "Unrecommend"

## <div id="jsapi"></div> JavaScript API
### <div id="logging"></div> Logging
Logging can be enabled for debugging purposes. It logs using the global 'console' if available (if not, nothing happens and it degrades gracefully).
By default logging is disabled.

#### oComments.enableLogging()
This method enables logging of the module.

#### oComments.disableLogging()
This method disables logging of the module.

#### oComments.setLoggingLevel(level)
This method sets the logging level. This could be a number from 0 to 4 (where 0 is debug, 4 is error), or a string from the available methods of 'console' (debug, log, info, warn, error).
Default is 3 (warn).

## <div id="sassapi"></div> Sass API
### <div id="fontfamily"></div> Font-family
There is a default font-family set for o-comments: `MetricWeb, sans-serif`
*Please note that the font itself is not loaded by this module, this should be done by the product.*

In order to override the default font, set a value for the following variable:

```scss
$o-comments-font-family: font1, font2;
```

In order to suppress downloading the web fonts set the following variable

```scss
$o-comments-include-fonts: false;
```

## <div id="browser"></div> Browser support
Works in accordance with our [support policy](https://docs.google.com/document/d/1mByh6sT8zI4XRyPKqWVsC2jUfXHZvhshS5SlHErWjXU).

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.2.0 | - |
╳ deprecated | 3 | 3.5.0 | - |
╳ deprecated | 2 | 2.5.0 | - |
╳ deprecated | 1 | 1.0.10 | - |
