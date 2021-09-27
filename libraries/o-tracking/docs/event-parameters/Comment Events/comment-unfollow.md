# comment:unfollow

A comment:unfollow event is sent on any click that would result in the selected to "unfollow" option when posting a comment (after previously selectign the follow option).

---------

These are the documented parameters for a comment:unfollow event.

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
- Value: `unfollow`
- o-tracking automatic: no
- spoor pipeline automatic: no



### action_type

- Key: `context.action_type`
- Required: **yes**
- Value: `unfollow`
- o-tracking automatic: no
- spoor pipeline automatic: no
