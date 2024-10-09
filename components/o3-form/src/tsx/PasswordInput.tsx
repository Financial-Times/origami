import {FormFieldProps, TextInputProps} from '../types/index';
import '../../main.css';
import {LabeledFormField} from './fieldComponents/FormField';
import {CheckBoxItem} from './CheckBox';

interface PasswordInputProps extends FormFieldProps {
	disabled?: boolean,
}

export const PasswordInput = ({
																label,
																feedback,
																description,
																disabled,
																attributes,
																inputId,
																optional,
															}: PasswordInputProps) => {
	const inputClasses = ['o3-form', 'o3-form-text-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}
	return (
		<>
			<LabeledFormField
				label={label}
				feedback={feedback}
				description={description}
				inputId={inputId}>
				<input
					{...attributes}
					id={inputId}
					disabled={disabled}
					className={inputClasses.join(' ')}
					required={optional}
					aria-required={optional}
					type="password"
				/>
			</LabeledFormField>
			<div className="o3-password-input__controls">
				<CheckBoxItem attributes={{disabled}} inputId="showPassword" checkboxLabel="Show Password" />
				<a href="">Forgot password?</a>
			</div>
		</>
	);
};
