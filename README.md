o-comments [![Circle CI](https://circleci.com/gh/Financial-Times/o-comments/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-comments/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

A component, integrated with FT authentication and user data services, to add a comment stream or comment count to content.

- [Markup](#markup)
	- [Stream](#stream)
	- [Count](#count)
- [JavaScript](#javascript)
	- [Interface](#interface)
	- [Events](#events)
- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

These elements will be initialized automatically on the `o.DOMContentReady` event meaning you're unable to defer component initialisation.

### Stream

Use the following markup to enable a comment stream:

```html
<div class="o-comments"
	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-story-url="{optional-story-url}">
</div>
```
The comment stream is embedded in the element with a `o-comments-stream` id attribute.

### Count

Add the following attribute to the markup to enable a comment count:

```diff
<div class="o-comments"
-	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
+	data-o-comments-count="true">
</div>
```

The comment count is rendered when the `data-o-comments-count` attribute value is `true`.

### Use staging environment

Add the following attribute to the markup to use Coral staging environment:

For stream:
```diff
<div class="o-comments"
	id="o-comments-stream"
	data-o-component="o-comments"
	data-o-comments-article-id="{article-id}"
	data-o-comments-story-url="{optional-story-url}"
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
	storyUrl: 'optional-story-url'
})
```

Add `useStagingEnvironment: true` to the options if you want to use Coral staging environment.

If you want to initialise every comment stream or count element on the page (based on the presence of the attribute: `data-o-component="o-comments"`):

```js
const oComments = require('o-comments');
oComments.init();
```

### Firing an oDomContentLoaded event

```js
require('o-comments');

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Interface

#### .on(eventName, callback)

- `eventName` - *required*
- `callBack` - *required*

The `.on` interface allows you to listen for [events](#events).

```js
const oComments = require('o-comments');
const Comments = new oComments();

Comments.on('oComments.ready', (event) => {
	console.log('The comments have rendered')
});

```

### Events

Events are emitted during key events and can be listened to using the [`.on` interface](#on) or by listening for events on the document.

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

## Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

As with all Origami components, o-comments has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-comments-is-silent : false;` in your Sass before you import the o-comments Sass.

### Styling of Coral Talk iframe

This component contains a sass file (/src/scss/coral-talk-iframe/main.scss) that provides custom styling for Coral Talk components inside their own iframe. That file **must only** be referenced from Coral Talk admin panel by specifying the path of the file in Origami Build Service. 

Example: `modules=o-comments@6.0.0-beta.24:/src/scss/coral-talk-iframe/main.scss`

Encoded URL: `https://www.ft.com/__origami/service/build/v2/bundles/css?modules%3Do-comments%406.0.0-beta.24%3A%2Fsrc%2Fscss%2Fcoral-talk-iframe%2Fmain.scss`

## Troubleshooting
_This is a good place to put problems that come up repeatedly_

## Contributing
If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful.

## Migration

_We use tables to represent our migration guides. Be sure to update it when there is a major release, and update MIGRATION.md, as well_

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-comments/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
