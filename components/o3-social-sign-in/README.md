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
  Sign up with Apple
</button>
<button
        id="gSignInWrapper"
        class="o3-social-sign-in-button o3-social-sign-in-button--google"
>
  Sign up with Google
</button>
```

```tsx
<SocialSignIn provider="apple" flow='signin' />
<SocialSignIn provider="google" flow='signin' />
```

When using the TSX component, ids will automatically be set. For Apple sign in, the id is `appleid-signin` and for
Google it is `gSignInWrapper`.

### Properties

| Property   | Values             | Description                                                                                                               |
|------------|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| `provider` | `apple`, `google`  | Styles the button according to the sign in provider's design                                                              |
| `flow`     | `signin`, `signup` | Adjusts copy to match the button's usage. E.g `signin` will read `Sign in with x` and `signup` will read `Sign up with x` |

## Migration

|  State   | Major Version | Last Minor Release | Migration guide |
|:--------:|:-------------:|:------------------:|:---------------:|
| ✨ active |       1       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please
either [raise an issue](https://github.com/Financial-Times/o3-button/issues),
visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or
email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
