import {Feedback} from './Feedback';

import type {FormFieldProps, FormFieldsetProps} from '../../types';

export const LabeledFormField = ({
	label,
	labelsElement,
	description,
	feedback,
	children,
	optional,
}: FormFieldProps) => {
	const descriptionId = description ? `description_${labelsElement}` : undefined;
	const labelId = `label_${labelsElement}`;
	const labelClasses = ['o3-form-field__label'];
	if (optional) {
		labelClasses.push('o3-form-field--optional');
	}
	return (
		<div className="o3-form-field">
			<label className={labelClasses.join(' ')} id={labelId} htmlFor={labelsElement}>
				{label}
			</label>

			{description && (
				<span className="o3-form-input__description" id={descriptionId}>
					{description}
				</span>
			)}
			{children}
			{feedback && <Feedback {...feedback} />}
		</div>
	);
};

export const TitledFormField = ({
	label,
	labelsElement,
	description,
	feedback,
	children,
	optional,
}: FormFieldProps) => {
	const descriptionId = description ? `description_${labelsElement}` : undefined;
	const labelId = `label_${labelsElement}`;
	const labelClasses = ['o3-form-field__title'];
	if (optional) {
		labelClasses.push('o3-form-field--optional');
	}
	return (
		<div className="o3-form-field">
			<span className={labelClasses.join(' ')} id={labelId}>
				{label}
			</span>
			{description && (
				<span className="o3-form-input__description" id={descriptionId}>
					{description}
				</span>
			)}
			{children}
			{feedback && <Feedback {...feedback} />}
		</div>
	);
};

export const FormFieldset = ({
	label,
	description,
	feedback,
	children,
	optional,
	inputId
}: FormFieldsetProps) => {
	const descriptionId = `checkbox_${inputId}`;
	const labelClasses = ['o3-form-field__legend'];
	if (optional) {
		labelClasses.push('o3-form-field--optional');
	}
	return (
		<fieldset className="o3-form-field" aria-describedby={`${descriptionId}`}>
			<legend className={labelClasses.join(' ')}>
				{label}{' '}
				{description && (
					<span className="o3-form-input__description" id={descriptionId}>
						{description}
					</span>
				)}
			</legend>

			{children}
			{feedback && <Feedback {...feedback} />}
		</fieldset>
	);
};
