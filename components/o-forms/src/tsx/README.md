# o-forms tsx components

## Form Components

### `Form`

```jsx

<Form onSubmit={handleSubmit}>
	...
</Form>

```
### Form options
| Property | Type | Required | Description |
| ------------- | ------ | -------- | ------------------------- |
| `children` | jsx | *yes | one or more [origami inputs](#input-components) components  |
| `onSubmit` | Function |  | standard html attribute for `<form>` |
| `action` | str |  | standard html attribute for `<form>` |
| `method` | str |  | standard html attribute for `<form>` |



## Input Components

### `Text Input`
#### example jsx
```jsx
<Form>
	<TextInput
		description="Also availble with icon only"
		state="saving"
		title="Stateful Box Button"
	>
</Form>
```

### TextInput options
| Property | Type | Required | Description |
| ------------- | ------ | -------- | ------------------------- |
| `title` | str | *yes | The label text to go with the group of buttons |
| `children` | `<BoxRadioBtn/>` | *yes | one or more box buttons |
| `description` | str |  | Optional description of group of buttons |
| `isOptional` | bool |  | marks group as optional |
| `isInline` | bool |  | displays label side by side with buttons |
| `isVerticalCenter` | bool |  | verically centers label with buttons when displaying inline |
| `errorMessage` | str |  | |
| `state` | 'saving' \| 'saved' |  | shows text and icon |
| `hideStateText` | bool |  | displays icon only |
| `customStateText` | str |  | change state text from default "saving" |



### `Box Radio Buttons`
#### example jsx
```jsx
<Form>
	<BoxRadioBtns
		description="Also availble with icon only"
		state="saving"
		title="Stateful Box Button"
	>
		<BoxRadioBtn
			name="default"
			value="Daily"
			checked
		/>
		<BoxRadioBtn
			name="default"
			value="Weekly"
		/>
	</BoxRadioBtns>
</Form>
```

### BoxRadioBtns options
| Property | Type | Required | Description |
| ------------- | ------ | -------- | ------------------------- |
| `title` | str | *yes | The label text to go with the group of buttons |
| `children` | `<BoxRadioBtn/>` | *yes | one or more box buttons |
| `description` | str |  | Optional description of group of buttons |
| `isOptional` | bool |  | marks group as optional |
| `isInline` | bool |  | displays label side by side with buttons |
| `isVerticalCenter` | bool |  | verically centers label with buttons when displaying inline |
| `errorMessage` | str |  | |
| `state` | 'saving' \| 'saved' |  | shows text and icon |
| `hideStateText` | bool |  | displays icon only |
| `customStateText` | str |  | change state text from default "saving" |

### BoxRadioBtn options

| Property | Type | Required | Description |
| ------------- | ------ | -------- | ------------------------- |
| `name` | str | *yes | standard html attribute for `<input/>` |
| `value` | `<BoxRadioBtn/>` | *yes | standard html attribute for `<input/>` |
| `required` | bool |  |standard html attribute for `<input/>` |
| `disabled` | bool |  | standard html attribute for `<input/>` |
| `checked` | bool |  | maps to defaultChecked attribute on `<input/>` |
| `isNegative` | bool |  | adds negative highlight o button |
