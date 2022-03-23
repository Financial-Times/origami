# g-audio

This is an [origami](http://origami.ft.com/) component to help create styled audio players for IG pages. This is currently **experimental**.

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `g-audio`.

- [Getting started](#getting-started)
- [Local development](#local-development) 
- [Licence](#licence)

## Getting started

Install the module:

```
npm install @financial-times/g-audio
```

Load the JS:

```js
import * from GAudio from '@financial-times/g-audio';

GAudio.init();
```

Load the CSS:

```scss
@import '@financial-times/g-audio/main';
```

Copy markup from one of the following demos:

To create an audio player inline with text:

```html
<span class="g-audio">
  Bring to the table win-win survival
  <audio controls>
    <source src="demo.mp3" type="audio/mpeg">
  </audio>
</span>
```

To create an audio player between paragraphs of text (in development):

```html
<span class="g-audio g-audio--block">
  Podcasting operational change management
  <audio controls>
    <source src="demo2.mp3" type="audio/mpeg">
  </audio>
</span>
```

## Local development

- Directions for [developing Origami components](https://origami.ft.com/documentation/tutorials/create-a-new-component-part-1/).
- Run `obt install` to install component dependencies.
- Run `obt dev` to start working on the component locally.

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
