import uniqueId from 'lodash.uniqueid';
import {classBuilder} from '../utils/classBuilder';
import {FormError, InputProps, TypeFormField, FormField} from './Form';

export type TextInputType = 'text' | 'password' | 'email' | 'textarea';

interface TypeTextInput extends InputProps {
	highlight?: 'valid' | 'invalid';
	errorMessage?: string;
	hasSuffix?: boolean;
	type?: TextInputType;
	isSmall?: boolean;
	children?: JSX.Element;
	inlineInput?: boolean;
	onChange?: Function;
	ref?: any /* Look up correct type */;
}
export interface TextInputProps extends TypeTextInput, TypeFormField {}
interface PrivateTextInputProps extends TypeTextInput {
	id: string;
}

function PrivateTextInput({
	id,
	value,
	type,
	name,
	onChange,
	ref,
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	hasSuffix,
	children,
	inlineInput,
}: PrivateTextInputProps) {
	const InputComponent = type !== 'textarea' ? 'input' : 'textarea';
	const inputType = !type || type === 'email' ? 'text' : type;
	const [addClass, getClasses] = classBuilder('o-forms-input');
	addClass(inputType);
	if (highlight) addClass(highlight);
	if (errorMessage) addClass('invalid');
	if (isSmall) addClass('small');
	if (inlineInput) addClass('inline');
	if ((hasSuffix || children) && hasSuffix !== false) addClass('suffix');

	return (
		<span className={getClasses()}>
			<InputComponent
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange ? event => onChange(event) : null}
				ref={ref}
				required={required}
				disabled={disabled}
			/>
			{children}
			{errorMessage && <FormError errorMessage={errorMessage} />}
		</span>
	);
}

export function TextInput({
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	value,
	type,
	name,
	onChange,
	ref,
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	hasSuffix,
	inlineInput,
	children,
}: TextInputProps) {
	const id = uniqueId('labelledby_');
	const inputProps = {
		id,
		value,
		type,
		name,
		onChange,
		ref,
		highlight,
		errorMessage,
		isSmall,
		required,
		disabled,
		hasSuffix,
		inlineInput,
	};
	const fieldProps = {
		id,
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
	};

	return (
		<FormField {...fieldProps}>
			<PrivateTextInput {...inputProps}>{children}</PrivateTextInput>
		</FormField>
	);
}
