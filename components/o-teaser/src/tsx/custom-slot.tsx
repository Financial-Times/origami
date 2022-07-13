import DOMPurify from 'dompurify';

const render = (action: JSX.Element | string) => {
	// Allow parent components to pass raw HTML strings
	if (typeof action === 'string') {
		return <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(action)}} />;
	} else {
		return action;
	}
};

type CustomSlotProps = {
	customSlot?: JSX.Element | string;
}

export default (props: CustomSlotProps) =>
	props.customSlot ? (
		<div className="o-teaser__action">{render(props.customSlot)}</div>
	) : null;
