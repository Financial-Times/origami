---
title: Updated Focus Styles
description: We've released new focus styles to improve the accessibility of FT Group products which use Origami.
author: Lee Moody
publishDate: 2022-12-14
tldr: We've released new focus styles to improve the accessibility of FT Group products which use Origami. These changes will roll out gradually as teams [pull in the latest Origami component releases](#upgrade-your-project). We're treating this as a minor release and there should be no code changes required to upgrade. However, this is a broad, global change and we encourage teams to [test focus states](#upgrade-your-project) within their projects – the Origami team are here to help if you have any questions, or spot any issues.
---

## What are focus styles?

People browse the web in a number of different ways depending on their preference and access needs. For example some people do not use a mouse but instead use only their keyboard, or other input devices. Focus styles allow people to know which element they're on when moving around a page. [Sara Soueidan's guide to focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/#what-exactly-is-a-focus-indicator%3F) explains this well and includes a screen recording of focus states in action if you would like to learn more.

## Why are focus styles being updated?

In a number of places our focus state styles lack contrast and are difficult to see; particularly when the focused element has a dark background colour, or is on a dark page background. This makes FT Group products difficult to use in places and is a particular barrier to users with certain disabilities.

This issue was highlighted through an audit provided by the [Digital Accessibility Centre](https://digitalaccessibilitycentre.org/) and must be fixed in order for ft.com to be accredited accessible as outlined in [the FT's accessibility commitments](https://www.ft.com/accessibility) – however both user facing products as well as internal tools and documentation are affected.

## What do the new styles look like?

Buttons and inputs will now display a new 2 band outline when focused. One band is near-black ([black-70](https://registry.origami.ft.com/components/o-colors)) and the other white, ensuring that at least one band provides sufficient contrast. Focus state styles for other elements, including links, will remain unchanged as the new approach breaks down when applied to multi-line text, as shown below.

<figure>
    <img alt="Checkboxes from the o-forms component. One has a focus state but it's not very obvious which." src="/assets/images/2022-12-14-focus-styles/focus-checkbox-before.png" />
    <img alt="Checkboxes from the o-forms component with the new double border focus styles. The second, focused checkbox is distinctly highlighted using a 2 band outline of near-black and white." src="/assets/images/2022-12-14-focus-styles/focus-checkbox-after.png" />
    <figcaption>Checkboxes from the o-forms component, before / after. In the before screenshot it's not clear that the second checkbox is the one with focus (note the small outline).</figcaption>
</figure>

<figure>
    <img alt="Primary buttons from the o-buttons component, with the inverse theme applied for use on a dark background. When the second button is focused it looks a lot like the 4th button shown, which is disabled and not interactive." src="/assets/images/2022-12-14-focus-styles/focus-button-inverse-before.png" />
    <img alt="Primary buttons from the o-buttons component, with the inverse theme applied for use on a dark background. The second, focused button is more visibility highlighted using a 2 band outline of white and near-black – the bands are inverse to account for a light element on a dark background." src="/assets/images/2022-12-14-focus-styles/focus-button-inverse-after.png" />
    <figcaption>Primary buttons from the o-buttons component with the "inverse" theme applied, for use on a dark background, before / after. In the before screenshot the second button is focused but it looks a lot like the 4th button shown, which is disabled and not interactive. This is somewhat improved with the new double-band focus style for buttons.</figcaption>
</figure>

<figure>
    <img alt="The o-cookie-message component with the accept button focused. Again it's not super clear which element is focused." src="/assets/images/2022-12-14-focus-styles/focus-cookie-message-before.png" />
    <img alt="The o-cookie-message component with the accept button focused. A new 2 band focus outline of near-black and white makes it easier to see that the accept button is focused." src="/assets/images/2022-12-14-focus-styles/focus-cookie-message-after.png" />
    <figcaption>The o-cookie-message component, before/after. The "accept cookies" button has focus. In the first image the focus outline is hard to see against the colour of the button. It is much more apparent which element has focus in the second image, which shows the new focus state styles.</figcaption>
</figure>

<figure>
    <img alt="" src="/assets/images/2022-12-14-focus-styles/focus-teaser-no-good.png" />
    <img alt="" src="/assets/images/2022-12-14-focus-styles/focus-teaser-no-change.png" />
    <figcaption>The o-teaser component, experiment/after. We chose to keep the existing style by default including for links. Links do not suffer the same contrast issues highlighted above and the new double ring outline breaks down when used on multi-line text elements. Note how the first image shows how the new focus style would have obscured multi-line text.</figcaption>
</figure>

## Upgrade Your Project

We're treating this as a minor release and there should be no code changes required to upgrade. To pull the changes into your project make sure you're using the latest version of Origami components.

- npm: If your project uses npm to install Origami components via a [semver range, such as a caret (^)](https://semver.org/), run `npm update` to update your `package-lock.json`. If you request a specific version of a component in your `package.json`, rather than a semver range, or are a major release behind, you can run `npm outdated` to identify out of date packages which need to be updated – including Origami components.
- Origami Build Service: If you include components using an Origami Build Service url, use the [URL Updater](https://www.ft.com/__origami/service/build/url-updater) to check it's up to date.

Since this is a broad, global change we recommend that you also test focus states within your project. Do this by browsing your project using the tab key on your keyboard ([Browser keyboard navigation in macOS](https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/)) or by browsing with a screen-reader such as [VoiceOver on MacOS](https://webaim.org/articles/voiceover/).

Finally, Origami is no longer enhanced by the [focus-visible polyfill](https://github.com/WICG/focus-visible). If using, aim to remove the focus-visible polyfill from your project as the [:focus-visible CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) now has wide browser support.

If you need any help or find any issue the Origami team are here to help, contact us in the [#origami-support Slack channel](https://financialtimes.slack.com/messages/origami-support/) or email [origami-support@ft.com](mailto:origami-support@ft.com). 😊

## Technical Notes

Hello, you're still here!? Lovely. For the curious, here're a couple of technical notes:

<ol>
  <li>
    <p>The double outline of the new focus style is achieved using the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow">box-shadow CSS property</a>, rather than the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/outline">outline CSS property</a>.</p>
  </li>
  <li>
    <p>We no longer depend on the <a href="https://github.com/WICG/focus-visible">focus-visible</a> polyfill. The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible CSS selector</a> now has wide browser support. We provide a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus">:focus</a> fallback for the minority of browsers in the FT’s browser support policy which do not support the <code class="language-plaintext highlighter-rouge">:focus-visible</code> selector. We’ll let the Customer Products Platforms team know that can be dropped from <code class="language-plaintext highlighter-rouge">dotcom-page-kit</code> to simplify our tech and keep ft.com performant for readers 🙌</p>
  </li>
  <li>
    <p>Sadly (for me) the FT supports older versions of IOS which does not understand the <a href="https://css-tricks.com/supports-selector/">@supports selector</a> syntax, so we apply a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus">:focus</a> style by default and remove it later if <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible</a> is supported (rather than applying <code class="language-plaintext highlighter-rouge">:focus</code> if <code class="language-plaintext highlighter-rouge">:focus-visible</code> is not supported). This is a bit more complicated and introduces a little more CSS, which we always aim to reduce for performance reasons.</p>
  </li>
  <li>
    <p>
    Focus styles are applied by default with the <a href="https://registry.origami.ft.com/components/o-normalise">o-normalise component</a>, but if you would like to manually apply a <code class="language-plaintext highlighter-rouge">:focus-visible</code> style with <code class="language-plaintext highlighter-rouge">:focus</code> fallback to a component checkout the new <a href="https://registry.origami.ft.com/components/o-normalise/sassdoc">o-normalise Sass mixins</a>. E.g.

    <div data-o-component="o-syntax-highlight">

  <pre tabindex="0"><code class="o-syntax-highlight--scss">.my-element {
    // Style `.my-element:focus-visible` with
    // `.my-element:focus` fallback.
    @include oNormaliseFocusApply() {
            // Use the &quot;inverse&quot; focus ring,
            // where the dark and light bands are switched.
            @include oNormaliseFocusContentInverse();
            // Make the colour hotpink when focus is applied,
            // because I have a serious and unreasonable disregard
            // for brand guidelines.
            color: hotpink;
    };
}</code></pre>
</div>
</p>
  </li>
</ol>
