import type {CheckBoxProps} from '../types';
import {FormField} from './fieldComponents/FormField';

export const CheckBox = ({id, label, checked, error}: CheckBoxProps) => {
	return (
		<FormField
			label={label}
			labelId={id}
			inputAttributes={{
				type: 'checkbox',
				id,
				checked,
				className: error ? 'error' : '',
			}}
		/>
	);
};
