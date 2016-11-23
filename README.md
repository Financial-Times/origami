# g-audio

This is an origami component to help create styled audio players for IG pages. 

### How to setup the project

- Use the latest node
- install origami-build tools: `npm i -g origami-build-tools`
- `obt install`
- to run: `obt demo --watch --runServer`

### Quick start

To create an audio player inline with text: 

```html
<span class="ig-audio" data-audiourl="demo.mp3">Bring to the table win-win survival<audio controls><source src="demo.mp3" type="audio/mpeg"></audio></span>
```

To create an audio player between paragraphs of text (in development): 

```html
<span class="ig-audio block" data-audiourl="demo2.mp3">Podcasting operational change management<audio controls><source src="demo2.mp3" type="audio/mpeg"></audio></span>
```

### License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
