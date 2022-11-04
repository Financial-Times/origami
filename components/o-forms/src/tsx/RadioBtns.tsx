import uniqueId from 'lodash.uniqueid';
import {classBuilder, getInputClasses} from '../utils/classBuilder';
import {InputProps, FormError, FormFieldset, TypeFormField} from './Form';
export interface RadioBtnsWrapperProps {
	children: JSX.Element | JSX.Element[];
	errorMessage?: string;
	type?: 'box' | 'round';
	state?: 'saving' | 'saved';
	hideStateText?: boolean;
	customStateText?: string;
	inlineInputs?: boolean;
}

export interface RadioBtnProps extends InputProps {
	checked?: boolean;
	isNegative?: boolean;
	children?: JSX.Element | string;
}

export interface RadioBtnsProps extends RadioBtnsWrapperProps, TypeFormField {}

function RadioBtnsWrapper({
	children,
	errorMessage,
	state,
	customStateText,
	hideStateText,
	type,
	inlineInputs,
}: RadioBtnsWrapperProps) {
	return (
		<span
			className={`${getInputClasses({
				state,
				errorMessage,
				inlineInput: inlineInputs,
			})} o-forms-input--radio-${type}`}>
			{type === 'box' ? (
				<span className={'o-forms-input--radio-box__container'}>
					{children}
				</span>
			) : (
				<>{children}</>
			)}
			{errorMessage && <FormError errorMessage={errorMessage} />}
			{state && (
				<span
					className={`
						o-forms-input__state
						${(hideStateText || customStateText) && 'o-forms-input__state--icon-only'}`}
					role="status"
					aria-label={customStateText || ''}>
					{customStateText}
				</span>
			)}
		</span>
	);
}

export function RadioBtns({
	children,
	errorMessage,
	state,
	customStateText,
	hideStateText,
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	type,
	inlineInputs,
}: RadioBtnsProps) {
	const wrapperProps = {
		errorMessage,
		state,
		customStateText,
		hideStateText,
		type,
		inlineInputs,
	};
	const fieldsetProps = {
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
	};
	if (!wrapperProps.type) {
		wrapperProps.type = 'round';
	}
	return (
		<FormFieldset {...fieldsetProps}>
			<RadioBtnsWrapper {...wrapperProps}>{children}</RadioBtnsWrapper>
		</FormFieldset>
	);
}

export function RadioBtn({
	value,
	name,
	disabled,
	checked,
	required,
	isNegative,
	children,
}: RadioBtnProps) {
	const labelId = uniqueId('radio_button_');
	const [addClass, getClasses] = classBuilder('o-forms-input', false);
	if (isNegative) addClass('__label--negative', false);

	return (
		<label htmlFor={labelId} key={value}>
			<input
				id={labelId}
				type="radio"
				name={name}
				value={value}
				disabled={disabled}
				defaultChecked={checked}
				required={required}
			/>
			<span className={`o-forms-input__label ${getClasses()}`}>
				{children || value}
			</span>
		</label>
	);
}
