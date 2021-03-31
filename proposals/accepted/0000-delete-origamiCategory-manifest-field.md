# Delete the origami.json manifest field `origamiCategory`

The field is not being used by any tooling or services, let's remove it from the specification.

## motivation

The field is no longer used for anything, let's stop requiring that it exists because it is now a useless field.

## explanation

It used to be used to decide how to display content on the [Origami Registry](https://registry.origami.ft.com/) but that is no longer the case.


## work required

From what I can think of, the work required is:

- Update the component specification to remove the field from [`origami.json`](https://github.com/Financial-Times/origami-website/blob/c70e43a0fa06c0629de4e576d31f31885ecce5be/_specification-v1/manifest.md#origamicategory)
- Update the component tutorial to [not mention the field](https://github.com/Financial-Times/origami-website/blob/9e001a0d5faf7483bb7587fbb8094dc84dbe060e/_tutorials/new-component/create-a-new-component-part-1.md#component-category)
- Updating Origami-Repo-Data to stop [reading the field](https://github.com/Financial-Times/origami-repo-data/blob/c5a022d0682ed2b0620ba10451e8bea4f8ae7612/models/version.js#L298-L304)
- Remove the field from [Create-Origami-Component](https://github.com/Financial-Times/create-origami-component/blob/52c742defec27b39e67b47f7768cd70314366237/src/prompts/questions.js#L90)
- Origami Build Tools does not check for the field, no work required here

## alternatives

### Do nothing

We keep the field around for no apparent reason and maybe one day find a use for it


## supporting examples

N/A

## notes

Lee mentioned that we have discussed varying the spec depending on category in the past, like allowing a certain category of component to use html of other components.
We never did that in the end. If we wanted to do that in the future then we can look at adding this field back in the manifest
