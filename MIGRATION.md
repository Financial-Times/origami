## Migration

### Migrating from v5 to v6

In version 6 the commenting provider has been updated from Livefyre to [Coral Talk](https://coralproject.net/talk/) and as a result version 6 is a complete rewrite.


#### Event naming

In v6 the naming of events has changed and all events use a dot notation that has three sections.

1. Category
2. Action
3. State

The table below shows the mapping of old events to new.

| Old event              | New event                   |
| ---------------------- | --------------------------- |
| error.init             | Not mapped yet              |
| error.widget           | Not mapped yet              |
| error.livefyreJs       | Deprecated                  |
| data.init              | Not mapped yet              |
| data.auth              | Not mapped yet              |
| widget.timeout         | Not mapped yet              |
| widget.ready           | Deprecation candidate       |
| widget.load            | Deprecation candidate       |
| widget.renderComplete  | component.render.successful |
| tracking.postComment   | comment.posted.successful   |
| tracking.likeComment   | comment.liked.successful    |
| tracking.shareComment  | Deprecation candidate       |
| tracking.socialMention | Deprecated                  |
| auth.login             | auth.login.successful       |
| auth.loginRequired     | auth.login.required         |


### Migrating from v4 to v5

The dependency `dom-delegate` has been replaced by `ftdomdelegate`. If your project depends on `dom-delegate`, switch to `ftdomdelegate@^3.0.0` instead -- their api is the same, but `dom-delegate` is now deprecated. Ensure your project builds without conflicts.
