import {TitledFormField, FormFieldset} from './fieldComponents/FormField';
import type {CheckBoxProps, FormFieldsetProps} from '../types/index';

export const CheckBoxItem = (props: CheckBoxProps) => {
	let {inputId, attributes, optional, error} = props;

	const classNames = ['o3-form-input__checkbox-input', 'o3-visually-hidden'];

	if (error) {
		classNames.push('o3-form-input-error');
	}

	return (
		<div className="o3-form-input__checkbox">
			<input
				{...attributes}
				type="checkbox"
				id={inputId}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
			/>
			<label htmlFor={inputId} className="o3-form-input__checkbox-label">
				{props.checkboxLabel}
			</label>
		</div>
	);
};

export const CheckBox = (props: CheckBoxProps) => {
	const newProps = {
		...props,
		labelId: props.inputId,
		descriptionId: props.inputId,
	};
	return (
		<TitledFormField {...newProps}>
			<CheckBoxItem {...newProps}> </CheckBoxItem>
		</TitledFormField>
	);
};

export const CheckBoxGroup = (props: FormFieldsetProps) => {
	const {children, ...restProps} = props;

	return (
		<FormFieldset {...restProps}>
			{(children as JSX.Element[]).map(child => {
				const hasError = props.feedback?.errorElementIds?.includes(
					child.props.inputId
				);

				return (
					<CheckBoxItem
						{...child.props}
						error={hasError}
						key={child.props.inputId}
					/>
				);
			})}
		</FormFieldset>
	);
};