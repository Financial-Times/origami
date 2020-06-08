# Migrate to Dependabot Native

[Originally defined in an issue](https://github.com/Financial-Times/origami/issues/62) before being moved here.

Dependabot was bought by Github, and it seems some features are being dropped.
For example automerging. This is an error message for a component when updating
config to the Dependabot native format:
```
Your account is using automerging. There is no automerging support in GitHub-native Dependabot, so these settings will not be added to the new config file. Several 3rd-party GitHub Actions and bots can replicate the automerge feature.
You have disabled “Create a merge commit if a PR is merged by Dependabot”. This setting no longer supported, so these settings will not be added to the new config file.
```

Although dependabot-preview is still supported ["whilst \[they\] integrate its features directly into GitHub"](https://dependabot.com/blog/hello-github/#what-is-happening-to-the-existing-dependabot-product), we should upgrade to Dependabot native proactively.

## Proposal
- [Upgrade projects to use Dependabot native](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)
- Replace the automerge feature (see below).

### Replace The Automerge Feature
I haven't come across a drop in replacement and am open to ideas, but propose we use [pascalgn/automerge-action](https://github.com/pascalgn/automerge-action) to auto merge passing and approved PRs with an `automerge` label.

We could add the `automerge` label to Dependabot PRs using the [origami-apply-labels](https://github.com/Financial-Times/origami-apply-labels/) action.
- One way to apply the label only to dev dependencies may be to use the [Dependabot scope prefix on commit messages](https://help.github.com/en/github/administering-a-repository/configuration-options-for-dependency-updates#commit-message) and have have `origami-apply-labels` check for that. Maybe there's a better way?
- To merge only in work hours `origami-apply-labels` could label Dependabot PRs on a schedule. Maybe there's a better way?

A benefit of auto merging with labels is it will allow the team to release projects automatically when tests have passed and the PR has been approved.
