import type {
	FormFieldProps,
	FeedBackProps,
	CheckBoxProps,
} from '../types/index';

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
			{feedback && <FeedBack {...feedback} />}
		</div>
	);
};

export const FeedBack = ({message, type}: FeedBackProps) => {
	return <div className={`feedback ${type}`}>{message}</div>;
};

export const CheckBox = ({id, label, checked, error}: CheckBoxProps) => {
	return (
		<FormField
			label={label}
			labelId={id}
			inputAttributes={{
				type: 'checkbox',
				id,
				checked,
				className: error ? 'error' : '',
			}}
		/>
	);
};
