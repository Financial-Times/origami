# Migration guide

## Migrating from v4 to v5

In the 5.0.0 release, all the dependencies have been upgraded, and the `o-banner` dependency has been removed. Make sure your app works with the new
dependencies!

### Primary mixins

`o-cookie-message` no longer provides any mixins other than a primary mixin that takes an `$opts` argument, with a single option of `themes`:

To get only the standard theme:

```
@include oCookieMessage($opts: (
  $themes: ('standard')
));
```

To get only the alternative theme:

```
@include oCookieMessage($opts: (
  $themes: ('alternative')
));
```

To get both themes:

```
@include oCookieMessage;
```

### Privacy policy cookie message

The privacy policy cookie message was a temporary feature whose time is up. It
has been completely removed in this version. If you still needed that, [contact origami](mailto:origami.support@ft.com)


## Migrating from v3 to v4
The 4.0.0 release changes the way cookies are set for FT products. It relies on an [internal consent API](https://github.com/Financial-Times/next-consent-proxy/), and `o-cookie-message` will make a call to an endpoint within the API when consent is given.

It no longer has a direct dependency on any component other than `o-banner`, which is now responsible for the construction of the cookie message.

The markup has changed for the banner. When using o-cookie-message imperatively, the correct markup is:
```diff
-<div data-o-component="o-cookie-message" class='o-cookie-message o-cookie-message--banner-centric'>
+<div data-o-component="o-cookie-message">
</div>
```

o-cookie-message events have changed to:
```diff
-oCookieMessage.ready
+oCookieMessage.view
-oCookieMessage.accepted
+oCookieMessage.act
+oCookieMessage.close
```
When using custom HTML, declaring `data-o-cookie-message-use-custom-html="true"` is no longer necessary.

## Migrating from v2 to v3
The 3.0.0 introduces the new majors of o-colors and o-typography and a new dependency on o-normalise. Updating to this new version will mean updating any other components that you have which are using o-colors or o-typography.
There are some design tweaks but no other breaking changes in this release.

## Migrating from v1 to v2

The 2.0.0 release changes the default behaviour of o-cookie-message. Instead of consumers providing the inner HTML for the cookie message, they now need only provide the outer div ie:

```diff
<div class="o-cookie-message__container">
-	<p class="o-cookie-message__description">
-		By continuing to use this site you consent to the use of cookies on your device as described in our <a href="http://help.ft.com/tools-services/how-the-ft-manages-cookies-on-its-websites/">cookie policy</a> unless you have disabled them. You can change your <a href="http://help.ft.com/help/legal-privacy/cookies/how-to-mange-cookies/">cookie settings</a> at any time but parts of our site will not function correctly without them.
-	</p>
-	<div class="o-cookie-message__close-btn-container">
-		<button class="o-cookie-message__close-btn" data-o-component="o-cookie-message-close">
-			<span class="o-cookie-message__close-btn-label">Close</span>
-		</button>
-	</div>
</div>
```

What you need now is:

```html
<div data-o-component="o-cookie-message" class='o-cookie-message o-cookie-message--banner-centric'>
</div>
```

If you do not want to use the FT legal team approved cookie message (for example if you aren't running an FT site), you can opt out of it by setting the `data-o-cookie-message-use-custom-html` attribute to `"true"`. All FT sites **must** use this cookie message unless otherwise cleared by the FT's legal team.

---
