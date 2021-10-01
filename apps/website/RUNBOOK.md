<!--
    Written in the format prescribed by https://github.com/Financial-Times/runbook.md.
    Any future edits should abide by this format.
-->
# Origami Documentation

A site to document the Origami team, components, and services.

## Code

origami

## Service Tier

Bronze

## Lifecycle Stage

Production

## Primary URL

https://origami.ft.com/

## Host Platform

GitHub Pages

## Contains Personal Data

No

## Contains Sensitive Data

No

## Can Download Personal Data

No

## Can Contact Individuals

No

## Failover Architecture Type

NotApplicable

## Failover Process Type

NotApplicable

## Failback Process Type

NotApplicable

## Data Recovery Process Type

Manual

## Release Process Type

FullyAutomated

## Rollback Process Type

Manual

## Key Management Process Type

NotApplicable

## Architecture

The Origami website is built using [Jekyll](http://jekyllrb.com/) and is hosted on [GitHub Pages](https://pages.github.com/). Commits on the `master` branch are automatically deployed.

## First Line Troubleshooting

As this is a bronze service which is likely only used in business hours, please send an email to the managing team and somebody will fix when we're in the office.

## Second Line Troubleshooting

If the application is failing entirely, you may not be able to recover it as this normally indicates that GitHub is down. In that case, waiting is the answer.

If certain pages or site features have ceased to work, it is most likely related to a recent commit. Always roll back a commit if one happened just before the thing stopped working – this gives you the chance to debug in the relative calm of your local development environment.

If local and production look different, it may be an issue with dependency versions. In this case, it's best to update to use the latest version of the `github-pages` gem and try running the application again.

## Monitoring

No monitoring is used on this site, as the only thing that can take it down is GitHub Pages being down.

## Failover Details

We rely on GitHub to handle failover, as we have no control over the availability of GitHub Pages.

## Data Recovery Details

This system has no data to recover, apart from Markdown stored in the GitHub repository. We'd recover from data loss by rolling back commits that remove it.

## Release Details

The website is updated automatically when a new commit appears on the `master` branch.

## Key Management Details

This application uses no keys.
