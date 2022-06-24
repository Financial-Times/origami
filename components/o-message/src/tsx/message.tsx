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
	content: MessageContent;
	primaryAction?: MessageAction;
	secondaryAction?: MessageAction;
	showCloseButton?: boolean;
};

type TextContentPropType = {
	text: string;
};

interface AlertMessageProps extends MessageProps {
	state: 'success' | 'neutral' | 'error';
	inner?: boolean;
}

interface NoticeMessageProps extends MessageProps {
	state: 'inform' | 'feedback' | 'warning' | 'warning-light';
	inner?: boolean;
}

interface ActionMessageProps extends MessageProps {
	state: 'inform' | 'inform-inverse';
}

export function AlertMessage({
	state = 'success',
	content = {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
		additionalInfo: '',
	},
	primaryAction = {
		url: '#',
		text: 'Button',
	},
	secondaryAction = {
		url: '#',
		text: 'Text link',
	},
	inner = false,
	showCloseButton = true,
}: AlertMessageProps) {
	return message(
		'alert',
		state,
		showCloseButton,
		content,
		primaryAction,
		secondaryAction,
		inner
	);
}

export function NoticeMessage({
	state = 'inform',
	content = {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
		additionalInfo: '',
	},
	primaryAction,
	secondaryAction,
	inner = false,
	showCloseButton = true,
}: NoticeMessageProps) {
	return message(
		'notice',
		state,
		showCloseButton,
		content,
		primaryAction,
		secondaryAction,
		inner
	);
}

export function ActionMessage({
	state = 'inform',
	content = {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
		additionalInfo: '',
	},
	primaryAction,
	secondaryAction,
	showCloseButton = true,
}: ActionMessageProps) {
	return message(
		'notice',
		state,
		showCloseButton,
		content,
		primaryAction,
		secondaryAction
	);
}

function message(
	type: string,
	state: string,
	showCloseButton: boolean,
	content: MessageContent,
	primaryAction?: MessageAction,
	secondaryAction?: MessageAction,
	inner?: boolean
) {
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
					{inner && content.additionalInfo && (
						<AdditionalInfo text={content.additionalInfo} />
					)}
					{Actions(primaryAction, secondaryAction)}
				</div>
			</div>
		</div>
	);
}

const AdditionalInfo = ({text}: TextContentPropType) => {
	return <p className="o-message__content-additional">{text}</p>;
};

const Highlight = ({text}: TextContentPropType) => {
	return <span className="o-message__content-highlight"> {text} </span>;
};

const Actions = (
	primaryAction: MessageAction | undefined,
	secondaryAction: MessageAction | undefined
) => {
	if (!primaryAction && !secondaryAction) {
		return null;
	}
	return (
		<div className="o-message__actions">
			{primaryAction && (
				<a
					href={primaryAction.url}
					className="o-message__actions__primary"
					target={primaryAction.openInNewWindow ? '_blank' : '_self'}>
					{primaryAction.text}
				</a>
			)}
			{secondaryAction && (
				<a
					href={secondaryAction.url}
					className="o-message__actions__secondary"
					target={secondaryAction.openInNewWindow ? '_blank' : '_self'}>
					{secondaryAction.text}
				</a>
			)}
		</div>
	);
};
