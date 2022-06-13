import {generateSocialUrl, generateDescriptiveLinkText} from '../js/share';

type SocialNetworkType =
	| 'twitter'
	| 'facebook'
	| 'linkedin'
	| 'link'
	| 'share'
	| 'mail'
	| 'pinterest'
	| 'whatsapp';

type ShareProps = {
	socialNetworks: SocialNetworkType[];
	url?: string;
	title?: string;
	titleExtra?: string;
	summary?: string;
	relatedTwitterAccounts?: string;
	small?: boolean;
	vertical?: boolean;
	inverse?: boolean;
};

export function Share({
	socialNetworks,
	url = '',
	title = '',
	titleExtra = '',
	summary = '',
	relatedTwitterAccounts = '',
	small,
	vertical,
	inverse,
}: ShareProps) {
	let className = '';
	if (small) className = ' o-share--small';
	if (vertical) className = ' o-share--vertical';
	if (inverse) className += ' o-share--inverse';
	return (
		<div data-o-component="o-share" className={`o-share${className}`}>
			<ul>
				{socialNetworks.map((socialNetwork, i) => (
					<li className="o-share__action" key={i + socialNetwork}>
						<a
							className={`o-share__icon o-share__icon--${socialNetwork}`}
							href={generateSocialUrl(
								{url, title, titleExtra, summary, relatedTwitterAccounts},
								socialNetwork
							)}
							rel="noopener">
							<span className="o-share__text">
								{generateDescriptiveLinkText({title}, socialNetwork)}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
