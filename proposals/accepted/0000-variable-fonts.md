# Use Variable Fonts

## Motivation

The design team are limited to a small number of weights and styles for our custom fonts, Financier Display and Metric Web. The limitation is in place due to performance. Using variable fonts would allow the design team to make greater use of typography within Financial Times products without impacting current performance.

Another motivation of the design team given improved performance is to potentially replace Georgia with Financier Text.

Finally, this may be an opportunity to remove the unreliable and relatively complex progressive font loading from o-typography.

## Explanation

### Font Size Comparison

The [font variants currently used on ft.com](
https://github.com/Financial-Times/n-ui-foundations/blob/62be704f649442c65356708183998e90cc78340c/typography/main.scss#L5) include:

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
|total variable financier display size (kb) |||134008|
|financier text|normal|regular|52336|
|financier text|semibold|regular|54112|
|total financier text size |||106448|


The financier display variable font totals 134kb; ~1kb larger than the limited set we currently use, but allowing all weights with and without italics.

The financier text variable font would replace a system font adding an extra weight of 106kb.

We don't have a Metric variable font yet.

Notes / Questions:
- What new financier display variants do design want to use? _Do we need italics? If not we can save on file size which makes introducing financier text an easier proposition._
- We don't use many Metric font variants. How much bigger in file size will the variable font be?
- Are the design team ready to replace Georgia with financier text or does this require more work with stakeholders? _Could this be a follow up proposal?_

### Fallback Fonts

Some users will not be able to view variable fonts. For example users running macOS prior to 10.13, or notably for us, Internet Explorer 11 users. For these users fallback fonts must be used.

Its not an insignificant amount of users as Internet Explorer currently represent ~6% of desktop requests. These users would always see the fallback font.

We could improve the fallback font experience by using o-typography's progressive font loading, which changes the font size of the fallback font to look similar to the original, but there are limitations:
- It requires JavaScript, which means core experience users get no fallback font resizing whilst the custom fonts load.
- Its not reliable. Even with JavaScript, the progressive font loading in o-typography remembers fonts have loaded with a cookie which may persist after the browser cache has removed fonts, in which case fallback fonts aren't resized.
- It [doesn't always resize well](https://github.com/Financial-Times/o-typography/issues/248), depending on the font variant in use.
- In the context of Customer Products its [a bit complicated, breaks, and can be difficult to debug](https://github.com/Financial-Times/dotcom-page-kit/pull/803).

Note the [main benefit of resizing is for Metric Web to fallback to Arial](https://github.com/Financial-Times/o-typography/issues/248). We could commission a Metric Web variable font at a size more comparable to the fallback font and remove o-typography's progressive font loading.

For users who can view variable fonts but have a slow connection, we could [serve the fallback font temporarily](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) and either swap out for our custom fonts when they are downloaded or wait until the next page view.

Notes / Questions:
- Are we happy to serve fallback fonts to some users?
- How much would the resized Metric variable font cost to commission?

### benefits

- the design team can make greater use of typography
- progressive font loading is more reliable for readers
- saved engineering time through reduced code complexity

### drawbacks

- a minority but significant group of users, including IE11 users, always see fallback fonts

## work required

- Commission a resized MetricWeb variable font.
- Add variable font files to `o-font-assets`.
- Update `o-fonts` font faces with variable fonts and functions such as `oFontsVariantExists`.
- Remove progressive font loading from `o-typography` and deprecate the interface.
- Update the serif font in `o-typography` to use `Financier Text`, if using.
- Update the MetricWeb type scale in `o-typography` to account for the resizing.
- Update [`dotcom-page-kit` font preloading](https://github.com/Financial-Times/dotcom-page-kit/blob/v2.0.2/packages/dotcom-ui-base-styles/src/lib/fontFaces.ts).

## alternatives

### do nothing

Accept the drawbacks of our current approach, continue to serve a limited set of custom fonts including to users with older operating systems / browsers.

### do part

As a significant visual change for all users, that could impact the readability of stories, we could consider swapping `Georgia` for `Financier Text` in a follow up proposal. (@todo lets do this)

It makes less sense to switch to `Financier Display` and `MetricWeb` variable fonts separately as both need to be complete for the progressive font loading benefits; although we could to enable more variants of one font with fallbacks for old browsers, whilst continuing to serve the other to all browsers.
