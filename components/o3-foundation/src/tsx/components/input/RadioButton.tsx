import {uidBuilder} from '@financial-times/o-utils';
import type {
	FormFieldsetProps,
	RadioButtonProps,
} from '../../../../types/index';
import {FormFieldset} from './fieldComponents/FormField';

const uniqueId = uidBuilder('o3-form-radio-button-input');

export const RadioButtonItem = (props: RadioButtonProps) => {
	let {inputId, attributes, optional, error} = props;
	if (!inputId) {
		inputId = uniqueId('_');
	}
	const classNames = ['o3-form-input-radio-button', 'o3-visually-hidden'];

	if (error) {
		classNames.push('o3-form-input-error');
	}

	return (
		<div>
			<input
				{...attributes}
				type="radio"
				id={inputId}
				className={classNames.join(' ')}
				required={!optional}
				aria-required={!optional}
			/>
			<label htmlFor={inputId} className="o3-form-input-radio-button__label">
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
			{(children as React.JSX.Element[]).map(child => {
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
							name: radioGroupName,
						}}
					/>
				);
			})}
		</FormFieldset>
	);
};
