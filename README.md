# Origami Tracking component

Include in your product to send tracking requests to the [Spoor API](https://spoor-docs.herokuapp.com/).

- [Usage](#usage)
- [Events](#events)
- [Parameters](#parameters)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Tracking without JavaScript

o-tracking does not work without JavaScript but, you can still send basic tracking requests to the Spoor API by setting a css background image url which points to the Spoor tracking pixel endpoint (`https://spoor-api.ft.com/px.gif`).

The Spoor tracking pixel endpoint takes a `data` query parameter which is a url-encoded JSON string that represents the data to track in Spoor.

```html
<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
	<div style="background: url('https://spoor-api.ft.com/px.gif?data=YOUR_URL_ENCODED_JSON_DATA_HERE');"></div>
</div>
```

For example, if you have the following data you want to track in Spoor:

```json
{
  "category": "page",
  "action": "view",
  "system": {
    "apiKey": "qUb9maKfKbtpRsdp0p2J7uWxRPGJEP",
    "source": "o-tracking",
    "version": "1.0.0"
  },
  "context": {
    "product": "ft.com",
    "content": {
      "asset_type": "page"
    }
  }
}
```
Here is the corresponding tracking pixel setup:
```html
<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
    <div style="background: url('https://spoor-api.ft.com/px.gif?data=%7B%22category%22:%22page%22,%20%22action%22:%22view%22,%20%22system%22:%7B%22apiKey%22:%22qUb9maKfKbtpRsdp0p2J7uWxRPGJEP%22,%22source%22:%22o-tracking%22,%22version%22:%221.0.0%22%7D,%22context%22:%7B%22product%22:%22ft.com%22,%22content%22:%7B%22asset_type%22:%22page%22%7D%7D%7D');"></div>
</div>
```

### Recommended implementation using the build service

Use an onload handler to check when o-tracking has loaded and then init.

```js
// CTM
if (cutsTheMustard) {
    var o = document.createElement('script');
    o.async = o.defer = true;
    o.src = 'https://build.origami.ft.com/v2/bundles/js?modules=o-tracking';
    var s = document.getElementsByTagName('script')[0];
    if (o.hasOwnProperty('onreadystatechange')) {
        o.onreadystatechange = function() {
            if (o.readyState === "loaded") {
                oTrackinginit();
            }
        };
    } else {
        o.onload = oTrackinginit;
    }
    s.parentNode.insertBefore(o, s);
}
```

The `oTrackinginit` function, used above, would have function calls to setup o-tracking and likely send a page view event. e.g.

```js
function oTrackinginit() {
    var oTracking = Origami['o-tracking'];
    // Setup
    oTracking.init({...config...});
    // Page
    oTracking.page({...config...});
    // Clicks.
    oTracking.click.init(category);
    // Components/Elements views.
    oTracking.view.init({...opts...});
}
```

### Alternative implementation using require

Use the build service or require locally to load o-tracking and init manually.
```js
import oTracking from 'o-tracking';
```

```js
if (cutsTheMustard) {
    // Setup
    oTracking.init({...config...});
    // Page
    oTracking.page({...config...});
    // Clicks
    oTracking.click.init(category);
    // Components/Elements views.
    oTracking.view.init({...opts...});
}
```

### Example implementations

- [ft.com](docs/ftcom_example.md)
- [membership](docs/membership_example.md)

#### Full example
```html
<!DOCTYPE html>
<!-- Add core class to head tag -->
<head class="core">
<head>
    <title>Full example</title>
    <!-- Add CTM styles -->
    <style type="text/css">
		/* Hide any enhanced experience content when in core mode, and vice versa. */
		.core .o--if-js,
		.enhanced .o--if-no-js {
			display: none !important; /* stylelint-disable-line declaration-no-important */
		}
    </style>
    <!-- Add CTM check -->
    <script>
        var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
        if (cutsTheMustard) {
        // Swap the 'core' class on the HTML element for an 'enhanced' one
        // We're doing it early in the head to avoid a flash of unstyled content
        document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
        }
    </script>
    <!-- Add Polyfil service -->
    <script src="https://cdn.polyfill.io/v1/polyfill.min.js"></script>
    <!-- INIT and make a page request -->
    <script>
        function oTrackinginit() {
            // oTracking
            var oTracking = Origami['o-tracking'];
            var config_data = {
                server: 'https://spoor-api.ft.com/px.gif',
                context: {
                    product: 'ft.com'
                },
                user: {
                    ft_session: oTracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
                }
            }
            // Setup
            oTracking.init(config_data);
            // Page
            oTracking.page({
                content: {
                    asset_type: 'page'
                }
            });
        }
        if (cutsTheMustard) {
            var o = document.createElement('script');
            o.async = o.defer = true;
            o.src = 'https://build.origami.ft.com/v2/bundles/js?modules=o-tracking';
            var s = document.getElementsByTagName('script')[0];
            if (o.hasOwnProperty('onreadystatechange')) {
                o.onreadystatechange = function() {
                    if (o.readyState === "loaded") {
                        oTrackinginit();
                    }
                };
            } else {
                o.onload = oTrackinginit;
            }
            s.parentNode.insertBefore(o, s);
        }
    </script>
</head>
<body>
<!-- Add fallback if browsers don't cut the mustard -->
<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
    <div style="background: url('https://spoor-api.ft.com/px.gif?data=%7B%22category%22:%22page%22,%20%22action%22:%22view%22,%20%22system%22:%7B%22apiKey%22:%22qUb9maKfKbtpRsdp0p2J7uWxRPGJEP%22,%22source%22:%22o-tracking%22,%22version%22:%221.0.0%22%7D,%22context%22:%7B%22product%22:%22ft.com%22,%22content%22:%7B%22asset_type%22:%22page%22%7D%7D%7D');"></div>
</div>
<!-- Send an event -->
<button onclick="document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: { category: 'element', action: 'click' }, bubbles: true}));">Send an event</button>
</body>
</html>
```

## Events

`o-tracking` captures events automatically when initialised with the methods [outlined above](#useage). In addition, `o-tracking` will capture custom `oTracking.page` and `oTracking.event` events:

- `oTracking.page`

    Send a page view event

    ```js
    document.body.dispatchEvent(new CustomEvent('oTracking.page', { detail: { content: { uuid: 'abc-123', barrier: 'PREMIUM' }}, bubbles: true}));
    ```
- `oTracking.event`

    Send a normal event

    ```js
    document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: { category: 'video', action: 'play', id: '512346789', pos: '10' }, bubbles: true}));
    ```

## Parameters

o-tracking will
* Automatically pickup ftsession from cookies for you.
* Page events automatically pick up the url and the referrer.
* Click events [initalised as above](#usage), will populate a `domPathTokens` property. If the clicked element has the `data-trackable` attribute, sibling elements will also be included within `domPathTokens`.
* View events are fired for elements with the `data-o-tracking-view` attribute by default, unless `o-tracking`'s `selector` option is configured. Like click events, view events populate a `domPathTokens` property. To collect data for events, set the `category` option, or provide a callback[`getContextData`]
_Note:_ This feature requires `window.IntersectionObserver` in order to track the events
_Note:_ `getContextData` should be a function which returns `{Object}`. It accepts the viewed element as an argument
	```js
	const opts = {
		category: 'audio', // default: 'component'
		selector: '.o-teaser__audio', // default: '[data-o-tracking-view]'
		getContextData: (el) => {  // default: null
			return {
				componentContentId: el.getAttribute('data-id'),
				type: 'audio',
				subtype: 'podcast',
			 	component: 'teaser'
			};
		}
	}

	oTracking.view.init(opts);
	```

Events are decorated with config values you pass in via `init()` or `updateConfig()` if they are part of `context`, `user`, or `device` objects. Values passed in as `context` to individual events will override context values from init.

### Init
```js
{
    server: "...",
    context: {
        product: "..."
    },
    user: {
        ft_session: "..."
    },
    device: {
        orientation: "..."
    }
}
```

### Updating core configuration
```js
{
    device: {
        orientation: "..."
    }
}
```

### Page
```js
{
    url: "...",
    referrer: "..."
    content: {
        uuid: "...",
        hurdle: "..."
    }
    ... any other key-values ...
}
```

### Event

__Important__: To decide how to name the category and action fields, consider this sentence (square brackets denote that part is optional):

#### A user can {action} a {category}[ with/having a {context}[ to {destination}]]

For example:
* A user can view a page having a uuid.
* A user can play a video having a video ID.
* A user can share a comment having a comment ID to Facebook.
* A user can share an article having a uuid to email.
* A user can scroll a page with a asset type.
* A user can open an email.
* A user can click an element.

```js
{
    category: 'video',
    action: 'play',
    ... any other key-values ...
    id: '512346789',
    pos: '10'
}
```

[Look at all the properties](docs/event.md) available for an event.

[JSDoc](https://registry.origami.ft.com/components/o-tracking/jsdoc#Tracking)


## Migration Guide

| State | Major Version | Last Minor Release | Migration guide |
| :---: | :---: | :---: | :---: |
| ✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ⚠ maintained | 2 | 2.0.10 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated | 1 | 1.7.2 | N/A |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tracking/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
