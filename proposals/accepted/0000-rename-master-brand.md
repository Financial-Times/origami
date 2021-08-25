# Rename the master brand

Proposal to rename the "master brand" ~to the "pink brand", or similar~ "core brand".

## motivation

As Nick rightly points out in Slack:

>Have seen some interesting conversation around the use of master in software and suggestions to move towards other words in possible to avoid the association with master/slave. Noticed our brands are called master, internal and whitelabel.
>
>Is this something worth considering when the opportunity comes up to review them?

https://financialtimes.slack.com/archives/C02FU5ARJ/p1592311869388000

Since, a proposal to the Tech Governance Group has been endorsed to [address offensive and objectionable technology terms](https://docs.google.com/document/d/1v6z7_NkLFeYAFotTYB8C1OguO5iMHHLpAOv_yG5EKHI/edit#heading=h.tzfu5ukd61s) which does a good job of explaining the motivation.

Changing the "master brand" to the "core brand" will hopefully contribute in some way to a more welcoming environment for a diverse and inclusive workforce.

### why "core"

Kati (creative director) took this proposal to her team and other stakeholders who decided on "core" collectively. The brand team are now moving forward with "core brand" over "master brand" in future brand guidelines. Previous iterations of the proposal listed additional motivations to make it easier to explain/visualise the brand and avoid suggesting one brand was the most important - with name "ft pink" or "ft paper". However the brand team's feedback on that was that other brands do build of the core brand and they felt it was important to reflect that in the name, and that whilst paper/pink can refer to an FT editorial offering, it is also a colour and one that we use often, not always.

## work required

~I believe the master brand originally came from the design team. To avoid confusion we would need to communicate with other teams to ensure we all refer to the master brand by its new name.~ 

Introduce an alias in o-brand and services, and update documentation:
- [`origami-build-service`](https://github.com/Financial-Times/origami-build-service): the brand query parameter has an allowed list of brands which needs updating / aliasing.
- [`origami-build-tools`](https://github.com/Financial-Times/origami-build-tools), an alias for building demos, component verification, etc.
- [`o-brand`](https://github.com/Financial-Times/o-brand): requires an alias
- all components: update `origami.json`.
- [`origami-repo-data`](https://github.com/Financial-Times/origami-repo-data): has apis which accept a brand list and need to be aliased, to support old and new components.
- [`origami-registry-ui`](https://github.com/Financial-Times/origami-registry-ui): has hardcoded references to the master brand in templates etc
- [`create-origami-component`](https://github.com/Financial-Times/create-origami-component/): component boilerplate uses the master brand
- [origami-website](https://github.com/Financial-Times/origami-website/): documentation references the master brand
- [`origami-codedocs`](https://github.com/Financial-Times/origami-codedocs) `@brand` annotation tests
- Create issues to remove the deprecated master alias in the next major version of o-brand and affected services. Code changes for users would be minimal but would cause a major cascade (major release of all components), so perhaps one to batch with other major releases.

## Alternatives

### Other names

The same plan but a different name instead of master:

- Paper, this works for people familiar with the colour of the print edition.
- Main, this is less intuitive and implies priority in the same way was master, but avoids objectionable terminology.

### Do nothing

As the related [TGG proposal states](https://docs.google.com/document/d/1v6z7_NkLFeYAFotTYB8C1OguO5iMHHLpAOv_yG5EKHI/edit#heading=h.tzfu5ukd61s) "means we are not actively supporting and fostering an inclusive environment". It also means we have to keep explaining master means the pink/paper/ft.com one.
