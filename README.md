# Introduction

A fully featured commenting client integrated with FT's membership systems. If you simply wish to add comments to some content this is the component to use.

## Contents

* <a href="#prereq">Prerequisites</a>
* <a href="#product">Adding comments to your product</a>
 * <a href="#decl">Declaratively</a>
 * <a href="#imper">Imperatvely</a>
* <a href="#login">Login integration</a>
* <a href="#events">Events</a>
* <a href="#api">API</a>
    * <a href="#logging">Logging</a>
    * <a href="#messages">UI Messages</a>
* <a href="#messages">Browser support</a>
* <a href="#core">Core/enhanced experience</a>
* <a href="#moderation">Moderation</a>

## <div id="prereq"></div> Prerequisites

* Your content must either be available in the Content API or available on a blogs URL in order for commenting to work. (See Moderation for why) 
* You must be on an FT.com domain or sub-domain for authentication to work

## <div id="product"></div> Adding comments to your product 

Javascript:

```javascript
var oComments = require('o-comments');
```

SCSS:

```css
@import 'o-comments/main';
```

### <div id="decl"></div> Declaratively 
Use the following markup to enable comments:

```html
<div class="o-comments" 
    id="{oCommentsInstance}" 
    data-o-comments-autoconstruct="true|false" 
    data-o-comments-config-title="{article-title}" 
    data-o-comments-config-url="{page-url}" 
    data-o-comments-config-articleId="{article-id}">
</div>
```

1. `{article-title}` the title of your article/post/thing
2. `data-o-comments-autoconstruct="true"` automatically construct the component when `o.DOMContentLoaded` fires. A `false` value (or omitting this attribute) allows you to defer component initialisation
3. `data-o-comments-config-articleId` a unique id for your content, ideally a UUID for FT content
4. `{page-url}` The canonical URL for your article/page/thing
5. `id` preferable to be set, but if missing it will be generated

If you defer initialising oComments by  using `data-o-comments-autoconstruct="false"` then you can initialise the component by calling

```javascript
oComments.initDomConstruct();
```

### <div id="imper"></div> Imperatively 
Create an instance of the component with the parameters that are available:

```javascript
var oCommentComponent = new oComments.Widget({
    elId: 'container-id',
    title: document.title,
    url: document.location.href,
    articleId: 'article-id',
    initExtension: {
        datetimeFormat: {
            minutesUntilAbsoluteTime: -1,
            absoluteFormat: 'MMM dd hh:mm a'
        }
    }
});
```

Load the component:

```javascript
oComments.load();
```

#### More about the constructor of Widget
The configuration object which is passed to the contructor can/should have the following fields:

###### Mandatory fields:
 - elId: ID of the HTML element in which the widget should be loaded
 - articleId: ID of the article, any string
 - url: canonical URL of the page
 - title: Title of the page
    
###### Optional fields:
 - stream_type: livecomments, livechat, liveblog
 - initExtension: object which contains key-value pairs which will be added to the Livefyre init object. For more information visit http://docs.livefyre.com/developers/app-integrations/comments/#convConfigObject
 - stringOverrides: key-value pairs which override default LF strings. For more information visit http://docs.livefyre.com/developers/reference/customization/string-customizations/
 - authPageReload: if authentication needs a page reload. By default it's false.
 - tags: Tags which will be added to the collection in Livefyre

## <div id="login"></div> Login integration 
Users need to have a valid FT session in order to post comments. The default behavior for a user without a valid session is to redirect to the FT's login page (https://registration.ft.com). However you may wish to integrate with your product's authentication process for a slicker UX in which case you can override the default behaviour.

1. Override the `auth.loginRequiredDefaultBehavior` function

```javascript
oComments.auth.loginRequiredDefaultBehavior = function (evt) {
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

All events have a payload of data to identify the originating component and any event specific data:

```javascript
{
    detail: {
        id: "idOfTheComponent",
        widget: componentInstance,
        data: {...} //data specific to the event
    }
}
```

##### oComments.widget.timeout
Triggered when loading the widget exceeded a given time.

##### oComments.error.resources
Triggered when the necessary resource files (e.g. Livefyre's core JS library) couldn't be loaded.
Event detail data: error object/message.

##### oComments.error.init
Error while loading the initialization data and the comments.
Event detail data: error object/message.

##### oComments.error.widget
Triggered when any error appear (triggered together with the above mentioned error events).
Event detail data: error object/message.

##### oComments.data.init
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

##### oComments.data.auth
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

##### oComments.widget.ready
The widget is ready to be rendered, the initialization process has finished.

##### oComments.widget.load
The Livefyre widget has loaded the necessary data and created a `Livefyre widget` instance, but not yet rendered it. The handler receives the Livefyre widget object as a parameter, access it using `detail.data.lfWidget`.

##### oComments.widget.renderComplete
The UI is fully rendered.

##### oComments.tracking.postComment
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

##### oComments.tracking.likeComment
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

##### oComments.tracking.shareComment
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

##### oComments.tracking.socialMention
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


#### Shared events
These events are triggered on the `body` element and are relevant to all oComments components on a page. They have the same format as the component level events: `oComments.nameOfTheEvent`, where `nameOfTheEvent` is one of the following below.

The payload data consists only of event specific data:

```javascript
{
    detail: {...} // event specific data
}
```

The events are the following:
##### oComments.auth.login
Triggered when a user is successfully logged in.
Payload is the jwt token with which the user is logged in.

##### oComments.auth.logout
Triggered when a user is logged out.

##### oComments.auth.loginRequired
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

## <div id="api"></div> API 

##### oComments.init(config)
This method is responsible for changing the default configuration used by oComments. Calling this method with an object will merge the default configuration with the object specified (deep merge, primitive type values of the same key will be overwritten).

##### Default configuration - PROD

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

##### Using the TEST environment
In order to change to the TEST environment, use the following code:

```javascript
oComments.init({
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

### <div id="messages"></div> UI messages
You can override the messages shown to a user in various parts of the UI:
##### oComments.i18n.lfStringOverride
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

### Logging
Logging can be enabled for debugging purposes. It logs using the global 'console' if available (if not, nothing happens and it degrades gracefully).
By default logging is disabled.

##### oComments.enableLogging()
This method enables logging of the module.

##### oComments.disableLogging()
This method disables logging of the module.

##### oComments.setLoggingLevel(level)
This method sets the logging level. This could be a number from 0 to 4 (where 0 is debug, 4 is error), or a string from the available methods of 'console' (debug, log, info, warn, error).
Default is 3 (warn).

## <div id="browser"></div> Browser support 
Works in accordance with our [support policy](https://docs.google.com/a/ft.com/document/d/1dX92MPm9ZNY2jqFidWf_E6V4S6pLkydjcPmk5F989YI/edit)

## <div id="core"></div> Core/Enhanced Experience
Only the enhanced experience offers any kind of commenting functionality. Core functionality will be added in due course.

## <div id="moderation"></div> Moderation
All comments made on FT products are moderated. Moderation is important but expensive: So all comments are categorised so that different moderation teams can effectively manage the comments they have responsibility for.

This does add some complexity though, and it places some constraints on where comments can be used. There are 2 ways in which the categorisation happens: Using the URL of the page where the comments appear (used for blogs) or by looking up the Content API using the passed in UUID and using the returned metatdata. 

If you cannot meet either of these criteria commenting will simply not work. This is going to change though and in the future you will be able to explicitly define which team should moderate the comments generated on your page/article/story/thing.
