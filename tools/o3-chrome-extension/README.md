# Origami Chrome Extension

o3 origami extension that provides a grid overlay on the page to help with layout and spacing.

- [Origami Chrome Extension](#origami-chrome-extension)
  - [Project Structure](#project-structure)
  - [Extension components](#extension-components)
  - [Setting up dev environment and run locally](#setting-up-dev-environment-and-run-locally)
  - [Further information](#further-information)

## Project Structure

All of the code is in the the `src` folder.

The code in the `src` folder is split into the four file types:

- html
- js
- styles
- images

This folder also includes the manifest file for the extension.
Each top folder includes the a folder for each component of the chrome extension, with the clearly defined entry points.

## Extension components

The chrome extension is made up of four components:

- `background` - _code that runs in chrome browser process_
- `content` - _code that runs on your page content_
- `popup` - _a extension popup frame_

In the project folder structure, each component has the main entry point for each file type as its name. For example, the `popup` component has these entry point files for each file type:

- popup.html
- popup./css
- popup.js

## Setting up dev environment and run locally

1. Clone repo
2. (Optional) install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) for automatic reloading of chrome extensions in dev mode
3. Open Chrome and navigate to extensions (chrome://extensions/)
4. Select 'Load unpacked extension...' and select the dist folder

## Further information

See the wiki.
