import {FormFieldset} from './fieldComponents/FormField';
import type {RadioButtonProps, FormFieldsetProps} from '../types/index';

export const RadioButtonItem = (props: RadioButtonProps) => {
	let {inputId, attributes, optional, error} = props;

	const classNames = [
		'o3-form-input__radio-button-input',
		'o3-visually-hidden',
	];

	if (error) {
		classNames.push('o3-form-input-error');
	}

	return (
		<div className="o3-form-input__radio-button">
			<input
				{...attributes}
				type="radio"
				id={inputId}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
				name="test"
			/>
			<label htmlFor={inputId} className="o3-form-input__radio-button-label">
				{props.radioButtonLabel}
			</label>
		</div>
	);
};

export const RadioButtonGroup = (props: FormFieldsetProps) => {
	const {children, ...restProps} = props;
	// generate random name for radio group
	const radioGroupName = Math.random().toString(36).substring(7);
	return (
		<FormFieldset {...restProps}>
			{(children as JSX.Element[]).map(child => {
				const hasError = props.feedback?.errorElementIds?.includes(
					child.props.inputId
				);

				return (
					<RadioButtonItem
						{...child.props}
						error={hasError}
						key={child.props.inputId}
						attributes={{
							...child.props.attributes,
							name: radioGroupName
						}}
					/>
				);
			})}
		</FormFieldset>
	);
};
