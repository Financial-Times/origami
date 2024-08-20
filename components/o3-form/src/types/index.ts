// Base Input Props
export type BaseInputProps = {
	inputId?: string;
	label?: string;
	description?: string;
	optional?: boolean;
	error?: boolean;
	attributes?: JSX.IntrinsicElements['input'];
};

// CheckBox specific props
export interface CheckBoxProps extends BaseInputProps {
	inputId: string;
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
}

export type FeedbackProps = {
	errorElementIds?: string[];
	message: string;
	type: 'error';
};
