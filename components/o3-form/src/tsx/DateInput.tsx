import {DateInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';
import {useEffect, useRef} from 'react';
import {DateInputMask} from './DateInputMask';

export const DateInput = ({
																label,
																feedback,
																description,
																disabled,
																attributes,
																inputId,
																optional,
															}: DateInputProps) => {
	let inputRef = useRef<HTMLInputElement | null>(null);

	const inputClasses = [
		'o3-form',
		'o3-form-text-input',
	];

	useEffect(() => {
		const inputEl = inputRef.current;

		if (!inputEl) return;

		new DateInputMask(inputEl);
	}, []);

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}

	return (
			<LabeledFormField
				label={label}
				feedback={feedback}
				description={description}
				inputId={inputId}
				optional={optional}>
					<input
						{...attributes}
						id={inputId}
						ref={inputRef}
						disabled={disabled}
						className={inputClasses.join(' ')}
						required={!optional}
						type='text'
						aria-required={!optional}
						pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
					/>
			</LabeledFormField>
	);
};
