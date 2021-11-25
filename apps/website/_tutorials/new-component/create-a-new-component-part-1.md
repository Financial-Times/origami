---
title: Create A New Origami Component
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component

---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into eight parts and is intended to be followed sequentially from start to finish:
1. Intro & Boilerplate
2. [Base Styles](/docs/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/docs/tutorials/create-a-new-component-part-3/)
4. [Demos](/docs/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/docs/tutorials/create-a-new-component-part-5/)
6. [Testing](/docs/tutorials/create-a-new-component-part-6/)
7. [Documentation](/docs/tutorials/create-a-new-component-part-7/)
8. [Component Lifecycle](/docs/tutorials/create-a-new-component-part-8/)

## Introduction

Usually the Origami team will own an Origami component which is used by multiple teams or groups, but anybody can create and share an Origami component.

In this tutorial we'll build an Origami component. Our example component will display a "hello world" message and include a button which will count the number of times it was clicked. Visually the component will include multiple variations to suit reader facing (core brand) and internal (internal brand) projects. We'll also discuss how to document and publish an Origami component so it is visible in the [Origami Registry](https://registry.origami.ft.com/components).

## Prerequisites

Before you get started, it's a good idea to discuss your new component with the Origami team first. The team will be able to make sure there's not an existing component or [component proposal](https://github.com/Financial-Times/origami#propose-a-new-component) that fulfils the same purpose, and will be available to answer any questions.

To follow this tutorial ensure the following software is install on your machine:
- [NodeJS](https://nodejs.org/en/) (Version 10 or higher)
- [NPM](https://www.npmjs.com/get-npm) (Version 7 or higher)

In addition this tutorial introduces a number of tools and libraries such as [git](https://git-scm.com/), [Sass](https://sass-lang.com/), [sinon.js](https://sinonjs.org/), etc. We do not cover these in depth but attempt to include brief descriptions and links to relevant documentation so that you may learn separately about the parts which are new to you.

If you have any questions please contact the Origami team to help make this tutorial better &#x1F603;. You can find the team on Slack in <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}" class="o-typography-link--external" target="_blank">#{{site.data.contact.slack}}</a>.

## The Origami Specification

The [Origami Specification](/spec/v1/) is deprecated, new components may diverge from its rules. However, some Origami tools and services continue to depend on parts of the deprecated specification so we will refer to relevant sections of the specification throughout this tutorial. Including for folder structure, code standards, documentation and more.

<aside>
See our [blogpost on why the Origami specification is deprecated](https://origami.ft.com/blog/2021/06/01/newsletter/#the-origami-specification-is-no-more).
</aside>

## Build Tools

Origami components are developed using the [Origami Build Tools](https://github.com/Financial-Times/origami-build-tools) (`obt`) command line interface. To work on our component, install Origami Build Tools (`obt`) on your machine by running this command in your terminal:

<pre><code class="o-syntax-highlight--bash">npm install -g origami-build-tools</code></pre>

_This requires Node and npm, see the [Origami Build Tools readme](https://github.com/Financial-Times/origami-build-tools#installation) for more information._

## Boilerplate

To help us get started we can use the [Origami Build Tools `init` command](https://github.com/Financial-Times/origami-build-tools#init). The `init` command will ask a number of questions to determine what kind of component we're building and generate a basic component for us to build from.

Before we run `obt init`, let's discuss some of those questions.

### Component Name

The first thing we will be asked is to decide a component name. Usually Origami components start with `o-`, and only contain lowercase letters or hyphens. See the [component naming convention](/spec/v1/components/#naming-conventions) for more details.

For this tutorial we will name our component `o-example`.

### Component Category

Origami components are categorised, and different rules of the specification may apply to different categories. Examples of categories include `utilities`, `components`, and `layouts`. See the full list of categories with description in the [component category specification](/spec/v1/manifest/#origamicategory).

For this tutorial we will select the most common `components` category.

### Supported Brands

Component brands facilitate [component customisation](/spec/v1/components/sass/#customisation). Brands change the appearance of component elements globally, e.g. change the appearance of all “primary” buttons, including where they are used by other components. Brands include `core` (think, ft.com pink), `internal` for internal tools and products, and `whitelabel` for a striped-back un-opinionated style. Origami components may support one or more brands. We'll discuss brands more later, for now select the `core`, `internal`, and `whitelabel` brand when prompted by `obt init`.

### Support Status

All Origami components have a support status. For example a `maintained` component means that "[the component is] not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with platforms and other projects"; an `experimental` component means "the [component] is not ready for production use". For a full list a support statuses and their meaning see the [support status section of the specification](/spec/v1/manifest/#supportstatus). It is sometimes a good idea to release a new component as `experimental` for a trial period to gather feedback from users, so select `experimental` for now.

As well as a support status, the `obt init` command will ask for a support email address and slack channel. This will help identify your team as owners of the component. When the component is published a message will display in the component registry letting potential users know that support is not guaranteed by the Origami team, and that they should contact your team before using the component.

### JavaScript And Sass

Origami components may include JavaScript for interactivity or [Sass](https://sass-lang.com/) for visual styles (we compile [Sass](https://sass-lang.com/) to CSS). When prompted, select that you would like the component to include JavaScript and Sass for the purposes of this tutorial. We will use the code it generates as a base to discuss building an Origami component later.

### Other Questions

This tutorial won't expand on other questions asked by the `obt init` command, like what the component description and keywords are. Please feel free to contact the Origami team if you have any questions during this step.

### Output

Now run `obt init` and answer the questions as above. You should see a directory which contains component boilerplate (commonly shared component code we can build on top of).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-init-output.png" />
	<figcaption>
        Example output from the `obt init` command at the time of writing. It shows the questions asked and example responses, as discussed previously.
	</figcaption>
</figure>

The structure of our component now looks something like this. In the next section we will start developing our component, and in the process discuss what is in each directory.

```
o-example
├── .eslintrc.js
├── .dependabot
│   └── config.yml
├── .github
│   ├── CODEOWNERS
│   ├── ISSUE_TEMPLATE.md
│   └── workflows
│       └── [a number of .yml files]
├── .gitignore
├── .stylelintrc.js
├── README.md
├── demos
│   └── src
│       ├── demo.js
│       ├── demo.mustache
│       ├── demo.scss
│       └── pa11y.mustache
├── main.js
├── main.scss
├── origami.json
├── package.json
├── src
│   ├── js
│   │   └── example.js
│   └── scss
│       ├── _brand.scss
│       └── _variables.scss
└── test
    ├── js
    │   ├── example.test.js
    │   └── helpers
    │       └── fixtures.js
    └── scss
        ├── _main.test.scss
        └── index.test.scss
```

## Start Developing

Now we have a basic component to work from we can start developing!

First we need to install any component dependencies by running the Origami Build Tools `install` command:

<pre><code class="o-syntax-highlight--bash">obt install</code></pre>

Then we can use the `develop` (`dev`) command to start working on the component. The `dev` command creates a server for us to preview our component in the browser. And whenever we make any change to the source code the component will be rebuilt, which we will be able to see by refreshing our browser:

<pre><code class="o-syntax-highlight--bash">obt dev</code></pre>

Opening the link output by the develop command, for example `localhost:8999`, lists the built component assets in the browser (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-dev-output.png" />
	<figcaption>
        Running the dev command builds our component assets (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files).
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-demos-local.png" />
	<figcaption>
        Opening the link output by the develop command, `localhost:8999` in this case, shows us the component assets in the browser (<abbr title="Hyper Text Markup Language">HTML</abbr>, <abbr title="JavaScript">JS</abbr>, and <abbr title="Cascading Style Sheets ">CSS</abbr> files).
	</figcaption>
</figure>

Clicking the <abbr title="Hyper Text Markup Language">HTML</abbr> file `demo.html` will show a blank page. In the next section we will update our component with new <abbr title="Hyper Text Markup Language">HTML</abbr> and content.

## Markup

Origami components are not built to work with any particular framework in mind. This is because product developers may choose to use any technology stack to build their application, and it’s important that they not be forced to choose a particular one in order to use Origami components. With that in mind Origami components are not written in a templating language or a framework but in plain <abbr title="Hyper Text Markup Language">HTML</abbr>.

Therefore to include component HTML Origami users copy and paste component HTML from the readme `README.md` or interactive component demos which are presented in the [Origami registry](https://registry.origami.ft.com/components/).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/example-demo-registry.png" />
	<figcaption>
        A live demo of o-labels presented in the registry with <abbr title="Hyper Text Markup Language">HTML</abbr> to copy and paste.
	</figcaption>
</figure>

We will use the demos as previews for local development as well as presenting to users in the [Origami registry](https://registry.origami.ft.com/components/).

The templates for demos are in the `demos` directory and written in [mustache](https://mustache.github.io/). In the demos directory, you should see an example demo `demos/src/demo.mustache` (we'll revisit the other files later). Open `demos/src/demo.mustache` in your editor and you should see something which looks like this (assuming a component name of `o-example`):

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

&lt;div class="o-example" data-o-component="o-example">&lt;/div></code></pre>

That `div` element is our component markup. So we can see something in out demo, add some content within the `div`.

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

-&lt;div class="o-example" data-o-component="o-example">&lt;/div>
+&lt;div class="o-example" data-o-component="o-example">
+   Hello world, I am a component named o-example!
+&lt;/div></code></pre>

The `obt dev` command which we run earlier will detect that you have updated `demos/src/demo.mustache` and compile it to `demos/local/demo.html`. Now if you refresh your browser you should see the content we just added to the demo.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo.png" />
	<figcaption>
        A "hello world" component demo with no styles.
	</figcaption>
</figure>

The `div` tag in our demo may be any HTML tag provided there is a `data-o-component` attribute. The `data-o-component` attribute identifies the root of our component and its [owned dom](/spec/v1/components/markup/#owned-dom). A component may act on a DOM element using JavaScript if the DOM element, or any ancestor, has a data attribute containing the component’s name. There is also a CSS class `o-example` in our demo. Origami components may only style a DOM element with CSS if it, or any ancestor, has a class which starts with the name of the component. There are more details in the [markup section of the component specification](/spec/v1/components/markup/) but we'll revisit this when adding CSS styles and JavaScript to our component.

## Part Two: Base Styles

In part one we learnt:
- The [Origami specification](/spec/v1/) is deprecated, but some sections provide a useful reference to create components compatible with Origami tools and services whilst they are updated.
- The [Origami Build Tools](https://github.com/Financial-Times/origami-build-tools) command line interface is used to help us develop and test components.
- Specifically, we learnt about the Origami Build Tools `init` command to generate a component to work from when developing a new component.
- Origami components use `git` source control and are stored remotely on Github.
- Origami components HTML markup is usually copied by users from component demos rather than from templates.
- And finally we learnt how to update the markup in one of those demos.

Now we know how to update our component markup, in part two we will style our component. [Continue to part two](/docs/tutorials/create-a-new-component-part-2).
