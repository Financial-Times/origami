type field = {
	type?: string
	aria?: {
		label?: string
		info?: string
	}
	modifiers?: string[]
	error?: string
	state?: string
	icon?: boolean
}

type title = {
	mainTitle?: string
	promptTitle?: string
}

type inputs = {
	type?: string
	name?: string
	value?: string
	checked?: boolean
	modifier?: string[]
	disabled?: boolean
}[]

export interface RadioButtonsProps {
	inputs?: inputs
}

export interface FormFieldProps {
	children?: JSX.Element | JSX.Element[]
	title?: title
	field?: field
}

export interface FormsProps extends RadioButtonsProps {
	formField?: FormFieldProps
}

export function Forms({
	inputs,
	formField
}: FormsProps) {
	return (
		<FormField title={formField.title} field={formField.field}>
			<RadioButtons inputs={inputs} />
		</FormField>
	)
}

export function FormField({ title, field, children }: FormFieldProps) {
	return (
		<div className={addNewClassNames('o-forms-field o-forms-field--white', field.modifiers, 'o-forms-field--')} role="group" aria-labelledby={field.aria.label} aria-describedby={field.aria.info}>
			<span className="o-forms-title" role="status">
				{title.mainTitle && (
					<span className="o-forms-title__main" role="status" id="negative-radio-box-group-title">{title.mainTitle}</span>
				)}
				{title.promptTitle && (
					<span className="o-forms-title__prompt" role="status" id="negative-radio-box-group-info">{title.promptTitle}</span>
				)}
			</span>
			<span className={addNewClassNames('o-forms-input o-forms-input--radio-box', field.modifiers, 'o-forms-input--')}>
				{children}
				{field.error && (
					<span className="o-forms-input__error" role="alert" >{field.error}</span>
				)}
				{field.state && (
					<span className="o-forms-input__state" role="status" />
				)}
			</span>
		</div>
	)
}


export function RadioButtons({ inputs }: RadioButtonsProps) {
	return (
		<span className="o-forms-input--radio-box__container" role="status" >
			{inputs.map(({ value, name, disabled, checked, modifier }) => {
				return (
					<label>
						<input type="radio" name={name} value={value} disabled={disabled} defaultChecked={checked} required />
						<span className={addNewClassNames('o-forms-input__label', modifier, 'o-forms-input__label--')} role="status"> {value} </span>
					</label>
				)
			})}
		</span>
	)
}

function addNewClassNames(currentClass, modifiers, prefix) {
	const classNames = [currentClass]
	if (modifiers) {
		modifiers.forEach(modifier => {
			classNames.push(`${prefix}${modifier}`);
		})
	};
	return classNames.join(' ');
}

