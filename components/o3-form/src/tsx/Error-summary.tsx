import type {ErrorSummaryProps} from '../types/index';

export const ErrorSummary = ({
	errors,
	errorMessage = 'Please correct these errors and try again.',
}: ErrorSummaryProps) => {

	return (
		<div className='o3-form__error-summary'>
			<span>
				{/* SVG needs to be a token as well */}
				<svg
					width="14"
					height="21"
					viewBox="0 0 14 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14 11C14 14.866 10.866 18 7 18C3.13401 18 0 14.866 0 11C0 7.13401 3.13401 4 7 4C10.866 4 14 7.13401 14 11Z"
						fill="#CC0000"
					/>
					<rect x="3" y="9.5" width="8" height="3" fill="white" />
				</svg>
			</span>
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
							<a href={`#${id}`}>{fieldName}</a>
							<span>: {message}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
