# Opting elements into dark mode via a parent selector
I've moved over this older proposal, as I think it's still relevant:
Original issue: https://github.com/Financial-Times/ft-origami/issues/534

## What

>At the moment we seem to be setting up dark mode overrides or styles for a number of individual elements - eg o-buttons, o-labels, teasers.
>
>At the moment, changing this tends to be done at the level of each element, using custom inheritance overrides or classes on each individual elements - sometimes tricky in templates used in multiple places, often a bit verbose.

## Why

>Ideally I think it would be good to set this up via a dark-mode class of some kind which could be set on any parent element, and then o-components with styles which should change would automatically switch to dark mode appearance.

## Supporting Examples

> eg o-buttons, o-labels, teasers.
