import type {FeedBackProps} from '../../types';

export const Feedback = ({message, type}: FeedBackProps) => {
	return <div className={`o3-form-field__feedback--${type}`}>{message}</div>;
};
