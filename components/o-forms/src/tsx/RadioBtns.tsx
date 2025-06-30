import {classBuilder, getInputClasses} from '../utils';
import {InputProps, FormError, FormFieldset, TypeFormField} from './Form';
import {uidBuilder} from "@financial-times/o-utils";
const uniqueId = uidBuilder('o-forms');

export interface RadioBtnsWrapperProps {
	children: React.JSX.Element | React.JSX.Element[];
	errorMessage?: string;
	inlineInputs?: boolean;
}
export interface RadioBtnsBoxWrapperProps extends RadioBtnsWrapperProps {
	state?: 'saving' | 'saved';
	hideStateText?: boolean;
	customStateText?: string;
}

export interface RadioBtnProps extends InputProps {
	checked?: boolean;
	isNegative?: boolean;
	children?: React.JSX.Element | string;
}

export interface RadioBtnsProps extends RadioBtnsWrapperProps, TypeFormField {
	theme?: 'professional' | 'professional-inverse' | 'ft-live';
}

export interface RadioBtnsBoxProps extends RadioBtnsBoxWrapperProps, TypeFormField {
	theme?: 'professional' | 'professional-inverse' | 'ft-live';
}

function RadioBtnsBoxWrapper({
	children,
	errorMessage,
	state,
	customStateText,
	hideStateText,
	inlineInputs,
}: RadioBtnsBoxWrapperProps) {
	return (
		<span
			className={`${getInputClasses({
				state,
				errorMessage,
				inlineInput: inlineInputs,
			})} o-forms-input--radio-box`}>
			<span className={'o-forms-input--radio-box__container'}>
				{children}
			</span>
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

function RadioBtnsWrapper({
	children,
	errorMessage,
	hideStateText,
	inlineInputs,
}: RadioBtnsWrapperProps) {
	return (
		<span
			className={`${getInputClasses({
				errorMessage,
				inlineInput: inlineInputs,
			})} o-forms-input--radio-round`}>
			{children}
			{errorMessage && <FormError errorMessage={errorMessage} />}
		</span>
	);
}

export function RadioBtnsBox({
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
	inlineInputs,
	theme
}: RadioBtnsBoxProps) {
	const wrapperProps = {
		errorMessage,
		state,
		customStateText,
		hideStateText,
		inlineInputs,
	};
	const fieldsetProps = {
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
		theme
	};
	if (!wrapperProps.type) {
		wrapperProps.type = 'round';
	}
	return (
		<FormFieldset {...fieldsetProps}>
			<RadioBtnsBoxWrapper {...wrapperProps}>{children}</RadioBtnsBoxWrapper>
		</FormFieldset>
	);
}

export function RadioBtns({
	children,
	errorMessage,
	hideStateText,
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	inlineInputs,
	theme,
}: RadioBtnsProps) {
	const wrapperProps = {
		errorMessage,
		hideStateText,
		inlineInputs,
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
