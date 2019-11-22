
# Migration

## Migrating from v4 to v5

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

## Migrating from v3 to v4

- The `oLabels` mixin parameters have been changed, and all of the  mixins have changed significantly. See the [Sass documentation](README.md#sass) for how to use the new and updated mixins
  - The following states have been removed. The decision to remove was based on a search of the various codebases using o-labels, if you need one of the removed states then please contact us and we'll add it back:
    - `active`: This state has been removed entirely
    - `brand`: This state has been removed entirely
    - `closed`: This state has been removed entirely
    - `error`: This state has been removed entirely
    - `live`: This state has been removed entirely
    - `pending`: This state has been removed entirely
    - `normal`: The normal state is achieved by not including a state modifier class
  - The following states have been renamed. This rename applies to both the default classes as well as the value passed into the `oLabelsAddState` mixin:
    - ```diff
      + content-commercial
      - commercial-content
      ```
    - ```diff
      + content-premium
      - premium
      ```
  - o-colors use-cases have been removed. If you wish to configure label colours we now recommend using the `oLabelsAddState` mixin and passing in variant config.

## Migrating from v2 to v3

V3 of o-labels removes the `oLabelsSize` mixin. To create different sized labels for your product you should use the o-typography mixins as shown in the [controlling label size](README.md#controlling-label-size) section.
