export type ContentType =
	| 'article'
	| 'video'
	| 'podcast'
	| 'audio'
	| 'package'
	| 'liveblog'
	| 'promoted-content'
	| 'paid-post';

/** Strings must be a parseable format, e.g. ISO 8601 */
export type DateLike = Date | string | number;

export type Layout = 'small' | 'large' | 'hero' | 'top-story';

export type Theme = 'extra-article';

export type Modifier =
	| 'stacked'
	| 'centre'
	| 'stretched'
	| 'opinion-background'
	| 'landscape'
	| 'big-story'
	| string;

export type ImageSize = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';

export interface Features {
	showMeta?: boolean;
	showTitle?: boolean;
	showStandfirst?: boolean;
	showStatus?: boolean;
	showImage?: boolean;
	showHeadshot?: boolean;
	showVideo?: boolean;
	showRelatedLinks?: boolean;
	showCustomSlot?: boolean;
}

export interface General {
	id: string;
	url?: string;
	/** Preferred to url if available */
	relativeUrl?: string;
	type: ContentType;
	indicators: Indicators;
}

//  meta.tsx prop type definitions
export interface PromotedProps {
	/** Promoted content type */
	promotedPrefixText?: string;
	promotedSuffixText?: string;
}

export interface Context {
	/** Enables alternative content for headline testing */
	headlineTesting?: Boolean;
	/** Shows the alternative meta link when the label matches */
	parentLabel?: String;
	/** Shows the alternative meta link when the ID matches */
	parentId?: String;
}

export interface MetaLinkProps extends Context {
	/** Usually a brand, or a genre, or content type */
	metaPrefixText?: string;
	metaSuffixText?: string;
	metaLink?: MetaLink;
	/** Fallback used if the parentId is the same as the display concept */
	metaAltLink?: MetaLink;
}
export interface MetaProps extends PromotedProps, MetaLinkProps {}

// link.tsx types

export interface LinkProps {
	url: string | undefined;
	attrs: {
		'data-trackable'?: string;
		'aria-label'?: string;
		'aria-hidden'?: 'true' | 'false' | undefined;
		className?: string;
		tabIndex?: number;
	};
	children: React.ReactNode[] | React.ReactNode | string;
}

// title.tsx prop type definitions
export interface TitleProps extends General {
	title: string;
	/** Used for testing headline variations */
	altTitle?: string;
}

// standfirst.tsx prop type definitions
export interface StandfirstProps extends General {
	standfirst?: string;
	/** Used for testing standfirst variations */
	altStandfirst?: string;
}

// status.tsx prop type definitions
export interface StatusProps {
	publishedDate: DateLike;
	firstPublishedDate: DateLike;
	/** Displays new/updated X mins/hours ago */
	useRelativeTime?: boolean;
	/** Live blog status, will override date and time */
	status?: 'inprogress' | 'comingsoon' | 'closed';
}

export interface Image {
	/** Images must be accessible to the Origami Image Service */
	image?: Media;
	imageSize?: ImageSize;
	imageLazyLoad?: Boolean | String;
}

export interface Headshot {
	headshot?: String;
	headshotTint?: String;
}

export interface Video {
	video?: Media;
}

export interface RelatedLinks {
	relatedLinks?: Link[];
}

export interface Variants {
	/** Default is "small" */
	layout?: Layout;
	/** Content package theme */
	theme?: Theme;
	/** Extra class name variations to append */
	modifiers?: Modifier[];
}

//
// Sub-props
//

export interface MetaLink {
	id: string;
	url: string;
	/** Preferred if available */
	relativeUrl?;
	prefLabel: string;
}

export interface Link {
	id: string;
	type: ContentType;
	url: string;
	/** Preferred to url if available */
	relativeUrl?;
	title: string;
}

export interface Media {
	url: string;
	width: number;
	height: number;
}

export interface Indicators {
	accessLevel: 'premium' | 'subscribed' | 'registered' | 'free';
	isOpinion?: boolean;
	isColumn?: boolean;
	isPodcast?: boolean;
	/** Methode packaging options */
	isEditorsChoice?: boolean;
	isExclusive?: boolean;
	isScoop?: boolean;
}

export interface TeaserProps
	extends Features,
		General,
		MetaProps,
		TitleProps,
		StandfirstProps,
		StatusProps,
		Image,
		Headshot,
		Video,
		RelatedLinks,
		Variants {}
