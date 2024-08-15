
// Base Input Props
export type BaseInputProps = {
	inputId?: string;
	label?: string;
	description?: string;
	optional?: boolean;
	error?: string;
	attributes?: JSX.IntrinsicElements['input'];
};

// CheckBox specific props
export interface CheckBoxProps extends BaseInputProps {
	checkboxLabel: string; // Label specifically for the checkbox
}

// FieldSet props
export interface FormFieldsetProps {
	label: string;
	description?: string;
	children: JSX.Element | JSX.Element[];
	feedback?: FeedbackProps;
}

export interface FormFieldProps extends BaseInputProps {
	feedback?: FeedbackProps;
	children: JSX.Element & JSX.IntrinsicElements['input'];
	type?: 'checkbox' | 'radio-button';
}

export type FeedbackProps = {
	message: string;
	type: 'error';
};
