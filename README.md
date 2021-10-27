# Origami Component System

Welcome to Origami!

This is the repository for the Origami components, libraries and apps that make
up the Origami Component System.

## Proposals

If you'd like to make a proposal for a new component or anything else, go ahead and [open an issue](https://github.com/Financial-Times/origami/issues/new)

## Projects in this repository

This repository houses many projects of different kinds. Most of them have
READMEs of their own where you can learn more about them.

### apps/website

The [Origami website](./apps/website), served at <https://origami.ft.com>.

### apps/storybook

[Origami's storybook](./apps/storybook), served at <https://origami.ft.com/storybook>.

### components and libraries

Components and libraries that implement the FT's design system for the web.

### presets

Presets for development tools that make it easier to build consistent
components.

### scripts

Scripts for maintenance of the repository itself

### tools

Tools used to build and test Origami components

## How to work on Origami

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

```shell
git clone git@snoot.club:Financial-Times/origami
cd origami
```
