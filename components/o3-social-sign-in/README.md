# o3-social-sign-in

Anchor tag to provide consistent styling of social sign-in providers.

- [o3-social-sign-in](#o3-social-sign-in)
    - [Markup](#markup)
    - [Migration](#migration)
    - [Contact](#contact)
    - [Licence](#licence)

## Markup

o3-social-sign-in supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

Two providers are supported: Google and Apple. We recommend you follow their guides to integrate `o3-social-sign-on` to
their sign-in flows:

* [Displaying Sign in with Apple buttons on the web](https://developer.apple.com/documentation/sign_in_with_apple/displaying_sign_in_with_apple_buttons_on_the_web)
* [Building a custom Google Sign-In button](https://developers.google.com/identity/sign-in/web/build-button)

```html

<button
        id="appleid-signin"
        class="o3-social-sign-in-button o3-social-sign-in-button--apple"
>
  <span class="o3-social-sign-in-button__copy">Sign in with Apple</span>
</button>
<button
        id="gSignInWrapper"
        class="o3-social-sign-in-button o3-social-sign-in-button--google"
>
  <span class="o3-social-sign-in-button__copy">Sign in with Google</span>
</button>
```

```tsx
<SocialSignIn provider="apple" />
<SocialSignIn provider="google" />
```

When using the TSX component, ids will automatically be set. For Apple sign in, the id is `appleid-signin` and for
Google it is `gSignInWrapper`.

By default, the TSX component will display the button with default copy. Use the `text` property to customise it:
```tsx
<SocialSignIn provider="apple" text="Register with Apple" />
<SocialSignIn provider="google" text="Register with Google" />
```

### Properties

| Property   | Values             | Description                                                                                                                            |
|------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `provider` | `apple`, `google`  | Styles the button according to the sign in provider's design                                                                           |
| `text`      | Any `string` value | (Optional) Lets users override copy with custom content. If no string is provided then `Sign in with <provider>` will display instead. |

## Migration

|  State   | Major Version | Last Minor Release | Migration guide |
|:--------:|:-------------:|:------------------:|:---------------:|
| ✨ active |       1       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please
either [raise an issue](https://github.com/Financial-Times/origami/issues),
visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or
email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
