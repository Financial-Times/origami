
// Base Input Props
export type BaseInputProps = {
	inputId?: string;
	label?: string;
	description?: string;
	optional?: boolean;
	error?: boolean;
	attributes?: JSX.IntrinsicElements['input'];
};

export interface TextInputProps extends FormFieldProps{
	disabled?: boolean,
	length?: 2 | 3 | 4 | 5,
	feedback?: FeedBackProps
};
// FieldSet props
export interface FormFieldsetProps {
	label: string;
	description?: string;
	error?: string;
	children: JSX.Element | JSX.Element[];
	feedback?: FeedBackProps;
}

export interface FormFieldProps extends BaseInputProps {
	feedback?: FeedBackProps;
	children: JSX.Element & JSX.IntrinsicElements['input'];
}

export interface FormFieldsetProps {
	label: string;
	description?: string;
	error?: string;
	children: JSX.Element | JSX.Element[];
}

export type FeedBackProps = {
	message: string;
	type: 'error';
};
