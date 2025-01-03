# Migration Guide

## Migrating from v2 to v3

o3-button v3 introduces renamed icons, with an updated api to match. It also includes some potentially visually breaking changes.

### Rename icons

We have renamed icons. This introduces a more distinct, consistent naming convention. The following naming changes affect o3-button:

- `arrow-top`: `chevron-top`
- `arrow-right`: `chevron-right`
- `arrow-bottom`: `chevron-bottom`
- `arrow-left`: `chevron-left`
- `edit-outlined`: `edit`

To upgrade, update your HTML/JSX template to reference the new icon names:

```diff
-<Button label="Hello" type="primary" icon="arrow-left" />;
+<Button label="Hello" type="primary" icon="chevron-left" />;
```

```diff
-<button class="o3-button o3-button--primary o3-button-icon o3-button-icon--arrow-left">Hello</button>
+<button class="o3-button o3-button--primary o3-button-icon o3-button-icon--chevron-left">Hello</button>
```

### Review larger standard buttons

Standard buttons go from 40px to 44px in height to improve the mobile experience. This increases their touch target area to meet WCAG 2.1 Level AAA standards and aligns with Apple design guidelines.

To upgrade, ensure placement of elements around buttons continue to work in your application. For example, when a search input includes a text input next to a button, their height may be misaligned – for this example, upgrade `o-forms`, which also increases in height to match.

### Review radius in context

A subtle boarder radius adds to a coherent design language which flows through our latest icon suite and typography improvements. Review where buttons are used and ensure the radius works in your project. Speak to the Origami team if you find any visual issues. In most cases, there shouldn't be anything you need to do.

## Migrating from v1 to v2

If you are using `v1.1.7 `, there is nothing to do. If you are using `v1.1.6` or earlier, ensure you upgrade `@financial-times/o3-foundation` to `v2` first before updating `@financial-times/o3-button`.

A breaking change was accidentally released in v1.1.7 but went unnoticed for a significant period of time. As it may have been fixed by end users, it may not be something we can safely revert in a subsequent patch. A v2 major release followed without significant additional changes.
