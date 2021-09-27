# comment:sort

A comment:sort event is sent on any click that would sort, or filter the comments list of an article

---------

These are the documented parameters for a comment:sort event.

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
- Value: `sort`
- o-tracking automatic: no
- spoor pipeline automatic: no



### action_type

- Key: `context.action_type`
- Required: **yes**
- Value: `<type of sort/filter event>`
- o-tracking automatic: no
- spoor pipeline automatic: no

identifies the subcategories of the comment:sort action type. Possible values:
1. Sorting by Newest: `Newest`
2. Sorting by Oldest: `Oldest`
3. Sorting by Most Recommended: `Most Recommended`
