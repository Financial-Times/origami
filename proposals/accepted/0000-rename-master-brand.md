# put your proposal title here

Proposal to rename the "master brand" to the "main brand", or similar.

## motivation

As Nick rightly points out in Slack:

>Have seen some interesting conversation around the use of master in software and suggestions to move towards other words in possible to avoid the association with master/slave. Noticed our brands are called master, internal and whitelabel.
>
>Is this something worth considering when the opportunity comes up to review them?

https://financialtimes.slack.com/archives/C02FU5ARJ/p1592311869388000

## work required

I believe the master brand originally came from the design team. To avoid confusion we would need to communicate with other teams to ensure we all refer to the master brand by its new name.

As the default brand, renaming the master brand effects quite a few projects. Tools and services would need to introduce an alias to support current and future component releases; `o-brand` would need a major release; and all branded components would require Sass and `origami.json` updates, but that could happen over time.

To replace the brand in user facing contexts, updates are required to the following projects:

- [`o-brand`](https://github.com/Financial-Times/o-brand): requires updates so users and the Origami Build Service can set the current brand to either `master` or the new name. I.e. the `$o-brand` variable needs to be aliased where accessed internally; with `oBrandGetCurrentBrand` continuing to return `master` in both cases. With a major `o-brand` release to swap the return of `oBrandGetCurrentBrand` to the new name
- [`origami-repo-data`](https://github.com/Financial-Times/origami-repo-data): has apis which accept a brand list and need to be aliased
- [`origami-registry-ui`](https://github.com/Financial-Times/origami-registry-ui): has hardcoded references to the master brand in templates etc, which need to be aliased
- [`origami-build-service`](https://github.com/Financial-Times/origami-build-service): the brand query parameter has an allowed list of brands, which needs to include the new master brand name
- [`origami-bundle-size-cli`](https://github.com/Financial-Times/origami-bundle-size-cli/): references the master brand in its output
- [`create-origami-component`](https://github.com/Financial-Times/create-origami-component/): component boilerplate uses the master brand
- [origami-website](https://github.com/Financial-Times/origami-website/): documentation references the master brand

To remove internal master brand references:

- Update each component to upgrade to the latest release of `o-brand` and replace references in Sass and `origami.json`.
- Update [`origami-build-tools`](https://github.com/Financial-Times/origami-build-tools) SassDoc and tests
- Update [`origami-codedocs`](https://github.com/Financial-Times/origami-codedocs) `@brand` annotation tests
- A new version of the [`origami-repo-data`](https://github.com/Financial-Times/origami-repo-data) api to no longer accept the master brand in api requests and to normalise the brand returned for existing component releases. The latter would allow the brand alias to be removed from [`origami-registry-ui`](https://github.com/Financial-Times/origami-registry-ui).
- A new version of the [`origami-build-service`](https://github.com/Financial-Times/origami-build-service) api to no longer accept the master brand.

With the above changes, I think the only reference to the master brand would be an alias in `o-brand`, to support projects which have set `$o-brand: master`.
