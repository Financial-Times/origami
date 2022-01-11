import { data } from "remark";

export interface CookieMessageLink {
	copy: string;
	url: string;
}

export interface CookieMessageProps {
	fullMarkup?: boolean;
	heading?: string;
	copy?: string;
	primaryAction?: CookieMessageLink;
	secondaryAction?: CookieMessageLink
	theme: 'alternate' | '';
}

export function CookieMessage({
	fullMarkup = true,
	heading = '',
	copy = '',
	primaryAction = {
		copy: "Accept &amp; continue",
		url: "https://consent.ft.com/__consent/consent-record-cookie?redirect=#",
	},
	secondaryAction = {
		copy: "Manage Cookies",
		url: "https://www.ft.com/preferences/manage-cookies?redirect=#"
	},
	theme = '',
}: CookieMessageProps) {
	const dataAttributes = {};
	const headingId = 'o-cookie-message-heading';

	if(theme) {
		dataAttributes['data-o-cookie-message-theme'] = theme;
	}

	if(!fullMarkup) {
		dataAttributes['aria-labelledby'] = headingId;
	}

	return (
		<div role="dialog" data-o-component="o-cookie-message" className="o-cookie-message" {...dataAttributes}>
			{fullMarkup ?
				<div className="o-cookie-message__outer">
					<div className="o-cookie-message__inner">
						<div className="o-cookie-message__content">
							<div className="o-cookie-message__heading">
								<h2 id={headingId}>{heading || "Cookies on the FT"}</h2>
							</div>
							<p>
								{copy || 'We use' +
									'<a href="http://help.ft.com/help/legal-privacy/cookies/" className="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a>' +
									'for a number of reasons, such as keeping FT Sites reliable and' +
									'secure, personalising content and ads, providing social media' +
									'features and to analyse how our Sites are used.'
								}
							</p>
						</div>
						<div className="o-cookie-message__actions">
							<div className="o-cookie-message__action">
								<a href={primaryAction.url || "https://consent.ft.com/__consent/consent-record-cookie?redirect=#"} className="o-cookie-message__button">
									{primaryAction.copy || "Accept &amp; continue"}
								</a>
							</div>
							<div className="o-cookie-message__action o-cookie-message__action--secondary">
								<a href={secondaryAction.url || "https://www.ft.com/preferences/manage-cookies?redirect=#"} className="o-cookie-message__link">
									{secondaryAction.copy || "Manage cookies"}
								</a>
							</div>
						</div>
					</div>
				</div>
			:
				<>
					<h2 id={headingId}>{heading || "Cookies on the FT"}</h2>
					<p>
						{copy || 'We use' +
							'<a href="http://help.ft.com/help/legal-privacy/cookies/" className="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a>' +
							'for a number of reasons, such as keeping FT Sites reliable and' +
							'secure, personalising content and ads, providing social media' +
							'features and to analyse how our Sites are used.'
						}
					</p>
				</>
			}
		</div>
		);
	}
