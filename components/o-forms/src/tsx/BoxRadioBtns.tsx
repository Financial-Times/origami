import uniqueId from 'lodash.uniqueid';
import { InputProps, FormError } from './Form';

interface BoxRadioBtnsProps {
	children: JSX.Element | JSX.Element[]; /* specify btn only */
	error?: string;
	saved?: boolean; /* specific to boxButton */		/* LOOK */
	showStateText?: boolean; /* TODO implement */		/* LOOK */
	state?: string;																	/* LOOK */
}

interface BoxRadioBtnProps extends InputProps{
	checked?: boolean;
	modifier?: string[];
	disabled?: boolean;
	highlight?: 'valid' | 'invalid'; /* should this be on  */
}

export function BoxRadioBtns({children, saved, error, state}: BoxRadioBtnsProps) {
	return (
		<span
				className={`o-forms-input o-forms-input--radio-box ${
					saved && `o-forms-input--${saved ? 'saved' : 'saving'}`
				} ${error && `o-forms-input--invalid`}`}>
				<span className="o-forms-input--radio-box__container">
					{children}
				</span>
				{error && (
					<FormError error={error}/>
				)}
				{state && <span className="o-forms-input__state" role="status" />}
			</span>

	);
}

export function BoxRadioBtn({value, name, disabled, checked, required, highlight}: BoxRadioBtnProps) {
	const labelId = uniqueId('box_button_')
	return (
		<label htmlFor={labelId} key={value}>
			<input
			/* should these be under attributes and destructured? */
				id={labelId}
				type="radio"
				name={name}
				value={value}
				disabled={disabled}
				defaultChecked={checked} /* default? */ //react handles diffenetly with state?
				required={required}
			/>
			<span
				className={`o-forms-input__label ${
					highlight && `o-forms-input--${highlight}`
				}`}>
				{value}
			</span>
		</label>
	);
}
