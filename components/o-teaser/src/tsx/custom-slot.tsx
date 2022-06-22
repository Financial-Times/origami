const render = action => {
	// Allow parent components to pass raw HTML strings
	if (typeof action === 'string') {
		return <span dangerouslySetInnerHTML={{__html: action}} />;
	} else {
		return action;
	}
};

export default ({customSlot}) =>
	customSlot ? (
		<div className="o-teaser__action">{render(customSlot)}</div>
	) : null;
