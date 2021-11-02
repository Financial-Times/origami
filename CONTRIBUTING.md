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

| **type**  | meaning                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| feat      | a feature has been added. this translates to a minor release.                                                                                        |
| fix       | a bug has been patched. this translates to a patch release.                                                                                          |
| docs      | a change to documentation. these commits do not cause a release, but the messages appear in the "Documentation" section of the next release's notes. |
| backstage | any changes that aren't user-facing. no release is caused, and these messages will not appear in release notes.                                      |

Indicate a breaking change by placing an `!` between the type name and the colon, e.g.:

```
feat!: add large mouse

this is breaking because it may distract large cats in user code
```
