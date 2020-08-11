# create an origami component build system workspace
let's put all of the packages related to building and testing origami components
in one repository.

## motivation
when making a change to something like eslint-config-origami-component, we often
need to make the change there, and in origami-build-tools, and in origami-ci.

these are distinct packages with distinct purposes, but they are worked on
together and released together.

a concept called "workspaces" is a good approach for this.

## explanation
We use [athloi](https://github.com/Financial-Times/athloi) to manage our npm
workspaces, and Cargo to manage our rust workspaces.

We have a directory structure like this:

```
origami-build-system
├── Cargo.toml
├── origami.json
├── package.json
├── packages
│   ├── node
│   │   ├── create-origami-component
│   │   ├── eslint-config-origami-component
│   │   ├── origami-build-tools
│   │   ├── origami-bundle-size-cli
│   │   ├── origami-ci-tools
│   │   ├── remark-preset-lint-origami-component
│   │   ├── sass
│   │   ├── scrumple
│   │   └── stylelint-config-origami-component
│   └── rust
│       └── scrumple
└── tests
```

### node packages

In the `package.json` we would have a workspaces config like:

```json
"workspaces": [
	"packages/node/*"
]
```

When package `x` depends on package `y`, its package.json dependencies section
looks like this:

```json
"dependencies": {
	"y": "file:./y"
}
```

Athloi is more convenient to use if all the subpackages are at the same version,
so we do a major release of v11 for every package when first making
the change.

To bump the version, we use `athloi version`.

To bulid we use `athloi run build`.

To publish we use `athloi publish`.

### rust packages

In the `Cargo.toml` we would have a workspaces config like:

```toml
[workspace]
members = [
	"packages/rust/scrumple"
]
```

We build scrumple using `cargo build`. After the build, we move the built
artifact to `packages/node/scrumple/scrumple-${target}/scrumple`. In
development you will only have the binary for your current operating system, but
in CI we build for every supported target.

## work required

1. create the repository
2. rewrite scrumple's package build (modeling it on the ft
[sass](https://github.com/Financial-Times/sass) build)
3. write a github action to build scrumple + the npm packages in the right order
  (athloi takes care of the topological ordering of the npm build)
4. do a major prerelease from this repository
5. if bugs, fix bugs and goto 4
6. do a major release of everything!
7. archive all the other repos

scrumple's `package.json#scripts.build` can maybe kick off the cargo build? not sure.

## alternative

### write our own tool
I'm interested in the idea of a tool for workspaces that leverages the [node
module resolution
algorithm](https://nodejs.org/api/modules.html#modules_all_together), requiring
no symbolic links or `file:` urls and instead installing the workspace packages
in the root `node_modules/` directory, so they can be found by every
sub-package.

### lerna
Lerna introduces a complex linking system, athloi leverages npm's `file:`
instead. This way, npm knows about the links.

### yarn
We could use yarn for making the packages available to eachother, but it doesn't
provide an API for managing them and also it requires using a different package manager.

### don't include the rust stuff here
Keep scrumple in a separate repo. That would make the transition easier, but
then we'd still have the current undesirable workflow for scrumple releases.
Also i think solving this problem now provides us a nice path forward for
creating more rust software.
Also, the system will get much msimpler once it's possible for the only scrumple target
to be `wasm`!

### do nothing!

extra work every time instead of some work now! who knows what's the most
efficient in the long term?

## art

### [athloi](https://github.com/Financial-Times/athloi)
This is the tool i'm proposing we use.

### [x-dash](https://github.com/Financial-Times/x-dash)
A good example of using athloi

### [dotcom-page-kit](https://github.com/Financial-Times/dotcom-page-kit)
Another example using athloi

### [babel](https://github.com/babel/babel)
A use of [lerna](https://github.com/lerna/lerna)

### [cargo workspace documentation](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html)
Here's the documentation of cargo's workspaces

### [yarn workspace documentation](https://classic.yarnpkg.com/en/docs/workspaces/)
Yarn's documentation
