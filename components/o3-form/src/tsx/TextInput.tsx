import {BaseInputProps, FeedBackProps, FormFieldProps} from '../types';
import '../../main.css';
import {LabeledFormField} from './fieldComponents/FormField';

export type TextInputProps = {
	disabled?: boolean,
	length?: 2 | 3 | 4 | 5,
	feedback?: FeedBackProps
} & BaseInputProps
export const TextInput = ({label, feedback, description, disabled, length}: TextInputProps) => {
	const inputClasses = ['o3-form', 'o3-form-text-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}
	if(length) {
		inputClasses.push(`o3-form-text-input--short-${length}`)
	}
	return (
		<LabeledFormField label={label} feedback={feedback} description={description}>
			<input disabled={disabled} className={inputClasses.join(' ')} maxLength={length}
						 type="text"
			/>
		</LabeledFormField>
	);
};

