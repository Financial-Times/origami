# comment:settings

A comment:settings event is sent on any clicks to open the comment settings overlay and on the overlay itself

---------

These are the documented parameters for a comment:settings event.

## Required

### system_category

- Key: `category`
- Required: **yes**
- Value: `comment`
- o-tracking automatic: no
- spoor pipeline automatic: no




### system_action

- Key: `action`
- Required: **yes**
- Value: `settings`
- o-tracking automatic: no
- spoor pipeline automatic: no



### action_type

- Key: `context.action_type`
- Required: **yes**
- Value: `<type of event>`
- o-tracking automatic: no
- spoor pipeline automatic: no

identifies the subcategories of the comment:settings action type. Possible values:
1. Opening the comment-settings overlay: `open overlay`
2. Saving comment-settings actions: `save`
3. Cancel comment-settings action: `cancel`


