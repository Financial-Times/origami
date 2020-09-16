# Use Variable Fonts

## Motivation

There are three motivations for using variable fonts:
- Allow the design team to use more variations of Financier Display and Metric on ft.com, weight/style.
- Allow the design team to use Financier Text on ft.com (pending further work).
- Remove the unreliable and relatively complex progressive font loading from `o-typography`.

## Explanation

### Overview

The design team are limited to a small number of weights and styles for our custom fonts due to performance. Variable fonts combine variants into one, smaller file and would allow the design team to make greater use of typography within Financial Times products without degrading current performance.

Given older browsers don't support variable fonts we can use newer standards to load them. And since we are commissioning variable fonts we can update the fonts to more closely match their fallback font (the font that is used if a custom font is not supported or takes too long to load). Together this means we can remove custom font loading JavaScript/Sass from `o-typography`.

### Support

This proposal changes who will and won't see our custom fonts.

Users with browsers which do not support variable fonts will instead see fallback fonts permanently. For example users running macOS prior to 10.13 or, notably for us, Internet Explorer 11 users. For these users fallback fonts will always be shown. Its not an insignificant number of users as [Internet Explorer currently represent ~6% of desktop requests](https://chartio.com/financialtimes/browser-charts/). On the other hand core experience users will see our custom fonts if their browsers also support variable fonts. Currently core experience users always see our fallback font.

### Font File Size

The file size of fonts is not the only performance indicator but is one of the main reasons, with our current font loading strategy, why we haven't been able to include more non-variable font files. This section evaluates how this proposal would change the download size of our custom fonts:

The [font variants currently used on ft.com](
https://github.com/Financial-Times/n-ui-foundations/blob/62be704f649442c65356708183998e90cc78340c/typography/main.scss#L5) are:

|family|weight|style|size (bytes)|
|---|---|---|---|
|financier display|normal|regular|47176|
|financier display|bold|regular|47092|
|financier display|medium|regular|38692|
|total financier display size |||132960|
|metric|normal|regular|29120|
|metric|semibold|regular|31148|
|total metric size |||60268|
|Georgia (system font)|n/a|n/a|n/a|

The variable fonts which we have are as follows (we do not have a Metric variable font yet):

|family|weight|style|size (bytes)|
|---|---|---|---|
|financier display|n/a|regular|64380|
|financier display|n/a|italic|69628|
|total variable financier display size |||134008|
|financier text|n/a|regular|52336|
|financier text|n/a|italic|54112|
|total financier text size |||106448|

- The Financier Display variable font totals 134kb; only ~1kb larger than the variants currently used.
- We don't have a Metric variable font yet but its likely to be slightly larger than the two currently used.
- The financier text variable font would replace a system font adding an extra 106kb to download.

From a font download perspective we can expect a small increase to enable all variants of the font families we currently use. There is a ~100kb increase if we also introduce Financier Text, which we can justify by considering other changes to our progressive font loading strategy.

### Font Loading Strategy Background

Browsers [may layout and paint the page before custom fonts are downloaded](https://web.dev/optimize-webfont-loading/). This causes a Flash of Invisible Text (FOIT) whilst the page loads. Some browsers, for example some versions of Safari, hide text until the font is downloaded which could mean users are unable to access any content for a long time. Other browsers use a fallback system font either immediately or if the custom font hasn't loaded within 3 seconds. When the custom font is loaded these browsers swaps the fallback font for the custom font. Swapping fonts can be jarring visually, its sometimes refereed to as a Flash of Unstyled Text (FOUT). This has user experience and performance implications due to the browser needing to layout and paint the page again.

### Current Font Loading Strategy

We preload fonts on ft.com so they may [start downloading before CSS has been downloaded and parsed, etc](https://web.dev/optimize-webfont-loading/). Prioritising the download of custom fonts means we can reduce the Flash of Invisible Text (FOIT) and Flash of Unstyled Text (FOUT).

In addition `o-typography` currently aims to improve the experience by:
- Normalising the size of fallback fonts so they are closer to our custom fonts, reducing the impact of switching from fallback fonts both visually and minimising page layout changes.
- Using the fallback font immediately in all browsers and swapping for the custom font when its downloaded; unless the download takes longer than 3 seconds in which case the fallback font remains in use.

#### Issues With Of Our Current Font Loading Strategy

- It requires JavaScript, which means core experience users never see custom fonts.
- Its not reliable. `o-typography` remembers fonts have loaded with a cookie which may persist after the browser cache has removed fonts; in which case the browsers default fallback behaviour is used and fallback fonts aren't resized.
- It [doesn't always resize well](https://github.com/Financial-Times/o-typography/issues/248), depending on the font variant in use.
- In the context of Customer Products its [a bit complicated, breaks, and can be difficult to debug](https://github.com/Financial-Times/dotcom-page-kit/pull/803).
- Though minor given the overall size it increases the bundle size of projects, see the `next-front-page` example below.

|`next-front-page` asset|`o-typography` progressive font loading|uncompressed|gzip|brotli|
|---|---|---|---|---|
|css|yes|428|60|52|
|css|no|412|56|48|
|reduction||16 (3.6%)|4 (6.7%)|4 (7.7%)|
|js|yes|636|276| 248|
|js|no|628|272|240|
|reduction||8 (1.3%)|4 (1.4%)|8 (3.2%)|

#### Screenshots Of Our Current Font Loading Strategy

<details>
    <summary>gif: current o-typography progressive font loading, 3g connection</summary>
    <img src="../../assets/variable-fonts/current-regular-3g-js.gif" alt="`o-typography` progressive font loading, 3g connection">
</details>

<details>
    <summary>gif: current o-typography progressive font loading, 3g connection, where cookie is out of sync with font cache</summary>
    Note there is more shifting of the layout around the teasers and nav.
    <img src="../../assets/variable-fonts/current-regular-3g-js-cookie.gif" alt="`o-typography` progressive font loading, 3g connection, where cookie is out of sync with font cache">
</details>

<details>
    <summary>screenshot: core experience fallback fonts, with o-typography fallback font resizing</summary>
    <img src="../../assets/variable-fonts/current-core.png" alt="`o-typography` progressive font loading, 3g connection, where cookie is out of sync with font cache">
</details>

By moving to variable fonts we can also replace the `o-typography` font loading strategy with a more reliable, standards based approach, and trim the CSS/JS bundle size of our projects as a bonus.

### Proposed Font Loading Strategy

Replace `o-typography`'s progressive font loading:
- Commission a Metric Web variable font at a size more comparable to the fallback font. The [main benefit of o-typography fallback resizing is for Metric Web to fallback to Arial](https://github.com/Financial-Times/o-typography/issues/248).
-  Use the [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) property to adjust the browsers default font loading strategy. It is supported by all browsers which support variable fonts.

_Note: To closely imitate current behaviour we would set `font-display: fallback`. Our fonts would block for a short period (100ms) and have a short swap period (3s). However we could review other strategies. For example if we find introducing Financier Text impacts performance negatively we may be able to load some variants with a low priority by not preloading them and setting `font-display: optional`._

### Benefits

- The design team can make greater use of typography; to strengthen the brand and explore new design possibilities using typography, such as to provide a clear link between story 'genre' (news/opinion).
- Progressive font loading is more reliable for readers.
- Saved engineering time through reduced code complexity.

### Drawbacks

- A minority but significant group of users, including IE11 users, always see fallback fonts.

## Work Required

Required:
- Commission a resized MetricWeb variable font.
- Add variable font files to `o-font-assets`.
- Update `o-fonts` font faces with variable fonts and functions such as `oFontsVariantExists`.
- Remove progressive font loading from `o-typography` and deprecate the interface.
- Update the MetricWeb type scale in `o-typography` to account for the resizing.
- Update [`dotcom-page-kit` font preloading](https://github.com/Financial-Times/dotcom-page-kit/blob/v2.0.2/packages/dotcom-ui-base-styles/src/lib/fontFaces.ts).

Follow up:
- Work with the design team to validate `Financier Text` and swap the serif font in `o-typography`.

## Alternatives

### Do Nothing

Accept the drawbacks of our current approach, continue to serve a limited set of custom fonts including to users with older operating systems / browsers.

### Hybrid

We could deliver our limited set of custom fonts to older browsers without progressive font loading. But this:
- Would be a bad experience for some Safari users who would not see a font fallback and would have to wait for the custom fonts to download.
- May lead to ugly faux weight/styles.

### Variable Fonts With Current Progressive Font Loading

If we keep o-typography's progressive font loading we won't need to commission resized fonts but lose some of the performance, reliability, and reduced complexity benefits. We may need to add new classes to o-typography and coordinate with teams to add those to their project to roll out variable fonts.

## Questions:

- Are we happy to serve fallback fonts to some users?
- Is a resized Metric variable font actually possible, and how much would it cost to commission?
- Do we want to commission a resized Financier too? See headline shift in screenshots.
- If we resized Metric and updated the scale, are design ok with remembering the new scale?
- We don't use many Metric font variants. How much bigger in file size will the variable font be?
- How will we preload the variable and non-variable fonts conditionally? rely on woff2 `type` being close enough? `media`? Add the link tag with a script?
