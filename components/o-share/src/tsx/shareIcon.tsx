import { iconMap } from "./svgComponents";

type IconType =
	| "twitter"
	| "facebook"
	| "linkedin"
	| "whatsapp"

export type UrlProps = {
	url: string;
	title: string;
	titleExtra: string;
	summary: string;
	relatedTwitterAccounts: string;
}
type ShareIconProps = {
	icon: IconType;
	urlProps: UrlProps;
	showLabel?: boolean;
	label?: string;
	customAction?: string;
};

export function ShareIcon({
	icon,
	showLabel,
	label,
	customAction,
	urlProps,
}: ShareIconProps) {
	const listItemClassNames = showLabel
		? "o-share__action o-share__action--labelled"
		: "o-share__action";
	const iconProps = { icon, showLabel, label, customAction };
	return (
		<li className={listItemClassNames}>
			{customAction ? (
				<CustomIcon {...urlProps} {...iconProps} />
			) : (
				<SocialIcon {...urlProps} {...iconProps} />
			)}
		</li>
	);
}

type SocialIconProps = {
	icon: IconType;
	label: string;
	url: string;
	title: string;
	titleExtra: string;
	summary: string;
	relatedTwitterAccounts: string;
};

function SocialIcon({
	icon,
	url,
	title,
	titleExtra,
	summary,
	relatedTwitterAccounts,
}: SocialIconProps) {
	return (
		<a
			className={`o-share__icon o-share__icon--${icon}`}
			href={generateSocialUrl(
				{
					url,
					title,
					titleExtra,
					summary,
					relatedTwitterAccounts,
				},
				icon
			)}
			rel="noopener"
		>
			<div className="o-share__icon__image">{iconMap[icon]}</div>
			<span className="o-share__text">
				{generateDescriptiveLinkText(title, icon)}
			</span>
		</a>
	);
}

type CustomIconProps = {
	icon: IconType;
	label: string;
	customAction: string;
	title: string;
	summary: string;
};

function CustomIcon({
	icon,
	label,
	customAction,
	title,
	summary,
}: CustomIconProps) {
	return (
		<form method="post" action={customAction}>
			<button
				type="submit"
				className={`o-share__icon o-share__icon--${icon}`}
				title={title}
				aria-label={summary}
			>
				<div className="o-share__icon__image">{iconMap[icon]}</div>
				<span className="o-share__text" data-variant-label>
					{label}
				</span>
			</button>
		</form>
	);
}

function generateDescriptiveLinkText(title: string, socialNetwork: IconType) {
	// It seems like next article is not using pinterest and not sure how link or enterprise sharing is used and we might want to add something for the save button
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

interface GenerateSocialUrlConfig {
	url: string,
	title: string,
	titleExtra:string
	summary: string,
	relatedTwitterAccounts: string

}
function generateSocialUrl(
	config: GenerateSocialUrlConfig,
	socialNetwork: IconType
) {
	const url = encodeURIComponent(config.url);
	const title = encodeURIComponent(config.title);
	const titleExtra = encodeURIComponent(config.titleExtra);
	const summary = encodeURIComponent(config.summary);
	const relatedTwitterAccounts = encodeURIComponent(
		config.relatedTwitterAccounts
	);

	// It seems like next article is not using pinterest and not sure how link or enterprise sharing is used and we might want to add something for the save button
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
