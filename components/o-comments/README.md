# o-comments [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

A component, integrated with FT authentication and [Coral Talk](https://coralproject.net), to add a comment stream or comment count to content.

- [Usage](#usage)
- [Additional dependencies](#additional-dependencies)
- [Markup](#markup)
	- [Stream](#stream)
	- [Count](#count)
	- [Use staging environment](#use-staging-environment)
	- [Pass a display name into Coral Talk](#pass-a-display-name-into-coral-talk)
- [JavaScript](#javascript)
	- [Constructing an o-comments](#constructing-an-o-comments)
	- [Firing an oDomContentLoaded event](#firing-an-odomcontentloaded-event)
	- [Events](#events)
	- [Tracking](#tracking)
- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-comments`.

Unlike other Origami components [`o-comments` requires additional peer dependencies](#additional-dependencies).

## Additional dependencies

o-comments is dependant on sass from o-overlay and o-forms and requires them to be included by the parent application.

## Markup

These elements will be initialized automatically on the `o.DOMContentReady` event meaning you're unable to defer component initialisation.

### Stream

Use the following markup to enable a comment stream:

```html
<div class="o-comments"
	id="{element-id}"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-article-url="{optional-article-url}">
</div>
```
Coral needs a parent element id when initialising the comment stream embed script.

### Redirection for illegal comment reporting

Within Coral, when a user clicks on the link to report an illegal comment, Coral's default behaviour is to open a new window with the same url and some added querystring items. However, this causes issues for first-click free users who get redirected to the barrier page instead. In order to stay compliant with the DSA, which requires anonymous users to be able to report illegal comments, the link click is intercepted and the user redirected to a non-paywalled page instead.

The paywall report path defaults to `/content/`, the redirect report path defaults to `/article/comment-report/`. If you need either of these to be different paths, you can add either or both of the following attributes to change them to your paths.

```diff
<div class="o-comments"
	id="{element-id}"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-article-url="{optional-article-url}"
+	data-o-comments-paywalled-report-path="{optional-paywall-report-path}"
+	data-o-comments-redirect-report-path="{optional-redirect-report-path}">
</div>```

### Count

Add the following attribute to the markup to enable a comment count:

```diff
<div class="o-comments"
-	id="{element-id}"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
+	data-o-comments-count="true">
</div>
```

The comment count is rendered when the `data-o-comments-count` attribute value is `true`.

#### getCount

If you need the count as a value, use the `getCount` method which returns an integer.

```js
Comments.getCount('article-id')
	.then(count => console.log(count));
```

### Use staging environment

Add the following attribute to the markup to use Coral staging environment:

For stream:
```diff
<div class="o-comments"
	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-article-url="{optional-article-url}"
+	data-o-comments-use-staging-environment="true">
</div>
```

For count:
```diff
<div class="o-comments"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-count="true"
+	data-o-comments-use-staging-environment="true">
</div>
```

### Pass a display name into Coral Talk

In rare cases, a user may have already set their display name in a different part of the website. In this instance, add the following attribute to pass the display name into Coral Talk when creating a user account:

```diff
<div class="o-comments"
	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-article-url="{optional-article-url}"
+	data-o-comments-display-name="{display-name}">
</div>
```

## JavaScript

No code will run automatically unless you are using the [Build Service](https://www.ft.com/__origami/service/build/). You must either construct an `o-comments` object or fire the `o.DOMContentLoaded` event, which o-comments listens for.

### Constructing an o-comments

Assuming you have an HTML element on the page to represent your comment stream or count:

```js
import oComments from '@financial-times/o-comments';
const commentsElement = document.querySelector('#element');
const Comments = new oComments(commentsElement, {
	articleId: 'article-id',
	articleUrl: 'optional-article-url'
})
```

Add `useStagingEnvironment: true` to the options if you want to use Coral staging environment.

If you want to initialise every comment stream or count element on the page (based on the presence of the attribute: `data-o-component="o-comments"`):

```js
import oComments from '@financial-times/o-comments';
oComments.init();
```

### Firing an oDomContentLoaded event

```js
import '@financial-times/o-comments';

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Events

Events are emitted during key events or interactions and can be listened to by listening for events on the document.

```js
document.addEventListener('oComments.ready', (event) => {
	console.log('This comments have rendered');
});
```

#### Global / Component

These events are anything to do with the component itself.

- **oComments.ready** - Emitted when the component has finished rendering and is ready for the user to interact with comments

#### Comment

These events are anything to do with comment interactions.

- **oComments.postComment** - Emitted when a users has successfully left a comment
- **oComments.replyComment** - Emitted when a user has successfully left a comment which is a reply to an existing comment
- **oComments.editComment** - Emitted when a user has successfully edited their existing comment
- **oComments.likeComment** - Emitted when a users has liked a comment
- **oComments.reportComment** - Emitted when a user reports a comment to the moderators
- **oComments.ignoreUser** - Emmitted when a user ignores another user
- **oComments.toxicComment** - Emitted when a user attempted to leave a comment that was flagged as toxic by the auto moderation

### Tracking

To keep tracking consistent across applications o-comments will emit [o-tracking](https://github.com/Financial-Times/o-tracking) events for all of the [events](#events). If your application is already using o-tracking then then there is no need to do anything to track common events.

#### Disable tracking

If you want to disable the o-tracking events and manage tracking / analytics yourself this can be done by passing the `disableOTracking` option to the o-comments instance.

**Imperatively**
```js
import oComments from '@financial-times/o-comments';
const commentsElement = document.querySelector('#element');
const comments = new Comments(commentsElement, {
	disableOTracking: true
});
```

**Declaratively**

```diff
<div class="o-comments"
	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-article-url="{optional-article-url}"
+	data-o-comments-disable-o-tracking="true">
</div>
```

## Sass

Include all styles for o-comments with the mixin `oComments`. Set the `coral-talk-iframe` option to `false`:

```scss
@include oComments($opts: ('coral-talk-iframe': false));
```

The `coral-talk-iframe` option is set to false as these styles are included in the Coral Talk iframe, via the [Origami Build Service](https://www.ft.com/__origami/service/build/), and do not need to be included directly within projects themselves.

### Styling of Coral Talk iframe

This component contains a sass file (/src/scss/coral-talk-iframe/main.scss) that provides custom styling for Coral Talk components inside their own iframe. That file is included in the Coral Talk admin panel by including o-comments using an [Origami Build Service](https://www.ft.com/__origami/service/build/) request.


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 11 | N/A | [migrate to v11](MIGRATION.md#migrating-from-v10-to-v11) |
⚠ maintained | 10 | N/A | [migrate to v10](MIGRATION.md#migrating-from-v9-to-v10) |
⚠ maintained | 9 | N/A | [migrate to v9](MIGRATION.md#migrating-from-v8-to-v9) |
╳ deprecated | 8 | 8.3.3 | [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8) |
╳ deprecated | 7 | 7.7 | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
╳ deprecated | 6 | N/A | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.0.1 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.2.0 | - |
╳ deprecated | 3 | 3.5.0 | - |
╳ deprecated | 2 | 2.5.0 | - |
╳ deprecated | 1 | 1.0.10 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-comments/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
