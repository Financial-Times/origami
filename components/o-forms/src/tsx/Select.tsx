import {getInputClasses} from '../utils';
import {FormError, InputProps, TypeFormField, FormField} from './Form';
import {uidBuilder} from "@financial-times/o-utils";
const uniqueId = uidBuilder('o-forms');

interface TypeSelect extends InputProps {
	highlight?: 'valid' | 'invalid';
	errorMessage?: string;
	suffix?: React.JSX.Element;
	isSmall?: boolean;
	children?: React.JSX.Element | React.JSX.Element[];
	inlineInput?: boolean;
	multiple?: boolean;
	onChange?: Function;
	additionalAttributes?: Record<string, string | boolean>;
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
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	multiple,
	suffix,
	children,
	inlineInput,
	additionalAttributes
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
				required={required}
				disabled={disabled}
				multiple={multiple}
				{...additionalAttributes}>
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
	highlight,
	errorMessage,
	isSmall,
	required,
	disabled,
	suffix,
	inlineInput,
	multiple,
	additionalAttributes,
	children,
}: SelectProps) {
	const id = uniqueId('labelledby_');
	const selectProps = {
		id,
		value,
		name,
		onChange,
		highlight,
		errorMessage,
		isSmall,
		required,
		disabled,
		suffix,
		inlineInput,
		multiple,
		additionalAttributes
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
