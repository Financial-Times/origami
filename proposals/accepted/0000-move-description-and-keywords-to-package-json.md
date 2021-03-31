# Move `description` and `keywords` from origami.json to package.json

Moving some component fields from origami.json into package.json to let them be usable via npm registries and not to be duplicated in the codebase

## motivation

Our users could find our components via the npm cli or website by searching something related to a component instead of only by the name of a component
E.G. searching "origami navigation" could return the header and footer components.

## explanation

Our components will soon only be on npm registries, not bower registries and npm registries search for packages based on the package.json manifest fields:
- `name`
- `description`
- `keywords`

Two of those fields (`description` and `keywords`) currently exist in our own origami.json manifest, I tried to find the reason for this (they could have been defined in the bower.json manifest) but it seems to be lost to the sands of time.

If we moved those fields from origami.json to package.json, then npm clients can use those fields.

The suggestion is to move the fields instead of duplicating them in both files to make it simpler to maintain. If they were in both files, they could have different values and cause confusion for contributors.


## work required

From what I can think of, the work required is:

- Update the component specification to define these fields in package.json instead of [`origami.json`](https://github.com/Financial-Times/origami-website/blob/main/_specification-v1/manifest.md#description)
- Updating Origami-Repo-Data to look in package.json for those fields instead of origami.json -- This looks already done for both fields, [`description`](https://github.com/Financial-Times/origami-repo-data/blob/c5a022d0682ed2b0620ba10451e8bea4f8ae7612/models/version.js#L220-L237), [`keywords`](https://github.com/Financial-Times/origami-repo-data/blob/c5a022d0682ed2b0620ba10451e8bea4f8ae7612/models/version.js#L255-L273)
- Origami Build Tools' verify task would need to stop checking origami.json for these fields and instead check package.json. It currently only checks for [`description`](https://github.com/Financial-Times/origami-build-tools/blob/master/lib/tasks/verify-origami-json.js#L23-L25) and not for `keywords`
- Origami Build Tools' init task, which uses Create Origami Component would need to update the package.json and [`origami.json`](https://github.com/Financial-Times/create-origami-component/blob/master/templates/origami-manifest.js#L3-L4) templates

## alternatives

### Do nothing

We would have the same npm experience we have now, which only let's people find a component if they already know it's name.
Doing nothing also means we would not need to do any of the work mentioned above.


## supporting examples

Packages which are published only to npm usually have these fields defined to help discoverability.

Such as [ExpressJS' fields](https://github.com/expressjs/express/blob/508936853a6e311099c9985d4c11a4b1b8f6af07/package.json#L3-L29)
