# Origami storybook

This app sources its stories from the `stories` directory inside each
component.

Stories that refer to a number of components, or are about wider guidance, can
be added to the `stories` directory in this app.

This folder is not an npm workspace, because we don't need the root 
package-lock.json to contain all its deps and because we don't control that
package it's best we avoid conflicts.
