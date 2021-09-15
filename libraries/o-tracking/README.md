# o-tracking

Include in your product to send tracking requests to the [Spoor API](https://spoor-docs.herokuapp.com/).

- [Usage](#usage)
  - [Tracking without JavaScript](#tracking-without-javascript)
  - [Tracking with JavaScript](#tracking-with-javascript)
  - [How to track extra click data using `data-trackable` attributes](#how-to-track-extra-click-data-using-data-trackable-attributes)
- [How to view the data](#how-to-view-the-data)
- [Example implementations](#example-implementations)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-tracking`.

### Tracking without JavaScript

o-tracking does not work without JavaScript but, you can still send basic tracking requests to the Spoor API by setting a css background image url which points to the Spoor tracking pixel endpoint (`https://spoor-api.ft.com/px.gif`). Click events and other interactive events will not be tracked without JavaScript but basic page view events can be tracked.

The Spoor tracking pixel endpoint takes a `data` query parameter which is a url-encoded JSON string that represents the data to track in Spoor.

```html
<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
	<div style="background: url('https://spoor-api.ft.com/px.gif?data=YOUR_URL_ENCODED_JSON_DATA_HERE');"></div>
</div>
```


For example, if you have the following data you want to track in Spoor:

_Recommendation:_ Using a different `system.source` value from the one used in o-tracking JavaScript mode will help your project be able to more easily group the data for those users without JavaScript. The example below uses the source `o-tracking-fallback`.

```json
{
  "category": "page",
  "action": "view",
  "system": {
    "source": "o-tracking-fallback",
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

### Tracking with JavaScript

#### Developer/Test Mode

o-tracking has a development/test mode which will mark the events as test events, and also write to the console extra debugging information.

To activate the mode, set `test` to `true` during the intialisation of `o-tracking` like so:

```js
import oTracking from '@financial-times/o-tracking';

const config = {
    test: true, // Mark the events as test events and turn on extra debug logging.
    ...
};
oTracking.init(config);
```

#### Methods

##### oTracking.init

To manually instantiate `o-tracking`, import the component and call the `init` method with configuration which is specific to your product:

``` js
import oTracking from '@financial-times/o-tracking';

const config = {
    context: {
        // This value is used as a way to identify the high-level product, for example: ft.com, FT app, biz-ops etc.
        product: 'o-tracking-example',
    }
};
oTracking.init(config);
```

##### oTracking.page

To track a page view for the product you call the `oTracking.page` method.
Page events automatically track the url and the referrer.
Please refer to the [event document](docs/event.md) for information about all the possible properties which can be set.
```js
const pageConfig = {
  content: {
      /*
        Asset type is meant to describe the main purpose of the page
        The value can be one of these:
        - `story` - A story or article
        - `blog` - A blog post
        - `front` - A home page or front page
        - `ad` - An advert.
        - `image` - An image
        - `interactive` - An interactive graphic
        - `report` - A special report
        - `search` - A search results page
        - `section` - A section or listing page
        - `topic` -  A topic landing page
        - `video` - A video page
        - `login` - Any login/sign-in page
        - `stream` - A stream page
        - `funnel` - Any funnel page
        - `epaper` - all epaper pages
        - `rankings` - A rankings page for schools and courses (i.e. on rankings.ft.com). Not the section's hub page
        - `markets` - Any market, bond, commoditity, stock, currency 'tearsheet' (usually has "/tearsheet/" in URL)
        - `myft` - All MyFT pages
        - `account` - All account pages
        - `membership` - All membership pages
        - `page` - anything else, not above.
    */
    asset_type: "story"
  }
};
oTracking.page(pageConfig);
```

##### oTracking.click.init

Call the `oTracking.click.init` method to track click events. Pass the category you would like the click events to have as an argument:

- o-tracking click events will also track the path from the root of the DOM tree to the element which was clicked. This is recorded in a property called `domPathTokens`.
- If the clicked element has the `data-trackable` attribute set, sibling elements will also be included within the `domPathTokens` property.

Please refer to the [event document](docs/event.md) for information about all the possible properties which can be set.
```js
// Tracking a click
const category = 'element';
oTracking.click.init(category);
```

_Note:_ The attribute `data-o-tracking-skip-queue` is no longer used, it is now the default behaviour.*

##### oTracking.view.init

To track when an element has come into view of the user, add the attribute `data-o-tracking-view` to the element in the page and then call the `oTracking.view.init` method:

- By default, elements with the `data-o-tracking-view` attribute are tracked.
- To track different elements, set the `selector` option property to a CSS selector.
- Like click events, view events will also track the path from the root of the DOM tree to the element which triggered the tracking event into a property called `domPathTokens`.
- To categorise the view events, set the `category` option property.
- To collect extra data to send with the tracking event, add a function named `getContextData` to the options. The function receives as it's single argument the element which triggered the tracking event and needs to return an object with any of these optional properties set:
	- `componentContentId`
	- `type`
	- `subtype`
	- `component`
_Note:_ This feature requires `window.IntersectionObserver` in order to track the events
_Note:_ `getContextData` should be a function which returns `{object}`. It accepts the viewed element as an argument

Please refer to the [event document](docs/event.md) for information about all the possible properties which can be set.

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
};

oTracking.view.init(opts);
```

##### oTracking.event

To track a custom event call the `oTracking.event` method. For example to track that a video is played:
```js
const eventConfig = {
    "category": "video", // optional
    "action": "play", // optional
};
oTracking.event(eventConfig);
```

The `event` method also accepts an optional callback which is run after the event has been processed.
```js
const eventConfig = {
    "category": "video", // optional
    "action": "play", // optional
};
oTracking.event(eventConfig, () => {
  console.log('The custom video event has been processed!');
});
```

Please refer to the [event document](docs/event.md) for information about all the possible properties which can be set.


#### Events

Instead of calling the `page` and `event` methods `o-tracking` can be configured to capture events based on the custom DOM Events `oTracking.page` and `oTracking.event`.

##### oTracking.page

Call the `oTracking.page.init()` method to listen for `oTracking.page` events:
```js
// Tell o-tracking to listen for `oTracking.page` events
oTracking.page.init();

// Now we can send page events and o-tracking will track the data within them.
const pageData = { content: { uuid: 'abc-123', barrier: 'PREMIUM' };
document.body.dispatchEvent(new CustomEvent('oTracking.page', { detail: pageData}, bubbles: true}));
```

##### oTracking.event

To make o-tracking listen for `oTracking.event` events, you call `oTracking.event.init()`:
```js
// Tell o-tracking to listen for `oTracking.event` events
oTracking.event.init();

// Now we can send custom events and o-tracking will track the data within them.
const customData = { category: 'video', action: 'play', id: '512346789', pos: '10' };
document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: customData}, bubbles: true}));
```


### How to track extra click data using `data-trackable` attributes

You can add extra information to o-tracking events by using the `data-trackable` and `data-trackable-context-*` custom attributes.

#### `data-trackable`

`o-tracking` will walk up the DOM to get the tree of elements with `data-trackable` attributes. For example, clicks to the list-item button below will result in an event that has this path recorded within it - `header-menu country-selector china`:-

```html
<div data-trackable="header-menu">
	<span>
		<div data-trackable="country-selector">
			<ul>
				<li data-trackable="china"><button>China</button></li>
			</ul>
		</div>
	</span>
</div>
```

#### `data-trackable-context-*`

To add extra context to events you may add custom attributes in the form: `data-trackable-context-name="data"` where `name` is the name of the extra context and `data` is the extra data.

For example, when the below anchor element is clicked, it will add extra event fields `article_guid` and `article_source` to the data being tracked.

```html
<a href="https://www.ft.com/content/1234-1234-1234-1234"
	data-trackable="view-original-article"
	data-trackable-context-article_guid="1234-1234-1234-1234"
	data-trackable-context-article_source="FINANCIAL TIMES">
```


## How to view the data

Once you have sent data into Spoor, you can view the data via Chartio.

The FT has a Slack channel named #chartio_q_a where anyone can get help with Chartio.

If you have never used Chartio before, you will need to [request access via this form](https://docs.google.com/forms/d/e/1FAIpQLSc1z1hTtnhe4KSXuZ220Zf53wTm0ucYVf2B3jYY5ZSyNW2VSw/viewform).

To sign in to Chartio:
- Open the [FT Chartio](https://chartio.com/financialtimes/) in your browser.
- Press the "Sign in with Google" button and select your FT Google Account.


## Example implementations

- [ft.com](docs/ftcom_example.md)
- [membership](docs/membership_example.md)


## Migration Guide

| State | Major Version | Last Minor Release | Migration guide |
| :---: | :---: | :---: | :---: |
| ✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
| ⚠ maintained | 3 | 3.1| [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated | 2 | 2.0.10 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated | 1 | 1.7.2 | N/A |

***

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tracking/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

***

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
