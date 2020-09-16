# Imageset Specification

Create a specification for `imageset.json`, found in the root of Origami image sets, which includes a `deprecated` key.

## motivation

So that we may display old images in the Registry as deprecated, I would like to add an optional `deprecated` key to images defined in `imageset.json`. As an optional key it should be documented so future team members know it exists.

In addition, we have build processes and services (e.g. Origami Repo Data) that already depend on the implicit structure of `imageset.json`.

## explanation

This proposal could be split into two, but I think it makes enough sense to consider them together:
- Write a specification for `imageset.json` in its current form
- Add a new optional key `deprecated`, of type string.

The new `deprecated` key should be a string, to allow for a deprecation message, and should be optional. We can use the deprecation message to, for example, instruct that a new logo should be used pending a review that it works visually in context.

## work required

Strictly for this proposal:

- Publish a specification for `imageset.json` on origami.ft.com

But to fulfil the motivation:

- Update Origami Repo Data to have a matching `deprecated` key in its image entity
- Update Origami Registry UI to display images within a set as deprecated

## alternatives

1. We could make a major release of an imageset instead of deprecate the images within it. However this will always take more time than adding a `deprecation` key, my preference is to batch major changes for image sets. We'd still want to write a `imageset.json` specification to defend against breaking projects which depend on it accidentally.
2. We could remove `imageset.json` and put that information into `origami.json` instead, but there's probably enough information in `origami.json` already and that is more work.
3. Do nothing. Users will see and maybe use old images in the registry, hurting the brand. Unless we spend extra time releasing frequent imageset majors. Our projects continue to depend on an implicit interface. Engineers don't know what the options are or what they do.

## supporting examples

There are two [FT Live logos](https://registry.origami.ft.com/components/origami-specialist-title-logos@1.5.4) showing in the registry. One is old but could not be updated directly as its so different. The new logo might not work in the same context the old one did.
