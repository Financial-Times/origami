import {uidBuilder} from '@financial-times/o-utils';
import {DateInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';

const uniqueId = uidBuilder('o3-form-date-input');

export const DateInput = ({
																label,
																feedback,
																description,
																disabled,
																attributes,
																inputId,
																optional,
																isDatePicker = true
															}: DateInputProps) => {

	const id = inputId || uniqueId('_');

	const inputClasses = [
		'o3-form',
		'o3-form-text-input',
	];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}

	return (
			<LabeledFormField
				label={label}
				feedback={feedback}
				description={description}
				inputId={id}
				optional={optional}>
					<input
						{...attributes}
						id={id}
						disabled={disabled}
						className={inputClasses.join(' ')}
						required={!optional}
						type={isDatePicker ? 'date' : 'text'}
						aria-required={!optional}
						pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
					/>
			</LabeledFormField>
	);
};
