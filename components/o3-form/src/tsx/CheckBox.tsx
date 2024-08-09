import type {CheckBoxProps} from '../types';
import {FormField} from './fieldComponents/FormField';

export const CheckBox = ({id, label, checked, error, feedBack}: CheckBoxProps) => {
	return (
		<FormField label={label} labelId={id} feedback={feedBack}>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				className={error ? 'o3-form-input-error' : ''}
			/>
		</FormField>
	);
};

