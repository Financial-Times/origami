## Migration Guide

### Upgrading from v4 to v5



### Upgrading from v3 to v4

o-colors v4.x.x updates the entire palette of colors and adds a lot more functionality through new mixins and functions. The palette has been reduced from over 60 colors to a base palette of around 20 colors. These colors can be manipulated using new mixins to get a wide range of on brand colors accessibility compliant colors.

In addition, new use cases have been added for `opinion`, `hero` and `highlight` branding.
The `product-brand` use case has been removed.

To migrate from v3.x.x to use v4.x.x you will need to update the palette colors you are requesting using `oColorsFor`, `oColorsSetUseCase`, and `oColorsGetPaletteColor`. To work out which color names you need to update, see the following table:

| Old name              | Switch to                        |
| --------------------- |----------------------------------|
| pink                  | paper                            |
| blue                  | oxford                           |
| dark-blue             | oxford-60                        |
| orange                | mandarin                         |
| grey-tint1            | black-30                         |
| grey-tint2            | black-40                         |
| grey-tint3            | black-50                         |
| grey-tint4            | black-70                         |
| grey-tint5            | black-80                         |
| pink-tint1            | black-5                          |
| pink-tint2            | black-10                         |
| pink-tint3            | black-20                         |
| pink-tint4            | black-30                         |
| pink-tint5            | black-50                         |
| red                   | crimson                          |
| green                 | jade                             |
| orange-tint1          | _consult a designer_             |
| brown-tint1           | _consult a designer_             |
| yellow-tint1          | _consult a designer_             |
| green-tint1           | _consult a designer_             |
| bluegreen-tint1       | _consult a designer_             |
| silver-tint1          | _consult a designer_             |
| purple-tint1          | _consult a designer_             |
| purple-tint2          | black-50 (_consult a designer_)  |
| red-tint1             | _consult a designer_             |
| red-tint2             | _consult a designer_             |
| red-tint3             | _consult a designer_             |
| red-tint4             | _consult a designer_             |
| red-tint5             | _consult a designer_             |
| blue-tint1            | _consult a designer_             |
| blue-tint2            | _consult a designer_             |
| blue-tint3            | _consult a designer_             |
| blue-tint4            | _consult a designer_             |
| blue-tint5            | _consult a designer_             |
| section-purple        | velvet                           |
| section-light-purple  | _consult a designer_             |
| section-blue          | blue-80                          |
| section-light-blue    | sky                              |
| section-green         | use `oColorsGetTint('jade', 65)` |
| section-light-green   | _consult a designer_             |
| section-red           | crimson                          |
| warm-1                | wheat                            |
| warm-2                | black-5                          |
| warm-3                | black-20                         |
| warm-4                | black-90                         |
| warm-5                | white-60                         |
| warm-6                | black-80 (_consult a designer_)  |
| cold-1                | black-70                         |
| cold-2                | black-80                         |
| cold-3                | black-90                         |
| blue-1                | oxford-30                        |
| blue-2                | _consult a designer_             |
| purple-1              | velvet                           |
| purple-2              | _consult a designer_             |
| teal-1                | teal-40                          |
| teal-2                | teal-80                          |
| claret-1              | claret                           |
| claret-2              | candy                            |
| claret-inverse        | claret-30                        |
| org-b2b               | org-b2c                          |
| org-b2c-dark          | org-b2c-dark                     |
| org-b2c-light         | org-b2c-light                    |
