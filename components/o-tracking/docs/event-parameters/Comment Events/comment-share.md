# comment:share

A comment:share event is sent on any click that would result in sharing of a comment. Includes opening the comment share overlay.

---------

These are the documented parameters for a comment:share event.

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
- Value: `share`
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
- Value: `<type of share>`
- o-tracking automatic: no
- spoor pipeline automatic: no

identifies how the comment was shared. Possible values:
1. Opening the Overlay: `overlay open`
2. Clicking on a Twitter link: `twitter`
3. clicking on a Facebook link: `facebook`
4. clicking on the share call to action: `share`
5. clicking the email link: `email`



### is_reply

- Key: `context.is_reply`
- Required: **yes**
- Value: `<Boolean>`
- o-tracking automatic: no
- spoor pipeline automatic: no

Flag's for whether the event was for a thread reply or the root of a thread. Two values:
1. Event is a reply: `1`
2. Event is the root of a thread `0`



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