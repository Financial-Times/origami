import type {FormFieldProps} from '../../types';

import {Feedback} from './Feedback';

export const FormField = ({
														label,
														description,
														feedback,
														inputAttributes,
														labelId,
													}: FormFieldProps) => {
	return (
		<div>
			<label htmlFor={labelId}>{label}</label>
			{description && <span>{description}</span>}
			<input {...inputAttributes} />
			{feedback && <Feedback {...feedback} />}
		</div>
	);
};
