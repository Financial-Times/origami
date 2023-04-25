## Migration Guide

### Migrating from v1 to v2

V2 changes the `o-multi-select` TSX template API. If you are using TSX templates you will need to update your code to use new API. Before users were able to pass array of strings to render the component but that did not enable users to set selected on render. Now users will need to pass an object to match this type:

```ts
type MultiSelectType = {
 label: string;
 selected: boolean;
}
```

Before users used our component like this:

```jsx

const fruits = ['Apple', 'Banana', 'Orange'];

<MultiSelect options={fruits} />
```

Now users will need to use our component like this:

```jsx

const fruits = [
 { label: 'Apple', selected: false },
 { label: 'Banana', selected: true },
 { label: 'Orange', selected: false },
];

<MultiSelect options={fruits} />
```
