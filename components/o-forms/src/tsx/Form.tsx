import uniqueId from 'lodash.uniqueid';
import {classBuilder} from '../utils/classBuilder'

interface TypeFormProps {
	children: JSX.Element | JSX.Element[];
	action?: string;
	method?: string;
	onSubmit?: Function;
}
export interface TypeFormField {
	title: string;
	description?: string;
	isOptional?: boolean;
	isInline?: boolean;
	isVerticalCenter?: boolean;
}

export interface FormFieldProps extends TypeFormField {
	id: string;
	children: JSX.Element;
}
export interface FormFieldsetProps extends TypeFormField {
	children: JSX.Element;
}

export interface InputProps {
	name: string;
	value?: string;
	required?: boolean;
	disabled?: boolean;
}

interface FormTitleProps {
	isVerticalCenter?: boolean;
	isInline?: boolean;
	labelId?: string;
	title: string;
	description?: string;
	describedbyId?: string;
}

export function Form({children, action, method, onSubmit}: TypeFormProps) {
	return (
		<form
			data-o-component="o-forms"
			onSubmit={onSubmit ? event => onSubmit(event) : null }
			action={action}
			method={method} >
			{children}
		</form>
	);
}

function FormTitle({
	isVerticalCenter,
	isInline,
	labelId,
	title,
	description,
	describedbyId
}: FormTitleProps){
	const [addClass, getClasses] = classBuilder('o-forms-title');
	if(isInline) addClass('shrink');
	if(isVerticalCenter) addClass('vertical-center');

	return(
				<span className={getClasses()}>
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
		const [addClass, getClasses] = classBuilder('o-forms-field');
		if(isInline) addClass('inline')
		if(isOptional) addClass('optional')
	return(
		<label htmlFor={id} className={getClasses()}>
    	<FormTitle isVerticalCenter={isVerticalCenter}
				title={title}
				description={description}
				describedbyId={describedbyId}
				isInline={isInline}/>

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
	const [addClass, getClasses] = classBuilder('o-forms-field');
	if(isInline) addClass('inline')
	if(isOptional) addClass('optional')

	return (
		<div
			className={getClasses()}
			role="group"
			aria-labelledby={labelId}
			aria-describedby={describedbyId}>
			<FormTitle
				isVerticalCenter={isVerticalCenter}
				labelId={labelId}
				title={title}
				description={description}
				describedbyId={describedbyId}
				isInline={isInline}/>
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
