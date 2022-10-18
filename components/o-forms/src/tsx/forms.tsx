type field = {
	type?: string;
	aria?: {
		label?: string;
		info?: string;
	};
	modifiers?: string[];
	error?: string;
	state?: string;
	icon?: boolean;
};

type title = {
	mainTitle?: string;
	promptTitle?: string;
};

type inputs = {
	id: string;
	type?: string;
	name?: string;
	value?: string;
	checked?: boolean;
	modifier?: string[];
	disabled?: boolean;
}[];

interface RadioButtonsProps {
	inputs?: inputs;
	highlight?: boolean;
}

interface FormFieldProps {
	children?: JSX.Element | JSX.Element[];
	title?: title;
	field?: field;
	centered?: boolean;
	saved?: boolean;
}

interface FormsProps extends RadioButtonsProps {
	formField?: FormFieldProps;
	centered?: boolean;
	saved?: boolean;
}

export function Forms({
	inputs,
	formField,
	highlight,
	centered,
	saved,
}: FormsProps) {
	return (
		<form data-o-component="o-forms">
			<FormField
				title={formField.title}
				field={formField.field}
				centered={centered}
				saved={saved}>
				<RadioButtons inputs={inputs} highlight={highlight} />
			</FormField>
		</form>
	);
}

export function FormField({
	title,
	field,
	children,
	saved,
	centered,
}: FormFieldProps) {
	return (
		<div
			className={`o-forms-field ${centered && 'o-forms-field--inline'}`}
			role="group"
			aria-labelledby={field.aria.label}
			aria-describedby={field.aria.info}>
			<span className="o-forms-title">
				{title.mainTitle && (
					<span
						className="o-forms-title__main"
						id="negative-radio-box-group-title">
						{title.mainTitle}
					</span>
				)}
				{title.promptTitle && (
					<span
						className="o-forms-title__prompt"
						id="negative-radio-box-group-info">
						{title.promptTitle}
					</span>
				)}
			</span>
			<span
				className={`o-forms-input o-forms-input--radio-box ${
					field.state && `o-forms-input--${saved ? 'saved' : 'saving'}`
				} ${field.error && `o-forms-input--invalid`}`}>
				{children}
				{field.error && (
					<span className="o-forms-input__error error" role="alert">
						{field.error}
					</span>
				)}
				{field.state && <span className="o-forms-input__state" role="status" />}
			</span>
		</div>
	);
}

export function RadioButtons({inputs, highlight}: RadioButtonsProps) {
	return (
		<span className="o-forms-input--radio-box__container">
			{inputs.map(({id, value, name, disabled, checked, modifier}) => {
				return (
					<label htmlFor={id} key={value}>
						<input
							id={id}
							type="radio"
							name={name}
							value={value}
							disabled={disabled}
							defaultChecked={checked}
							required
						/>
						<span
							className={`o-forms-input__label ${
								highlight && 'o-forms-input__label--negative'
							}`}>
							{' '}
							{value}{' '}
						</span>
					</label>
				);
			})}
		</span>
	);
}
