o-comments [![Circle CI](https://circleci.com/gh/Financial-Times/o-comments/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-comments/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

A component, integrated with FT authentication and user data services, to add a comment stream or comment count to content.

- [Additional dependencies](#additional-dependencies)
- [Markup](#markup)
	- [Stream](#stream)
	- [Count](#count)
	- [Staging environment](#use-staging-environment)
- [JavaScript](#javascript)
	- [Events](#events)
	- [Tracking](#tracking)
- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

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

Should you require the count as a value there is also a `getCount` method that will return an integer.

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

## JavaScript

No code will run automatically unless you are using the [Build Service](https://www.ft.com/__origami/service/build/v2/). You must either construct an `o-comments` object or fire the `o.DOMContentLoaded` event, which o-comments listens for.

### Constructing an o-comments

Assuming you have an HTML element on the page to represent your comment stream or count:

```js
const oComments = require('o-comments');
const commentsElement = document.querySelector('#element');
const Comments = new oComments(commentsElement, {
	articleId: 'article-id',
	articleUrl: 'optional-article-url'
})
```

Add `useStagingEnvironment: true` to the options if you want to use Coral staging environment.

If you want to initialise every comment stream or count element on the page (based on the presence of the attribute: `data-o-component="o-comments"`):

```js
import oComments from 'o-comments';
oComments.init();
```

### Firing an oDomContentLoaded event

```js
import 'o-comments';

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
- **oComments.replyComment** - Emitted when a user has successfully left a comment which is a reply to an existing comment.
- **oComments.editComment** - Emitted when a user has successfully edited their existing comment.
- **oComments.likeComment** - Emitted when a users has liked a comment
- **oComments.toxicComment** - Emitted when a user attempted to leave a comment that was flagged as toxic by the auto moderation

### Tracking

To keep tracking consistent across applications o-comments will emit [o-tracking](https://github.com/Financial-Times/o-tracking) events for all of the [events](#events). If your application is already using o-tracking then then there is no need to do anything to track common events.

#### Disable tracking

If you want to disable the o-tracking events and manage tracking / analytics yourself this can be done by passing the `disableOTracking` option to the o-comments instance.

**Imperatively**
```js
import oComments from 'o-comments';
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

Include all styles for o-comments with the mixin `oComments`:

```scss
@include oComments()
```

### Styling of Coral Talk iframe

This component contains a sass file (/src/scss/coral-talk-iframe/main.scss) that provides custom styling for Coral Talk components inside their own iframe. That file **must only** be referenced from Coral Talk admin panel by specifying the path of the file in Origami Build Service.

Example: `modules=o-comments@6.0.0-beta.24:/src/scss/coral-talk-iframe/main.scss`

Encoded URL: `https://www.ft.com/__origami/service/build/v2/bundles/css?modules%3Do-comments%406.0.0-beta.24%3A%2Fsrc%2Fscss%2Fcoral-talk-iframe%2Fmain.scss`


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.0.1 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.2.0 | - |
╳ deprecated | 3 | 3.5.0 | - |
╳ deprecated | 2 | 2.5.0 | - |
╳ deprecated | 1 | 1.0.10 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-comments/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
