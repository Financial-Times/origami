export type FormFieldProps = {
	label: string;
	labelId: string;
	description?: string;
	feedback?: FeedBackProps;
	// children: React.ReactElement<any, 'input'>;
	// children: JSX.Element & JSX.IntrinsicElements['input'];
	inputAttributes: JSX.IntrinsicElements['input'];
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
};

export type PasswordInputProps = Omit<FormFieldProps, 'children'>;
