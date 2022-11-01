import uniqueId from 'lodash.uniqueid';
import { classBuilder } from '../utils/classBuilder';
import { InputProps, FormError, FormFieldset, TypeFormField } from './Form';


export interface BoxRadioBtnsWrapperProps {
	children: JSX.Element | JSX.Element[];
	errorMessage?: string;
	state?: 'saving' | 'saved';
	hideStateText?: boolean;
	customStateText?: string;
}

export interface BoxRadioBtnProps extends InputProps{
	checked?: boolean;
	isNegative? : boolean;
	children?: JSX.Element | string;
}

export interface BoxRadioBtnsProps extends BoxRadioBtnsWrapperProps, TypeFormField {

}

function BoxRadioBtnsWrapper({
		children,
		errorMessage,
		state,
		customStateText,
		hideStateText
	}: BoxRadioBtnsWrapperProps) {
		const [addClass, getClasses] = classBuilder('o-forms-input');
		if(state) addClass(`${state}`)
		if(errorMessage) addClass('invalid')
		return (
			<span
					className={`${getClasses()} o-forms-input--radio-box`}>
					<span className="o-forms-input--radio-box__container">
						{children}
					</span>
					{errorMessage && (
						<FormError errorMessage={errorMessage}/>
					)}
					{state &&
					<span
					className={`
						o-forms-input__state
						${(hideStateText || customStateText) && "o-forms-input__state--icon-only"}`
					}
					role="status"
					aria-label={customStateText || ''} >
						{customStateText}
					</span>}
				</span>
		);
	}

export function BoxRadioBtns({
	children,
	errorMessage,
	state,
	customStateText,
	hideStateText,
	title,
	description,
	isOptional,
	isInline,
	isVerticalCenter
}: BoxRadioBtnsProps) {
	const wrapperProps = {
		errorMessage,
		state,
		customStateText,
		hideStateText,
	}
	const fieldsetProps = {
		title,
		description,
		isOptional,
		isInline,
		isVerticalCenter,
	}
	return (
		<FormFieldset {...fieldsetProps}>
			<BoxRadioBtnsWrapper {...wrapperProps}>
				{children}
			</BoxRadioBtnsWrapper>
		</FormFieldset>
	);
}

export function BoxRadioBtn({
	value,
	name,
	disabled,
	checked,
	required,
	isNegative,
	children
}: BoxRadioBtnProps) {
	const labelId = uniqueId('box_button_')
	const [addClass, getClasses] = classBuilder('o-forms-input', false);
	if(isNegative) addClass('__label--negative', false);

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
			<span
				className={`o-forms-input__label ${getClasses()}`}>
				{children || value}
			</span>
		</label>
	);
}
