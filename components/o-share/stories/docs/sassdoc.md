# o-share Sass Documentation
## Mixins
### oShare
Output all o-share styles.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('icons': ('x', 'facebook', 'linkedin', 'link', 'share', 'mail', 'pinterest', 'whatsapp', 'corporate'), 'sizes': ('small'), 'vertical': true, 'inverse': true) |The o-share variants to include styles for (see the README for more details). |
#### Examples
##### Example 1
all styles.

```Output
@include oShare();
```
##### Example 2
styles for select variants.

```Output
@include oShare($opts: (
     'icons': ('x', 'facebook', 'linkedin', 'link', 'share', 'mail', 'pinterest', 'whatsapp', 'corporate'),
     'sizes': ('small'),
     'vertical': true,
     'inverse': true
 ));
```
## Variables
### o-share-is-silent (`Bool`)
Silent mode

### o-share-icon-size (`Number`)
Default icon size

### o-share-icon-small-size (`Number`)
Small variant icon size

### o-share-border-size (`Number`)
Border size

### o-share-border-style (`Number`)
Border style

### o-share-image-service-base-url (`String`)
Option to change the base of the image service url


### o-share-image-service-version (`String`)
Option to change the version of the image service url


### o-share-ft-icons-names (`Map`)

