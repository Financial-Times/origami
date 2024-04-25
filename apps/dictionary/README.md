# Origami Dictionary

The Origami Dictionary is the repository for storing, managing and publishing Origami Design Tokens.

## Getting Started

The dictionary uses [Tokens Studio](https://tokens.studio/) and [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to manage and publish design tokens.

### Developers and Desingers

- Ensure you have been given a Tokens Studio account, the #origami-support Slack channel can help with this.
- Follow the steps on the [token's studio docs](https://docs.tokens.studio/sync/github) to sync the dictionary with Tokens Studio in Figma.
  - On step 4, ensure you use the following details:
    - Add your GitHub repository `Financial-Times/origami`.
    - Add your dictionary branch `poc/multi-brand`.
    - Specify a file path where your tokens should be stored `apps/dictionary/tokens`.

### Adding/updating SVG icon tokens

First of all, the icon will need to be added/updated in Figma. Once the designer has updated the icon, the designer will need to copy the SVG code and put it inside the Token Studio under Icons set with type of `Asset`. After this we will need to push changes from token studio to GitHub so new tokens can be used by other developers or components.

### Developers

- Follow the steps for [Developers and Designers](#developers-and-desingers).
- Ensure you have been added to the Origami team on GitHub.
- Clone the repository

```bash
git clone git@github.com:Financial-Times/origami.git
```

- Install the dependencies

```bash
npm ci
```

- Build the dictionary locally

```bash
cd apps/dictionary
npm run build
```

#### Testing

Run the following command to run tests and listen for changes.

```bash
npm run test
```

To update tests see the following files:

- `apps/dictionary/__test__/integration.test.js`: Test file and expectations.
- `apps/dictionary/__test__/tokens`: Mock design tokens used for testing purposes.
- `apps/dictionary/__test__/build`: Temporary build assets created by running tests. This is the output we test against.

Run `npm run test -- --update` to update snapshots.
