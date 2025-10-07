import {uidBuilder} from '@financial-times/o-utils';
import {TitledFormField, FormFieldset} from './fieldComponents/FormField';
import type {CheckBoxProps, FormFieldsetProps} from '../types/index';
import {Children, cloneElement, isValidElement, ReactElement} from 'react';

const uniqueId = uidBuilder('o3-form-checkbox-input');

export const CheckBoxItem = (props: CheckBoxProps) => {
	let {inputId, checkboxDescription, attributes, optional, error} = props;

	if (!inputId) {
		inputId = uniqueId('_');
	}

	const classNames = ['o3-form-input-checkbox__input', 'o3-visually-hidden'];

	if (error) {
		classNames.push('o3-form-input-error');
	}

	return (
		<div className="o3-form-input-checkbox">
			<input
				{...attributes}
				type="checkbox"
				id={inputId}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
			/>
			<label htmlFor={inputId} className="o3-form-input-checkbox__label">
				<span>
					{props.checkboxLabel}
					{checkboxDescription && (
						<span className="o3-form-input-checkbox__description">
							{checkboxDescription}
						</span>
					)}
				</span>
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
			<CheckBoxItem
				{...newProps}
				checkboxDescription={props.checkboxDescription}></CheckBoxItem>
		</TitledFormField>
	);
};

export const CheckBoxGroup = (props: FormFieldsetProps) => {
	const {children, ...restProps} = props;

	const childElements = Children.toArray(children).filter(
		(c): c is ReactElement => isValidElement(c)
	);

	return (
		<FormFieldset {...restProps}>
			{childElements.map((child, i) => {
				const inputId = child.props?.inputId;
				const hasError = !!props.feedback?.errorElementIds?.includes?.(inputId);

				return cloneElement(child, {
					key: child.key ?? inputId ?? i,
					error: hasError,
				});
			})}
		</FormFieldset>
	);
};
