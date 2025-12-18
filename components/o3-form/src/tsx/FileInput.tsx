import {uidBuilder} from '@financial-times/o-utils';
import {FileInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';
import {ChangeEvent, useState} from "react";

const uniqueId = uidBuilder('o3-form-file-input');

export const FileInput = ({
							  label,
							  feedback,
							  description,
							  disabled,
							  attributes,
							  inputId,
							  optional,
							  isUploading
						  }: FileInputProps) => {
	const id: string = inputId || uniqueId('_');
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0] ?? null);
		setFileName(event.target.value ?? null);
	};

	const onReset = () => {
		setFile(null);
		setFileName(null)
	}

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
				<div className={inputClasses.join(' ')}>
					<label htmlFor={id} className="o3-form-file-input__label">
						<span
							className="o3-form-file-input__label__button o3-button o3-button--primary o3-button-icon o3-button-icon--upload">
							File Upload
						</span>
						<span data-testid="file-input-label"
							  className="o3-form-file-input__label__text">{fileName ? fileName : "No file chosen"}</span>
					</label>
					<input
						{...attributes}
						id={id}
						className="o3-form-file-input__input-field"
						disabled={disabled}
						required={!optional}
						onChange={onUpload}
						aria-required={!optional}
						maxLength={length}
						type="file"
					/>
					{file && <button
						type="button"
						className="o3-form-field-input__destroy"
						aria-label="Delete file"
						onClick={onReset}
					/>}
				</div>
				{isUploading && <span className='o3-form-file-input__uploading'>Uploading</span>}
			</>
		</LabeledFormField>
	);
};
