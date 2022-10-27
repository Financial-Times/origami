import uniqueId from 'lodash.uniqueid';
import { InputProps, FormError } from './Form';


export interface BoxRadioBtnsProps {
	children: JSX.Element | JSX.Element[];
	error?: string;
	state?: 'saving' | 'saved';
	hideStateText?: boolean;
	customStateText?: string;
}

export interface BoxRadioBtnProps extends InputProps{
	checked?: boolean;
	modifier?: string[];
	highlight?: 'valid' | 'invalid'; /* Does this work */
	isNegative? : boolean;
}

export function BoxRadioBtns({children, error, state, customStateText, hideStateText}: BoxRadioBtnsProps) {
	const modifiers = [];
	if(state) modifiers.push(`o-forms-input--${state}`)
	if(error) modifiers.push('o-forms-input--invalid')
	return (
		<span
				className={`o-forms-input o-forms-input--radio-box  ${modifiers.join(' ')}`}>
				<span className="o-forms-input--radio-box__container">
					{children}
				</span>
				{error && (
					<FormError error={error}/>
				)}
				{state &&
				<span className={`o-forms-input__state ${(hideStateText || customStateText) && "o-forms-input__state--icon-only"}`} role="status" aria-label={customStateText || ''} >
					{customStateText}
				</span>}
			</span>
	);
}

export function BoxRadioBtn({value, name, disabled, checked, required, highlight, isNegative}: BoxRadioBtnProps) {
	/* make id optional */
	const labelId = uniqueId('box_button_')
	const modifiers = [];
	if(isNegative) modifiers.push('o-forms-input__label--negative');
	if(highlight) modifiers.push(`o-forms-input--${highlight}`)
	console.log(highlight);
	console.log(modifiers);


	return (
		<label htmlFor={labelId} key={value}>
			<input
				id={labelId}
				type="radio"
				name={name}
				value={value}
				disabled={disabled}
				defaultChecked={checked} /* how does this work with react controlled inputs */
				required={required}
			/>
			<span
				className={`o-forms-input__label ${modifiers.join(' ')}`}>
				{value}
			</span>
		</label>
	);
}

