# Migration

## Migrating from v3 to v4

## Migrating from v2 to v3

- `o-layout` supports the internal brand only, so your project must set its brand to the internal brand:
	- If using SASS, set the variable `$o-brand: 'internal';` before importing any Origami component.
	- If using the Origami Build Service, add the brand parameter to your CSS URL `?o-layout@^3.0.0&brand=internal`.

### Markup Changes

- `o-layout` now supports multiple layouts, so add the class `o-layout--docs` to maintain the documentation layout.
- Typography is now selectively applied with a class `o-layout-typography`, so you will also need to add that to your main content section.
- Replace the class `o-layout__main--full-span` with `o-layout__main__full-span` if you are using that modifier anywhere.

```diff
-<div class="o-layout" data-o-component="o-layout">
+<div class="o-layout o-layout--docs" data-o-component="o-layout">
   	 <div class="o-layout__header"></div>
-	 <div class="o-layout__main"></div>
+ 	 <div class="o-layout__main o-layout-typography"></div>
   	 <div class="o-layout__footer"></div>
 </div>
```

- If you have added navigation manually, you'll need to move the `o-layout__navigation` class from the list (`ul` or `ol`) to the containing `nav` element.

If your project relies on `o-layout` JavaScript to generate a nav, no action is required.

```diff
	<div class="o-layout__sidebar">
-		<nav>
+		<nav class="o-layout__navigation">
			<!-- this can be an <ol> or a <ul> -->
-			<ol class="o-layout__navigation">
+			<ol>
				<li>
					<a href="#this-is-a-title">This is a title</a>
				</li>
			</ol>
		</nav>
	</div>
```

### Header And Footer Changes

- `o-layout` no longer includes CSS and JS for `o-header-services` and `o-footer-services` by default. You'll need to include CSS and JS for `o-header-services` and `o-footer-services` separately if they are used within your project.
- Previously `o-header-services` markup was modified by adding a `o-layout__header` class. This markup has been changed, and `o-header-services` markup should now be placed _inside_ a `div` with the `o-layout__header` class. The same is true for `o-footer-services` markup, which is now placed _inside_ a div with the `o-layout__footer` class.

```diff
<div class="o-layout" data-o-component="o-layout" data-o-layout-construct-nav="false">
+	<div class="o-layout__header">
-	<header class="o-header-services o-layout__header" data-o-component="o-header">
+	    <header class="o-header-services" data-o-component="o-header">
		    <!-- more o-header-services markup -->
+       </header>
-	</header>
+	</div>

	<!-- ... -->

+	<div class="o-layout__footer">
		<footer class="o-footer-services">
			<!-- more o-footer-services markup -->
		</footer>
+	</div>

</div>
```

### Other Changes

- The ability to [customise the `o-layout` CSS class names has been removed](https://github.com/Financial-Times/origami-proposals/issues/4). The public `$o-layout-class` variable has been removed, the `$class` parameter has been removed from SCSS mixins, and the `baseClass` property has been removed from the JS `options` object. Check your project does not use these parameters and update class names to `o-layout` if needed.
- All variables and mixins except `oLayout` are now private. Instead of `oLayoutBreakPoint` use [o-grid's oGridRespondTo](https://registry.origami.ft.com/components/o-grid/sassdoc#o-grid-mixin-oGridRespondTo). If your project depends on other `o-layout` mixins or variables, please contact the team.
- The main content area no longer uses CSS Grid to place asides, so make sure your project has no custom CSS which is relying on the grid inside the main content area.
- Required font faces are now output by `o-layout`, so `o-fonts` may be removed as a direct dependency.

## Migrating from v1 to v2

This major now uses `o-footer-services` v2. Though this does not change anything within `o-layout` directly, please make sure that your footer markup is changed according to the [`o-footer-services` migration guide](https://github.com/Financial-Times/o-footer-services#migration-guide).
