# Rename the master brand

Proposal to rename the "master brand" to the "pink brand", or similar.

## motivation

As Nick rightly points out in Slack:

>Have seen some interesting conversation around the use of master in software and suggestions to move towards other words in possible to avoid the association with master/slave. Noticed our brands are called master, internal and whitelabel.
>
>Is this something worth considering when the opportunity comes up to review them?

https://financialtimes.slack.com/archives/C02FU5ARJ/p1592311869388000

Since, a proposal to the Tech Governance Group has been endorsed to [address offensive and objectionable technology terms](https://docs.google.com/document/d/1v6z7_NkLFeYAFotTYB8C1OguO5iMHHLpAOv_yG5EKHI/edit#heading=h.tzfu5ukd61s) which does a good job of explaining the motivation.

Separately from avoiding the use of master, it implies that to Origami one brand is more important than another, which isn't necessarily true, and its not very clear what master means. We often explain the master brand as "ft.com look" or "the pink one", including in our intro to Origami sessions. We're [not the only ones](https://financialtimes.slack.com/archives/CSW6B2VAN/p1616516634025100?thread_ts=1616500932.023500&cid=CSW6B2VAN) to use these terms to explain the master brand.

Changing the "master brand" to the "pink brand" will hopefully contribute in some way to a more welcoming environment for a diverse and inclusive workforce; avoid implying one brand is always a higher priority over another; and be more clear/easier to explain.

## work required

I believe the master brand originally came from the design team. To avoid confusion we would need to communicate with other teams to ensure we all refer to the master brand by its new name.

As the default brand, renaming the master brand effects quite a few projects. We could do this work cleanly, all at once, as part of our [move to NPM](https://origami.ft.com/blog/2021/01/18/deprecating-bower-and-origami-via-npm/), as that work already demands a new major of all components and a new version of the Origami Build Service. However we would need to complete the work within Q2 2021, else do the work later and maintain backward compatibility, which is much harder (see alternatives for steps required).

- [`origami-build-service`](https://github.com/Financial-Times/origami-build-service): the brand query parameter has an allowed list of brands which needs updating, etc.
- [`origami-build-tools`](https://github.com/Financial-Times/origami-build-tools), the default brand when building demos, component verification, etc.
- [`o-brand`](https://github.com/Financial-Times/o-brand): requires a major release so users and the Origami Build Service can set the current brand the new name.
- all components: use the latest release of `o-brand` and replace references in Sass and `origami.json`.
- [`origami-repo-data`](https://github.com/Financial-Times/origami-repo-data): has apis which accept a brand list and need to be aliased, to support old and new components.
- [`origami-registry-ui`](https://github.com/Financial-Times/origami-registry-ui): has hardcoded references to the master brand in templates etc
- [`create-origami-component`](https://github.com/Financial-Times/create-origami-component/): component boilerplate uses the master brand
- [origami-website](https://github.com/Financial-Times/origami-website/): documentation references the master brand, the v1 spec should document the master brand but include a note to say that v2 components switch to the new brand name
- [`origami-codedocs`](https://github.com/Financial-Times/origami-codedocs) `@brand` annotation tests

The extra work for users of components to upgrade would be minimal (updating a variable per project).

## Alternatives

### Other names

The same plan but a different name instead of master:

- Paper, this works for people familiar with the colour of the print edition.
- Main, this is less intuitive and implies priority in the same way was master, but avoids objectionable terminology.

### Do nothing

As the related [TGG proposal states](https://docs.google.com/document/d/1v6z7_NkLFeYAFotTYB8C1OguO5iMHHLpAOv_yG5EKHI/edit#heading=h.tzfu5ukd61s) "means we are not actively supporting and fostering an inclusive environment". It also means we have to keep explaining master means the pink/paper/ft.com one.

### Rollout after the transition to npm

This is more work and requires maintenance of both names over a period of time, until we release a new major of every component again.

All tools and services would need to introduce an alias to support current and future component releases; `o-brand` would need a major release; and all branded components would require Sass and `origami.json` updates, but that could happen over time.
