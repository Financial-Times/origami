# comment:report_submission

A comment:report_submission event is sent on all clicks that submit a report on a comment. Excluded opening the overlay

---------

These are the documented parameters for a comment:report_submission event.

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
- Value: `report_submission`
- o-tracking automatic: no
- spoor pipeline automatic: no



### comment_ID

- Key: `context.comment_ID`
- Required: **yes**
- Value: `<comment ID>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Unique ID for Comment



### thread_ID

- Key: `context.thread_ID`
- Required: **yes**
- Value: `<thread ID>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Unique ID for Thread



### action_type

- Key: `context.action_type`
- Required: **yes**
- Value: `<reported comment issue>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Identifies the type of issue submitted
- Current possible values: `(spam|offensive|disagree|off topic)`



### is_reply

- Key: `context.is_reply`
- Required: **yes**
- Value: `<Boolean>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Flag's for whether the event was for a thread reply or the root of a thread. Two values:
1. Event is a reply: `1`
2. Event is the root of a thread `0`



### is_success

- Key: `context.is_reply`
- Required: **yes**
- Value: `<Boolean>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Flag's for whether the event was successful
1. Successful: `1`
2. Unscuccessful:  `0`



### commentor_name

- Key: `context.commentor_name`
- Required: **yes**
- Value: `<commentor pseudoname>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Pseudoname of commenetor



### character_count

- Key: `context.character_count`
- Required: **yes**
- Value: `<characters in comment>`
- o-tracking automatic: no
- spoor pipeline automatic: no

The number of characters in the comment



### comment_depth

- Key: `context.comment_depth`
- Required: **yes**
- Value: `<Number of comments above the comment acted on - at a page level>`
- o-tracking automatic: no
- spoor pipeline automatic: no



### thread_depth

- Key: `context.thread_depth`
- Required: **yes**
- Value: `<Number of comments above the comment acted on - at a thread level>`
- o-tracking automatic: no
- spoor pipeline automatic: no
