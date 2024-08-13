type FormField = {
	id: string;
	label: string;
	labelId: string;
	optional: boolean;
	description?: string;
	descriptionId?: string;
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

export type CheckBoxItemProps = {
	id: string;
	attributes?: JSX.IntrinsicElements['input'];
	error?: boolean;
	checkBoxLabel: string;
	feedback?: FeedBackProps;
	optional?: boolean;
};

export type CheckBoxProps = FormField & CheckBoxItemProps;

export type CheckBoxGroupProps = FormField & {
	children: JSX.Element | JSX.Element[]
};

export type PasswordInputProps = FormField;
