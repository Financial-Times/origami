# Origami Dictionary

The Origami Dictionary is the repository for storing, managing and publishing Origami Design Tokens.

## Getting Started

The dictionary uses [Tokens Studio](https://tokens.studio/) and [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to manage and publish design tokens.

### Developers and Desingers

* Ensure you have been given a Tokens Studio account, the #origami-support Slack channel can help with this.
* Follow the steps on the [token's studio docs](https://docs.tokens.studio/sync/github) to sync the dictionary with Tokens Studio in Figma.
  * On step 4, ensure you use the following details:
    * Add your GitHub repository `Financial-Times/origami`.
    * Add your dictionary branch `poc/multi-brand`.
    * Specify a file path where your tokens should be stored `apps/dictionary/tokens`.

### Developers

* Follow the steps for [Developers and Designers](#developers-and-desingers).
* Ensure you have been added to the Origami team on GitHub.
* Clone the repository
```bash
git clone git@github.com:Financial-Times/origami.git
```
* Install the dependencies

```bash
npm ci
```
* Build the dictionary locally
```bash
cd apps/dictionary
npm run build
```
