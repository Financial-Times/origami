import {uidBuilder} from '@financial-times/o-utils';
import {SelectInputProps} from '../../../../types/index';
import {LabeledFormField} from './fieldComponents/FormField';

const uniqueId = uidBuilder('o3-form-select-input');

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
	const id = inputId || uniqueId('_');
	const inputClasses = ['o3-form', 'o3-form-select-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-select-input--error');
	}

	return (
		<LabeledFormField
			label={label}
			feedback={feedback}
			description={description}
			inputId={id}
			optional={optional}>
			<div
				className={`o3-form-select-input__container ${
					length ? `o3-form-select-input--short-${length}` : ''
				}`}>
				<select
					{...attributes}
					id={id}
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
