o-comments [![Circle CI](https://circleci.com/gh/Financial-Times/o-comments/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-comments/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

A component, integrated with FT authentication and user data services, to add comments to content.

- [Markup](#markup)
- [JavaScript](#javascript)
	- [Interface](#interface)
	- [Events](#events)
- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

### Markup

Use the following markup to enable comments:

```html
<div class="o-comments" data-o-component="o-comments">
</div>
```

This element will be initialized automatically on the `o.DOMContentReady` event meaning you're unable to defer component initialisation.

### JavaScript

No code will run automatically unless you are using the [Build Service](https://www.ft.com/__origami/service/build/v2/). You must either construct an `o-comments` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

#### Constructing an o-comments

```js
const oComments = require('o-comments');
oComments.init();
```

#### Firing an oDomContentLoaded event

```js
require('o-comments');

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

#### Interface

##### .on(eventName, callback)

- `eventName` - *required*
- `callBack` - *required*

The `.on` interface allows you to listen for [events](#events).

```js
const oComments = require('o-comments');
const Comments = new oComments();

Comments.on('component.render.successful', () => {
	console.log('The comments have rendered')
});

```


#### Events

Events are emitted during key events and can be listened to using the [`.on` interface](#on).

The naming of events uses a dot notation and follows a `category.action.state` namespacing. The categories and their events are listed below.


##### Component

These events are anything to do with the component itself.

- **component.render.successful** - Emitted when the component has finished rendering and is ready for the user to interact with comments

##### Comment

These events are anything to do with comment interactions.

- **comment.posted.successful** - Emitted when a users has successfully left a comment
- **comment.posted.toxic** - Emitted when a comment has been flagged as above our acceptable level of toxicity by the automated toxic moderation.
- **comment.liked.successful** - Emitted when a users has liked a comment

##### Auth

These events are anything to do with users being authenticated.

- **auth.login.successful** - Emitted when a user has successfully logged in to Coral Talk
- **auth.login.required** - Emitted when a logged out user has performed an action that requires them to login

### Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

As with all Origami components, o-comments has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-comments-is-silent : false;` in your Sass before you import the o-comments Sass.

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
