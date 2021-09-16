# Migration guide

## Migrating from v2 to v3

The `oTopper` mixin now outputs all o-topper styles by default. Pass a blank options `$opts` map to only output base topper styles.

All other mixins have been removed. Instead make a single `oTopper`, with relevant options, and use default `o-topper` css classes.

- `oTopperThemeBranded`
- `oTopperHasHeadshot`
- `oTopperThemeOpinion`
- `oTopperOpinionGenre`
- `oTopperHeadshot`
- `oTopperHeadshotImage`
- `oTopperThemeCentered`
- `oTopperThemeFullBleedImage`
- `oTopperThemeFullBleedOffset`
- `oTopperThemeNewsPackage`
- `oTopperAnchorLink`
- `oTopperThemePackage`
- `oTopperThemePackageExtra`
- `oTopperThemePackageSpecialReport`
- `oTopperGridRightRail`
- `oTopperFullBleedGridRightRail`
- `oTopperThemeSplitText`
- `oTopperHeadline`
- `oTopperHeadlineLarge`
- `oTopperStandfirst`
- `oTopperSummary`
- `oTopperSummaryBody`
- `oTopperImageCredit`
- `oTopperImage`
- `oTopperBrand`
- `oTopperColumnist`
- `oTopperColumnistName`
- `oTopperTags`
- `oTopperTopic`
- `oTopperArticleGrid`
- `oTopperArticleGridCentered`
- `oTopperBase`
- `oTopperCentered`
- `oTopperBasic`
- `oTopperContent`
- `oTopperBackground`
- `oTopperVisual`
- `oTopperReadNext`
- `oTopperThemeElements`
- `oTopperThemes`
- `oTopperElements`
- `oTopperColors`
- `oTopperColor`


E.g to include all styles:
```diff
-$o-topper-is-silent: false;
-@import 'o-topper/main';
-@include _oTopperThemes;
+@import 'o-topper/main';
+@include _oTopper();
```

E.g to include only base styles and some themes:
```diff
-.o-topper--branded {
-	@include _oTopperThemeBranded;
-	&.o-topper--right-rail {
-		@include _oTopperGridRightRail;
-	}
-}
+@include _oTopper($opts: (
+    'themes': ('branded', 'right-rail')
+));
```

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

## Migrating from v1 to v2

- The class `.o-topper--right-rail` now applied to only relevant themes.
- Renames `oTopperArticleGridRightRail` to `oTopperGridRightRail`.
- Removes `oTopperThemeRightRail`, use `oTopperGridRightRail` instead.
