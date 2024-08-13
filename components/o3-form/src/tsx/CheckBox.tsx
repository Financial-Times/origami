import type {
	CheckBoxItemProps,
	CheckBoxProps,
	CheckBoxGroupProps,
} from '../types';
import {FormField} from './fieldComponents/FormField';

export const CheckBoxItem = ({
	optional = false,
	...props
}: CheckBoxItemProps) => {
	const {id, attributes, error} = props;
	const classNames = ['o3-form-input__checkbox-input'];

	if (error || props?.feedback?.type == 'error') {
		classNames.push('o3-form-input-error');
	}

	return (
		<div className="o3-form-input__checkbox">
			<input
				{...attributes}
				type="checkbox"
				id={id}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
			/>
			<label htmlFor={id} className="o3-form-input__checkbox-label">
				{props.checkBoxLabel}
			</label>
		</div>
	);
};

export const CheckBox = ({optional = false, ...props}: CheckBoxProps) => {
	return (
		<FormField {...props} optional={optional} type="checkbox">
			<CheckBoxItem {...props}> </CheckBoxItem>
		</FormField>
	);
};

export const CheckBoxGroup = ({
	optional = false,
	...props
}: CheckBoxGroupProps) => {
	return (
		<FormField {...props} optional={optional} type="checkbox">
			<div
				role="group"
				aria-labelledby={props.labelId}
				aria-describedby={props.descriptionId}>
				{props.children}
			</div>
		</FormField>
	);
};
