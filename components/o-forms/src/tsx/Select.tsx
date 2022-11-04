import {getInputClasses, uniqueId} from '../utils';
import {FormError, InputProps, TypeFormField, FormField} from './Form';

interface TypeSelect extends InputProps {
	highlight?: 'valid' | 'invalid';
	errorMessage?: string;
	suffix?: JSX.Element;
	isSmall?: boolean;
	children?: JSX.Element[];
	inlineInput?: boolean;
	multiple?: boolean;
	onChange?: Function;
	ref?: any;
}
interface SelectBoxProps extends TypeSelect {
	id: string;
}
interface SelectProps extends TypeSelect, TypeFormField {}

function SelectBox({
	id,
	value,
	name,
	onChange,
	ref,
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	multiple,
	suffix,
	children,
	inlineInput,
}: SelectBoxProps) {
	return (
		<span
			className={getInputClasses({
				inputType: 'select',
				highlight,
				errorMessage,
				isSmall,
				inlineInput,
				hasSuffix: suffix && true,
			})}>
			<select
				id={id}
				name={name}
				value={value}
				onChange={onChange ? event => onChange(event) : null}
				ref={ref}
				required={required}
				disabled={disabled}
				multiple={multiple}>
				{children}
			</select>
			{errorMessage && <FormError errorMessage={errorMessage} />}
			{suffix}
		</span>
	);
}

export function Select({
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	value,
	name,
	onChange,
	ref,
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	suffix,
	inlineInput,
	multiple,
	children,
}: SelectProps) {
	const id = uniqueId('labelledby_');
	const selectProps = {
		id,
		value,
		name,
		onChange,
		ref,
		highlight,
		errorMessage,
		isSmall,
		required,
		disabled,
		suffix,
		inlineInput,
		multiple,
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
			<SelectBox {...selectProps}>{children}</SelectBox>
		</FormField>
	);
}
