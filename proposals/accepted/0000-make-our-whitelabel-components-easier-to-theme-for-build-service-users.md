# Make our whitelabel components easier to theme for build service users
## What
Look into using CSS variables or some similar browser-based technology which allows our components CSS to be customised.

## Why
We currently don't have a way to customise the whitelabel components for user s who are consuming them via the build service.

## Supporting Examples
o-meter already does this because we decided that the fallback for IE 11 would be text based instead, which meant we could use CSS variables to customise the component.
