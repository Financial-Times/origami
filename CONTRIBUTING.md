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
