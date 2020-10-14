# page:view

A page view event is sent when a large proportion of the visible window changes.
Usually, this is easily determined as it matches when a URL changes in a browser.
For single page applications, judgement must be used to determine an appropriate page view.


---------

These are the documented parameters for a page:view event.

## Required

### system_product

- Key: `context.product`
- Required: **yes**
- Default: none
- o-tracking automatic: **no**
- spoor pipeline automatic: **no**

system_product should be used as a way to identify the high-level product, for example: ft.com, next, FT app etc.
These are not technical or application names, they are business concepts.

If using o-tracking, this is usually set at init. e.g.

```js
oTracking.init({
  context: {
    product: 'ft.com'
  }
});
```

### system_source

- Key: `system.source`
- Required: **yes**
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: **no**

system_source is a technical parameter to identify the source of the requests. If using o-tracking this is filled in for you. Otherwise it could be the name of the application generating the request.

If using o-tracking, this is usually set at init. e.g.

```js
oTracking.init({
  system: {
    source: 'o-tracking'
  }
});
```

### system_version

- Key: `system.version`
- Required: **yes**
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: **no**

system_version is a technical parameter to identify the version of the application sending the requests. If using o-tracking this is filled in for you. It should be in the format of semver.

If using o-tracking, this is usually set at init. e.g.

```js
oTracking.init({
  system: {
    version: '1.0.0'
  }
});
```

### url

- Key: `context.url`
- Required: **yes**
- Default: `document.URL`
- o-tracking automatic: yes
- spoor pipeline automatic: yes

The url of the current page. (Remember the definition of "page" at the top of this file.)

If using o-tracking, it is picked up for you using `document.URL`. The pipeline will also make an attempt using it's referrer, but this is a last resort.
For most reliability, it should be sent with each page. e.g.

```js
oTracking.page({
  url: "http://www.example.com"
});
```

### content_asset_type

- Key: `context.content.asset_type`
- Required: **yes**
- Default: none
- o-tracking automatic: **no**
- spoor pipeline automatic: **no**

The asset type of the current page. (Remember the definition of "page" at the top of this file.)

Asset type is meant to describe the main purpose of the page, for example "story". Valid asset types are:

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
- `video` - A video
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

If using o-tracking, it's usually sent with each page. e.g.

```js
oTracking.page({
  content: {
    asset_type: "story"
  }
});
```

## Page

### referrer

- Key: `context.referrer`
- Required: no
- Default: `document.referrer`
- o-tracking automatic: yes
- spoor pipeline automatic: no

The referrer of the current page. o-tracking will pick this up automatically for you, using `document.referrer`. If this will give the wrong value, set on the page event e.g.

```js
oTracking.page({
  referrer: "http://www.example.com"
});
```

## Content

### content_counted

- Key: `context.content.counted`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: yes

Flag identifying if the page being viewed should be counted. Note, we will automatically determine this from the content's UUID, and that is the preferred method. This parameter is available for cases where there is no uuid.

If using o-tracking set on the page e.g.

```js
oTracking.page({
  content: {
    counted: true
  }
});
```

### content_barrier

- Key: `context.content.barrier`
- Required: no **yes, if a barrier**
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

Set if a barrier is shown, a barrier which is stopping the user accessing the content. The value is a string and should be the name of the barrier. This is important to set as is used in the counted content calculation.

Set on a page e.g.

```js
oTracking.page({
  content: {
    barrier: "Premium"
  }
});
```

### content_hurdle

- Key: `context.content.hurdle`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

Similar to `barrier` above, but the older style hurdle. The value is a string and should be the name of the hurdle.

Set on a page e.g.

```js
oTracking.page({
  content: {
    hurdle: "h1"
  }
});
```

### content_section

- Key: `context.content.sitemap`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: yes

The primary section of the page. Normally we calculate this from the content's UUID. If that isn't possible, set it here as part of the page event e.g.

```js
oTracking.page({
  content: {
    sitemap: "World"
  }
});
```


### content_title

- Key: `context.content.title`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: yes

The title of the page. Normally we calculate this from the content's UUID. If that isn't possible, set it here as part of the page event e.g.

```js
oTracking.page({
  content: {
    title: "An article about something"
  }
});
```

## Device

### geo_ip

- Key: `device.ip`
- Required: no
- Default: `headers.fastly-client-ip`
- o-tracking automatic: no
- spoor pipeline automatic: yes

This is the IP address of the device. We will attempt to pick this up automatically from headers, but if this is not possible, set it here, normally at init. e.g.

```js
oTracking.init({
  device: {
    ip: '10.0.0.1'
  }
});
```

### is_offline

- Key: `device.is_offline`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

Boolean flag to signify if the device is currently offline. This is normally set at init e.g.

```js
oTracking.init({
  device: {
    is_offline: true
  }
});
```

### device_ua

- Key: `device.user_agent`
- Required: no
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: yes

