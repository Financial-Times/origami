import type {ErrorSummaryProps} from '../../../../types/index';

export const ErrorSummary = ({
	errors,
	errorMessage = 'Please correct these errors and try again.',
}: ErrorSummaryProps) => {
	return (
		<div className="o3-form__error-summary">
			<span className="o3-form__error-summary-icon"></span>
			<div
				className="o3-form__error-summary__heading"
				role="alert"
				aria-labelledby="error-summary-title">
				<span id="error-summary-title" className="o3-typography-heading5">
					{errorMessage}
				</span>
				<ul className="o3-forms__error-summary__list o3-typography-body-small">
					{errors.map(({id, fieldName, message}) => (
						<li key={id}>
							<a className="o3-typography-link" href={`#${id}`}>
								{fieldName}
							</a>
							<span>: {message}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
