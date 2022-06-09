type MessageContent = {
	detail: string;
	highlight?: string;
	additionalInfo?: string;
};

type MessageAction = {
	text: string;
	url: string;
	openInNewWindow?: boolean;
};

type MessageProps = {
	type: 'action' | 'alert' | 'notice';
	state:
		| 'success'
		| 'neutral'
		| 'error'
		| 'feedback'
		| 'warning'
		| 'warning-light'
		| 'inform'
		| 'inform-inverse';
	content: MessageContent;
	primaryAction?: MessageAction;
	secondaryAction?: MessageAction;
	inner?: boolean;
	showCloseButton?: boolean;
	autoOpen?: boolean;
	parentElement?: string;
};

type TextContentPropType = {
	text: string;
};

const AdditionalInfo = ({text}: TextContentPropType) => {
	return <p className="o-message__content-additional">{text}</p>;
};

const Highlight = ({text}: TextContentPropType) => {
	return <span className="o-message__content-highlight"> {text} </span>;
};

export function Message({
	type = 'alert',
	state = 'success',
	content = undefined,
	primaryAction = undefined,
	secondaryAction = undefined,
	inner = false,
	showCloseButton = true,
}: MessageProps) {
	return (
		<div
			className={`o-message o-message--${type} o-message--${state} ${
				inner ? 'o-message--inner' : ''
			}`}
			data-o-message-close={showCloseButton.toString()}
			data-o-component="o-message">
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						{content.highlight && <Highlight text={content.highlight} />}
						{content.detail}
					</p>
					{inner && <AdditionalInfo text={content.additionalInfo} />}
					<div className="o-message__actions">
						<a
							href={primaryAction.url}
							className="o-message__actions__primary"
							target={primaryAction.openInNewWindow ? '_blank' : '_self'}>
							{primaryAction.text}
						</a>
						{state !== 'feedback' && (
							<a
								href={secondaryAction.url}
								className="o-message__actions__secondary"
								target={secondaryAction.openInNewWindow ? '_blank' : '_self'}>
								{secondaryAction.text}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
