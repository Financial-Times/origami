# text:copy

An event sent when text is copied by a visitor.

---------

These are the documented parameters for a text:copy event.

## Required

### system_category

- Key: `category`
- Required: **yes**
- Default: none
- o-tracking automatic: **no**
- spoor pipeline automatic: no

The category of the event. A noun. For text:copy, this should be "text".

```js
oTracking.event({
  category: 'text'
});
```

### system_action

- Key: `action`
- Required: **yes**
- Default: `view`
- o-tracking automatic: yes
- spoor pipeline automatic: no

The action of the event. A verb. For text:copy, this should be "copy".

```js
oTracking.event({
  category: 'copy'
});
```

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

### characters

- Key: `context.characters`
- Required: **yes**
- Default: none
- o-tracking automatic: **no**
- spoor pipeline automatic: **no**

The number of characters copied.

If using o-tracking, this is usually set at the time of the event. e.g.

```js
oTracking.event({
  context: {
    characters: 56
  }
});
```

### words

- Key: `context.words`
- Required: no
- Default: none
- o-tracking automatic: no
- spoor pipeline automatic: no

The number of words copied.

If using o-tracking, this is usually set at the time of the event. e.g.

```js
oTracking.event({
  context: {
    words: 56
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

## System

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






