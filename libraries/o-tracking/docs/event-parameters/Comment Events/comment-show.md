# comment:show

A comment:show event is sent on any click that would show, expand or drop down the comment section

---------

These are the documented parameters for a comment:show event.

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
- Value: `show`
- o-tracking automatic: no
- spoor pipeline automatic: no



### action_type

- Key: `context.action_type`
- Required: **yes**
- Value: `<type of show event>`
- o-tracking automatic: no
- spoor pipeline automatic: no

identifies the specific button used. Possible values:
1. Button/link at top of the article: `article top`
2. Button/link at bottom of the article: `article bottom`
3. "Show more comments" button: `show more comments`
4. Comment Alert Button: `comment alert`
