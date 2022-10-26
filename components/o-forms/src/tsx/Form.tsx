import uniqueId from 'lodash.uniqueid';

export interface FormProps {
	children: JSX.Element | JSX.Element[];
	onSubmit?: Function;
}

export interface FormField {
	children: JSX.Element;
	title: string;
	describedby?: string;
	centered?: boolean;
	optional?: boolean; /* to implement */
	/* possibly type too */

}

/* addClasses()? */
export interface FormFieldProps extends FormField {

}
export interface FormFieldsetProps extends FormField {

}



export interface InputProps {
	name: string;
	type?: 'text' | 'file' | 'password' | 'email' | 'radio' | 'checkbox'; /* might handle in component, ie text input will have text (but might want the option of password) */ /* OR MIGHT ADD TO FIELD FOR CONDITIONAL WRAPPING */
	value?: string;
	required?: boolean;
	// error?: string;
}


export function Form({children, onSubmit}: FormProps) {
	return (
		<form data-o-component="o-forms" onSubmit={onSubmit ? event => onSubmit(event) : null } >
			{children}
		</form>
	);
}

export function FormField ({title,
	children,
	centered,
	describedby}:FormFieldProps) {
		const labelId = uniqueId('label_');
	return(
		<label htmlFor={labelId} className="o-forms-field">
    <span className="o-forms-title">
        <span className="o-forms-title__main">Label for input here</span>
    </span>

		{/* would need to pass id down to child, or pass child as prop*/}
		{children}

</label>
	)
}

export function FormFieldset({
	title,
	children,
	centered,
	describedby
}: FormFieldsetProps) {
	const labelId = uniqueId('labelledby_');
	const describedbyId = describedby &&  uniqueId('describedby_');
	return (
		<div
			className={`o-forms-field ${centered ? 'o-forms-field--inline' : ''}`}
			role="group"
			aria-labelledby={labelId}
			aria-describedby={describedbyId}>
				{/* private title component */}
			<span className="o-forms-title">
					<span
						className="o-forms-title__main"
						id={labelId}>
						{title}
					</span>
				{describedby && (
					<span
						className="o-forms-title__prompt"
						id={describedbyId}>
						{describedby}
					</span>
				)}
			</span>
			{/* title component */}
			{children}
		</div>
	);
}

export function FormError({error}){
	return(
		<span className="o-forms-input__error error" role="alert">
			{error}
		</span>)
}

