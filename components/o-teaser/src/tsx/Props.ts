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

export type Theme = 'extra-article' | (string & {});

export type Modifier =
	| 'stacked'
	| 'centre'
	| 'stretched'
	| 'opinion-background'
	| 'landscape'
	| 'big-story'
	| (string & {});

export type ImageSize =
	| 'XS'
	| 'Small'
	| 'Medium'
	| 'Large'
	| 'XL'
	| 'XXL'
	| (string & {});

export interface Features {
	showMeta?: boolean;
	showTitle?: boolean;
	showTitlePrefix?: boolean;
	showStandfirst?: boolean;
	showStatus?: boolean;
	showImage?: boolean;
	/**
	 * Takes precedence over image
	 */
	showHeadshot?: boolean;
	/**
	 * Takes precedence over legacy headshot.
	 * byline component includes headshot
	 */
	showByline?: boolean;
	showBylineHeadshot?: boolean;
	/**
	 * Takes precedence over image or headshot
	 */
	showVideo?: boolean;
	showRelatedLinks?: boolean;
	showCustomSlot?: boolean;
}

export interface General {
	/** Content UUID  */
	id: string;
	/** Canonical URL */
	url?: string;
	/** URL path, will take precedence over `url` */
	relativeUrl?: string;
	/** Content type (article, video, etc.) */
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
	/** Promoted content type. Will take precedence over links */
	promotedPrefixText?: string;
	promotedSuffixText?: string;
}

export interface Title {
	title: string;
	/** Used for testing headline variations */
	altTitle: string;
	titlePrefix?: string;
}

export interface Standfirst {
	standfirst?: string;
	/** Used for testing standfirst variations */
	altStandfirst?: string;
}

export interface Status {
	/** Last published date */
	publishedDate: DateLike;
	firstPublishedDate: DateLike;
	/** Display time since publish. Displays new/updated X mins/hours ago */
	useRelativeTime?: boolean;
	/** Live blog status, will override date and time */
	status?: 'inprogress' | 'comingsoon' | 'closed' | (string & {});
}

export interface Image {
	/** Images must be accessible to the Origami Image Service */
	image?: Media;
	/** XS, Small, Medium, Large, XL or XXL */
	imageSize?: ImageSize;
	/** Output image with `data-src` attribute. If this is a string it will be appended to the image as a class name. */
	imageLazyLoad?: boolean | string;
}

export interface Headshot {
	/**
	 * Only displayed if `showHeadshot` and columnist indicator is true
	 */
	headshot?: string;
	/**
	 * See the image service API (https://images.ft.com/v3/docs/api) for usage
	 */
	headshotTint?: string;
}

export interface Video {
	/** Requires o-video to create a video player */
	video?: Media;
}

export interface RelatedLinks {
	relatedLinks?: Link[];
}

export interface Context {
	/** Enables alternative content for headline testing */
	headlineTesting?: boolean;
	/** Shows the alternative meta link when the label matches */
	parentLabel?: string;
	/** Shows the alternative meta link when the ID matches */
	parentId?: string;
}

export interface Variants {
	/** "small", "large", "hero", or "top-story". Default is "small" */
	layout?: Layout;
	/** Content package theme, setting this will override any other indicators */
	theme?: Theme;
	/** Extra class name variations to append */
	modifiers?: Modifier[] | (string & {});
}

//
// Sub-props
//

export interface MetaLink {
	id?: string;
	/**
	 * Canonical URL
	 */
	url: string;
	/** Preferred if available */
	relativeUrl?;
	prefLabel: string;
}

/** [text, url, headshot][] */
type StructuredByline = [string, string?, string?][];
export interface Byline {
	byline?: StructuredByline
}

export interface Link {
	/** Content UUID */
	id: string;
	/** Content type (article, video, etc.) */
	type: ContentType;
	/** Canonical URL */
	url?: string;
	/** Preferred to url if available */
	relativeUrl?;
	title: string;
}

export interface Media {
	/** Content UUID or, in the case of images, data: or blob: URL */
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

export interface CustomSlot {
	/** HTML string. Two sibling tags needs to be wrapped inside a parent element */
	customSlot?: React.JSX.Element | React.JSX.Element[] | string;
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
		Byline,
		Video,
		RelatedLinks,
		Context,
		Variants,
		CustomSlot {}
