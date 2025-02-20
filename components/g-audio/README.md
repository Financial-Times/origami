# g-audio

This is an [origami](http://origami.ft.com/) component to help create styled audio players for IG pages. This is currently **experimental**.

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `g-audio`.

- [Getting started](#getting-started)
- [Migration](#migration)
- [Licence](#licence)

## Getting started

Install the module:

```
npm install @financial-times/g-audio
```

Load the JS:

```js
import GAudio from '@financial-times/g-audio';

GAudio.init();
```

Load the CSS:

```scss
@import '@financial-times/g-audio/main';

@include gAudio();
```

Copy markup from one of the following demos:

To create an audio player inline with text:

```html
<span class="g-audio">
	Bring to the table win-win survival
	<audio controls>
		<source src="demo.mp3" type="audio/mpeg" />
	</audio>
</span>
```

To create an audio player between paragraphs of text (in development):

```html
<span class="g-audio g-audio--block">
	Podcasting operational change management
	<audio controls>
		<source src="demo2.mp3" type="audio/mpeg" />
	</audio>
</span>
```

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
| ⚠ maintained |       3       |        N/A         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.0         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |       1.0.7        |                          N/A                          |

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
