# Proposals in the repo

> Let's keep our proposals in the `origami` repository!

## motivation

Our proposal process currently uses issues.

These are great! Except, there is no distinction in path between an accepted proposal and a rejected proposal. Either way, the issue gets closed.

We also don't have a good history of the changes that were made, and we don't have good documentation on what happened after the proposal was accepted.

## explanation

Instead of writing proposals up as an issue, let's write them up as a pull request adding a markdown file to a directory called "proposals/accepted" so we can have a satisfying way of saying "Yes" or "No" to a proposal.

We can also move proposals to a `proposals/complete` folder when they are done, adding a note about how the proposal was implemented. Which will be great for documenting what happened after the proposal was accepted.

### benefits

* Easier to see on what we've accepted and are working on!
* Documentation on what what we've done and how we did it.
* Use your own text editor to make the proposal!

### drawbacks

* Maybe it's less easy to create a proposal from outside the team (have to clone the repo, or copy-and-paste template)

## work required

1. Update the [contribution guide](https://github.com/Financial-Times/origami/blob/master/.github/CONTRIBUTING.md)
2. Create a [proposal template](./0000-template.md)
3. _optional:_ convert old proposals to files in the repo

## alternatives

### nothing

Keep what we have

### action

We could keep the issue mechanism around and have an action to automatically create the file in the repo of an accepted issue. we could comment `@origamiserviceuser this is accepted` or something

## supporting examples

There is a similar process in the `rfcs` repos of [the npm project](https://github.com/npm/rfcs) and [rustlang](https://github.com/rust-lang/rfcs/#what-the-process-is)
