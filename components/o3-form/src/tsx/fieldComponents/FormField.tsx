import type {FormFieldProps} from '../../types';

import {Feedback} from './Feedback';

export const FormField = ({
	label,
	labelId,
	description,
	descriptionId,
	feedback,
	id: inputId,
	children,
	optional = false,
	type = undefined,
}: FormFieldProps) => {
	return (
		<div className="o3-form-field">
			{type === 'checkbox' || type === 'radio-button' ? (
				<span className="o3-form-title" id={labelId}>
					{label}
					{optional && <span className="o3-form-optional-label">optional</span>}
				</span>
			) : (
				<label htmlFor={inputId}>
					{label}
					{optional && <span className="o3-form-optional-label">optional</span>}
				</label>
			)}
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