The user agent of the device. This is normally resolved using headers, but if this isn't possible then set in init e.g.

```js
oTracking.init({
  device: {
    user_agent: navigator.userAgent
  }
});
```

**Note** `navigator.userAgent` does not give the same answer as headers for some browsers.

## User

### user_ft_session

- Key: `user.ft_session`
- Required: no **yes, if available**
- Default: *FTSession cookie*
- o-tracking automatic: yes
- spoor pipeline automatic: yes

The user's current session from membership's session API. If using o-tracking, this will be collected for you when available. The pipeline will also make an attempt to collect it from cookies. Otherwise you can set it on init e.g.

```js
oTracking.init({
  user: {
    ft_session: ""
  }
});
```

### user_ft_session_s

- Key: `user.ft_session_s`
- Required: no **yes, if available**
- Default: *FTSession_s cookie*
- o-tracking automatic: yes
- spoor pipeline automatic: yes

The user's current secure session from membership's session API. If using o-tracking, this will be collected for you when available. The pipeline will also make an attempt to collect it from cookies. Otherwise you can set it on init e.g.

```js
oTracking.init({
  user: {
    ft_session_s: ""
  }
});
```

### user_guid

- Key: `user.ft_guid`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

If unable to use the `user.ft_session` value above, and can only send the user's GUID, then do that here. Set on init e.g.

```js
oTracking.init({
  user: {
    ft_guid: ""
  }
});
```

## Marketing

### marketing_segment_id

- Key: `context.marketing.segmentid`
- Required: no
- Default: `url.querystring.segmentid`
- o-tracking automatic: no
- spoor pipeline automatic: no

The segment ID parameter. We will try to pick this up automatically from the URL querystring. If that won't give the correct result, it can be set for a page view.

```js
oTracking.page({
  marketing: {
    segmentid: "level1/level2/level3/level4/level5/level6"
  }
});
```

### marketing_ftcamp

- Key: `context.marketing.ftcamp`
- Required: no
- Default: `url.querystring.ftcamp`
- o-tracking automatic: no
- spoor pipeline automatic: no

The ftcamp parameter. We will try to pick this up automatically from the URL querystring. If that won't give the correct result, it can be set for a page view.

```js
oTracking.page({
  marketing: {
    ftcamp: "level1/level2/level3/level4/level5/level6"
  }
});
```

### marketing_segid

- Key: `context.marketing.segid`
- Required: no
- Default: `url.querystring.segid`
- o-tracking automatic: no
- spoor pipeline automatic: no

The segID parameter. We will try to pick this up automatically from the URL querystring. If that won't give the correct result, it can be set for a page view.

```js
oTracking.page({
  marketing: {
    segid: "level1/level2/level3/level4/level5/level6"
  }
});
```

## Funnels

### funnel_name

- Key: `context.funnel.funnel_name`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

The name of the funnel. e.g. "Premium sign-up"

```js
oTracking.page({
  funnel: {
    funnel_name: "Premium sign-up"
  }
});
```

### funnel_steps

- Key: `context.funnel.funnel_steps`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

The total number of steps in the funnel. e.g. 3

```js
oTracking.page({
  funnel: {
    funnel_steps: 3
  }
});
```

### funnel_step_name

- Key: `context.funnel.step_name`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

The name of the current step in the funnel. e.g. "start" or "billing details"

```js
oTracking.page({
  funnel: {
    step_name: "start"
  }
});
```

### funnel_step_number

- Key: `context.funnel.step_number`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

The 1-based-index of the current step in the funnel. e.g. 1 or 2 or 3. This is compared to the total funnel_steps above to calculate completed funnels.

```js
oTracking.page({
  funnel: {
    step_number: 3
  }
});
```

## System

### system_category

- Key: `category`
- Required: **yes**
- Default: `page`
- o-tracking automatic: yes
- spoor pipeline automatic: no

The category of the event. A noun. For page views, this is always "page" and is set for you by o-tracking.

```js
oTracking.page();
```

### system_action

- Key: `action`
- Required: **yes**
- Default: `view`
- o-tracking automatic: yes
- spoor pipeline automatic: no

The action of the event. A verb. For page views, this is always "view" and is set for you by o-tracking.

```js
oTracking.page();
```

### system_environment

- Key: `system.environment`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

A name for the product's environment e.g. production, prod, p, live, test etc.

If using o-tracking, this is usually set at init e.g.

```js
oTracking.init({
  system: {
    environment: "prod"
  }
});
```

### system_ticket

- Key: `ingest._headers.spoor-ticket`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

system_ticket

### device_spoor_id

- Key: `ingest._headers.spoor-device-id`
- Required: no
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: no

device_spoor_id

### event_id

- Key: `context.id`
- Required: no
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: no

event_id

### event_root_id

- Key: `context.root_id`
- Required: no
- Default: none
- o-tracking automatic: yes
- spoor pipeline automatic: no

event_root_id






