import {uidBuilder} from '@financial-times/o-utils';
import {Feedback} from './Feedback';

import type {FormFieldProps, FormFieldsetProps} from '../../types';

const uniqueId = uidBuilder('o3-form');

export const FormField = ({
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
			<label htmlFor={id}>
				{label}
				{optional && <span className="o3-form-optional-label">optional</span>}
			</label>

			{description && (
				<span className="o3-form-input-description" id={descriptionId}>
					{description}
				</span>
			)}
			{children}
			{feedback && <Feedback {...feedback} />}
		</div>
	);
};

export const FormFieldCheckboxRadioButton = ({
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
			<span className="o3-form-title" id={labelId}>
				{label}
				{optional && <span className="o3-form-optional-label">optional</span>}
			</span>
			{description && (
				<span className="o3-form-input-description" id={descriptionId}>
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
	const labelId = uniqueId('checkbox_');
	const descriptionId = uniqueId('checkbox_');
	return (
		<fieldset
			className="o3-form-field"
			aria-labelledby={`${labelId} ${descriptionId}`}>
			<legend id={labelId}>{label}</legend>
			{description && (
				<span className="o3-form-input-description" id={descriptionId}>
					{description}
				</span>
			)}
			{children}
			{feedback && <Feedback {...feedback} />}
		</fieldset>
	);
};
