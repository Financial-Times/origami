# Origami Chrome Extension

o3 origami extension that provides a grid overlay on the page to help with layout and spacing.

- [Origami Chrome Extension](#origami-chrome-extension)
  - [Project Structure](#project-structure)
  - [Extension components](#extension-components)
  - [Setting up dev environment and run locally](#setting-up-dev-environment-and-run-locally)
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

All of the code is in the the `src` and `public` folders.

`public` folder contains the static assets like images and the manifest file for the extension. Vite build will copy the contents of this folder to the dist folder and configuration of vite makes sure that paths defined in `manifest.json` is correct.

The code in the `src` folder is split into the 2 file types:

- js
- styles

Each top folder includes the a folder for each component of the chrome extension, with the clearly defined entry points.

## Extension components

The Chrome extension is made up of four components:

- `background` - _code that runs in Chrome browser process as a service worker_
- `content` - _code that runs on your page content_
- `popup` - _a extension popup frame_

In the project folder structure, each component has the main entry point for each file type as its name. For example, the `popup` component has these entry point files for each file type:

- popup.html
- popup.css
- popup.js

For quick intro to Chrome extension components, see [Chrome Extension Tutorials](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)

## Setting up dev environment and run locally

1. Clone repo
2. `npm install`
3. run `npm run dev` to start the dev server that constantly watches for changes and build files in build folder. For production build run `npm run build-prod`. Both of these commands will build the extension in the dist folder.
4. (Optional) install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) for automatic reloading of Chrome extensions in dev mode
5. Open Chrome and navigate to extensions (chrome://extensions/)
6. Select 'Load unpacked extension...' and select the dist folder from o3-chrome-extension folder
7. Any file changes made in src should update the extension. File changes in public folder will require a manual reload of the extension in Chrome.

## Publishing extension

You need to use origami shared email address to upload new extension. For more information about shared Email ask origami team.

Follow the instructions above to build for production which should create a zip file (`o3-chrome-extension.zip`) that can then be uploaded by clicking Add new item. Complete the form and publish the extension with private permissions for FT users only. If needed, IT Service Desk can add the new extension to the FT catalog, using the extension ID. To find out more about updating the extension visit [update](https://developer.chrome.com/docs/webstore/update) section on chrome developer documentation.

> [!NOTE]
> Zip is generated in the dist folder after running `npm run build-prod` and uses mac native zip command. If you are using windows, you may need to install a zip command line tool.

## Troubleshooting

If you are having trouble with changes not reflecting in the extension, try reloading the extension and then the page itself. More debugging tips can be found [at the official chrome developer](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug)

## Further information

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/get-started)
