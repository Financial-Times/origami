import TimeStamp from './time-stamp';
import RelativeTime from './relative-time';
import LiveBlogStatus from './live-blog-status';
import AlwaysShowTimestamp from './always-show-timestamp';

export default props => {
	if (props.status) {
		return <LiveBlogStatus {...props} />;
	}

	if (props.publishedDate) {
		if (props.useRelativeTimeIfToday) {
			return <AlwaysShowTimestamp {...props} />;
		} else if (props.useRelativeTime) {
			return <RelativeTime {...props} />;
		} else {
			return <TimeStamp {...props} />;
		}
	}

	return null;
};
