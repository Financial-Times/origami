# g-audio

This is an [origami](http://origami.ft.com/) component to help create styled audio players for IG pages. This is currently **experimental**.

### Getting started

Install the module:

```
bower install --S g-audio
```

Load the JS:

```js
const GAudio = require('g-audio');

GAudio.init();
```

Load the CSS:

```scss
@import 'g-audio/main';
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

### License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
