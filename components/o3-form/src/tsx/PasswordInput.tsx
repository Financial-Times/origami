import {PasswordInputProps} from '../types/index';
import {LabeledFormField} from './fieldComponents/FormField';
import {CheckBoxItem} from './CheckBox';

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
				inputId={inputId}
				optional={optional}>
				<input
					{...attributes}
					id={inputId}
					disabled={disabled}
					className={inputClasses.join(' ')}
					required={!optional}
					aria-required={!optional}
					type="password"
				/>
			</LabeledFormField>
			<div className="o3-password-input__controls">
				<CheckBoxItem
					attributes={{disabled}}
					inputId="showPassword"
					checkboxLabel="Show Password"
				/>
				{!disabled && <a href="">Forgot password?</a>}
			</div>
		</>
	);
};
