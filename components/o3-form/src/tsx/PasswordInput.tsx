import {PasswordInputProps} from '../types';
import {LabeledFormField} from './fieldComponents/FormField';
import {PasswordInputToggle as PasswordInputToggleController} from './PasswordInputToggle';
import {useEffect, useRef} from 'react';

export const PasswordInput = ({
	label,
	feedback,
	description,
	disabled,
	attributes,
	inputId,
	optional,
	forgotPasswordLink,
}: PasswordInputProps) => {

	let inputRef = useRef<HTMLInputElement | null>(null);
	let buttonRef = useRef<HTMLButtonElement | null>(null);
	let toggleRef = useRef<InstanceType<
		typeof PasswordInputToggleController
	> | null>(null);

	const inputClasses = [
		'o3-form',
		'o3-form-text-input',
		'o3-form-text-input--password',
	];

	if (feedback && feedback.type === 'error') {
		inputClasses.push('o3-form-text-input--error');
	}

	useEffect(() => {
		const inputEl = inputRef.current;
		const btnEl = buttonRef.current;
		if (!inputEl || !btnEl) return;

		toggleRef.current = new PasswordInputToggleController(inputEl, {
			toggleButtonId: btnEl.id,
		});

		return () => {
			toggleRef.current = null;
		};
	}, []);

	return (
		<>
			<LabeledFormField
				label={label}
				feedback={feedback}
				description={description}
				labelsElement={inputId}
				optional={optional}>
				<div className="o3-password-input__container">
					<input
						{...attributes}
						id={inputId}
						ref={inputRef}
						disabled={disabled}
						data-testid="o3-password-input"
						className={inputClasses.join(' ')}
						required={!optional}
						type="password"
						aria-required={!optional}
					/>
					<button
						id="o3-form-password-toggle"
						className="o3-password-input__show-password-toggle o3-password-input__show-password-toggle--show"
						ref={buttonRef}
						data-testid="o3-password-input-toggle"
						aria-controls={inputId}
						aria-label={'Show password'}
						title={'Show password'}
						onClick={() => {
							toggleRef.current?.toggle();
						}}
					/>
				</div>
			</LabeledFormField>
			<div className="o3-password-input__controls">
				{!disabled && forgotPasswordLink && (
					<a className="o3-typography-link" href={forgotPasswordLink}>
						Forgot password?
					</a>
				)}
			</div>
		</>
	);
};
