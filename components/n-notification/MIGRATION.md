# Migration guide

## Migrating from v7 to v8


Support for Bower and version 2 of the Origami Build Service have been removed.
Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

In addition the following `oLayers` events have been replaced, find and replace them in your project:

- The `oLayers.new` event is removed, use `oOverlay.layerOpen` instead.
- The `oLayers.close` event is removed, use `oOverlay.layerClose` instead.

_Note: When replacing `o-layers` events (`oLayers.close`, `oLayers.new`) make sure they are used only for responding to `o-overlay` and not other packages your project depends on, which may also fire `o-layers` events. That's unlikely. `o-layers` is deprecated and is not used by any other maintained Origami components._
