o-share [![Build Status](https://travis-ci.org/Financial-Times/o-share.png?branch=master)](https://travis-ci.org/Financial-Times/o-share)
=======

Social media and URL sharing buttons.

- Provides the ability to share a URL provided by the product
- Uses a standard set of social media icons.
- Provides a copyable representation of a link

## Construction

Products must provide the source HTML, in the following format, with the template `{{tag}}`s replaced with real values:

```html
<div data-o-component="o-share" data-o-version="0.1.0" class="o-share">
    <ul>
        <li class="o-share__action o-share__action--url" data-o-share-action="url">
            <a href="{{{url}}}"><i>URL</i></a>
        </li>
        <li class="o-share__action o-share__action--twitter">
            <a href="https://twitter.com/intent/tweet?url={{url}}&text={{title}}&related={{relatedTwitterAccounts}}&via=FT"><i>Twitter</i></a>
        </li>
        <li class="o-share__action o-share__action--facebook">
            <a href="http://www.facebook.com/sharer.php?u={{url}}&t={{title}}+|+{{titleExtra}}"><i>Facebook</i></a>
        </li>
        <li class="o-share__action o-share__action--googleplus">
            <a href="https://plus.google.com/share?url={{url}}"><i>Google+</i></a>
        </li>
        <li class="o-share__action o-share__action--linkedin">
            <a href="http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}+|+{{titleExtra}}&summary={{summary}}&source=Financial+Times"><i>LinkedIn</i></a>
        </li>
        <li class="o-share__action o-share__action--stumbleupon">
            <a href="http://www.stumbleupon.com/submit?url={{url}}&title={{title}}"><i>StumbleUpon</i></a>
        </li>
        <li class="o-share__action o-share__action--reddit">
            <a href="http://reddit.com/submit?url={{url}}&title={{title}}"><i>Reddit</i></a>
        </li>
        <li class="o-share__action o-share__action--tumblr">
            <a href="http://www.tumblr.com/share/link?url={{url}}&name={{title}}&description={{summary}}"><i>Tumblr</i></a>
        </li>
    </ul>
</div>
```

Required values:

* `{{url}}`: The URL to be shared.
* `{{title}}`: The title of the content to be shared
* `{{titleExtra}}`: Any additional text relating to the title, e.g. site _section_.
* `{{summary}}`: Summary text to be shared.
* `{{relatedTwitterAccounts}}`: Comma-separated list of Twitter accounts to encourage the user to follow. See [Twitter intents](https://dev.twitter.com/docs/intents) for more info.

On `DOMContentLoaded`, __o-share__ instances are automatically constructed for each element in the `<body>` declaring itself to be an __o-share__ element (via the `data-o-component="o-share"` attribute).

Note that for browsers that do not support `DOMContentLoaded` (IE8 etc), the event could be polyfilled, or construction can be manually invoked:

```javascript
var oShare = require('o-share');
var oShareObjects = oShare.createAllIn(document.body);
```

An array of any constructed __o-share__ objects will be returned.

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct a __o-share__ object for each element with a `data-o-component="o-share"` attribute:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

`oShare.createAllIn()` will not create __o-share__ objects for elements that already have __o-share__ objects constructed on them, therefore it's safe to call more than once on the same page region.

## Presentation

Share buttons are shown horizontally. In future, other display options will be provided.

Products choose which share buttons will be shown, and in what order, by only including the markup for the buttons they want. It is best to put the share URL action first when right-aligning the __o-share__ element, or last when left-aligning it.

## Sharing a URL (link button)

Does not include the actual copying to the clipboard (users must do that manually), but will indicate to users when the URL has been copied.

In future may provide an additional button to copy to the clipboard, possibly using [zeroclipboard](https://github.com/zeroclipboard/zeroclipboard)

## Share counts

Does not yet show share count.

In future will show a total share count (using an Origami share count aggregator service). There will be a minimum share count, below which share counts will not be shown.

## Behaviour

### Primary experience

When clicked, social media share buttons will open the social media intent links in popup windows. Only one popup will be shown for each social media network, but if a user clicks multiple social media buttons, then one popup for each will be opened.

When clicked, the URL share button will show the URL (see image above) in place of the envelope icon, in an `<input>` element. When the element loses focus, it will close.

### Core experience

Social media share buttons will function as plain `<a>` elements (and can be set to `target="_blank"` if the product wishes..

URL share button will not display at all. User can of course still copy the browser URL.

## Events

This module will trigger the following events on its root element:

* `oShare.ready` - when a share links behaviour has been initialised
* `oShare.open` - when a share link has been opened (popup/flyout opened as a result of button click)
* `oShare.copy` - when the URL has been copied

In future it may also trigger events for __o-tracking__ when the above events occur.