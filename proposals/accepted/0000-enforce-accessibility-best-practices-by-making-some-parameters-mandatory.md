# Enforce accessibility best practices by making some parameters mandatory
## What

Enforce accessibility best practices by making some component parameters mandatory.

## Details

We often see issues raised in the DAC accessibility report that are caused by people using components and not using some of the options designed to provide extra context. A example would be the `closeButtonLabel` in [o-banner](https://github.com/Financial-Times/o-banner#options)

In the past we have fixed some of these by creating a catch all default but these often fall short as they are missing the context required from the parent application.

We could throw an error in a similar way to the errors thrown for not setting a theme https://github.com/Financial-Times/o-banner/blob/master/src/js/banner.js#L52

As this would need to be a new breaking changing we would want to review all the options along with any other accessibility options we don't currently have but would be nice to add at the same time.
