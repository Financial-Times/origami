# Page:view

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

The url of the current page. (Remember the definition of "page" at the top of this file.)

If using o-tracking, it is picked up for you using `document.URL`, if this isn't a suitable value, then it's usually sent with each page. e.g.

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

### content_counted

- Key: `context.content.counted`
- Required: no
- Default: none
- o-tracking automatic: no

Flag identifying if the page being viewed should be counted. Note, we will automatically determine this from the content's UUID, and that is the preferred method. This parameter is available for cases where there is no uuid.

If using o-tracking set on the page e.g.

```js
oTracking.page({
  content: {
    counted: true
  }
});
```

### referrer

- Key: `context.referrer`
- Required: no
- Default: `document.referrer`
- o-tracking automatic: yes

The referrer of the current page. o-tracking will pick this up automatically for you, using `document.referrer`. If this will give the wrong value, set on the page event e.g.

```js
oTracking.page({
  referrer: "http://www.example.com"
});
```

### content_barrier

- Key: `context.content.barrier`
- Required: no
- Default: none
- o-tracking automatic: no

Set if a barrier is shown, stopping the user accessing the content. The value is a string and should be the name of the barrier.

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

content_section

### content_title

- Key: `context.content.title`
- Required: no
- Default: none
- o-tracking automatic: no

content_title

## Device

### geo_ip

- Key: `device.ip`
- Required: no
- Default: `headers.fastly-client-ip`
- o-tracking automatic: no

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

The user's current session from membership's session API. If using o-tracking, this will be collected for you when available. Otherwise you can set it on init e.g.

```js
oTracking.init({
  user: {
    ft_session: ""
  }
});
```

### user_guid

- Key: `user.ft_guid`
- Required: no
- Default: none
- o-tracking automatic: no

If unable to use the `user.ft_session` value above, and can only send the user's GUID, then do that here. Set on init e.g. 

```js
oTracking.init({
  user: {
    ft_guid: ""
  }
});
```

## Marketing

### marketing_ftcamp

- Key: `context.marketing.ftcamp`
- Required: no
- Default: `url.querystring.ftcamp`
- o-tracking automatic: no

marketing_ftcamp

### marketing_segid

- Key: `context.marketing.segid`
- Required: no
- Default: `url.querystring.segid`
- o-tracking automatic: no

marketing_segid

### marketing_segment_id

- Key: `context.marketing.segmentid`
- Required: no
- Default: `url.querystring.segmentid`
- o-tracking automatic: no

marketing_segment_id

## Funnels

### funnel_name

- Key: `context.funnel.funnel_name`
- Required: no
- Default: none
- o-tracking automatic: no

funnel_name

### funnel_steps

- Key: `context.funnel.funnel_steps`
- Required: no
- Default: none
- o-tracking automatic: no

funnel_steps

### funnel_step_name

- Key: `context.funnel.step_name`
- Required: no
- Default: none
- o-tracking automatic: no

funnel_step_name

### funnel_step_number

- Key: `context.funnel.step_number`
- Required: no
- Default: none
- o-tracking automatic: no

funnel_step_number

## System

### system_category

- Key: `category`
- Required: **yes**
- Default: `page`
- o-tracking automatic: yes

system_category  

### system_action

- Key: `action`
- Required: **yes**
- Default: `view`
- o-tracking automatic: yes

system_action

### system_environment

- Key: `system.environment`
- Required: no
- Default: none
- o-tracking automatic: no

A name for the product's environment e.g. production, prod, p, live, test etc.

If using o-tracking, this is usually set at init e.g.

```js
oTracking.init({
  system: {
    environment: "prod"
  }
});
```

### system_is_live

- Key: `system.is_live`
- Required: no
- Default: true
- o-tracking automatic: no

A boolean value identifying the live system. As we can't work out all the possible values from `system.environment` above, we use this boolean to filter out test traffic.

If using o-tracking, this is usually set at init e.g.

```js
oTracking.init({
  system: {
    is_live: true
  }
});
```

### system_ticket

- Key: `ingest._headers.spoor-ticket`
- Required: no
- Default: none
- o-tracking automatic: no

system_ticket

### device_spoor_id

- Key: `ingest._headers.spoor-device-id`
- Required: no
- Default: none
- o-tracking automatic: yes

device_spoor_id

### event_id

- Key: `context.id`
- Required: no
- Default: none
- o-tracking automatic: yes

event_id

### event_root_id

- Key: `context.root_id`
- Required: no
- Default: none
- o-tracking automatic: yes

event_root_id






