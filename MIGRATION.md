# Migration guide

## Migrating from v3 to v4

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Sass

- Origami components now require a `$system-code` Sass variable is set by the project, which must be a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).
- If a logo has been included by name using `oHeaderServices` or `oHeaderServicesCustomize` mixins, its Origami imageset is no longer assumed to be [logo-images](https://registry.origami.ft.com/components/logo-images). Prepend the imageset to your logo name with a colon e.g. a logo `origami` should be `ftlogo-v1:origami`.

## Migrating from v2 to v3

V3 introduces many new changes to o-header-services; It now transforms the primary nav into a drawer menu on smaller viewports. It introduces the option to have dropdown menus on primary navigation items. It removes a large dependency on o-header, and changes multiple class names and markup, and no longer allows custom class names. This major also removes most public mixins and makes `oHeaderServices` publicly available instead;
```diff
-oHeaderServicesContainer
-oHeaderServicesPrimaryNav
-oHeaderServicesDrawer
-oHeaderServicesSubNav
-oHeaderServicesTop
-oHeaderServicesTheme
```

The markup for a full header (**not** including dropdown menus) has changed in the following way:
```diff
-<header class="o-header-services" data-o-component="o-header">
+<header class='o-header-services' data-o-component='o-header-services'>
-	<div class="o-header-services__top o-header-services__container">
+	<div class="o-header-services__top">
	<div class="o-header-services__hamburger">
		<a class="o-header-services__hamburger-icon" href={{href}} role="button">
-				<span class="o-header__visually-hidden">Menu</span>
+				<span class="o-header-services__visually-hidden">Menu</span>
			</a>
		</div>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
-			<a class='o-header-services__product-name' href=''>Tool or Service name</a>
+			<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1>
-				<span class='o-header-subrand__product-tagline'>Tagline to explain the product here</span>
+				<span class='o-header-services__product-tagline'>Tagline to explain the product here</span>
		</div>
-		<div class='o-header-services__related-content'>
-			<a href='#'>XXXX</a>
-			<a href='#'>Sign in</a>
-		</div>
+		<ul class="o-header-services__related-content">
+			<li>
+				<a href={{href}}>XXXX</a>
+			</li>
+			<li>
+				<a href={{href}}>Sign in</a>
+			</li>
+		</ul>
	</div>
	<nav class="o-header-services__primary-nav">
-	<div class="o-header-services__container">
-		<ul class="o-header-services__nav-list">
+		<ul class="o-header-services__primary-nav-list">
-			<li class="o-header-services__nav-item">
+			<li>
-				<a class="o-header-services__nav-link o-header-services__nav-link--selected" href="#item-1">
+				<a aria-current="true" aria-label="Current page" href="#item-1">
					Nav item 1
				</a>
			</li>
			<!-- more nav items -->
		</ul>
-	</div>
	</nav>
</header>
-<nav class="o-header-services__subnav" role="navigation" aria-label="Sub navigation">
+<nav class="o-header-services__secondary-nav" aria-label="secondary navigation"  data-o-header-services-nav>
-	<div class="o-header-services__container">
-		<div class="o-header__subnav-wrap-outside">
-			<div class="o-header__subnav-wrap-inside">
-				<div class="o-header-services__subnav-content">
+				<div class="o-header-services__secondary-nav-content" data-o-header-services-nav-list>
-					<ol class="o-header-services__subnav-list o-header-services__subnav-list--breadcrumb" aria-label="Breadcrumb">
+					<ol class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--ancestors" aria-label="Ancestor sections">
-						<li class="o-header-services__subnav-item">
+						<li>
-							<a class="o-header-services__subnav-link" href={{href}} aria-selected="true" aria-label="Current page">
+							<a href={{href}} aria-current="true" aria-label="Current page">
								current section
							</a>
						</li>
						<!-- more ancestors -->
					</ol>

-					<ul class="o-header-services__subnav-list o-header-services__subnav-list--children" aria-label="Subsections">
+					<ul class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children" aria-label="Child sections">
-						<li class="o-header-services__subnav-item">
+						<li>
-							<a class="o-header-services__subnav-link" href="{{href}}">
+							<a href="{{href}}">
								child page
							</a>
						</li>
						<!-- more children -->
						</li>
					</ul>
				</div>
-		<button class="o-header__subnav-button o-header__subnav-button--left" title="scroll left" aria-hidden="true" disabled></button>
-		<button class="o-header__subnav-button o-header__subnav-button--right" title="scroll right" aria-hidden="true" disabled></button>

+		<button class="o-header-services__scroll-button o-header-services__scroll-button--left" title="scroll left" aria-hidden="true" disabled></button>
+		<button class="o-header-services__scroll-button o-header-services__scroll-button--right" title="scroll right" aria-hidden="true" disabled></button>
-			</div>
-		</div>
-	</div>
</nav>

-<!-- All drawer markup has been removed! -->
```

## Migrating from v1 to v2

V2 bumps to the new major versions of o-header, o-colors, and o-typography. If you are using any of these components in your projects you will have bower conflicts that you need to resolve by upgrading those components too.
V2 includes some minor visual changes, but these shouldn't be breaking changes for projects that include them.
