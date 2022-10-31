import uniqueId from 'lodash.uniqueid';

export interface FormProps {
	children: JSX.Element | JSX.Element[];
	action?: string;
	method?: string;
	onSubmit?: Function;
}

export interface FormField {
	children: JSX.Element;
	title: string;
	description?: string;
	isOptional?: boolean;
	isInline?: boolean;
	isVerticalCenter?: boolean;
}

export interface FormFieldProps extends FormField {
	id: string;
}
export interface FormFieldsetProps extends FormField {

}

export interface InputProps {
	name: string;
	value?: string;
	required?: boolean;
	disabled?: boolean;
	isInline?: boolean; /*  */
}

interface FormTitleProps {
	isVerticalCenter?: boolean;
	labelId?: string;
	title: string;
	description?: string;
	describedbyId?: string;
}

export function Form({children, action, method, onSubmit}: FormProps) {
	return (
		<form data-o-component="o-forms" onSubmit={onSubmit ? event => onSubmit(event) : null } action={action} method={method} >
			{children}
		</form>
	);
}

function FormTitle({isVerticalCenter, labelId, title, description, describedbyId}: FormTitleProps){
	return(
				<span className={`o-forms-title ${isVerticalCenter && 'o-forms-title--vertical-center'}`}>
					<span
						className="o-forms-title__main"
						id={labelId}>
						{title}
					</span>
				{description && (
					<span
						className="o-forms-title__prompt"
						id={describedbyId}>
						{description}
					</span>
				)}
				</span>
	)
}

export function FormField ({
	id,
	title,
	description,
	isOptional,
	isInline,
	isVerticalCenter,
	children,
}:FormFieldProps) {
		const describedbyId = description &&  uniqueId('describedby_');
		const modifiers = [];
		if(isInline) modifiers.push('o-forms-field--inline')
		if(isOptional) modifiers.push('o-forms-field--optional')
	return(
		<label htmlFor={id} className={`o-forms-field ${modifiers.join(' ')}`}>
    	<FormTitle isVerticalCenter={isVerticalCenter} title={title} description={description} describedbyId={describedbyId} />
			{children}
		</label>
	)
}


export function FormFieldset({
	title,
	description,
	isOptional,
	isInline,
	isVerticalCenter,
	children,
}: FormFieldsetProps) {
	const labelId = uniqueId('labelledby_');
	const describedbyId = description &&  uniqueId('describedby_');

	const modifiers = [];
	if(isInline) modifiers.push('o-forms-field--inline')
	if(isOptional) modifiers.push('o-forms-field--optional')

	return (
		<div
			className={`o-forms-field ${modifiers.join(' ')}`}
			role="group"
			aria-labelledby={labelId}
			aria-describedby={describedbyId}>
			<FormTitle isVerticalCenter={isVerticalCenter} labelId={labelId} title={title} description={description} describedbyId={describedbyId} />
			{children}
		</div>
	);
}

export function FormError({errorMessage}){
	return(
		<span className="o-forms-input__error error" role="alert">
			{errorMessage}
		</span>)
}



/*

<Form>
	<FormField>
		<Text />
	</FormField>

	<FormFieldSet>
		<CheckBoxes>
			<CheckBox />
			<CheckBox />
			<CheckBox />
		</CheckBoxes>
	</FormFieldSet>
</Form>



INPUTS

<Text type="password | email | text | textarea"/>
<File />
<CheckBox />
<RadioBtn />
<BoxRadioBtn />


*/

