# Demos as isolated node modules

We remove the demos config from the manifest spec. Demos are isolated node
modules that list the containing component as a dependency in the
`package.json`.

Demos no longer serve as documentation, and are no longer used for utilities
like the o-colors contrast checker. Demos are primarily for use when working on
a component, and for testing in CI.

## motivation

Our demos currently serve 3 purposes:
1. Demos -- for development and CI testing
2. Utilities -- like the o-colors contrast checker
3. User facing documentation -- they are displayed prominently in the registry

The demos array in the origami.json is both too strict and too loose. It's
difficult to parse, and difficult to lint. The `display_html` boolean is a way
of indicating that a demo is not, in fact, a demo. It's grown naturally over the
years, and we have a chance to do a better job now.

If we focus demos only on being demos, and take a different approach for our
utilities and user-facing docs, we can reduce the stuff we have to parse dramatically.

## explanation

We remove the origami manifest's demo configuration, and replace it with
conventions.

A demo is a directory that looks like this:

```
└── my-big-fish-demo
	├── index.md
	├── package.json
	├── script.js
	└── style.scss
```

The `index.md` is the entry point. It contains a top-level heading, a 1 line
description and an html code block.

We replace the demo properties in the origami.json as follows:

| property        | purpose                               | replacement                           |
|-----------------|---------------------------------------|---------------------------------------|
| name            | output file name                      | n/a, path is path is on disk          |
| title           | title for the demo in the registry    | top-level heading in index.md         |
| description     | demo description in registry          | content between h1 and codeblock      |
| template        | path to mustache                      | the html codeblock in index.md        |
| sass            | path to sass                          | always style.scss                     |
| js              | path to js                            | always script.js                      |
| data            | data to pass to the mustache template | n/a, hardcode values in demo          |
| brands          | supported brands                      | `origamiBrands` field in package.json |
| documentClasses | classes to set on html root el        | a wrapper element in html codeblock   |
| dependencies    | dependencies                          | dependencies in package.json          |
| hidden          | hide demo in registry                 | n/a, show all demos in registry       |
| display_html    | hide demo's html tab in registry      | n/a, utilities should be elsewhere    |

We create a tool that can build and serve these demos.

## work required

### 1. Specification changes

Remove the manifest specification's demo config, and add a `demos` section to
the component specification explaining the conventions.

### 2. Component work

Rewrite the current demos to work in this style. Move utility demos out of the
current demos directory.

### 3. Tooling

Build a tool that can be run in the component's root that has the following
usage:

```
usage: odc [-h] {build,watch,serve,lint} ...

optional arguments:
  -h, --help            show this help message and exit

commands:
  valid commands

  {build,watch,serve,lint}
	build               build demos
	watch               build demos on every change
	serve               start a live-reloading demo server that builds on every change
	lint                lint the demo index.md
	create              create a new demo
```

Each command takes a single optional position argument of `pattern`, and it will
only run demos matching that pattern.

#### build

This builds the index.md, style.scss and script.js into
`demos/particular-demo/public/`

#### watch

This performs build, and starts up a filesystem watcher that builds
the code again on every change.

#### serve

This performs build and starts a local http server that serves an index of all
the demos, and each demo is served on `localhost:port/demo-path`.

It starts up a filesystem watcher that builds the code on every change, and
reloads the user's browser on every build.

#### lint

This lints the demos index.md files to ensure it will work with the rest of the
tool.

### create

This takes a positional argument of `name`.

Options are:

| shortopt | longopt       | meaning                                                     |
|----------|---------------|-------------------------------------------------------------|
| -d       | --description | set the description                                         |
| -b       | --brands      | the supported brands for this demo (default: all supported) |

It slugifies the name to use as the demo path and creates `package.json` that
includes a dependency of `component-name@file:../..`, a name, description,
version and `origamiBrands` array.

It creates an `index.md` containing the following:

~~~md
# {{title}}

{{description || "enter a description for your demo here"}}

```html
```
~~~

a `script.js` containing the following:

~~~js
import {{component-name-without-prefix}} from ("{{component-name}}")
~~~

and a `style.scss` containing the following:

~~~scss
import "{{component-name}}"
~~~

## alternatives

### do nothing

leave our demos as they are, and start working on the new documentation
separately. this will save time in the short term, but i think we want to rework
demos still.

### other proposals

These abandoned proposals when demos and docs where conflated.

- [https://github.com/Financial-Times/origami/blob/5b52d7ba831ccbfc17a7babb7b83c83bd8694d90/proposals/accepted/0000-component-docs-as-static-site.md](component
  docs as static site)
- [https://github.com/Financial-Times/origami/blob/5b52d7ba831ccbfc17a7babb7b83c83bd8694d90/proposals/accepted/0000-component-docs-convention-over-configuration.md](component
  docs convention over configuration)

## notes

- We discussed allowing demos to be anything that is built to public/index.html
  when a demo module's `npm run build` command is issued. This is fine, but it
  does mean we'd be running any program they had in `npm run build` in our
  registry server which opens us up for destructive errors.
- We discussed requiring demos to be published prebuilt. This is fine too, and
  would allow us to do the above. But it allows for a published artifact to
  differ from the source in a way that might be confusing? Though it would mean
  we'd no longer be running the code on the server which might well be good.
