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
	optional = false,
}: FormFieldProps) => {
	const id = inputId || uniqueId('input_');
	const descriptionId = description ? uniqueId('description_') : undefined;
	return (
		<div className="o3-form-field">
			<label className="o3-form-field__label" htmlFor={id}>
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
	optional = false,
}: FormFieldProps) => {
	const descriptionId = description ? uniqueId('description_') : undefined;
	const labelId = uniqueId('label_');
	return (
		<div className="o3-form-field">
			<span className="o3-form-field__title" id={labelId}>
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
}: FormFieldsetProps) => {
	const descriptionId = uniqueId('checkbox_');
	return (
		<fieldset className="o3-form-field" aria-describedby={`${descriptionId}`}>
			<legend className="o3-form-field__legend ">{label}</legend>
			{description && (
				<span className="o3-form-input__description" id={descriptionId}>
					{description}
				</span>
			)}
			{children}
			{feedback && <Feedback {...feedback} />}
		</fieldset>
	);
};
