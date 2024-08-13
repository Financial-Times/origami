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
	const classNames = ['o3-form-input__checkbox'];

	if (error || props?.feedback?.type == 'error') {
		classNames.push('o3-form-input-error');
	}

	return (
		<div>
			<input
				{...attributes}
				type="checkbox"
				id={id}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
			/>
			<label htmlFor={id}>{props.checkBoxLabel}</label>
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
			<div>{props.children}</div>
		</FormField>
	);
};
