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
								{generateDescriptiveLinkText(title, socialNetwork)}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}


function generateDescriptiveLinkText (title: string, socialNetwork: SocialNetworkType) {
	const descriptiveLinkText = {
		twitter: `Share ${title} on Twitter (opens a new window)`,
		facebook: `Share ${title} on Facebook (opens a new window)`,
		linkedin: `Share ${title} on LinkedIn (opens a new window)`,
		pinterest: `Share ${title} on Pinterest (opens a new window)`,
		whatsapp: `Share ${title} on Whatsapp (opens a new window)`,
		link: `Open link in new window`,
		enterpriseSharing: `Share ${title} with your Enterprise Sharing tools (opens a new window)`,
	};
	return descriptiveLinkText[socialNetwork];
}

function generateSocialUrl(config: Record<string, string>, socialNetwork: SocialNetworkType) {
	const url = encodeURIComponent(config.url);
	const title = encodeURIComponent(config.title);
	const titleExtra = encodeURIComponent(config.titleExtra);
	const summary = encodeURIComponent(config.summary);
	const relatedTwitterAccounts = encodeURIComponent(config.relatedTwitterAccounts);
	const socialUrls = {
		twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}&related=${relatedTwitterAccounts}&via=FT`,
		facebook: `http://www.facebook.com/sharer.php?u=${url}`,
		linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}+%7C+${titleExtra}&summary=${summary}&source=Financial+Times`,
		pinterest: `http://www.pinterest.com/pin/create/button/?url=${url}&description=${title}`,
		whatsapp: `whatsapp://send?text=${title}%20(${titleExtra})%20-%20${url}`,
		link: url,
		enterpriseSharing: url,
	};
	return socialUrls[socialNetwork];
}
