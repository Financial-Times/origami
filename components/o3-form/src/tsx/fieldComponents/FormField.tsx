import {uidBuilder} from '@financial-times/o-utils';
import {Feedback} from './Feedback';

import type {FormFieldProps, FormFieldsetProps} from '../../types';

const uniqueId = uidBuilder('o3-form');

export const LabeledFormField = ({
	inputId,
	label,
	description,
	feedback,
	children,
	optional,
}: FormFieldProps) => {
	const id = inputId || uniqueId('input_');
	const descriptionId = description ? uniqueId('description_') : undefined;
	const labelClasses = ['o3-form-field__label'];
	if (optional) {
		labelClasses.push('o3-form-field--optional');
	}
	return (
		<div className="o3-form-field">
			<label className={labelClasses.join(' ')} htmlFor={id}>
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
	description,
	feedback,
	children,
	optional,
}: FormFieldProps) => {
	const descriptionId = description ? uniqueId('description_') : undefined;
	const labelId = uniqueId('label_');
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
}: FormFieldsetProps) => {
	const descriptionId = uniqueId('checkbox_');
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
