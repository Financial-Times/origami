import type {FormFieldProps} from '../types';
import '../../main.css';
import {FormField} from './fieldComponents/FormField';

export type TextInputProps = {
	disabled?: boolean,
	length?: 2 | 3 | 4 | 5
} & FormFieldProps
export const TextInput = ({label, feedback, description, labelId, disabled, length}: TextInputProps) => {
	const inputClasses = ['o3-form', 'o3-form-text-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}
	if(length) {
		inputClasses.push(`o3-form-text-input--short-${length}`)
	}
	return (
		<FormField label={label} labelId={labelId} feedback={feedback} description={description}>
			<input disabled={disabled} className={inputClasses.join(' ')} maxLength={length}
						 type="text"
			/>
		</FormField>
	);
};

