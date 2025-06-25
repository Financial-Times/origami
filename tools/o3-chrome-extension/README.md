# Origami Chrome Extension

The o3 Origami extension adds a grid overlay to the page to assist with layout and spacing.

- [Origami Chrome Extension](#origami-chrome-extension)
  - [Project Structure](#project-structure)
  - [Extension components](#extension-components)
  - [Setting up the Development Environment](#setting-up-the-development-environment)
  - [Updating the extension](#updating-the-extension)
    - [Publishing the extension](#publishing-the-extension)
    - [Getting access to upload to Chrome Web Store](#getting-access-to-upload-to-chrome-web-store)
    - [Uploading to Chrome Web Store Dev Console](#uploading-to-chrome-web-store-dev-console)
  - [Troubleshooting](#troubleshooting)
  - [Further information](#further-information)

## Project Structure

```tree
src
├── js
│   ├── background.js
│   ├── content.js
│   ├── popup.js
│   └── utils.js
├── styles
│   └── popup.css
|   └── grid.css
public
├── images
├── manifest.json
index.html
```

All code is located in the `src` and `public` folders.

The public folder contains static assets such as images and the extension’s `manifest.json` file. During the Vite build process, this folder’s contents are copied to the `dist` directory. The Vite configuration ensures that the paths defined in `manifest.json` are correctly resolved.

The src folder contains the source code, organized into two main types:

- JavaScript (js)
- Styles (styles)

Each top-level folder includes sub-folders for the individual components of the Chrome extension, with clearly defined entry points.

## Extension components

The Chrome extension is made up of four components:

- `background` - _code that runs in Chrome browser process as a service worker._
- `content` - _code that runs on your page content._
- `popup` - _a extension popup frame._
- `utils` - _utility functions and shared helpers used across different components._

Each component in the project has main entry files named after the component. For example, the `popup` component includes:

- `popup.html`
- `popup.css`
- `popup.js`

For a quick introduction to Chrome extension components, see the [Chrome Extension Tutorials](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)

## Setting up the Development Environment

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm run dev`. This will watch for changes and build files into the `dist` folder.
   <br />For a production build, use `npm run build-prod`.
4. _(Optional)_ Install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) for automatic reloading of the extension in development mode.
5. Open Chrome and go to (`chrome://extensions/`).
6. Click "Load unpacked" and select the `dist` folder from the `o3-chrome-extension` project directory.
7. File changes in the `src` folder will trigger automatic updates. Changes in the `public` folder require manual reloading the extension in Chrome.

## Updating the extension

There are a few steps involved in updating and publishing the Chrome extension onto the Web Store for FT staff to use.

### Publishing the extension

To publish, we will need to do the following steps which has been broken up in sections below. To understand the process of updating the Chrome extension, we advise you spend a few moments reading up on the documentation.

- [Chrome for Developers: Update your Chrome Web store item](https://developer.chrome.com/docs/webstore/update)

Onto the steps below:

### Updating the extension

Generate a zip file of the updated Chrome extension. There are two ways of doing this process.

1. Inside the `tools/o3-chrome-extension` directory

```shell
npm run build-prod
```

2. On root level of the monorepo

```shell
npm run build-prod -w tools/o3-chrome-extension
```

> [!NOTE]
> The zip file is generated in the `dist` folder after running the script above. It uses the native zip utility in MacOS. If you are not using MacOS, then you will need to install and configure a command line zip utility tool to use for this process.

### Getting access to upload to Chrome Web Store

To upload to the Chrome Web Store, there is an Origami shared email address which can be used to do this part.

1. See if you have access to the Origami Vault on 1Password. If you do, then go to the third step, if not, go to the second step.
2. Ask the Origami team to add you to access the vault on 1Password.
3. Access the shared email address credentials.
4. Log in incognito mode to use the shared email credentials on [Chrome Web Store Dev Console](https://chrome.google.com/webstore/devconsole).

### Uploading to Chrome Web Store Dev Console

1. Ensure you have a zipped version of the extension from the `dist` folder.
2. Log in to the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole) and click “New item” to upload your zip file. This will overwrite the existing version.
3. Before uploading, make sure the version field in `manifest.json` which can be found in the `public` folder is updated to the [correct semantic version](https://semver.org/) for the new release.

## Troubleshooting

If changes aren’t appearing in the extension, try reloading the extension in Chrome, then refresh the page.
For more debugging tips, see the [official Chrome developer guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug).

## Further information

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/get-started)
