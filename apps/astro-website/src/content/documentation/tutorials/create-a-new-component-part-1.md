---
title: Create A New Origami Component
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_id: tutorials
---

# Create A New Origami Component

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:

1. Intro & Boilerplate
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. [Storybook](/documentation/tutorials/create-a-new-component-part-6/)
7. [Testing](/documentation/tutorials/create-a-new-component-part-7/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-8/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-9/)

## Introduction

Usually the Origami team will own an Origami component which is used by multiple teams or groups, but anybody can create and share an Origami component.

In this tutorial we'll build an Origami component. Our example component will display a "hello world" message and include a button which will count the number of times it was clicked. Visually the component will include multiple variations to suit reader facing (core brand) and internal (internal brand) projects. We'll also discuss how to document and publish an Origami component so it is visible in [Storybook](https://origami.ft.com/storybook/).

## Prerequisites

Before you get started, it's a good idea to discuss your new component with the Origami team first. The team will be able to make sure there's not an existing component or [component proposal](https://github.com/Financial-Times/origami#Proposals) that fulfils the same purpose, and will be available to answer any questions.

This tutorial assumes some knowledge. For example we introduce a number of tools and libraries such as [git](https://git-scm.com/), [Sass](https://sass-lang.com/), [storybook](https://storybook.js.org/), etc. We do not cover these in depth but attempt to include brief descriptions and links to relevant documentation so that you may learn separately about the parts which are new to you.

If you have any questions please contact the Origami team to help make this tutorial better &#x1F603;. You can find the team on Slack in <a href="https://financialtimes.slack.com/messages/origami-support" target="_blank">#origami-support</a>.

### Requirements

There is some software you'll need on your computer in order to work with this
repository.

#### Node.js & npm

[Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) are required to develop Origami components.

Check the version of Node.js and npm installed on your local machine matches the `engines` property of [package.json](https://github.com/Financial-Times/origami/blob/main/package.json).

We recommend using [volta](https://docs.volta.sh/guide/getting-started) to manage which version of Node.js and npm is used on your machine across multiple projects.

#### git-lfs

To keep the repo speedy, we use [git-lfs](https://git-lfs.github.com/) to store
binary files like the images on the website.

<pre><code class="o-syntax-highlight--bash">brew install git-lfs
git lfs install
</code></pre>

#### entr

[entr](https://eradman.com/entrproject/) is used in the component `watch` command for watching files

<pre><code class="o-syntax-highlight--bash">brew install entr</code></pre>

#### rg

[ripgrep](https://github.com/BurntSushi/ripgrep) is used in the component `watch` command for quickly choosing the files to watch for changes.

<pre><code class="o-syntax-highlight--bash">brew install rg</code></pre>

## Getting Started

### Clone the Origami repository

<pre><code class="o-syntax-highlight--bash">git clone git@github.com:Financial-Times/origami.git
cd origami</code></pre>

### Install dependencies

<pre><code class="o-syntax-highlight--bash">npm install</code></pre>

This will install all the components into the root `node_modules` directory, and allow all the components to [find one another](https://nodejs.org/api/modules.html#loading-from-node_modules-folders).
In addition this tutorial introduces a number of tools and libraries such as [git](https://git-scm.com/), [Sass](https://sass-lang.com/), [sinon.js](https://sinonjs.org/), [storybook](https://storybook.js.org/) etc. We do not cover these in depth but attempt to include brief descriptions and links to relevant documentation so that you may learn separately about the parts which are new to you.

## The Origami Specification

The [Origami Specification](/specification/v1/) is deprecated, new components may diverge from its rules. However, some Origami tools and services continue to depend on parts of the deprecated specification so we will refer to relevant sections of the specification throughout this tutorial. Including for folder structure, code standards, documentation and more.

<aside>
See our <a href='https://origami.ft.com/blog/2021/06/01/newsletter/#the-origami-specification-is-no-more'>blogpost on why the Origami specification is deprecated</a>.
</aside>

## Boilerplate

To help us get started we can use the following command:

<pre><code class="o-syntax-highlight--bash">npm run create-component</code></pre>

The `npm run create-component` command will ask a number of questions to determine what kind of component we're building and generate a basic component for us to build from.

Before we run `create-component`, let's discuss some of those questions.

### Component Name

The first thing we will be asked is to decide a component name. Usually Origami components start with `o-`, and only contain lowercase letters or hyphens. See the [component naming convention](/specification/v1/components/#naming-conventions) for more details.

For this tutorial we will name our component `o-example`.

### Supported Brands

Component brands facilitate [component customisation](/specification/v1/components/sass/#customisation). Brands change the appearance of component elements globally, e.g. change the appearance of all “primary” buttons, including where they are used by other components. Brands include `core` (think, ft.com pink), `internal` for internal tools and products, and `whitelabel` for a striped-back un-opinionated style. Origami components may support one or more brands. We'll discuss brands more later, for now select the `core`, `internal`, and `whitelabel` brand when prompted by `create-component`.

### Support Status

All Origami components have a support status. For example a `maintained` component means that "[the component is] not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with platforms and other projects"; an `experimental` component means "the [component] is not ready for production use". For a full list a support statuses and their meaning see the [support status section of the specification](/specification/v1/manifest/#supportstatus). It is sometimes a good idea to release a new component as `experimental` for a trial period to gather feedback from users, so select `experimental` for now.

As well as a support status, the `create-component` command will ask for a support email address, slack channel and github team. This will help identify your team as owners of the component. When the component is published a message will display in the component registry letting potential users know that support is not guaranteed by the Origami team, and that they should contact your team before using the component.

### JavaScript And Sass

Origami components may include JavaScript for interactivity or [Sass](https://sass-lang.com/) for visual styles (we compile [Sass](https://sass-lang.com/) to CSS). When prompted, select that you would like the component to include JavaScript and Sass for the purposes of this tutorial. We will use the code it generates as a base to discuss building an Origami component later.

### Other Questions

This tutorial won't expand on other questions asked by the `create-component` command, like what the component description and keywords are. Please feel free to contact the Origami team if you have any questions during this step.

### Output

Now run `npm run create-component` and answer the questions as above. You should see a directory inside the `components` folder which contains component boilerplate (commonly shared component code we can build on top of).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-init-output.png" />
	<figcaption>
        Example output from the `create-component` command at the time of writing. It shows the questions asked and example responses, as discussed previously.
	</figcaption>
</figure>

The structure of our component now looks something like this. In the next section we will start developing our component, and in the process discuss what is in each directory.

```
o-example
├── README.md
├── demos
|  └── src
|     ├── demo.js
|     ├── demo.mustache
|     └── demo.scss
├── main.js
├── main.scss
├── origami.json
├── package.json
├── src
|  ├── js
|  |  └── o-example.js
|  ├── scss
|  |  ├── _brand.scss
|  |  └── _variables.scss
|  └── tsx
|     └── o-example.tsx
├── stories
|  ├── o-example.scss
|  └── o-example.stories.tsx
└── test
   ├── helpers
   |  └── fixtures.js
   ├── o-example.test.js
   └── scss
      ├── _main.test.scss
      └── index.test.scss
```

## Start Developing

Now we have a basic component to work from we can start developing!

The `npm run watch` command creates a server for us to preview our component in the browser. And whenever we make any change to the source code the component will be rebuilt, which we will be able to see by refreshing our browser:

<pre><code class="o-syntax-highlight--bash">npm run watch -w components/o-example</code></pre>

Opening the link output by the develop command, for example `localhost:5000`, lists the built component assets in the browser (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files) for each brand that component supports.

_The `-w components/o-example` flag is used to run the `watch` command inside the `o-example` [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). If you want to execute a command in a different workspace you can by providing the `-w` flag and workspace name._

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-dev-output.png" />
	<figcaption>
        Running the start command builds our component assets (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files) for each brand specified using the create-component tool.
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-demos-local.png" />
	<figcaption>
        Opening the link output by the develop command, `localhost:5000` in this case, shows us the component assets in the browser (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files).
	</figcaption>
</figure>

Clicking the <abbr title="Hyper Text Markup Language">HTML</abbr> file `core-demo.html` (or other `[BRAND]-core-demo.html` (or other `[BRAND]-demo.html`)) will show a blank page. In the next section we will update our component with new <abbr title="Hyper Text Markup Language">HTML</abbr> and content.

## Markup

Origami components are not built to work with any particular framework in mind. This is because product developers may choose to use any technology stack to build their application, and it’s important that they not be forced to choose a particular one in order to use Origami components. With that in mind Origami components are not written in a templating language or a framework but in plain <abbr title="Hyper Text Markup Language">HTML</abbr>. However some Origami components do provide complimentary TSX templates, which may be used optionally.

Therefore to include component HTML Origami users copy and paste component HTML from the readme `README.md`, interactive component demos which are presented in [Storybook](https://origami.ft.com/storybook/).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-demo-registry.png" />
	<figcaption>
        A live demo of o-labels presented in the registry with <abbr title="Hyper Text Markup Language">HTML</abbr> to copy and paste.
	</figcaption>
</figure>

We will use the demos as previews for local development as well as presenting to users in [Storybook](https://origami.ft.com/storybook/), where Stories don't exist for the component.

The templates for demos are in the `demos` directory and written in [mustache](https://mustache.github.io/). In the demos directory, you should see an example demo `demos/src/demo.mustache` (we'll revisit the other files later). Open `demos/src/demo.mustache` in your editor and you should see something which looks like this (assuming a component name of `o-example`):

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

&lt;div class="o-example" data-o-component="o-example">&lt;/div></code></pre>

That `div` element is our component markup. So we can see something in out demo, add some content within the `div`.

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

-&lt;div class="o-example" data-o-component="o-example">&lt;/div>
+&lt;div class="o-example" data-o-component="o-example">
+   Hello world, I am a component named o-example!
+&lt;/div></code></pre>

The `npm run watch` command which we run earlier will detect that you have updated `demos/src/demo.mustache` and compile it to `demos/local/core-demo.html`. Now if you refresh your browser you should see the content we just added to the demo.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo.png" />
	<figcaption>
        A "hello world" component demo with no styles.
	</figcaption>
</figure>

The `div` tag in our demo may be any HTML tag provided there is a `data-o-component` attribute. The `data-o-component` attribute identifies the root of our component and its [owned dom](/specification/v1/components/markup/#owned-dom). A component may act on a DOM element using JavaScript if the DOM element, or any ancestor, has a data attribute containing the component’s name. There is also a CSS class `o-example` in our demo. Origami components may only style a DOM element with CSS if it, or any ancestor, has a class which starts with the name of the component. There are more details in the [markup section of the component specification](/specification/v1/components/markup/) but we'll revisit this when adding CSS styles and JavaScript to our component.

## Part Two: Base Styles

In part one we learnt:

- The [Origami specification](/specification/v1/) is deprecated, but some sections provide a useful reference to create components compatible with Origami tools and services whilst they are updated.
- Specifically, we learnt about the `npm run create-component` command to generate a component to work from when developing a new component.
- Origami components are generated inside `components` directory and are stored remotely on Github.
- Origami components HTML markup is usually copied by users from origami registry or from storybook demos.
- And finally we learnt how to update the markup in one of those demos.

Now we know how to update our component markup, in part two we will style our component. [Continue to part two](/documentation/tutorials/create-a-new-component-part-2).
