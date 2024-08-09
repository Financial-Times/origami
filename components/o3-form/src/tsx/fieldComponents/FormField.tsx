import type {FormFieldProps} from '../../types';

import {Feedback} from './Feedback';

export const FormField = ({
	label,
	description,
	feedback,
	labelId,
	children,
}: FormFieldProps) => {
	return (
		<div>
			<label htmlFor={labelId}>{label}</label>
			{description && <span>{description}</span>}
			{children}
			{feedback && <Feedback {...feedback} />}
		</div>
	);
};


