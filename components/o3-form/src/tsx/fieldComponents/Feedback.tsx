import type {FeedbackProps} from '../../types';

export const Feedback = ({message, type}: FeedbackProps) => {
	return (
		<div className={`o3-form-feedback o3-form-feedback__${type}`}>
			{type === 'error' ? (
				<svg
					width="14"
					height="15"
					viewBox="0 0 14 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						id="Error"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12.5 7.5C12.5 10.5376 10.0376 13 7 13C3.96243 13 1.5 10.5376 1.5 7.5C1.5 4.46243 3.96243 2 7 2C10.0376 2 12.5 4.46243 12.5 7.5ZM14 7.5C14 11.366 10.866 14.5 7 14.5C3.13401 14.5 0 11.366 0 7.5C0 3.63401 3.13401 0.5 7 0.5C10.866 0.5 14 3.63401 14 7.5ZM10 8.5V6.5L4 6.5V8.5H10Z"
						fill="#CC0000"
					/>
				</svg>
			) : null}
			<span className={`o3-form-feedback__${type}-message`}>{message}</span>
		</div>
	);
};
