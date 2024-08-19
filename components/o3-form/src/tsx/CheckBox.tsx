import {FormField, FormFieldset} from './fieldComponents/FormField';
import type {CheckBoxProps, FormFieldsetProps} from '../types';
import React from 'react';

export const CheckBoxItem = (props: CheckBoxProps) => {
	let {inputId, attributes, optional, feedback} = props;

	const classNames = ['o3-form-input__checkbox-input', 'o3-visually-hidden'];

	if (feedback?.type === 'error' && feedback.checkboxIds?.includes(inputId)) {
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
		<FormField {...newProps} type="checkbox">
			<CheckBoxItem {...newProps}> </CheckBoxItem>
		</FormField>
	);
};

export const CheckBoxGroup = (props: FormFieldsetProps) => {
	const {children, ...restProps} = props;

	return (
		<FormFieldset {...restProps}>
			{React.Children.map(children, child =>
				// Makes restProps available to all children
				React.cloneElement(child, restProps)
			)}
		</FormFieldset>
	);
};
