# o3-button

o3-button provides CSS custom properties and styling to create buttons.

- [o3-button](#o3-button)
	- [Usage](#usage)
	- [Markup](#markup)
		- [Themes](#themes)
		- [Sizes](#sizes)
		- [Icons](#icons)
		- [Groups](#groups)
		- [Pagination](#pagination)
			- [Pagination Rules](#pagination-rules)
			- [Pagination Theme](#pagination-theme)
			- [Pagination Size](#pagination-size)
		- [Disabled](#disabled)
		- [Custom Themes](#custom-themes)
	- [References](#references)
	- [Migration](#migration)
	- [Contact](#contact)
	- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o3-button`.

## Markup

There are three types of buttons, primary, secondary, and ghost.

| Type      | Selector              | Brand Support              | Purpose                                                                                                                                                                                                                                                                                |
| --------- | --------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| primary   | .o3-button--primary   | core, internal, whitelabel | For principal calls to action on the page. Primary buttons should only appear once per product area (not including the application header, modal dialog, onsite messaging or side panel).                                                                                              |
| secondary | .o3-button--secondary | core, internal, whitelabel | For secondary actions on each page or used in conjunction with a primary button. As part of a pair, the secondary button’s function is to perform the negative action of the set, such as “Cancel” or “Back”.                                                                          |
| ghost     | .o3-button--ghost     | core, internal, whitelabel | For the least pronounced actions; often used in conjunction with a primary button. In a situation such as a progress flow, a ghost button may be paired with a primary and secondary button set, where the primary button is for ‘Save and continue’ the ghost button would be ‘Skip’. |

```html
<button class="o3-button o3-button--primary">Submit</button>
<button class="o3-button o3-button--secondary">Cancel</button>
<button class="o3-button o3-button--ghost">Options</button>
```

o3-button CSS will work on `<button>` or `<a>` elements. It is important for accessibility that if you intend to style an `<a>` as a button, you give it the correct [aria role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role).

The copy inside buttons should be concise and confirm the action a user is taking.

### Themes

A theme may be applied to a button to change its appearance. o3-button provides some themes by default:

| Theme                | Selector                         | Works With Types          | Brand/sub-brand Support  |
| -------------------- | -------------------------------- | ------------------------- | -------------- |
| inverse              | .o3-button--inverse              | primary, secondary, ghost | core, professional, internal |
| mono                 | .o3-button--mono                 | primary, secondary, ghost | core, professional, internal |

```html
<button class="o3-button o3-button--primary o3-button--inverse">Submit</button>
<button class="o3-button o3-button--secondary o3-button--inverse">
 Cancel
</button>
```

### Sizes

Apply the `o3-button--small` modifier class for a smaller button.

```html
<button class="o3-button o3-button--primary o3-button--small">Click Me</button>
```

### Icons

To add an icon to your button add the class `o3-button-icon` and `o3-button-icon--{icon-name}` to your button.

A limited number of button icons are available. Limiting the number of icons keeps the CSS bundle smaller, but if you need an icon button that we don't currently support, please contact the Origami team:

- arrow-left
- arrow-right
- upload
- tick
- plus
- warning
- arrow-down
- arrow-up
- edit
- download
- search
- refresh
- cross

```html
<button
 class="o3-button o3-button--secondary o3-button-icon o3-button-icon--arrow-down"
>
 Down Arrow
</button>
<button
 class="o3-button o3-button--secondary o3-button-icon o3-button-icon--download"
>
 Download
</button>
```

If you would like your button to display only an icon, add the class `o3-button-icon--icon-only` and provide a visually hidden label for screen-reader users with `o3-button-icon__label`.

```html
<button
 class="o3-button o3-button--secondary o3-button-icon o3-button-icon--arrow-down o3-button-icon--icon-only"
>
 <span class="o3-button-icon__label"> Down Arrow </span>
</button>
```

If you want to use icons not in the o3-button supported icons list talk to Origami team and we will direct you to existing icon or help you to adopt the new icon. But if you are sure this icon is not in UI library and just want to use your custom icon you can use the `--o3-button-icon` custom property. An example of using custom icons will be something like this:

```css
.o3-button..o3-button-icon::before {
 --o3-button-icon: url("data:image/svg+xml,[ENCODED_SVG_STRING]");
}
```

### Groups

Wrap buttons in a container with `.o3-button-group` to group them together:

```html
<div class="o3-button-group">
 <button class="o3-button o3-button--secondary" aria-selected="true">
  One
 </button>
 <button class="o3-button o3-button--secondary">Two</button>
 <button class="o3-button o3-button--secondary">Three</button>
</div>
```

### Pagination

For a pagination style wrap your buttons in a container with `.o3-button-pagination`. Most pagination usecases use anchor `a` tags for links which look like buttons instead of a `button` tag. When using an anchor tag in pagination, do not use the `aria-selected` data attribute. Instead, use `aria-current="page"` to indicate the current page, this will highlight the button for the current page visually and to screen readers.

The following markup example shows pagination for 20 pages, where the 14th page is the current page. Following the [pagination rules](#pagination-rules) we recommend displaying no more than 7 pages and using the ellipsis element to show hidden results.

```html
<div class="o3-button-pagination">
 <a
  href="#"
  class="o3-button o3-button--secondary o3-button-icon o3-button-icon--arrow-left o3-button-icon--icon-only"
 >
  <span class="o3-button-icon__label">Previous results</span>
 </a>

 <a href="#" class="o3-button o3-button--secondary">1</a>
 <span class="o3-button-pagination__ellipsis">...</span>
 <a href="#" class="o3-button o3-button--secondary">13</a>
 <a href="#" class="o3-button o3-button--secondary" aria-current="page">14</a>
 <a href="#" class="o3-button o3-button--secondary">15</a>
 <span class="o3-button-pagination__ellipsis">...</span>
 <a href="#" class="o3-button o3-button--secondary">20</a>

 <a
  href="#"
  class="o3-button o3-button--secondary o3-button-icon o3-button-icon--arrow-right o3-button-icon--icon-only"
 >
  <span class="o3-button-icon__label">Next results</span>
 </a>
</div>
```

#### Pagination Rules

The number of pages to display is not enforced by Origami. However we recommend the following:

- Show no more than 7 pages at a time. When there are more than 7 pages, hide more pages behind the pagination ellipsis in the following way. Given:

| Selected Page                            | Ellipse position |
| ---------------------------------------- | ---------------- |
| less than 3                              | 1️⃣2️⃣3️⃣...8️⃣9️⃣🔟  |
| One of the last two pages                | 1️⃣2️⃣3️⃣...8️⃣9️⃣🔟  |
| 3rd page                                 | 1️⃣2️⃣3️⃣4️⃣...9️⃣🔟  |
| 3rd page from last page                  | 1️⃣2️⃣...7️⃣8️⃣9️⃣🔟  |
| more than 3 from the first and last page | 1️⃣...4️⃣5️⃣6️⃣...🔟 |

For an example see the [pagination demos in the Origami registry](https://registry.origami.ft.com/components/o3-button@6.0.19#demo-pagination-layout).

#### Pagination Theme

A theme modifier such as `o3-button--inverse` may be added to the buttons within a pagination block.

#### Pagination Size

Small buttons may also be used in a pagination style. Add the `o3-button-pagination--small` modifier class to the outer pagination element and `o3-button--small` to each button.

```html
<div class="o3-button-pagination o3-button-pagination--small">
 <a
  href="#"
  class="o3-button o3-button--small o3-button--secondary o3-button-icon o3-button-icon--arrow-left o3-button-icon--icon-only"
  disabled
 >
  <span class="o3-button-icon__label">Previous results</span>
 </a>

 <a
  href="#"
  class="o3-button o3-button--small o3-button--secondary"
  aria-current="page"
  >1</a
 >
 <a href="#" class="o3-button o3-button--small o3-button--secondary">2</a>
 <a href="#" class="o3-button o3-button--small o3-button--secondary">3</a>
 <span
  class="o3-button-pagination__ellipsis"
  >...</span
 >
 <a href="#" class="o3-button o3-button--small o3-button--secondary">18</a>
 <a href="#" class="o3-button o3-button--small o3-button--secondary">19</a>
 <a href="#" class="o3-button o3-button--small o3-button--secondary">20</a>

 <a
  href="#"
  class="o3-button o3-button--small o3-button--secondary o3-button-icon o3-button-icon--arrow-right o3-button-icon--icon-only"
 >
  <span class="o3-button-icon__label">Next results</span>
 </a>
</div>
```

### Disabled

Avoid disabled buttons unless user research shows they improve your interface. Disabled buttons have [poor contrast which makes them difficult to read](#references). They also [do not give feedback to a user why they are disabled](#references).

To make a button disabled add the `disabled` attribute. To visually hide the disabled button until it is active add the class `o3-button--hide-disabled`.

```html
<!-- Visibly disabled because of the `disabled` attribute. -->
<button class="o3-button" disabled>My Button</button>

<!-- Visually hidden because of the `disabled` attribute and `o3-button--hide-disabled`.-->
<button class="o3-button o3-button--hide-disabled" disabled>My Button</button>
```

### Custom Themes

<!-- add link for the doc around how to add new themes -->

To create a new button themes follow our guide on [adding new themes to Origami components]().

## References

- Hampus Sethfors explains the issues with disabled buttons in more detail in an [axesslab.com article](https://axesslab.com/disabled-buttons-suck/). In the article Hampus suggests alternative design approaches for common uses of disabled buttons.

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       1       |        N/A         |        -        |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-button/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).