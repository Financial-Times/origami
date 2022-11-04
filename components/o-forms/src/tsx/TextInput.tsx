import {getInputClasses, uniqueId} from '../utils';
import {FormError, InputProps, TypeFormField, FormField} from './Form';

export type TextInputType = 'text' | 'password' | 'email' | 'textarea';

interface TypeTextInput extends InputProps {
	highlightValid?: boolean;
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
	highlightValid,
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
	return (
		<span
			className={getInputClasses({
				highlightValid,
				errorMessage,
				isSmall,
				inlineInput,
				hasSuffix,
				hasChildren: children && true,
				inputType,
			})}>
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
	highlightValid,
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
		highlightValid,
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
