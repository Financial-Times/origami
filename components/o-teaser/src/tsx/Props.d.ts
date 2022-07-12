export type ContentType =
	| 'article'
	| 'video'
	| 'podcast'
	| 'audio'
	| 'package'
	| 'liveblog'
	| 'promoted-content'
	| 'paid-post'
	| (string & {});

/** Strings must be a parseable format, e.g. ISO 8601 */
export type DateLike = Date | string | number;

export type Layout = 'small' | 'large' | 'hero' | 'top-story' | (string & {});

export type Theme = 'extra-article'  | (string & {});

export type Modifier =
	| 'stacked'
	| 'centre'
	| 'stretched'
	| 'opinion-background'
	| 'landscape'
	| 'big-story'


export type ImageSize = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL' | (string & {});

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

export interface Meta {
	/** Usually a brand, or a genre, or content type */
	metaPrefixText?: string;
	metaSuffixText?: string;
	metaLink?: MetaLink;
	/** Fallback used if the parentId is the same as the display concept */
	metaAltLink?: MetaLink | (string & {});
	/** Promoted content type */
	promotedPrefixText?: string;
	promotedSuffixText?: string;
}

export interface Title {
	title: string;
	/** Used for testing headline variations */
	altTitle?: string;
}

export interface Standfirst {
	standfirst?: string;
	/** Used for testing standfirst variations */
	altStandfirst?: string;
}

export interface Status {
	publishedDate: DateLike;
	firstPublishedDate: DateLike;
	/** Displays new/updated X mins/hours ago */
	useRelativeTime?: boolean;
	/** Live blog status, will override date and time */
	status?: 'inprogress' | 'comingsoon' | 'closed' | (string & {});
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

export interface Context {
	/** Enables alternative content for headline testing */
	headlineTesting?: Boolean;
	/** Shows the alternative meta link when the label matches */
	parentLabel?: String;
	/** Shows the alternative meta link when the ID matches */
	parentId?: String;
}

export interface Variants {
	/** Default is "small" */
	layout?: Layout;
	/** Content package theme */
	theme?: Theme;
	/** Extra class name variations to append */
	modifiers?: Modifier[] | (string & {});
}

//
// Sub-props
//

export interface MetaLink {
	url: string;
	/** Preferred if available */
	relativeUrl?;
	prefLabel: string;
}

export interface Link {
	id: string;
	type: ContentType;
	url?: string;
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
	accessLevel?: 'premium' | 'subscribed' | 'registered' | 'free';
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
		Meta,
		Title,
		Standfirst,
		Status,
		Image,
		Headshot,
		Video,
		RelatedLinks,
		Context,
		Variants {}
