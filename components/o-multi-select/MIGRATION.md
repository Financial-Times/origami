## Migration Guide

### Migrating from v2 to v3

This major release introduces a new design language and visually breaking changes. This includes mobile optimised typography, icons, and buttons. It also removes peer dependencies from deprecated "o2" components.

To upgrade, replace the following "o2" components with their "o3" equivalent:

- [o-normalise](../o-normalise/MIGRATION.md)
- [o-spacing](../o-spacing/MIGRATION.md)
- [o-colors](../o-colors/MIGRATION.md)
- [o-icons](../o-icons/MIGRATION.md)
- [o-buttons](../o-buttons/MIGRATION.md)
- [o-typography](../o-typography/MIGRATION.md)
- [o-editorial-typography](../o-editorial-typography/MIGRATION.md)
- [o-big-number](../o-big-number/MIGRATION.md)
- [o-quote](../o-quote/MIGRATION.md)
- [o-fonts](../o-fonts/MIGRATION.md)

### Migrating from v1 to v2

V2 changes the `o-multi-select` TSX template API. If you are using TSX templates you will need to update your code to use new API. Before users were able to pass array of strings to render the component but that did not enable users to set selected on render. Now users will need to pass an object to match this type:

```ts
type MultiSelectType = {
	label: string;
	selected: boolean;
};
```

Before users used our component like this:

```jsx
const fruits = ['Apple', 'Banana', 'Orange'];

<MultiSelect options={fruits} />;
```

Now users will need to use our component like this:

```jsx
const fruits = [
	{label: 'Apple', selected: false},
	{label: 'Banana', selected: true},
	{label: 'Orange', selected: false},
];

<MultiSelect options={fruits} />;
```
