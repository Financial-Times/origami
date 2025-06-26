import {classBuilder} from '../utils';
import {uidBuilder} from "@financial-times/o-utils";
const uniqueId = uidBuilder('o-forms');

interface TypeFormProps {
	children: React.JSX.Element | React.JSX.Element[];
	action?: string;
	method?: string;
	onSubmit?: Function;
}
export interface TypeFormField {
	title: string;
	description?: string;
	isOptional?: boolean;
	inlineField?: boolean;
	isVerticalCenter?: boolean;
	theme?: 'inverse' | 'white' | 'professional' | 'professional-inverse' | 'ft-live';
}

export interface FormFieldProps extends TypeFormField {
	id: string;
	children?: React.JSX.Element;
}
export interface FormFieldsetProps extends TypeFormField {
	children: React.JSX.Element;
}

export interface InputProps {
	name: string;
	value?: string;
	required?: boolean;
	disabled?: boolean;
}

interface FormTitleProps {
	isVerticalCenter?: boolean;
	inlineField?: boolean;
	labelId?: string;
	title: string;
	description?: string;
	describedbyId?: string;
}

interface GenericInputProps extends TypeFormProps {
	id: string;
	title: string;
}

export function Form({children, action, method, onSubmit}: TypeFormProps) {
	return (
		<form
			data-o-component="o-forms"
			onSubmit={onSubmit ? event => onSubmit(event) : null}
			action={action}
			method={method}>
			{children}
		</form>
	);
}

function FormTitle({
	isVerticalCenter,
	inlineField,
	labelId,
	title,
	description,
	describedbyId,
}: FormTitleProps) {
	const [addClass, getClasses] = classBuilder('o-forms-title');
	if (inlineField) addClass('shrink');
	if (isVerticalCenter) addClass('vertical-center');

	return (
		<span className={getClasses()}>
			<span className="o-forms-title__main" id={labelId}>
				{title}
			</span>
			{description && (
				<span className="o-forms-title__prompt" id={describedbyId}>
					{description}
				</span>
			)}
		</span>
	);
}

export function FormField({
	id,
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	children,
}: FormFieldProps) {
	const describedbyId = description && uniqueId('describedby_');
	const [addClass, getClasses] = classBuilder('o-forms-field');
	if (inlineField) addClass('inline');
	if (isOptional) addClass('optional');
	return (
		<label htmlFor={id} className={getClasses()}>
			<FormTitle
				isVerticalCenter={isVerticalCenter}
				title={title}
				description={description}
				describedbyId={describedbyId}
				inlineField={inlineField}
			/>

			{children}
		</label>
	);
}

export function FormFieldset({
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	theme,
	children,
}: FormFieldsetProps) {
	const labelId = uniqueId('labelledby_');
	const describedbyId = description && uniqueId('describedby_');
	const [addClass, getClasses] = classBuilder('o-forms-field');
	if (inlineField) addClass('inline');
	if (isOptional) addClass('optional');
	if (theme) addClass(theme);

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
				inlineField={inlineField}
			/>
			{children}
		</div>
	);
}

export function FormError({errorMessage}) {
	return (
		<span className="o-forms-input__error error" role="alert">
			{errorMessage}
		</span>
	);
}


export function GenericInput(props: GenericInputProps ) {
	const {children, ...rest} = props;
	return (
		<>
			<FormField {...rest}>
				<span className="o-forms-input">
					{props.children}
				</span>
			</FormField>
		</>
	)
}
