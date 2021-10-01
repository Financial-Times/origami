---
title: Origami Newsletter, June 2019
description: This issue announces a new team member, covers improvements to our operational documentation, and some projects that we built in our 10% time.
author: Rowan Manning
tags:
  - Newsletter
---

**TL;DR:** This issue announces a new team member, covers improvements to our operational documentation, and some projects that we built in our 10% time.

## Top three things

These are some of the bigger things we've done over the last month.

### New Team Member

We're super pleased to announce that Chee Rabbits will be joining the Origami team starting in July! 🎉 Their extensive knowledge of the web, and their general enjoyment of helping people makes them a great fit for the team. We were impressed with all of the internal candidates that we interviewed, so I'd like to thank them again for their time and enthusiasm. Also a big thanks to Customer Products for being supportive of Chee's move.

### Operational Documentation

We've spent a lot of time this month improving our operational documentation, using the excellent [System Operability Score (SOS) app](https://sos.in.ft.com/). Our experience using SOS has been great, and it definitely encouraged us to stop putting off improving our service's operability. Also we're pretty proud to be at the top of the team leaderboard 😉.

### 10% Time

We recently introduced 10% time to the team, and this has been the first month when we managed to kick off some of the projects, experiments, or self-learning exercises that we are rarely able to prioritise. We have two projects on the go: The [Origami ScreenCap Service](https://origami-screencap.ft.com/v1) allows you to automate screenshots, and was built to experiment with demo thumbnails in our registry; [Origami Migration Guru (OMG)](https://github.com/Financial-Times/origami-migration-guru) is a command-line tool to help plan major version bumps on a project which has lots of dependents.

## Special thanks

Our special thanks this month goes to Dawn Budge, Remy Bach, Matt Hinchliffe, Mark Hale, and anyone else who helped to improve our components after the recent DAC (Digital Accessibility Centre) report. Building accessible components is really important to us, and we're always happy to get contributions from other people at the FT. Thanks all!

## Broader update

A digest list of other things that have happened over the last month.

- MINOR: 6 new faces were published to [our headshot image set](https://registry.origami.ft.com/components/headshot-images).
- MINOR: o-header-services v3.3.0 was released, [updating the default drawer behaviour for fDi Intelligence](https://github.com/Financial-Times/o-header-services/issues/102)
- PATCH: o-buttons has had some updates to help with DAC accessibility compliance [v5.16.5 and v5.16.6 were released](https://github.com/Financial-Times/o-buttons/releases).
- PATCH: o-forms has been patched a few times since the v7.0.0 release, we're now on v7.0.9. [See the releases for more information](https://github.com/Financial-Times/o-forms/releases). We also patched the previous major version, which is now v6.0.3.
- PATCH: o-header [v7.8.7, v7.8.8, and v7.8.9 were all released](https://github.com/Financial-Times/o-header/releases), fixing some accessibility issues raised by DAC (Digital Accessibility Centre). Thanks to Matt Hinchliffe
- PATCH: o-overlay was [patched a couple of times in v2.7.6 and v2.7.7](https://github.com/Financial-Times/o-overlay/releases) to meet DAC accessibility requirements.
- PATCH: o-teaser was [bumped to v3.5.5](https://github.com/Financial-Times/o-teaser/releases/tag/v3.5.5), fixing a CSS issue. Thanks Dawn Budge for this.
- PATCH: o-tooltip was [bumped to v3.5.1](https://github.com/Financial-Times/o-tooltip/releases/tag/v3.5.1), fixing up the font loading in our demos.
- PATCH: we did a bit of maintenance of our FT logo images repo in [v1.9.4 and v1.9.5](https://github.com/Financial-Times/logo-images/releases).
