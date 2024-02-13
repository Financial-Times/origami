# o-social-follow Sass Documentation
## Mixins
### oSocialFollow
Output all o-social-follow styles.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('icons': ('twitter', 'facebook', 'linkedin', 'instagram'), 'themes': ('inverse')) |The o-social-follow variants to include styles for (see the README for more details). |
#### Examples
##### Example 1
all styles.

```Output
@include oSocialFollow();
```
##### Example 2
styles for select variants.

```Output
@include oSocialFollow($opts: (
     'icons': ('twitter', 'facebook', 'linkedin', 'instagram'),
     'standalone': true,
     'themes': ('inverse')
 ));
```
