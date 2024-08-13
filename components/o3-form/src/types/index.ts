type FormField = {
	id: string;
	label: string;
	optional: boolean;
	description?: string;
	feedback?: FeedBackProps;
	type?: 'checkbox' | 'radio-button';
};

export type FormFieldProps = FormField & {
	children: JSX.Element & JSX.IntrinsicElements['input'];
};

export type FeedBackProps = {
	message: string;
	type: 'error';
};

export type CheckBoxProps = FormField & {
	error: boolean;
	checkBoxLabel: string;
	attributes?: JSX.IntrinsicElements['input']
};

export type PasswordInputProps = FormField;
