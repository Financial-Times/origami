import {DateInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';

export const DateInputPicker = ({
																	label,
																	feedback,
																	description,
																	disabled,
																	attributes,
																	inputId,
																	optional,
																}: DateInputProps) => {

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
			labelsElement={inputId}
			optional={optional}>
			<input
				{...attributes}
				id={inputId}
				disabled={disabled}
				className={inputClasses.join(' ')}
				required={!optional}
				type="date"
				aria-required={!optional}
				pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
			/>
		</LabeledFormField>
	);
};
