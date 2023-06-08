export interface TopBannerLink {
	copy: string;
	url: string;
}

export interface TopBannerProps {
	heading?: string;
	content: string;
	primaryAction: TopBannerLink;
	theme: 'new-world' | 'professional-inverse';
}

export function TopBanner({
	heading = '',
	content = 'Hello!',
	primaryAction = {
		copy: 'OK',
		url: '#',
	},
	theme = 'new-world',
}: TopBannerProps) {
	return (
		<div className={`o-top-banner o-top-banner--${theme}`}>
			<div className="o-top-banner__container">
				<div className="o-top-banner__content">
					<h2 className="o-top-banner__heading">{heading}</h2>
					<p className="o-top-banner__copy">{content}</p>
				</div>

				<div className="o-top-banner__actions">
					<a href={primaryAction.url} className="o-top-banner__button">{primaryAction.copy}</a>
				</div>
			</div>
		</div>
	)
}
