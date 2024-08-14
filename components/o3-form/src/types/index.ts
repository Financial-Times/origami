export type FormFieldProps = {
	label: string;
	labelId: string;
	description?: string;
	feedback?: FeedBackProps;
	children?: JSX.Element & JSX.IntrinsicElements['input'];
};

export type FeedBackProps = {
	message: string;
	type: 'error';
};

export type CheckBoxProps = {
	id: string;
	label: string;
	checked: boolean;
	error: boolean;
	feedBack: FeedBackProps;
};

export type PasswordInputProps = Omit<FormFieldProps, 'children'>;
