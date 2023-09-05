# o-social-follow [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Follow on social media links. For social share buttons see [o-share](https://registry.origami.ft.com/components/o-share).

- [Overview](#overview)
- [Usage](#usage)
- [Socials](#socials)
- [Markup](#markup)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-social-follow`.

Social follow can be used when wanting to give more freedom for users when choosing how they engage with our content adding social media platform links to easily allow users to follow us on specific platforms.

It should not be used to re-share content, for this use [o-share](https://registry.origami.ft.com/components/o-share).

## Socials

Social icons currently supported include:
- twitter
- facebook
- linkedin
- youtube
- instagram

## Markup

`o-social-share` markup consists of a containing section with label, to group social media links in a landmark. Within the container is 1 or more social media links `o-social-follow-icon`. A visually hidden label identifies the icon to users of assistive technologies such as screen readers.


The following example shows a single Facebook link.
```html
<section class="o-social-follow"  aria-label="Follow on social media">

	<a href="#" class="o-social-follow-icon o-social-follow-icon--facebook">
		<span class="o-social-follow-icon__label">on facebook</span>
	</a>

</section>
```

The next example shows multiple social media links.
```html
<section class="o-social-follow" aria-label="Follow on social media">
	<a href="#" class="o-social-follow-icon o-social-follow-icon--twitter">
		<span class="o-social-follow-icon__label">on X, formerly know as Twitter</span>
	</a>
	<a href="#" class="o-social-follow-icon o-social-follow-icon--facebook">
		<span class="o-social-follow-icon__label">on facebook</span>
	</a>
	<a href="#" class="o-social-follow-icon o-social-follow-icon--linkedin">
		<span class="o-social-follow-icon__label">on linkedin</span>
	</a>
	<a href="#" class="o-social-follow-icon o-social-follow-icon--youtube">
		<span class="o-social-follow-icon__label">on youtube</span>
	</a>
	<a href="#" class="o-social-follow-icon o-social-follow-icon--instagram">
		<span class="o-social-follow-icon__label">on instagram</span>
	</a>
</section>
```

### Stand Alone

Add the modifier class `o-social-follow-icon--standalone` to each social icon when following on social media is not the primary action available to a user.

```diff
-	<a href="#" class="o-social-follow-icon o-social-follow-icon--instagram">
+	<a href="#" class="o-social-follow-icon o-social-follow-icon--instagram o-social-follow-icon--standalone">
-		<span class="o-social-follow-icon__label">on instagram</span>
-	</a>
```

### Inverse

To use `o-social-follow` on a dark background add the "inverse" modifier class `o-social-follow--inverse` to each social icon. The inverse theme may be used with either stand alone or contained variants above.

```diff
-	<a href="#" class="o-social-follow-icon o-social-follow-icon--instagram">
+	<a href="#" class="o-social-follow-icon o-social-follow-icon--instagram o-social-follow-icon--inverse">
-		<span class="o-social-follow-icon__label">on instagram</span>
-	</a>
```

## Sass

```scss
@import '@financial-times/o-social-follow/main';
```

Call `oSocialFollow` to output all `o-social-follow` styles.

```scss
@include oSocialFollow();
```

We recommend passing the `oSocialFollow` mixin an optional argument `$opts`, to specify styles granularly and keep your CSS bundle small.

For example:
```scss
@include oSocialFollow($opts: (
	'icons': ('twitter', 'facebook', 'linkedin', 'youtube', 'instagram'),
	'standalone': true,
	'themes': ('inverse')
));
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-social-follow/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

***

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
