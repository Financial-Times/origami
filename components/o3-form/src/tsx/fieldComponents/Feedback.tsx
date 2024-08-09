import type {FeedBackProps} from '../../types';

export const Feedback = ({message, type}: FeedBackProps) => {
	return <div className={`feedback ${type}`}>{message}</div>;
};
