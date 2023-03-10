import {getInputClasses} from '../utils';
import {FormError, InputProps, TypeFormField, FormField} from './Form';
import {uidBuilder} from "@financial-times/o-utils/uniqueid";
const uniqueId = uidBuilder('o-forms');

interface TypeFileInput extends InputProps {
	highlightValid?: boolean;
	errorMessage?: string;
	accept?: string;
	capture?: boolean | 'user' | 'environment';
	multiple?: boolean;
	additionalAttributes?: Record<string, string | boolean>;
}

export interface FileInputProps extends TypeFileInput, TypeFormField {
}

export function FileInput({
							  title,
							  description,
							  isOptional,
							  inlineField,
							  isVerticalCenter,
							  name,
							  highlightValid,
							  errorMessage,
							  required,
							  disabled,
							  additionalAttributes,
						  }: FileInputProps) {
	const id = uniqueId('labelledby_');
	const inputProps = {
		id,
		name,
		highlightValid,
		errorMessage,
		required,
		disabled,
		...additionalAttributes
	};
	const fieldProps = {
		id,
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
	};

	return (
		<FormField {...fieldProps}>
			<PrivateFileInput {...inputProps} />
		</FormField>
	);
}

interface PrivateFileInputProps extends TypeFileInput {
	id: string;
}

function PrivateFileInput({
							  id,
							  name,
							  highlightValid,
							  errorMessage,
							  required,
							  disabled,
							  accept,
							  capture,
							  multiple,
							  additionalAttributes
						  }: PrivateFileInputProps) {
	return (
		<span
			className={getInputClasses({
				highlightValid,
				errorMessage,
				inputType: 'file',
			})}>
			<input
				id={id}
				type="file"
				name={name}
				required={required}
				disabled={disabled}
				accept={accept}
				capture={capture}
				multiple={multiple}
				{...additionalAttributes}
			/>
			{errorMessage && <FormError errorMessage={errorMessage}/>}
		</span>
	);
}
