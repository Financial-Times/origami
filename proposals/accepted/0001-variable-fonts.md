# Use Variable Fonts

## Motivation

- Allow the design team to use more variations of Financier Display and Metric on ft.com, weight/style.
- Enable the design team to use Financier Text on ft.com (pending further work).

## Explanation

### Overview

The design team are limited to a small number of weights and styles for our custom fonts due to performance. Variable fonts combine variants into one, smaller file and would allow the design team to make greater use of typography within Financial Times products without degrading current performance.

Not all browsers and operating systems support variable fonts. For example macOS prior to 10.13 or, notably for us, Internet Explorer 11 ([~6% of desktop requests](https://chartio.com/financialtimes/browser-charts/)). Users with browsers which do not support variable fonts will fallback to the limited set of custom fonts we use currently.

Where custom fonts fail to load or fail to load quickly, we will fallback to system fonts in the same way as we do now.

As our fallbacks have a limited set of weights and styles the design team must keep these experiences in mind.

### Font Loading Strategy Background

Browsers [may layout and paint the page before custom fonts are downloaded](https://web.dev/optimize-webfont-loading/). This causes a Flash of Invisible Text (FOIT) whilst the page loads. Some browsers, for example some versions of Safari, hide text until the font is downloaded which could mean users are unable to access any content for a long time. Other browsers use a fallback system font either immediately or if the custom font hasn't loaded within 3 seconds. When the custom font is loaded these browsers swaps the fallback font for the custom font. Swapping fonts can be jarring visually, its sometimes refereed to as a Flash of Unstyled Text (FOUT). This has user experience and performance implications due to the browser needing to layout and paint the page again.

### Current Font Loading Strategy

We preload fonts on ft.com so they may [start downloading before CSS has been downloaded and parsed, etc](https://web.dev/optimize-webfont-loading/). Prioritising the download of custom fonts means we can reduce the Flash of Invisible Text (FOIT) and Flash of Unstyled Text (FOUT).

In addition `o-typography` currently aims to improve the experience by:
- Normalising the size of fallback fonts so they are closer to our custom fonts, reducing the impact of switching from fallback fonts both visually and minimising page layout changes.
- Using the fallback font immediately in all browsers and swapping for the custom font when its downloaded; unless the download takes longer than 3 seconds in which case the fallback font remains in use.

<details>
    <summary>gif: current o-typography progressive font loading, 3g connection</summary>
    <img src="../../assets/variable-fonts/current-regular-3g-js.gif" alt="`o-typography` progressive font loading, 3g connection">
</details>

<details>
    <summary>screenshot: core experience fallback fonts, with o-typography fallback font resizing</summary>
    <img src="../../assets/variable-fonts/current-core.png" alt="`o-typography` progressive font loading, 3g connection, where cookie is out of sync with font cache">
</details>

### Font Variant Performance Cost

The file size of fonts is not the only performance indicator but is one of the main reasons why we haven't been able to include more non-variable font files. This section evaluates how this proposal would change the download size of our custom fonts:

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

From a font download perspective we can expect a small increase to enable all variants of the font families we currently use. There is a ~100kb increase if we also introduce Financier Text.

### Benefits

The design team can make greater use of typography; to strengthen the brand and explore new design possibilities using typography, such as to provide a clear link between story 'genre' (news/opinion).

### Drawbacks

- There's an additional experience to consider in design for a total of 3 (no custom fonts, limited custom fonts, variable fonts)
- Perceived performance may be reduced if we also include Financier Text

## Work Required

Required:
- Commission a MetricWeb variable font.
- Work with the design team to define which font variants should be allowed, to limit the variable font set sensibly. Update the readme of `o-fonts`/`o-typography` accordingly and throw an error in `o-typography` if a non-recommended variant is used.
- Add variable font files to `o-font-assets`.
- Update `o-fonts` font faces with variable fonts and functions such as `oFontsVariantExists`. Use `@supports` to load variable fonts conditionally.
- Update `o-typography` to [remove font loading classes when the variable fonts have loaded](https://github.com/Financial-Times/o-typography/blob/040377b8fd2f2ea8df9bc85e366f88b82e8284d2/src/js/typography.js#L118).
- Ask the Platforms team to benchmark performance before release to compare performance metrics before and after.
- Update [dotcom-page-kit font preloads](https://github.com/Financial-Times/dotcom-page-kit/blob/bb503876231b9ab5a118e6306f07df457636b41a/packages/dotcom-ui-base-styles/src/lib/fontFaces.ts#L3) to preload the variable fonts given `woff2` support and the fallback fonts if `woff2` is not supported. _Note some browsers support `woff2` but not variable fonts and will preload the font unnecessarily. The group seems small, and is not supported by PageKit._

Follow up:
- Work with the design team to validate `Financier Text` and swap the serif font in `o-typography`.

## Alternatives

### Do Nothing

Accept the drawbacks of our current approach, continue to serve a limited set of custom fonts.

### No Limited Set Fallback

We could fallback straight to system fonts, instead of falling back first to a limited set of custom fonts. There would be one fewer experiences to consider from a design perspective and slightly reduced technical complexity but we weaken the brand/design for a significant group of users.

### Resized Variable Fonts

Given older browsers don't support variable fonts we can use newer standards to load them. And since we are commissioning variable fonts we can update the fonts to more closely match their fallback font in size. Together this means we can remove custom font loading JavaScript/Sass from `o-typography`. This would solve a number of issues with our current font loading strategy:

<details>
<summary>Issues with the current progressive font loading strategy.</summary>
<ul>
    <li>It requires JavaScript, which means core experience users never see custom fonts.</li>
    <li>Its not reliable. <code>o-typography</code> remembers fonts have loaded with a cookie which may persist after the browser cache has removed fonts; in which case the browsers default fallback behaviour is used and fallback fonts aren't resized.</li>
    <li>It <a href="https://github.com/Financial-Times/o-typography/issues/248">doesn't always resize well</a>, depending on the font variant in use.
    <li>In the context of Customer Products its <a href="https://github.com/Financial-Times/dotcom-page-kit/pull/803">a bit complicated, breaks, and can be difficult to debug</a>.</li>
    <li>Though minor given the overall size it increases the bundle size of projects, see the <code>next-front-page</code> example below.</li>
</ul>
<table>
    <thead>
        <tr>
            <th><code>next-front-page</code> asset</th>
            <th><code>o-typography</code> progressive font loading</th>
            <th>uncompressed</th>
            <th>gzip</th>
            <th>brotli</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>css</td>
            <td>yes</td>
            <td>428</td>
            <td>60</td>
            <td>52</td>
        </tr>
        <tr>
            <td>css</td>
            <td>no</td>
            <td>412</td>
            <td>56</td>
            <td>48</td>
        </tr>
        <tr>
            <td>reduction</td>
            <td></td>
            <td>16 (3.6%)</td>
            <td>4 (6.7%)</td>
            <td>4 (7.7%)</td>
        </tr>
        <tr>
            <td>js</td>
            <td>yes</td>
            <td>636</td>
            <td>276</td>
            <td>248</td>
        </tr>
        <tr>
            <td>js</td>
            <td>no</td>
            <td>628</td>
            <td>272</td>
            <td>240</td>
        </tr>
        <tr>
            <td>reduction</td>
            <td></td>
            <td>8 (1.3%)</td>
            <td>4 (1.4%)</td>
            <td>8 (3.2%)</td>
        </tr>
    </tbody>
</table>
</details>

But:
- Commissioning resized fonts may be expensive.
- Our typography scale would change, and there may be a different scale per font. The design team would have to use these new fonts and remember the scale has changed. Products which use `o-typography` mixins to set font size would not need to make any changes, however anywhere an engineer has used `font-size` directly would need to be updated, else render smaller than it should.

## Questions:

- We don't use many Metric font variants. How much bigger in file size will the variable font be?
- Shall we roll-out the FinancierDisplay variable font first or commission a Metric variable font first? Let's do the latter?
