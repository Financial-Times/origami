import { CustomSlot } from './Props';

const render = (action: JSX.Element | JSX.Element[] | string) => {
	// Allow parent components to pass raw HTML strings
	if (typeof action === 'string') {
		return <span>{action}</span>;
	} else {
		return action;
	}
};

export default (props: CustomSlot) =>
	props.customSlot ? (
		<div className="o-teaser__action">{render(props.customSlot)}</div>
	) : null;
