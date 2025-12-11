import {uidBuilder} from '@financial-times/o-utils';
import {FileInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';

const uniqueId = uidBuilder('o3-form-file-input');

export const FileInput = ({
							  label,
							  feedback,
							  description,
							  disabled,
							  attributes,
							  inputId,
							  optional,
						  }: FileInputProps) => {
	const id: string = inputId || uniqueId('_');
	const inputClasses = ['o3-form', 'o3-form-file-input'];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-file--error');
	}

	return (
		<LabeledFormField
			label={label}
			feedback={feedback}
			description={description}
			inputId={id}
			optional={optional}>
			<>
				<div className="o3-form-file-input">
					<label for={id} className="o3-button o3-button--primary o3-button-icon o3-button-icon--upload">
						File Upload
					</label>
					<input
						{...attributes}
						id={id}
						disabled={disabled}
						className={inputClasses.join(' ')}
						required={!optional}
						aria-required={!optional}
						maxLength={length}
						type="file"
					/>
				</div>
			</>
		</LabeledFormField>
	);
};
