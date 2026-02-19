# Origami Component System

Welcome to Origami!

This is the repository for the Origami o2 & o3 components, libraries, and apps that make
up the Origami Component System.

## Using Origami o3 in your project

Read the [_o3 Getting Started_](docs/o3-getting-started.md) guide to use Origami o3 styles and components in your project.

## Maintaining Origami o2 in your project

Legacy documentation for using the o2 component system can be found in [docs/legacy-o2-docs](/docs/legacy-o2-docs/index.md).

## Proposals

If you'd like to make a proposal for a new component or anything else, go ahead and [open an issue](https://github.com/Financial-Times/origami/issues/new).

## Projects in this repository

This repository houses many projects of different kinds. Most of them have
READMEs of their own where you can learn more about them.

### apps/storybook

[Origami's storybook](./apps/storybook), served at <https://origami.ft.com/storybook/>.

### apps/website

[Origami Design System](https://origami.ft.com/) documentation and usage guides.

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

Below are the steps to run and maintain this repository locally.

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

3. Choose the appropriate command based on the project:

   - For Origami's o2 components storybook, run the following command:

     ```shell
     npm run storybook
     ```

   - For Origami's o3 components storybook, run the following commands:

     ```shell
     npm run build-storybook -w apps/o3-storybook/
     npm run storybook -w apps/o3-storybook/
     ```

   - For Origami Design System website, run the following command:

     ```shell
     npm run dev -w apps/website
     ```

### Developing components

#### Setup

Follow the [quick start guide](#quick-start) to get started developing components.

#### Preview demos

##### Storybook

Storybook can be run locally with the `storybook` command.

```shell
npm run storybook
```

To view components in other brands in Storybook, set the `STORYBOOK_BRAND` environment variable with the brand.

```shell
STORYBOOK_BRAND=internal npm run storybook
```

Some demos in Storybook are embedded through the Build Service, meaning that local changes will not appear on Storybook. This can be verified by inspecting the `*.story.ts` file for a component and seeing if the root element is an `iframe`. Local development for these components can still be achieved by using [legacy](#legacy) demos instead.

##### Legacy

Component demos formerly on the Origami Registry have now been migrated to Storybook.

The legacy demos may be useful for development purposes where a demo in Storybook is sourced from Build Service as mentioned in the previous section. You can view these using the build and start commands:

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

#### Setting brands

Some components you create may only be part of one brand. We recommend you follow these guidelines when contributing branded components:

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

##### Legacy

Legacy Origami Registry component demos are branded through the `origami.json` manifest in the component's root directory. You can find how to use this file in the [Origami documentation](https://origami.ft.com/documentation/manifests/origami-json/#brands).

#### Test

Run tests for a given component with the npm `test` script.

```shell
npm run test -w components/o-example
```

Run tests for all components with the npm `test` script.

```shell
npm run test -w components
```

_Note: This will take a good amount of time when running on localhost._

Run JavaScript tests in a browser using the `debug:js` script.

```shell
npm run debug:js -w components/o-example
```

Lint the code of a given component with the npm `lint` script.

```shell
npm run lint -w components/o-example
```

Run linting for all components with the npm `test` script.

```shell
npm run lint -w components
```

_Note: This will take a good amount of time when running on localhost._

### Tips

- If you're working on the storybook configuration and it starts acting weird
  and not working, try running it without the cache:
  `npm run storybook -- --no-manager-cache`

## Chromatic

Origami implements visual regression tests for o3 components with Chromatic.

More details on how Chromatic can test Pull Requests can be found in the [Contribution notes](https://github.com/Financial-Times/origami/blob/main/CONTRIBUTING.md#pull-requests-and-visual-regression-tests).

### Billing

Chromatic usage is calculated in snapshots. You can check on the current consumption of our monthly allowance by:

- Logging into Chromatic
- Click **Billing** in the left side menu

Here you can see the current billing periods usage as well historical periods.

#### Notifications

An alert has been set for when the snapshot usage reaches 42,500 (50% of the current 85,000 total).

The alert sends an email to the [#origami-notifcation](https://financialtimes.enterprise.slack.com/archives/C046BHSDZR9) channel.

## Contributing

If you want to contribute, check out [CONTRIBUTING.md](./CONTRIBUTING.md).
