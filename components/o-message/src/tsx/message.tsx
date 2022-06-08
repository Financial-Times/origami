import { Fragment } from 'react';

type MessageContent = {
	detail: string;
	hightLight?: string;
	additionalInfo?: string;
}

type MessageAction = {
	copy: string;
	url: string;
	openInNewWindow?: boolean
}

type MessageProps = {
	type: 'action' | 'alert' | 'notice';
	state: 'success' | 'neutral' | 'error' | 'feedback' | 'warning' | 'warning-light' | 'inform' | 'inform-inverse'
	content: MessageContent;
	primaryAction?: MessageAction;
	secondaryAction?: MessageAction;
	hasInnerLayout?: boolean;
	showCloseButton?: boolean;
	autoOpen?: boolean;
	parentElement?: string;
}

type TextContentPropType = {
	text: string;
}

const InnerLayout = ({ condition, wrapper, children }) => {
	return condition ? wrapper(children) : children;
}

const AdditionalInfo = ({text}: TextContentPropType) => {
	return <p className="o-message__content-additional">{text}</p>
}

const Highlight = ({text}: TextContentPropType) => {
	return <span className="o-message__content-highlight"> {text} </span>
}


export function Message({
	type = 'alert',
	state = 'success',
	content = undefined,
	primaryAction = undefined,
	secondaryAction = undefined,
	hasInnerLayout=false,
	showCloseButton=true
}: MessageProps) {
	const dataAttributes = {};

	if(!showCloseButton) {
		dataAttributes['data-o-message-close'] = false;
	}

  return (
		<InnerLayout
			condition={hasInnerLayout}
			// I had to add inline style to get the same feeling as in the registry.
			// class demo-inner-message does not set those styles
			wrapper={children => <div className="demo-inner-message" style={{margin: "auto", maxWidth: "400px"}}>{children}</div>}>
			<Fragment>
				<div className={`o-message o-message--${type} o-message--${state} ${hasInnerLayout ? "o-message--inner": ""}`} {...dataAttributes} data-o-component="o-message">
					<div className="o-message__container">
						<div className="o-message__content">
							<p className="o-message__content-main">
								{content.hightLight && <Highlight text={content.hightLight} />}
								{content.detail}
							</p>
							{hasInnerLayout && <AdditionalInfo text={content.additionalInfo}/>}
							<div className="o-message__actions">
								<a href={primaryAction.url} className="o-message__actions__primary" target={primaryAction.openInNewWindow && '_blank'} >{primaryAction.copy}</a>
								{state !== 'feedback' && <a href={secondaryAction.url} className="o-message__actions__secondary" target={secondaryAction.openInNewWindow && '_blank'}>{secondaryAction.copy}</a>}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		</InnerLayout>
  );
}
