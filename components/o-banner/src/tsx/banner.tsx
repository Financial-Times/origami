export interface BannerSubmitButton {
	action: string;
	encoding: string;
	method: string;
	copy: string;
}

export interface BannerLink {
	copy: string;
	url: string;
}

export interface BannerProps {
	suppressCloseButton?: boolean;
	headingLong?: string;
	headingShort?: string;
	contentLong: string;
	contentShort?: string;
	closeButtonLabel?: string;
	primaryAction?: BannerLink | BannerSubmitButton;
	secondaryAction?: BannerLink
	theme: 'product' | 'marketing' | '';
	layout: 'small' | 'compact' | '';
}

function isBannerSubmitButton(action: BannerSubmitButton | BannerLink): action is BannerSubmitButton {
	return (action as BannerSubmitButton).action !== undefined;
}

export function Banner({
	suppressCloseButton = false,
	headingLong = '',
	headingShort = '',
	contentLong = 'Hello!',
	contentShort = '',
	closeButtonLabel = 'Close',
	primaryAction = {
		copy: 'OK',
		url: '#',
	},
	secondaryAction = undefined,
	theme = '',
	layout = '',
}: BannerProps) {
	const classNames = ['o-banner'];
	const dataAttributes = {};

	if(layout) {
		classNames.push(`o-banner--${layout}`);
	}

	if(theme) {
		classNames.push(`o-banner--${theme}`);
	}

	if(suppressCloseButton) {
		dataAttributes['data-o-banner-suppress-close-button'] = true;
	}

	if(!suppressCloseButton && closeButtonLabel) {
		dataAttributes['data-o-banner-close-button-label'] = closeButtonLabel;
	}

	return (
		<div className={classNames.join(' ')} {...dataAttributes} data-o-component="o-banner">
			<div className="o-banner__outer">
				<div className="o-banner__inner" data-o-banner-inner>
					{contentLong && (
					<div className="o-banner__content o-banner__content--long">
						{headingLong && (
						<header className="o-banner__heading">
							<h2>{headingLong}</h2>
						</header>
						)}
						<p>{contentLong}</p>
					</div>
					)}
					{contentShort && (
					<div className="o-banner__content o-banner__content--short">
						{headingShort && (
						<header className="o-banner__heading">
							<h2>{headingShort}</h2>
						</header>
						)}
						<p>{contentShort}</p>
					</div>
					)}
					<div className="o-banner__actions">
						{primaryAction && !isBannerSubmitButton(primaryAction) && (
							<div className="o-banner__action">
								<a href="{primaryAction.url}" className="o-banner__button">{primaryAction.copy}</a>
							</div>
						)}
						{primaryAction && isBannerSubmitButton(primaryAction) && (
							<form className="o-banner__action" method="{primaryAction.method}" encType="{primaryAction.encoding}" action="{primaryAction.action}">
								<input className="o-banner__button" type="submit" value="{primaryAction.copy}" />
							</form>
						)}
						{secondaryAction && (
							<div className="o-banner__action o-banner__action--secondary">
								<a href="{secondaryAction.url}" className="o-banner__link">{secondaryAction.copy}</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
		);
	}
