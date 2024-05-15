export interface CookieMessageLink {
	copy: string;
}

export interface CookieMessageProps {
	fullMarkupForDefaultContent?: boolean;
	heading?: string;
	copy?: string;
	primaryAction?: CookieMessageLink;
	secondaryAction?: CookieMessageLink;
	redirect?: string;
	theme: 'alternate' | '';
}

export function CookieMessage({
	fullMarkupForDefaultContent = true,
	heading = '',
	copy = '',
	primaryAction = {
		copy: '',
	},
	secondaryAction = {
		copy: '',
	},
	redirect = '',
	theme = '',
}: CookieMessageProps) {
	const dataAttributes = {};
	const headingId = 'o-cookie-message-heading';
	const configuredContent =
		heading || copy || primaryAction.copy || secondaryAction.copy || redirect;
	const fullMarkup = fullMarkupForDefaultContent || configuredContent;
	const redirectURIEncoded = encodeURIComponent(
		redirect || 'https://www.ft.com'
	);

	if (theme) {
		dataAttributes['data-o-cookie-message-theme'] = theme;
	}

	if (!fullMarkup) {
		dataAttributes['aria-labelledby'] = headingId;
	}

	return (
		<div
			role="dialog"
			data-o-component="o-cookie-message"
			className="o-cookie-message"
			{...dataAttributes}
			data-nosnippet="true">
			{fullMarkup ? (
				<div className="o-cookie-message__outer">
					<div className="o-cookie-message__inner">
						<div className="o-cookie-message__content">
							<div className="o-cookie-message__heading">
								<h2 id={headingId}>{heading || 'Cookies on the FT'}</h2>
							</div>
							<p>
								{copy || (
									<>
										We use{' '}
										<a
											href="https://help.ft.com/help/legal-privacy/cookies/"
											className="o-cookie-message__link"
											target="_blank"
											rel="noopener">
											cookies
										</a>{' '}
										for a number of reasons, such as keeping FT Sites reliable
										and secure, personalising content and ads, providing social
										media features and to analyse how our Sites are used.
									</>
								)}
							</p>
						</div>
						<div className="o-cookie-message__actions">
							<div className="o-cookie-message__action o-cookie-message__action--secondary">
								<a
									href={
										'https://www.ft.com/preferences/manage-cookies?redirect=' +
										redirectURIEncoded
									}
									className="o-cookie-message__link">
									{secondaryAction.copy || 'Manage cookies'}
								</a>
							</div>
							<div className="o-cookie-message__action">
								<a
									href={
										'https://consent.ft.com/__consent/consent-record-cookie?redirect=' +
										redirectURIEncoded
									}
									className="o-cookie-message__button">
									{primaryAction.copy || 'Accept & continue'}
								</a>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
