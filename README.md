# Origami Component System

Welcome to Origami!

This is the repository for the Origami components, libraries, and apps that make
up the Origami Component System.

## Proposals

If you'd like to make a proposal for a new component or anything else, go ahead and [open an issue](https://github.com/Financial-Times/origami/issues/new).

## Projects in this repository

This repository houses many projects of different kinds. Most of them have
READMEs of their own where you can learn more about them.

### apps/website

The [Origami website](./apps/website), served at <https://origami.ft.com>.

### apps/storybook

[Origami's storybook](./apps/storybook), served at <https://origami.ft.com/storybook/>.

### components and libraries

Components and libraries that implement the FT's design system for the web.

### presets

Presets for development tools that make it easier to build consistent
components.

### scripts

Scripts for maintenance of the repository itself

### scripts/components

Default scripts used in component package.jsons for building and testing components.

### tools

Tools used to build and test Origami components

## Running Origami locally

### Requirements

There is some software you'll need on your computer in order to work with this
repo.

#### volta

We use [volta](https://docs.volta.sh/guide/getting-started) to make sure everyone
is using the same versions of node and npm.

```shell
curl https://get.volta.sh | bash
```

#### git-lfs

To keep the repo speedy, we use [git-lfs](https://git-lfs.github.com/) to store
binary files like the images on the website.

```shell
brew install git-lfs
git lfs install
```

#### entr

[entr](https://eradman.com/entrproject/) is used in the component `watch` command for watching files

```shell
brew install entr
```

#### rg

[ripgrep](https://github.com/BurntSushi/ripgrep) is used in the component `watch` command for quickly choosing the files to watch for changes.

```shell
brew install rg
```

### Quick start

1. First, clone the repo

   ```shell
   git clone git@snoot.club:Financial-Times/origami.git
   cd origami
   ```

2. Then npm install. This will install all the components into the root `node_modules`, allows all the components to [find one another](https://nodejs.org/api/modules.html#loading-from-node_modules-folders).

   ```shell
   npm install
   ```

3. Run the storybook. This will server storybook on <http://localhost:6006>, and open your web browser :)

   ```shell
   npm run storybook
   ```

### Developing components

#### Setup

Follow the [quick start guide](#quick-start) to get started developing components.

#### Preview demos

##### Registry

Components that have not yet been migrated to Storybook still have their old demos as shown in the registry.
You can view these using the build and start commands.

```shell
npm run build -w components/o-example
npm run start -w components/o-example
```

This will generate demos for all brands that the component is configured to be a part of.

###### Watch demos

To serve the demos, and have them automatically rebuild when the code changes you can use the `watch` command.

```shell
npm run watch -w components/o-example
```

##### Storybook

Storybook can be run locally with the `storybook` command.

```shell
npm run storybook
```

To view components in other brands in Storybook, set the `ORIGAMI_STORYBOOK_BRAND` environment variable with the brand.

```shell
ORIGAMI_STORYBOOK_BRAND=internal npm run storybook
```

#### Setting brands

Some components you create may only be part of one brand. We recommend you follow these guidelines when contributing branded components:

##### Registry

Origami Registry component demos are branded through the `origami.json` manifest in the component's root directory. You can find how to use this file in the [Origami documentation](https://origami.ft.com/documentation/manifests/origami-json/#brands).

##### Storybook

Storybook component demos can be branded by introducing a brand sub-directory within the `stories` folder, and placing brand-specific stories within it. e.g:

```
o-labels/
    demos/
    src/
    stories/
       core/
           // Core brand stories go in this directory.
           labels.stories.tsx
           labels.scss
       //Unbranded stories can be placed in the root of stories/
       labels.stories.tsx
       labels.scss
```

[o-labels](https://github.com/Financial-Times/origami/tree/main/components/o-labels/stories) provides a good example of this.

#### Test

Run tests for a given component with the npm `test` script.

```shell
npm run test -w components/o-example
```

Run JavaScript tests in a browser using the `debug:js` script.

```shell
npm run debug:js -w components/o-example
```

Lint the code of a given component with the npm `lint` script.

```shell
npm run lint -w components/o-example
```

### Tips

- If you're working on the storybook configuration and it starts acting weird
  and not working, try running it without the cache:
  `npm run storybook -- --no-manager-cache`

## Contributing

If you want to contribute, check out [CONTRIBUTING.md](./CONTRIBUTING.md).
