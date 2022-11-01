import uniqueId from 'lodash.uniqueid';
import { classBuilder } from '../utils/classBuilder';
import { InputProps, FormError } from './Form';


export interface BoxRadioBtnsProps {
	children: JSX.Element | JSX.Element[];
	errorMessage?: string;
	state?: 'saving' | 'saved';
	hideStateText?: boolean;
	customStateText?: string;
}

export interface BoxRadioBtnProps extends InputProps{
	checked?: boolean;
	modifier?: string[];
	highlight?: 'valid' | 'invalid'; /* for text fields */
	isNegative? : boolean;
}

export function BoxRadioBtns({
	children,
	errorMessage,
	state,
	customStateText,
	hideStateText
}: BoxRadioBtnsProps) {
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
				<span className={`o-forms-input__state ${(hideStateText || customStateText) && "o-forms-input__state--icon-only"}`} role="status" aria-label={customStateText || ''} >
					{customStateText}
				</span>}
			</span>
	);
}

export function BoxRadioBtn({
	value,
	name,
	disabled,
	checked,
	required,
	highlight,
	isNegative
}: BoxRadioBtnProps) {
	const labelId = uniqueId('box_button_')
	const [addClass, getClasses] = classBuilder('o-forms-input', false);
	if(isNegative) addClass('__label--negative', false);
	if(highlight) addClass(`${highlight}`)

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
				{value}
			</span>
		</label>
	);
}

