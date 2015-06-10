## Notes

- It's JSON.
- In this model there is no hierarchy (cf. o-tracking proposal), and only a couple of mandated fields.
- If certain fields are present in the payload they will enriched by Spoor and appended to the payload.
- I've tried to keep terminology human understable - Eg, the removal of 'categoy', 'page', 'key', 'value', 'data' should all be inherent in the data structure etc. Anything bespoke goes in 'meta'.
- It is intentionally abstract and assumes the consumers of the event stream can manipulate the data in to their desired storage format.
- It's for use by server and client-side systems sending events to Spoor.
- It doesn't assume users of the data will need to join the data across tables to find the information they want. Though consumers may wish to split this data in to their own tables for query optimisation etc.

## Spec 

`event.source` and `event.api-key` are MANDATORY, everything else is OPTIONAL

This allows a low barrier to entry for anyone wanting to submit events to Spoor.

## Enrichments 

Each payload will be scanned for the presence of these properties.

If present the properties will be decorated and/or tokenised. 

To date we've discussed :-

- If `user.session.token` is included it will be validated against the session api and expanded in to a membership uuid.
- If `content.uuid` is included it will be expanded in to a set of content api meta-data.
- ...

## Format

```
{
    "event": {
        "source": "email.simple-email-service",  				// Name of the sender's system [1]
        "type": "opened",  										// The type of event that happened, Eg. 'pageview', 'dwell', 'play' etc.
		"api-key":	"0f7464b4-3f4d-11e4-984b-00144feabdc0"		// Sender-specific key [6]
    },
    "user": {													// Who generate the event
        "user-agent": "Mozilla ...",
        "ip": "123.123.123.123",
        "anonymous-id": "...",									// An anonymous token, supplied by the client [2] 
        "session": {
            "token": "asdf324dfag1ds%asdf1A-1sadsadf",  		// FT Session token - expanded in to a uuid and valid flag [3]
        },
		"device": {
			"layout": "S",										// require('o-grid').getCurrentLayout 
        	"orientation": "portrait"							// require('o-viewport').getOrientation
		},
		"geo": {												// [8]
            "country": "MA",
            "area_code": "0",
            "longitude": "-5.000",
            "latitude": "32.000",
            "country_name": "Morocco",
            "continent": "AF"
		},
		"ab": {
			"test-name": "variant"								// [9]
		},
		"flags": [ ],											// Flags/Toggles the user has set [10]
		"isStaff": true											// [9]
    },
    "content": {
        "uuid": "", 				// Content uuid [4] 
        "url": "...", 	 			// [5] 
        "referrer": "...", 			// See also [5]
		"type":	"content"			// Some sort of controlled list  
    },
	"meta": {						// [7]
		"anything": "goes here",
		"could: [ "be", "an", "array" ],
		"or" : { "might": { "be": ["an", "object"] }}
	},
    "time": {
         "offset": 234				// For offline stuff, I think
    }
}
```

```
[1]  The general convention might be something like `product.sub-system.environment` - Eg, 'webapp.render.uat'
[2]  Or in absence appended by Spoor. 
[3]  So, the token becomes -> { session: { token: '...', uuid: '...', valid: true }
[3]  I will scan any Cookies in the header for a FTSession token as well.
[4]  Content will typically be a page, but could be a uuid for something else like a video. Will be expanded in to a CAPI v2 object -> capi: { "headline", "...", "published": "...", ... }
[5]  Expanded in to a URL object -> http://nodejs.org/api/url.html
[6]  I think I might also allow this in a `authorization` header.
[7]  This is intentionally vague.
[8]  Where the event happened. If not provided this is expanded by a call to Maxmind.
[9]  An enrichment
[10] Possibly not that useful?
```
