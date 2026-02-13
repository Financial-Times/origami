import {TextInputProps} from '../types/index';
import {LabeledFormField} from './fieldComponents/FormField';

export const TextInput = ({
	label,
	feedback,
	description,
	disabled,
	length,
	attributes,
	inputId,
	optional,
}: TextInputProps) => {
	const inputClasses = ['o3-form', 'o3-form-text-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}
	if (length) {
		inputClasses.push(`o3-form-text-input--short-${length}`);
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
				disabled={disabled}
				className={inputClasses.join(' ')}
				required={!optional}
				aria-required={!optional}
				maxLength={length}
				type="text"
			/>
		</LabeledFormField>
	);
};
