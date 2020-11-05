# Origami component docs as a static site

We remove the demos config from the manifest spec. Documentation, shown in in
the registry, is any static site present in the `docs` directory after running
`npm run build`.

## motivation

At the moment our component docs are split between the README.md (which people
see on the github) and a series of demos defined in the `origami.json` file. The
demo config is complex, hard to write and parse. It's both too strict, and too
loose. It contains cruft (like `display_html`) that's built up over the years of
use, and we can do a better job now.

Neither the demos or the readme are a great way to write more holistically about
the component, about accessibility and design decisions that went into the component.

If we know docs will be built once `npm run build` is run, then we can remove
logic around generating the docs from the registry.

## explanation

The spec states only this about docs:

- the readme.md must link to registry/component/docs
- component documentation, including demos of the component in many states with
  accompanying prose, must exist as a static site in the `docs` directory after
  `npm run build` has been issued
- if your component supports brands, the build command should take into account
  the `ORIGAMI_BRAND` environment variable and build accordingly
- a live-reloading dev server must/should run when `npm start` is issued within
  the component's repository

## work required

- remove the demo config from the v2 manifest spec
- when migrating cmoponents to v2, create documentation for them

## alternatives

### do nothing

keep our demos as they are. keep our docs spread across readme and demos.

### convention over configuration

A convention-over-configuration system for docs. A more strict system defining
how docs should be formed. [See here](./0000-component-docs-convention-over-configuration.md)

## notes

- a previous version of this proposal suggested the docs should be built
  in the published npm module. This is fine, but it makes it more difficult to
  define how branding should work. Currently in the registry, branding is
  selected via a query string. Instead of having them prebuilt i'm suggesting
  that the component is built by the registry and we cache the result. This does
  open us up to code execution exploits however. This probably needs more work.
