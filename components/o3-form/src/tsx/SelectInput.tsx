import {SelectInputProps} from '../types/index';
import {LabeledFormField} from './fieldComponents/FormField';

export const SelectInput = ({
	label,
	feedback,
	description,
	disabled,
	attributes,
	inputId,
	optional,
	children,
	length,
}: SelectInputProps) => {
	const inputClasses = ['o3-form', 'o3-form-select-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-select-input--error');
	}

	return (
		<LabeledFormField
			label={label}
			feedback={feedback}
			description={description}
			inputId={inputId}
			optional={optional}>
			<div
				className={`o3-form-select-input__container ${
					length ? `o3-form-select-input--short-${length}` : ''
				}`}>
				<select
					{...attributes}
					id={inputId}
					disabled={disabled}
					className={inputClasses.join(' ')}
					required={!optional}
					aria-required={!optional}>
					{children}
				</select>
			</div>
		</LabeledFormField>
	);
};
