# o-forms tsx components

## Form Components

### `Form`

```jsx
<Form onSubmit={handleSubmit}>...</Form>
```

### Form options

| Property   | Type     | Required | Description                                                |
| ---------- | -------- | -------- | ---------------------------------------------------------- |
| `children` | jsx      | \*yes    | one or more [origami inputs](#input-components) components |
| `onSubmit` | Function |          | standard html attribute for `<form>`                       |
| `action`   | str      |          | standard html attribute for `<form>`                       |
| `method`   | str      |          | standard html attribute for `<form>`                       |

## Input Components

### `Text Input`

#### example jsx

```jsx
<Form>
	<TextInput isOptional title="Text input with suffix">
		<Button label="Submit" size="big" type="secondary" />
	</TextInput>
</Form>
```

### TextInput options

| Property           | Type                                          | Required | Description                                                            |
| ------------------ | --------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `title`            | str                                           | \*yes    | The label text associated with the input                               |
| `value`            | str                                           | \*yes    | standard html attribute for `<input/>`                                 |
| `name`             | str                                           | \*yes    | standard html attribute for `<input/>`                                 |
| `description`      | str                                           |          | Optional description associated with the input                         |
| `type`             | 'text' \| 'password' \| 'email' \| 'textarea' |          | defaults to text                                                       |
| `description`      | str                                           |          | Optional description associated with the input                         |
| `isOptional`       | bool                                          |          | marks group as optional                                                |
| `inlineField`      | bool                                          |          | displays label side by side with input                                 |
| `isVerticalCenter` | bool                                          |          | verically centers label with input when displaying inline              |
| `errorMessage`     | str                                           |          |                                                                        |
| `required`         | bool                                          |          | standard html attribute for `<input/>`                                 |
| `disabled`         | bool                                          |          | standard html attribute for `<input/>`                                 |
| `isSmall`          | bool                                          |          | reduces height of input                                                |
| `inlineInput`      | bool                                          |          | set to true if you wish to display multiple inputs inline              |
| `highlight`        | 'valid' \| 'invalid'                          |          | styles input as valid or invalid                                       |
| `children`         | `JSX.Element`                                 |          | add an element after an input for example a submit button              |
| `hasSuffix`        | bool                                          |          | displays input inline with child, defaults to true if child is present |
| `onChange`         | Function                                      |          | standard html attribute for `<input/>`                                 |
| `ref`              | React.Ref                                     |          | for use with react refs                                                |

### `Box Radio Buttons`

#### example jsx

```jsx
<Form>
	<RadioBtns
		description="Also availble with icon only"
		state="saving"
		title="Stateful Box Button"
		type="box">
		<RadioBtn name="default" value="Daily" checked />
		<RadioBtn name="default" value="Weekly" />
	</RadioBtns>
</Form>
```

### RadioBtns options

| Property           | Type                | Required | Description                                                 |
| ------------------ | ------------------- | -------- | ----------------------------------------------------------- |
| `title`            | str                 | \*yes    | The label text to go with the group of buttons              |
| `children`         | `<BoxRadioBtn/>`    | \*yes    | one or more box buttons                                     |
| `type`             | 'box' \| 'round'    |          | defaults to round                                           |
| `description`      | str                 |          | Optional description of group of buttons                    |
| `isOptional`       | bool                |          | marks group as optional                                     |
| `inlineField`      | bool                |          | displays label side by side with buttons                    |
| `inlineInput`      | bool                |          | display buttons side by side (default is stacked)           |
| `isVerticalCenter` | bool                |          | verically centers label with buttons when displaying inline |
| `errorMessage`     | str                 |          |                                                             |
| `state`            | 'saving' \| 'saved' |          | shows text and icon                                         |
| `hideStateText`    | bool                |          | displays icon only                                          |
| `customStateText`  | str                 |          | change state text from default "saving"                     |

### RadioBtn options

| Property     | Type               | Required | Description                                                                                  |
| ------------ | ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `children`   | JSX.Element \| str |          | the text or element to display within the button, if non are provided the value will be used |
| `value`      | str                | \*yes    | standard html attribute for `<input/>`                                                       |
| `name`       | str                | \*yes    | standard html attribute for `<input/>`                                                       |
| `required`   | bool               |          | standard html attribute for `<input/>`                                                       |
| `disabled`   | bool               |          | standard html attribute for `<input/>`                                                       |
| `checked`    | bool               |          | maps to defaultChecked attribute on `<input/>`                                               |
| `isNegative` | bool               |          | adds negative highlight to a button (box type btns only)                                     |
