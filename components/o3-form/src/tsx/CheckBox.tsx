import type {CheckBoxProps} from '../types';
import {FormField} from './fieldComponents/FormField';

export const CheckBox = ({optional = false, ...props}: CheckBoxProps) => {
	const {id, attributes, error} = props;
	const classNames = ['o3-form-input__checkbox'];

	if (error || props?.feedback?.type == 'error') {
		classNames.push('o3-form-input-error');
	}

	return (
		<FormField {...props} optional={optional} type="checkbox">
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
		</FormField>
	);
};


export const CheckBoxGroup = {}
