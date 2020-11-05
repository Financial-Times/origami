# Origami component docs (convention over configuration)

We remove the demos configuration from the manifest spec. Documentation is built
the same way for every component from a strict and specified directory structure
in a new `docs` directory.

## motivation

At the moment our component docs are split between the README.md (which people
see on the github) and a series of demos defined in the `origami.json` file. The
demo config is complex, hard to write and parse. It's both too strict, and too
loose. It contains cruft (like `display_html`) that's built up over the years of
use, and we can do a better job now.

Neither the demos or the readme are a great way to write more holistically about
the component, about accessibility and design decisions that went into the component.

Having a single way for docs to be produced means anyone coming into any Origami
component who has seen another, knows how to view and make demos. It also means
less logic required to build the docs.

## explanation

The docs directory looks like this:

```
o-table/
└── docs
	├── basic-table
	│   ├── index.html
	│   ├── readme.md
	│   ├── script.js
	│   └── style.sass
	├── monkey-table
	│   ├── index.html
	│   ├── readme.md
	│   ├── script.js
	│   └── style.sass
	├── readme.md
	└── sortable-table
		├── index.html
		├── readme.md
		├── script.js
		└── style.sass
```

The main readme.md file contains general documentation about the component (of
the kind that used to be in the component's main README.md). Laced under that
are is the content of each of the subdirectory's READMEs, with the demo they are
documenting displayed in a codepen-like box with an o-tab for each of the
`index.html`, `script.js`, `style.sass` and output.

It's recursive, so if inside `monkey-table` you have more directories containing
`index.html`, `script.js`, `style.sass` and `readme.md` then those will be
weaved in under the `monkey-table` section.

The navigation in the registry for that component can be generated for these
components, and we can create a tool that generates the static site based on
this directory structure.

## work required

- remove the demo configuration from the v2 manifest spec
- add a specification for this demo structure
- when migrating components to v2, create documentation in this directory structure
- create a tool for building a static site from this directory structure

## alternatives

### do nothing

keep our demos as they are. keep our docs spread across readme and demos.

### static site

Do not specify this format, but instead allow for any site that is built to the
`docs` directory to be served. [See here](./0000-component-docs-as-static-site.md)

## notes

- each demo should possibly be an individual node module, and list the
  dependencies in their own `package.json`
