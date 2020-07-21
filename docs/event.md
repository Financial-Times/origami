# Event

## Spec

`category`, `action` and `system` are MANDATORY, everything else is OPTIONAL

This allows a low barrier to entry for anyone wanting to submit events to Spoor.

__Important__: To decide how to name the category and action fields, consider this sentence (square brackets denote that part is optional):

*A user can {action} a {category}[ with/having a {context}[ to {destination}]]*

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

## Format

```
{
	"category": "video",										// Category for this event e.g. page
	"action": "play",											// Action for this event e.g. view
	"system": {
		"source": "o-tracking",									// Name of the sender's system [1]
		"version": "1.0.0",										// Source semver
	},
	"device": {
		"spoor_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",		// Unique ID for this device
		"spoor_session": "0f7464b4-3f4d-11e4-984b-00144feabdc0",// Attempt to recreate a visit in the client, basic but could be useful to group events.
		"user_agent": "Mozilla ...",
		"ip": "123.123.123.123",
		"layout": "S",											// require('o-grid').getCurrentLayout
		"orientation": "portrait",								// require('o-viewport').getOrientation
		"dimensions": {
			"width": 1024,
			"height": 768
		},
		"is_offline": true
	},
	"user": {
		"ft_session": "asdf324dfag1ds%asdf1A-1sadsadf",			// FT Session token
		"ft_guid": "0f7464b4-3f4d-11e4-984b-00144feabdc0",		// FT User GUID
		"passport_id": "1234556789",							// Passport ID - soon to be deprecated
		"erights_id": "12345567"								// eRights ID - soon to be deprecated
	},
	"time": {
		 "offset": 234											// Lag between event being created and sent (milliseconds) e.g. if offline.
	},
	"context": {
		"id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",			// Unique ID for this event.
		"component_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",	// Grouping for all events from the same component.
		"component_name": "o-video",                            // Name of the Origami component dispatching the event (it that's the case)
		"root_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",		// Grouping for all events on the same view of a product, usually akin to a page.
		...
		"product": "ft.com",									// Readable name for this product - controlled list.
		"content": {
			"uuid": "...",										// Content uuid [4]
			"asset_type": "...", 								// Asset Type [7]
		},														// [5] 
		"url": "...",											// [5]
		"referrer": "...",										// See also [5]
		funnel: {
			funnel_name: "",   									// An overall name for the funnel - fixed name
			funnel_steps: 3,   									// Total number of steps in this funnel - fixed number
			step_name: "",     									// Name for this step
			step_number: 1     									// Number for this step
        }
		...
		"anything": "goes here",
		"could": [ "be", "an", "array" ],
		"or" : { "might": { "be": ["an", "object"] }}
	}
}
```

## Notes

- If certain properties are present in the payload they will enriched by Spoor and appended to the payload.
- It's for use by server and client-side systems sending events to Spoor.
- It is intentionally abstracted away from any particular database format and meant to represent a logical, easy to understand data structure.
- It assumes the consumers of the event stream can manipulate the data in to their desired storage format.
- It doesn't assume users of the data will need to join the data across tables to find the information they want.


## References
1.  The general convention might be something like `product.sub-system.environment` - Eg, 'webapp.render.uat'
2.  Or in absence appended by Spoor.
3.  Spoor will scan any Cookies in the header for a FTSession token as well.
4.  Content will typically be a page, but could be a uuid for something else like a video. Will be expanded in to a CAPI v2 object -> capi: { "headline", "...", "published": "...", ... }
5.  Expanded in to a URL object -> http://nodejs.org/api/url.html
6.  Spoor will also allow this in a `authorization` header.
7.  Enum of `account, ad, blog, front, image, page, report, search, section, story, topic, video` (see https://github.com/Financial-Times/spoor-enrichment/issues/94).
