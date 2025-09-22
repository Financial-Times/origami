## Migration

### Migrating to v13.1.0

v13.1.0 includes a change to use Image Service V3. Whilst the change should be unobtrusive, there are some checks you will need to perform.

Image service V3 uses a hosts configuration, meaning **a valid system code must be used in order to make image requests** this can be set in you Sass configuration as a global.
 
```scss
//global scope of your Sass code
$system-code: 'next-article';
```

Your system must appear in the valid hosts for the Image Service, please refer to the [Image Service documentation](https://github.com/Financial-Times/image-service?tab=readme-ov-file#systems--hosts).

### Migrating from v11 to v12

This major release introduces a new design language and visually breaking changes. This includes mobile optimised typography, icons, and buttons. It also removes peer dependencies from deprecated "o2" components.

To upgrade, replace the following "o2" components with their "o3" equivalent:

- [o-normalise](../o-normalise/MIGRATION.md)
- [o-spacing](../o-spacing/MIGRATION.md)
- [o-colors](../o-colors/MIGRATION.md)
- [o-icons](../o-icons/MIGRATION.md)
- [o-buttons](../o-buttons/MIGRATION.md)
- [o-typography](../o-typography/MIGRATION.md)
- [o-editorial-typography](../o-editorial-typography/MIGRATION.md)
- [o-big-number](../o-big-number/MIGRATION.md)
- [o-quote](../o-quote/MIGRATION.md)
- [o-fonts](../o-fonts/MIGRATION.md)

### Migrating from v10 to v11

To migrate you need to have a page that will display the illegal comments report form, existing on an available path e.g. https://github.com/Financial-Times/next-article/commit/3dca12c19ee223f654d11cf74ad8d545e1bad0b7. This defaults to switching `/content/` to `/article/comment-report/` but you can specify your own paths.

### Migrating from v9 to v10

To migrate you need to have the coral API in version 7 and change the urls to fetch fonts and styles on coral API admin to fetch styles from this version . See more in (documentation)[https://docs.coralproject.net/migrating-6-to-7#after-coral-has-been-updated-to-v7]

### Migrating from v8 to v9

To migrate update your projects use of the `oComments` sass mixin. Set its `coral-talk-iframe` option to `false`.

```diff
-@include oComments();
+@include oComments($opts: ('coral-talk-iframe': false));
```

### Migrating from v7 to v8

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v6 to v7

Dependencies have all been updated to the latest major versions. If you have any conflicts while installing this version, you'll need to first upgrade those dependencies also. See [the Bower config for these](./bower.json).

### Migrating from v5 to v6

In version 6 the commenting provider has been updated from Livefyre to [Coral Talk](https://coralproject.net/talk/) and as a result version 6 is a complete rewrite.

#### Event naming

In v6 the naming of events has changed and all events use a dot notation.

The table below shows the mapping of old events to new.

| Old event              | New event             |
| ---------------------- | --------------------- |
| error.init             | Not mapped yet        |
| error.widget           | Not mapped yet        |
| error.livefyreJs       | Deprecated            |
| data.init              | Not mapped yet        |
| data.auth              | Not mapped yet        |
| widget.timeout         | Not mapped yet        |
| widget.ready           | Deprecation candidate |
| widget.load            | Deprecation candidate |
| widget.renderComplete  | oComments.ready       |
| tracking.postComment   | oComments.postComment |
| tracking.likeComment   | ocomments.likeComment |
| tracking.shareComment  | Deprecation candidate |
| tracking.socialMention | Deprecated            |
| auth.login             | Not mapped yet        |
| auth.loginRequired     | Not mapped yet        |

### Migrating from v4 to v5

The dependency `dom-delegate` has been replaced by `ftdomdelegate`. If your project depends on `dom-delegate`, switch to `ftdomdelegate@^3.0.0` instead -- their api is the same, but `dom-delegate` is now deprecated. Ensure your project builds without conflicts.
