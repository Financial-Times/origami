import {uidBuilder} from '@financial-times/o-utils';

import {FormField, FormFieldset} from './fieldComponents/FormField';

import type {
	CheckBoxProps,
	FormFieldsetProps,
} from '../types';

const uniqueId = uidBuilder('o3-form');

export const CheckBoxItem = (props: CheckBoxProps) => {
	let {inputId, attributes, error, optional} = props;

	if (!inputId) {
		inputId = uniqueId('checkbox-input_');
	}

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
		labelId: uniqueId('checkbox_'),
		descriptionId: uniqueId('checkbox_'),
		inputId: uniqueId('checkbox_'),
	};
	return (
		<FormField {...newProps} type="checkbox">
			<CheckBoxItem {...newProps}> </CheckBoxItem>
		</FormField>
	);
};

export const CheckBoxGroup = (props: FormFieldsetProps) => {
	return <FormFieldset {...props}>{props.children}</FormFieldset>;
};
