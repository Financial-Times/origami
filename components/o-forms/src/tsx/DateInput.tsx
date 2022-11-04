import uniqueId from 'lodash.uniqueid';
import {getInputClasses} from '../utils/classBuilder';
import {InputProps, FormError, FormFieldset, TypeFormField} from './Form';

type onChange = {
	days: Function;
	months: Function;
	years: Function;
};

type ref = {
	days: any;
	months: any;
	years: any;
};

type values = {
	days: string;
	months: string;
	years: string;
};

interface DateInputProps extends TypeFormField, InputProps {
	values?: values;
	onChange?: onChange;
	ref?: ref;
	errorMessage?: string;
}

export function DateInput({
	values,
	onChange,
	ref,
	required,
	disabled,
	errorMessage,
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
}: DateInputProps) {
	const fieldProps = {
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
	};
	const dayId = uniqueId('day_');
	const monthId = uniqueId('month_');
	const yearId = uniqueId('year_');
	return (
		<FormFieldset {...fieldProps}>
			<span
				className={getInputClasses({
					errorMessage,
					inlineInput: inlineField,
					inputType: 'date',
				})}>
				<label htmlFor={dayId}>
					<input
						id={dayId}
						type="text"
						name="date"
						value={values?.days}
						className="o-forms-input__day-part"
						inputMode="numeric"
						pattern="0[1-9]|[12]\d|3[01]"
						disabled={disabled}
						required={required}
						onChange={onChange ? event => onChange?.days(event) : null}
						ref={ref?.days}
					/>

					<span className="o-forms-input__label"> DD </span>
				</label>
				<label htmlFor={monthId}>
					<input
						id={monthId}
						type="text"
						name="date"
						value={values?.months}
						pattern="0?[1-9]|1[012]"
						disabled={disabled}
						required={required}
						onChange={onChange ? event => onChange?.months(event) : null}
						ref={ref?.months}
					/>

					<span className="o-forms-input__label"> MM </span>
				</label>
				<label htmlFor={yearId}>
					<input
						id={yearId}
						type="text"
						name="date"
						value={values?.years}
						pattern="[0-9]{4}"
						disabled={disabled}
						required={required}
						onChange={onChange ? event => onChange?.years(event) : null}
						ref={ref?.years}
					/>
					<span className="o-forms-input__label"> YYYY </span>
				</label>
				{errorMessage && <FormError errorMessage={errorMessage} />}
			</span>
		</FormFieldset>
	);
}
