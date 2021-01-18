# Origami Specification V2 Component Publish

Commit version to `package.json` and tag by updating the `origami-version` action and `origami-ci-tools`.

## motivation

Origami components which followed v1 of the specification required that no `version` property is set in `package.json`, as it could get out of sync with the tag applied to publish via Bower. However components are now also published to npm and the version is added to `package.json` in the published npm bundle by `origami-ci-tools`. Since the [npm only proposal](https://github.com/Financial-Times/origami/blob/a36e6fe7ef9d9f16b7d253e5f08e18cee2ecf20e/proposals/accepted/0101-npm.md#proposal-npm-only-origami-components), planned for v2 of the component specification, will drop support for Bower we [can now commit the component version to `package.json`](https://github.com/Financial-Times/origami-website/pull/273/files#diff-5ebc2f3b798414ec905f3fdceb910557607b8d779a56bf1ce09ad48e32fd085aL108).

This is more typical for npm packages, making Origami projects easier to understand and work with. It will also allow future tooling to be able to parse `version` from `package.json` rather than `git tags`, which is a little more complex and requires a git repository.

## explanation

Currently the `origami-version` Github Action and `origami-ci-tools` publish a component.

- `origami-version`: on merge checks for Origami Github labels to indicate the type of release to perform (major, minor, patch, beta), calculates the version number to release and creates a git tag and Github release, and adds a comment on the merged PR with the new version.
- `origami-ci-tools`: when the Github release is created runs `npm version` with flags to update `package.json` but not to add another tag, the runs `npm publish` with flags including a tag for pre-releases.

`origami-ci-tools` is only used for components but `origami-version` is used to create git tags and Github releases for non-components, including non-npm projects. Future work is planned to investigate moving to a mon repo so we would like to avoid significant changes right now. To commit the version for Origami spec v2 components whilst leaving other projects unchanged, `origami-version` could be updated with a flag to optionally only output the new version. A new major of `origami-ci-tools` could use the version number as input to commit the new version number with `npm version`, publish to npm with `npm publish`, and add a notice to the PR only when the component is published successfully.

## work required

- Add a flag `output-only` to the `origami-version` Github action which, when set, will calculate the new version to release and [output it](https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#using-workflow-commands-to-access-toolkit-functions), without tagging,  creating a Github release, or commenting on the PR.
- In the [next major release of origami-ci-tools](https://github.com/Financial-Times/origami-ci-tools/pull/95) for spec v2 components, accept the version as a parameter (passed from `origami-version`) and use `npm version` to update `package.json` with the version, commit, and tag. Publish to npm. Add a comment to the Github PR that a release has been made successfully (added bonus, the PR comment is made only if an npm release happens successfully).

## alternatives

1. Maybe we don't actually care about committing the version number to `package.json`, so long as it's including in the bundle by `origami-ci-tools` as it currently is. This maybe isn't typical and could be a little confusing for developers new to working on Origami components. It also means tooling would have to continue to rely on parsing git tags to determine a components current version. We should update the draft v2 component spec to continue to require that the `version` property is not set, since it could become out of sync with reality.
2. Manually set the version before each release. Little work. Easy to forget.
3. The role of `origami-version` and `origami-ci-tools` would become a little confused. Instead we could spend more time coming up with a more thorough proposal for publishing Origami projects, including origami spec v2 components, but this would hold up other spec v2 work and is likely to change with future mono repo work.

## supporting examples

- [scrumple deploys using origami-version](https://github.com/Financial-Times/scrumple/blob/a43e9325c42feced72b22a69ab6ee4dd59c09916/.github/workflows/automatic-tag-and-release.yml#L17) but is not an npm project
- [npm origami projects like eslint-config-origami-component use origami-version](https://github.com/Financial-Times/eslint-config-origami-component/blob/master/.github/workflows/publish-to-npm.yml)
- [components like o-brand use origami-version and origami-ci-tools](https://github.com/Financial-Times/o-brand/blob/master/.github/workflows/release-origami-component.yml) to publish
