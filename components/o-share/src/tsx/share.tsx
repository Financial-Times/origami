type SocialNetworkName =
	| "Twitter"
	| "Facebook"
	| "LinkedIn"
	| "Link"
	| "Share"
	| "Mail"
	| "Pinterest"
	| "Whatsapp";

type SocialNetworkType = { name: SocialNetworkName } & {
	iconUrl: string;
	svgPaths: string[];
	showLabel?: boolean;
	customAction?: string;
};

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
	children?: JSX.Element | JSX.Element[];
};

export function Share({
	socialNetworks,
	url = "",
	title = "",
	titleExtra = "",
	summary = "",
	relatedTwitterAccounts = "",
	small,
	vertical,
	inverse,
	children,
}: ShareProps) {
	let className = "";
	if (small) className = " o-share--small";
	if (vertical) className = " o-share--vertical";
	if (inverse) className += " o-share--inverse";
	return (
		<div data-o-component="o-share" className={`o-share${className}`}>
			<ul>
				{socialNetworks.map((icon, i) => {
					const listItemClassNames = icon.showLabel
						? "o-share__action o-share__action--labelled"
						: "o-share__action";
					const props = {
						icon,
						url,
						title,
						titleExtra,
						summary,
						relatedTwitterAccounts,
					};
					return (
						<li className={listItemClassNames} key={i + icon.name}>
							{icon.showLabel ? (
								<IconWithLabel {...props} />
							) : (
								<IconWithOutLabel {...props} />
							)}
						</li>
					);
				})}
				{children}
			</ul>
		</div>
	);
}

function IconWithOutLabel({
	icon,
	url,
	title,
	titleExtra,
	summary,
	relatedTwitterAccounts,
}) {
	const { name, svgPaths } = icon;
	return (
		<a
			className={`o-share__icon o-share__icon--${name.toLowerCase()}`}
			href={generateSocialUrl(
				{
					url,
					title,
					titleExtra,
					summary,
					relatedTwitterAccounts,
				},
				name
			)}
			rel="noopener"
		>
			<svg
				className="o-share__icon__image"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1024 1024"
			>
				{svgPaths && svgPaths.map((path, i) => <path key={i} d={path}></path>)}
			</svg>
			<span className="o-share__text">
				{generateDescriptiveLinkText(title, name)}
			</span>
		</a>
	);
}

function IconWithLabel({ icon, title, summary }) {
	const { name, svgPaths, customAction } = icon;
	return (
		<form method="post" action={customAction}>
			<button
				type="submit"
				className={`o-share__icon o-share__icon--${name.toLowerCase()}`}
				title={title}
				aria-label={summary}
			>
				<svg
					className="o-share__icon__image"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1024 1024"
				>
					{svgPaths &&
						svgPaths.map((path, i) => <path key={i} d={path}></path>)}
				</svg>
				<span className="o-share__text" data-variant-label>
					{name}
				</span>
			</button>
		</form>
	);
}

function generateDescriptiveLinkText(
	title: string,
	socialNetwork: SocialNetworkName
) {
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

function generateSocialUrl(
	config: Record<string, string>,
	socialNetwork: SocialNetworkName
) {
	const url = encodeURIComponent(config.url);
	const title = encodeURIComponent(config.title);
	const titleExtra = encodeURIComponent(config.titleExtra);
	const summary = encodeURIComponent(config.summary);
	const relatedTwitterAccounts = encodeURIComponent(
		config.relatedTwitterAccounts
	);
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
