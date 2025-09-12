// Base Input Props
export type BaseInputProps = {
	inputId?: string;
	label?: string;
	description?: string;
	optional?: boolean;
	error?: boolean;
	attributes?: JSX.IntrinsicElements['input'];
};

export interface TextInputProps extends BaseInputProps {
	disabled?: boolean;
	length?: 2 | 3 | 4 | 5;
	feedback?: FeedbackProps;
}

export interface PasswordInputProps extends BaseInputProps {
	disabled?: boolean;
	feedback?: FeedbackProps;
}

export interface CheckBoxProps extends BaseInputProps {
	inputId: string;
	checkboxLabel: string; // Label specifically for the checkbox
	feedback?: FeedbackProps;
	checkboxDescription?: string;
}

export interface RadioButtonProps extends BaseInputProps {
	inputId: string;
	radioButtonLabel: string; // Label specifically for the radio button.
}
export interface FormFieldsetProps {
	label: string;
	description?: string;
	children: React.JSX.Element | React.JSX.Element[];
	feedback?: FeedbackProps;
	optional?: boolean;
}

export interface FormFieldProps extends BaseInputProps {
	feedback?: FeedbackProps;
	children: React.JSX.Element & JSX.IntrinsicElements['input'];
}

export type FeedbackProps = {
	errorElementIds?: string[];
	message: string;
	type: 'error';
};

export type ErrorSummaryProps = {
	errorMessage?: string;
	errors: {
		id: string;
		fieldName: string;
		message: string;
	}[];
};
