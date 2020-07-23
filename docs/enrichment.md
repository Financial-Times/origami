# Enrichment

*Still work in procress - TBC*

## Format

```
{
	"category": "video",										// Category for this event e.g. page
	"action": "play",											// Action for this event e.g. view
	"system": {
		"source": "o-tracking",								// Name of the sender's system [1]
		"version": "1.0.0",									// Source semver
	},
	"device": {
		"spoor_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",	// Unique ID for this device
		"spoor_session": "0f7464b4-3f4d-11e4-984b-00144feabdc0",// Attempt to recreate a visit in the client, basic but could be useful to group events.
		"user_agent": "Mozilla ...",
		"ip": "123.123.123.123",
		"layout": "S",										// require('o-grid').getCurrentLayout
		"orientation": "portrait",							// require('o-viewport').getOrientation
		"geo": {												// [8]
            "country": "MA",
            "area_code": "0",
            "longitude": "-5.000",
            "latitude": "32.000",
            "country_name": "Morocco",
            "continent": "AF"
        },
	},
	"user": {
		"ft_session": "asdf324dfag1ds%asdf1A-1sadsadf",		// FT Session token
		"ft_guid": "0f7464b4-3f4d-11e4-984b-00144feabdc0",	// FT User GUID
		"isStaff": true,
		"ab": {
            "test_name": "variant"								// [9]
        },
        "flags": []												// Flags/Toggles the user has set [10]
	},
	"time": {
		 "offset": 234,										// Lag between event being created and sent (milliseconds) e.g. if offline.
		 "utc": "2015-06-19T12:06:35.000Z",                     // Time of event after offset applied.
		 "date": "2015-06-19",
		 "year": 2015,
		 "month": 6,
		 "day": 19,
		 "hour": 12,
		 "minute": 6,
		 "weekday": "Friday",
		 "week": 25
	},
	"context": {
		"id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",			// Unique ID for this event.
		"component_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",// Grouping for all events from the same component.
		"root_id": "0f7464b4-3f4d-11e4-984b-00144feabdc0",	// Grouping for all events on the same view of a product, usually akin to a page.
		"product": "ft.com",									// Readable name for this product - controlled list.
		"uuid": "",											// Content uuid [4]
		"url": {												// [5]
            "protocol": "http:",
            "slashes": true,
            "auth": null,
            "host": "www.ft.com",
            "port": null,
            "hostname": "www.ft.com",
            "hash": null,
            "search": "?query=string",
            "query": { "query": "string" },
            "pathname": "/path",
            "path": "/path?query=string",
            "href": "http://www.ft.com/path?query=string"
		},
		"referrer": {										// See also [5]
            "protocol": "https:",
            "slashes": true,
            "auth": null,
            "host": "www.google.co.uk",
            "port": null,
            "hostname": "www.google.co.uk",
            "hash": null,
            "search": "",
            "query": {},
            "pathname": "/search",
            "path": "/search",
            "href": "https://www.google.co.uk/search"
        }
	}
}
```

## Enrichments

Each [event](./event.md) will be scanned for the presence of these properties.

If present the properties will be decorated and/or tokenised.

- If `user.session.token` is included it will be validated against the session api and expanded in to a membership uuid.
- If `content.uuid` is included it will be expanded in to a set of content api meta-data.
- ...

```
[3]  So, the token becomes -> { session: { token: '...', uuid: '...', valid: true }
[4]  Content will typically be a page, but could be a uuid for something else like a video. Will be expanded in to a CAPI v2 object -> capi: { "headline", "...", "published": "...", ... }
[5]  Expanded in to a URL object (including the query string parser option) -> http://nodejs.org/api/url.html
[8]  Where the event happened. If not provided this is expanded by a call to Maxmind.
[9]  An enrichment
```
