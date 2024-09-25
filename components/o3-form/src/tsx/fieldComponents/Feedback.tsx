import type {FeedbackProps} from '../../types';

export const Feedback = ({message, type}: FeedbackProps) => {
	return (
		<div className={`o3-form-feedback o3-form-feedback__${type}`}>
			<span className={`o3-form-feedback__${type}-message`}>{message}</span>
		</div>
	);
};
