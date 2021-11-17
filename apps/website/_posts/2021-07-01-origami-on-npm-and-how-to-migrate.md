---
title: Origami npm announcement and guides on how to migrate products
description: We have released new versions of Origami components which bring full NPM support and drops support for Bower. This post explains the changes and how to migrate products to the new version.
author: Origami

# Redirect from legacy URLs
redirect_from:
  - /docs/tutorials/npm/
  - /docs/tutorials/bower-to-npm/
---

We have completed our migration of Origami components from Bower to the [NPM registry](https://www.npmjs.com/) (see [January's announcement](/blog/2021/01/18/deprecating-bower-and-origami-via-npm/)). Component releases on Bower are now deprecated and we recommend all products migrate to the new implementation to keep up-to-date with future releases to Origami.

The [FT Bower Registry](https://origami-bower-registry.ft.com/) has now been placed into a maintenance only mode for 12 months, until 1st July 2022, when we will look to decommission the service completely.

Moving Origami from Bower to NPM provides many benefits, such as:
- Aligning our front-end practices with those now most commonly used across the company and the wider industry, which should help the onboarding of new software engineering hires.
- Origami components can now make use of the 1.6 million packages which are on the NPM registry.
- Origami components will be able to use modern tooling instead of the Origami team having to build bespoke tooling ourselves.
- Services such as Snyk, Dependabot, and Renovate will be able to work for the Origami dependencies a project has.

We're already seeing the benefits with our work on a new autocomplete Origami component, which has been requested by several different FT products. By making this an npm-only component, we've been able to benefit from autocomplete packages which already exist on NPM, such as the one made by Gov UK named [accessible-autocomplete](https://github.com/alphagov/accessible-autocomplete). This has greatly reduced the amount of code we would have had to write ourselves and meant we could create a prototype for products to trial in a shorter turnaround then previously possible.

## What has changed for Origami users?

The code for Origami components has remained largely the same, aiming to make the migration simpler for our users. The one change we had to make was making the package name for all components now start with `@financial-times/`, as they are published under the financial-times namespace on npm. This change means that when importing the javascript and/or sass of a component, you will need to prepend `@financial-times/` to the imported package name.

If using Origami components via NPM, it is required to use NPM version 7, this is because version 7 ensures that Origami components are only installed once and no conflicting versions are installed. Origami components do not support using older versions of NPM.

Those changes don't affect projects which include Origami components using the Origami Build Service, but there is a new version of the Origami Build Service projects must upgrade to.

See the below migration guides for more details.

## Migration Guides

The following 3 guides show how to migrate to the new npm-only Origami component releases depending on how your project currently includes components:

- [Origami Build Service](#using-origami-via-bower): Follow this guide if your project uses the Origami Build Service.
- [Bower](#using-origami-via-origami-build-service): Follow this guide if your project installs components with Bower.
- [Beta NPM](#using-origami-via-beta-npm): Follow this guide if your project already installs Origami components via NPM, these were experimental releases which were published to Bower and NPM.

### Using Origami via Origami Build Service

Use the [Origami Build Service URL Updater](https://www.ft.com/__origami/service/build/url-updater) to guide you through the following process.

1. Run your project locally in its current state and confirm it is still working correctly.
1. Check your Origami Build Service URL requests the [latest major Bower release](#last-bower-releases) of each component:
    - If your project already requests the latest Bower release of each component no code changes are required. Otherwise;
    - If your project is using outdated component releases, follow the [component migration guides](#last-bower-releases) to update to the latest major Bower release.
1. Run your project locally and confirm it is still working correctly. Now you're ready to do the NPM migration.
1. Update your Origami Build Service urls to use the [Origami Build Service v3 API](https://www.ft.com/__origami/service/build/v3/docs/api) instead of v2.
1. Run your project locally and confirm it is still working correctly.

<aside>
<p>Use the <a href="https://www.ft.com/__origami/service/build/url-updater">Origami Build Service URL Updater</a> to guide you through the migration process in more detail.</p>
</aside>

Your migration to npm Origami components is finished! 🎉

### Using Origami via Bower

1. Run the project locally in its current state.
1. Check your project installs the [latest major Bower release](#last-bower-releases) of each component. If your project is using outdated component releases, follow the [component migration guides](#last-bower-releases) to update to the latest major Bower release.
1. Now you're ready to do the NPM migration.
1. If the project is not using NPM version 7:
    1. Clean the directory of `node_modules` and any built artefacts
    1. Switch to NPM version 7 and install the dependencies
    1. Confirm the project is still working correctly - If it is not working, try deleting the `package-lock.json` and/or `npm-shrinkwrap.json` files and run `npm install` again. There is a known issue with upgrading to NPM version 7 and those files becoming corrupted.
1. Clean the directory of `node_modules` and any built artefacts
1. Install all origami dependencies as npm dependencies and remove them from the `bower.json` file. All the components are under the `@financialt-times` namespace on NPM. I.E. To install o-table, `npm install @financial-times/o-table`.
1. If there are still dependencies declared in the `bower.json` file, try and find the corresponding package on the NPM registry.
1. Remove the `bower.json` file and `.bowerrc` file if it exists. E.G. `rm -f .bowerrc bower.json`
1. Remove the `bower_components` directory. `rm -rf bower_components`
1. Remove `bower` from the `package.json` file. E.G. `npm uninstall bower`
1. Update the Sass compiler's `includePath` configuration to include `node_modules` and remove `bower_components`, then either:
    - Add an additional path `node_modules/@financial-times` to resolve Sass published under `@financial-times` without specifying a namespace. Or;
    - Update the Origami Sass imports to include the `@financial-times` namespace. E.G. `@import 'o-icons/main';` becomes `@import '@financial-times/o-icons/main';`
1. Update your Origami JavaScript imports to include the `@financial-times` namespace. E.G. `import oTracking from 'o-tracking';` becomes `import oTracking from '@financial-times/o-tracking';` and `import 'o-layout';` becomes `import '@financial-times/o-layout';`
1. Run the project locally and confirm it is still working correctly

Your migration to npm Origami components is finished! 🎉

### Using Origami via beta NPM

If your project already installs Origami components via NPM, these were experimental releases which were published to Bower and NPM.

1. Run your project locally in its current state and confirm it is still working correctly
1. Check your project installs the [latest major version that was released to Bower](#last-bower-releases) of each component. If your project is using outdated component releases, follow the [component migration guides](#last-bower-releases) to update to the latest major release that was Bower-compatible.
1. If your project is not using NPM version 7:
    1. Clean the directory of node_modules and any built artefacts
    1. Switch to NPM version 7 and install the dependencies
        1. Confirm your project is still working correctly - If it is not working, try deleting the `package-lock.json` and/or `npm-shrinkwrap.json` files and run `npm install` again. There is a known issue with upgrading to NPM version 7 and those files becoming corrupted.
1. Clean the directory of node_modules and any built artefacts
1. Upgrade to the latest major versions of any Origami components you are using
1. If using `lockspot` or `is-origami-flat`, these should be removed as they are no longer needed when using NPM version 7. `npm uninstall lockspot is-origami-flat`
1. Run your project locally and confirm it is still working correctly

Your migration to npm Origami components is finished! 🎉

## Tracking migrations

We can detect when the relevant repos have been updated to remove Bower. Using that data, we will update:

- This [google spreadsheet](https://docs.google.com/spreadsheets/d/1Pem5e6cR0aiuKpYa7VD08AnSSynzjRtWt_VAHAoyhPQ/edit#gid=0), which contains your projects that are using Origami via Bower.
- The associated [entry in the Risk Register](https://biz-ops.in.ft.com/Risk/origami-components-via-bower) which is linked to all the affected systems that we know of.

Below is a breakdown of how many systems and repositories will need to be migrated, split by group:

<div class="o-layout__main__single-span">
    <table class="o-table o-table--row-headings o-table--horizontal-lines" data-o-component="o-table">
    <thead>
        <tr>
        <th>Group</th>
        <th>Systems to migrate</th>
        <th>Repositories to migrate</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>Customer Products</td>
        <td>25</td>
        <td>74</td>
        </tr>
        <tr>
        <td>FT Core</td>
        <td>2</td>
        <td>10</td>
        </tr>
        <tr>
        <td>FT Professional</td>
        <td>4</td>
        <td>6</td>
        </tr>
        <tr>
        <td>Internal Products</td>
        <td>4</td>
        <td>2</td>
        </tr>
        <tr>
        <td>Operations &amp; Reliability</td>
        <td>3</td>
        <td>41</td>
        </tr>
    </tbody>
    </table>
</div>

## Last Bower Releases

Make sure your project has upgraded to the latest component released to Bower before attempting to migrate to the NPM-only releases. Here is a table of Bower component releases for reference:

<div class="o-layout__main__single-span">
	<table class="o-table o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
		<thead>
			<tr>
			<th>Project</th>
			<th>Last Major Bower Release</th>
			<th>Migration Guide</th>
			</tr>
		</thead>
		<tbody>
			<tr>
			<td>o-autoinit</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-autoinit/blob/v2.0.0/MIGRATION.md">o-autoinit migration guide</a></td>
			</tr>
			<tr>
			<td>o-banner</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-banner/blob/v3.0.0/MIGRATION.md">o-banner migration guide</a></td>
			</tr>
			<tr>
			<td>o-big-number</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-big-number/blob/v2.0.0/MIGRATION.md">o-big-number migration guide</a></td>
			</tr>
			<tr>
			<td>o-brand</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-brand/blob/v3.0.0/MIGRATION.md">o-brand migration guide</a></td>
			</tr>
			<tr>
			<td>o-buttons</td>
			<td>6.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-buttons/blob/v6.0.0/MIGRATION.md">o-buttons migration guide</a></td>
			</tr>
			<tr>
			<td>o-colors</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-colors/blob/v5.0.0/MIGRATION.md">o-colors migration guide</a></td>
			</tr>
			<tr>
			<td>o-cookie-message</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-cookie-message/blob/v5.0.0/MIGRATION.md">o-cookie-message migration guide</a></td>
			</tr>
			<tr>
			<td>o-date</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-date/blob/v4.0.0/MIGRATION.md">o-date migration guide</a></td>
			</tr>
			<tr>
			<td>o-editorial-layout</td>
			<td>1.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-editorial-layout/blob/v1.0.0/MIGRATION.md">o-editorial-layout migration guide</a></td>
			</tr>
			<tr>
			<td>o-editorial-typography</td>
			<td>1.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-editorial-typography/blob/v1.0.0/MIGRATION.md">o-editorial-typography migration guide</a></td>
			</tr>
			<tr>
			<td>o-errors</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-errors/blob/v4.0.0/MIGRATION.md">o-errors migration guide</a></td>
			</tr>
			<tr>
			<td>o-expander</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-expander/blob/v5.0.0/MIGRATION.md">o-expander migration guide</a></td>
			</tr>
			<tr>
			<td>o-fonts</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-fonts/blob/v4.0.0/MIGRATION.md">o-fonts migration guide</a></td>
			</tr>
			<tr>
			<td>o-fonts-assets</td>
			<td>1.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-fonts-assets/blob/v1.0.0/MIGRATION.md">o-fonts-assets migration guide</a></td>
			</tr>
			<tr>
			<td>o-footer</td>
			<td>9.0.1-bower</td>
			<td><a href="https://github.com/Financial-Times/o-footer/blob/v7.0.0/MIGRATION.md">o-footer migration guide</a></td>
			</tr>
			<tr>
			<td>o-footer-services</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-footer-services/blob/v3.0.0/MIGRATION.md">o-footer-services migration guide</a></td>
			</tr>
			<tr>
			<td>o-forms</td>
			<td>8.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-forms/blob/v8.0.0/MIGRATION.md">o-forms migration guide</a></td>
			</tr>
			<tr>
			<td>o-ft-affiliate-ribbon</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-ft-affiliate-ribbon/blob/v4.0.0/MIGRATION.md">o-ft-affiliate-ribbon migration guide</a></td>
			</tr>
			<tr>
			<td>ftdomdelegate</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/ftdomdelegate/blob/v4.0.0/MIGRATION.md">ftdomdelegate migration guide</a></td>
			</tr>
			<tr>
			<td>o-grid</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-grid/blob/v5.0.0/MIGRATION.md">o-grid migration guide</a></td>
			</tr>
			<tr>
			<td>o-header</td>
			<td>8.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-header/blob/v8.0.0/MIGRATION.md">o-header migration guide</a></td>
			</tr>
			<tr>
			<td>o-header-services</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-header-services/blob/v4.0.0/MIGRATION.md">o-header-services migration guide</a></td>
			</tr>
			<tr>
			<td>o-icons</td>
			<td>6.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-icons/blob/v6.0.0/MIGRATION.md">o-icons migration guide</a></td>
			</tr>
			<tr>
			<td>o-labels</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-labels/blob/v5.0.0/MIGRATION.md">o-labels migration guide</a></td>
			</tr>
			<tr>
			<td>o-layers</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-layers/blob/v2.0.0/MIGRATION.md">o-layers migration guide</a></td>
			</tr>
			<tr>
			<td>o-layout</td>
			<td>4.x.x</td>
			<td>
			<a href="https://github.com/Financial-Times/o-layout/blob/v4.0.0/MIGRATION.md">o-layout migration guide</a></td>
			</tr>
			<tr>
			<td>o-lazy-load</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-lazy-load/blob/v2.0.0/MIGRATION.md">o-lazy-load migration guide</a></td>
			</tr>
			<tr>
			<td>o-loading</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-loading/blob/v4.0.0/MIGRATION.md">o-loading migration guide</a></td>
			</tr>
			<tr>
			<td>o-message</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-message/blob/v4.0.0/MIGRATION.md">o-message migration guide</a></td>
			</tr>
			<tr>
			<td>o-meter</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-meter/blob/v2.0.0/MIGRATION.md">o-meter migration guide</a></td>
			</tr>
			<tr>
			<td>o-normalise</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-normalise/blob/v2.0.0/MIGRATION.md">o-normalise migration guide</a></td>
			</tr>
			<tr>
			<td>o-overlay</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-overlay/blob/v3.0.0/MIGRATION.md">o-overlay migration guide</a></td>
			</tr>
			<tr>
			<td>o-quote</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-quote/blob/v4.0.0/MIGRATION.md">o-quote migration guide</a></td>
			</tr>
			<tr>
			<td>o-share</td>
			<td>7.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-share/blob/v7.0.0/MIGRATION.md">o-share migration guide</a></td>
			</tr>
			<tr>
			<td>o-spacing</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-spacing/blob/v2.0.0/MIGRATION.md">o-spacing migration guide</a></td>
			</tr>
			<tr>
			<td>o-stepped-progress</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-stepped-progress/blob/v2.0.0/MIGRATION.md">o-stepped-progress migration guide</a></td>
			</tr>
			<tr>
			<td>o-subs-card</td>
			<td>6.0.0-bower</td>
			<td><a href="https://github.com/Financial-Times/o-subs-card/blob/v6.0.0/MIGRATION.md">o-stepped-progress migration guide</a></td>
			</tr>
			<tr>
			<td>o-syntax-highlight</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-syntax-highlight/blob/v3.0.0/MIGRATION.md">o-syntax-highlight migration guide</a></td>
			</tr>
			<tr>
			<td>o-table</td>
			<td>8.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-table/blob/v8.0.0/MIGRATION.md">o-table migration guide</a></td>
			</tr>
			<tr>
			<td>o-tabs</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-tabs/blob/v5.0.0/MIGRATION.md">o-tabs migration guide</a></td>
			</tr>
			<tr>
			<td>o-teaser</td>
			<td>5.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-teaser/blob/v5.0.0/MIGRATION.md">o-teaser migration guide</a></td>
			</tr>
			<tr>
			<td>o-teaser-collection</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-teaser-collection/blob/v3.0.0/MIGRATION.md">o-teaser-collection migration guide</a></td>
			</tr>
			<tr>
			<td>o-toggle</td>
			<td>2.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-toggle/blob/v2.0.0/MIGRATION.md">o-toggle migration guide</a></td>
			</tr>
			<tr>
			<td>o-tooltip</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-tooltip/blob/v4.0.0/MIGRATION.md">o-tooltip migration guide</a></td>
			</tr>
			<tr>
			<td>o-topper</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-topper/blob/v3.0.0/MIGRATION.md">o-topper migration guide</a></td>
			</tr>
			<tr>
			<td>o-tracking</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-tracking/blob/v3.0.0/MIGRATION.md">o-tracking migration guide</a></td>
			</tr>
			<tr>
			<td>o-typography</td>
			<td>6.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-typography/blob/v6.0.0/MIGRATION.md">o-typography migration guide</a></td>
			</tr>
			<tr>
			<td>o-utils</td>
			<td>1.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-utils/blob/v1.0.0/MIGRATION.md">o-utils migration guide</a></td>
			</tr>
			<tr>
			<td>o-viewport</td>
			<td>4.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-viewport/blob/v4.0.0/MIGRATION.md">o-viewport migration guide</a></td>
			</tr>
			<tr>
			<td>o-visual-effects</td>
			<td>3.x.x</td>
			<td><a href="https://github.com/Financial-Times/o-visual-effects/blob/v3.0.0/MIGRATION.md">o-visual-effects migration guide</a></td>
			</tr>
		</tbody>
	</table>
</div>
