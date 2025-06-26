import {getInputClasses} from '../utils';
import {InputProps, FormError, FormFieldset, TypeFormField} from './Form';
import {uidBuilder} from "@financial-times/o-utils";
const uniqueId = uidBuilder('o-forms');
export interface CheckboxesWrapperProps {
	children: React.JSX.Element | React.JSX.Element[];
	errorMessage?: string;
	inlineInputs?: boolean;
	inputType?: 'checkbox' | 'toggle';
}

export interface CheckboxProps extends InputProps {
	checked?: boolean;
	description?: string;
	labelFirst?: boolean;
	children?: React.JSX.Element | string;
}

export interface CheckboxesProps
	extends CheckboxesWrapperProps,
		TypeFormField {}

function CheckboxesWrapper({
	children,
	errorMessage,
	inlineInputs,
	inputType,
}: CheckboxesWrapperProps) {
	return (
		<span
			className={getInputClasses({
				errorMessage,
				inlineInput: inlineInputs,
				inputType: inputType || 'checkbox',
			})}>
			{children}
			{errorMessage && <FormError errorMessage={errorMessage} />}
		</span>
	);
}

export function Checkboxes({
	children,
	errorMessage,
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	inlineInputs,
	inputType,
	theme
}: CheckboxesProps) {
	const wrapperProps = {
		errorMessage,
		inlineInputs,
		inputType,
	};
	const fieldsetProps = {
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
		theme
	};
	return (
		<FormFieldset {...fieldsetProps}>
			<CheckboxesWrapper {...wrapperProps}>{children}</CheckboxesWrapper>
		</FormFieldset>
	);
}

export function Checkbox({
	value,
	name,
	disabled,
	checked,
	required,
	description,
	children,
	labelFirst,
}: CheckboxProps) {
	const describedbyId = uniqueId('checkbox_');
	const labelledbyId = uniqueId('checkbox_');

	return (
		<label
			htmlFor={labelledbyId}
			key={value}
			className={labelFirst ? 'o-forms-input__right' : ''}>
			<input
				id={labelledbyId}
				type="checkbox"
				name={name}
				value={value}
				disabled={disabled}
				defaultChecked={checked}
				required={required}
				aria-describedby={describedbyId}
			/>
			<span className={`o-forms-input__label`}>
				<span className="o-forms-input__label__main">{children || value}</span>
				{description && (
					<span id={describedbyId} className="o-forms-input__label__prompt">
						{description}
					</span>
				)}
			</span>
		</label>
	);
}
