# o-audio

The FT audio player.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

This is a beta version of oAudio. It will accept an `<audio>` element + attach o-tracking events to it (for occurences of `play`, `pause` etc). For more details on these events please see [Analytics](analytics.md).

The expectation is that oAudio will eventually render it's own player interface, potentially with different skins, to be used on ft.com and the app.

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-audio`.

### Markup

```html
<audio controls data-o-component="o-audio">
	<source
		src="https://media.acast.com/ftnewsbriefing/wednesday-november14/media.mp3"
		type="audio/mpeg"
	/>
</audio>
```

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-audio` object or fire the `o.DOMContentLoaded` event, which oAudio listens for.

#### Constructing an o-audio

```js
import oAudio from "@financial-times/o-audio"
oAudio.init()
```

#### Firing an oDomContentLoaded event

```js
import "@financial-times/o-audio"

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"))
})
```

### Sass

Since oAudio renders as a native HTML `<audio>` element only, there are no styles _as yet_.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
⚠ maintained | 1 | 1.4 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-audio/issues) or visit [#ft-next-support](https://financialtimes.slack.com/messages/ft-next-support).

***

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
