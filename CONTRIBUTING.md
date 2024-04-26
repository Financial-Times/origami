# Contributing

Hey, so you want to contribute to Origami.

## Before you get started

Make sure you set up the required software listed in [the readme](./README.md#requirements).

## Committing

Our commit messages use a simplified form of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). This is how our automated release system knows what a given commit means.

```txt
<type>: <description>

[body]
```

### Commit type prefixes

The `type` can be any of `feat`, `fix`, `docs` or `backstage`.

The prefix is used to calculate the semver release level, and the section of the release notes to place the commit message in.

| **type**  | when to use                         | release level | release note section |
| --------- | ----------------------------------- | ------------- | -------------------- |
| feat      | a feature has been added            | `minor`       | **Features**         |
| fix       | a bug has been patched              | `patch`       | **Bug fixes**        |
| docs      | a change to documentation           | none          | **Documentation**    |
| backstage | any changes that aren't user-facing | none          | none                 |

Indicate a breaking change by placing an `!` between the type name and the colon, e.g.:

```txt
feat!: add large mouse

this is breaking because it may distract large cats in user code
```

## Pull requests and visual regression tests

Origami implements visual regression tests for o3 components to make it sure that no visual bugs end up in production. When you submit a pull request, the CI doesn't automatically run visual regression checks. This way we are avoiding unnecessary triggers of visual regression tests and we also save on snapshot allowance on [Chromatic](https://www.chromatic.com/).

> **Chromatic** is a visual testing & review tool that scans every possible UI state across browsers to catch visual and functional bugs. It helps us to assign reviewers and resolve discussions to streamline team sign-off.

To trigger visual testing & review tool you can add a `chromatic` github label. This label should be added just before requesting a review to avoid retriggers on subsequent commits.

This will trigger chromatic deployment and after deployment there will be two additional checks on the pull "request": [UI Tests and UI Review](https://www.chromatic.com/docs/in-pull-request/).

![Chromatic UI Tests: Developer checks for bugs. Chromatic UI Review: Stakeholders sign off.](https://www.chromatic.com/compare/chromatic-during-pull-request.png)

To pass additional check on the PR we will need to approve UI Review and UI Tests from [Chromatic app](https://www.chromatic.com/reviews?appId=64faf6b1815b6c0106f82e74). Once both checks are approved, the pull request can be merged.

## Releasing

When your component is reviewed by the component's code owners, usually the Origami team, it is ready for release:

1. Wait for required Github checks to pass.
2. Merge into the `main` branch.
3. A `release-please` Github Action will trigger. This will open a release PR.
4. Review the release PR. Ensuring that:
   - It's only releasing the component(s) you expect.
   - The new component versions are appropriate for the changes you made, we follow [semantic versioning](https://semver.org/).
   - The generated `CHANGELOG.md` is descriptive and [meets our tone & language](https://origami.ft.com/documentation/principles/tone-and-language/) guidelines. If not, update on the release PR.
5. Merge the release PR. This will again trigger the `release-please` Github Action which this time will:
   - Build assets, if required.
   - Publish to the npm package manager.
   - Trigger a notification the [#origami-support](https://financialtimes.enterprise.slack.com/archives/C02FU5ARJ) Slack channel.
6. Confirm your release is successful by waiting for the [#origami-support](https://financialtimes.enterprise.slack.com/archives/C02FU5ARJ) Slack announcement or by checking the npm package manager.
