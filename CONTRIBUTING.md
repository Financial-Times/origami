# Contributing

Hey, so you want to contribute to Origami.

## Before you get started

Make sure you set up the required software listed in [the readme](./README.md#requirements).

## Committing

Our commit messages use a simplified form of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). This is how our automated release system knows what a given commit means.

```
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

```
feat!: add large mouse

this is breaking because it may distract large cats in user code
```

## Pull requests and visual regression tests

Visual regression tests are very important to detect visual bugs in Origami components. When you submit a pull request, the CI doesn't automatically run visual regression checks. You can add a `chromatic` label on pull requests to trigger visual regression tests.

This will trigger chromatic deployment and after deployment there will be two additional checks on the pull request: [UI Tests and UI Review](https://www.chromatic.com/docs/in-pull-request/).
![alt text](https://www.chromatic.com/docs/_astro/chromatic-during-pull-request.W6fp0tS2_1v1ld.webp)

We will need to approve UI Review and UI Tests from Chromatic app. Once both checks are approved, the pull request can be merged.

> NOTE: `chromatic` label only works on o3-[component]. If you are working on o-[component], you can add a `percy` label instead on the pull request.
