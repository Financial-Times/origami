# Origami Component System

Welcome to Origami!

This is the repository for the Origami components, libraries and apps that make
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

3. Run the storybook. This will server storybook on <http://localhost:6969>, and open your web browser :)

   ```shell
   npm run storybook
   ```

### Tips

- To run `obt` for a specific component try `npm exec -w components/o-name obt
  dev` from the root
- If you're working on the storybook configuration and it starts acting weird
  and not working, try running it without the cache:
  `npm run storybook -- --no-manager-cache`

## Contributing

If you want to contribute, check out [CONTRIBUTING.md](./CONTRIBUTING.md).
