# Expose current release number to the component's own code
## What

I'd like each component to expose its current version number in a new module generated dynamically during the release.

## Why

Being able to access the current version number from code can make debugging easier but, specially, it can be essential for some monitoring use cases in which sending the component version number along with some tracking events can prove useful.

## Supporting Examples

`o-ads` is already exposing it through a [`getVersion` method](https://github.com/Financial-Times/o-ads/blob/7832e1c7e9f3004485261cd52901c4313ccc22cf/src/js/utils/index.js#L453) by [creating a `version.js` file](https://github.com/Financial-Times/o-ads/blob/626e0715f03690692c18172d5d7e8e9e91a25c25/package.json#L27) which exports the version number during its bespoke release process using [release-it](https://github.com/Financial-Times/o-ads/blob/6dfd500f979b53e5e93ba09dddbf4658d8201811/.release-it.json#L2)

