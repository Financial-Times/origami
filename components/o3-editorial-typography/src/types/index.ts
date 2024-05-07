export type HeadlineProps = {
	type: 'headline-large' | 'headline' | 'chapter' | 'subheading' | 'label';
	theme: 'standard' | 'inverse';
	underline?: boolean;
	children: string;
};

export type BodyProps = {
	type: 'small' | 'large';
	theme: 'standard' | 'inverse';
	children: string;
};

export type DetailProps = {
	type:
		| 'topic-tag'
		| 'standfirst'
		| 'caption'
		| 'byline-author'
		| 'byline-location'
		| 'byline-timestamp'
		| 'quote'
		| 'quote-author';
	theme: 'standard' | 'inverse';
	children: string;
};

export type QuoteProps = {
	theme: 'standard' | 'inverse';
	quoteAuthor: string;
	quoteCaption?: string;
	quoteIcon?: boolean;
	children: string;
};

export type BigNumberProps = {
	theme: 'standard' | 'inverse';
	title: string;
	children: string;
};

export type BylineProps ={
	theme: 'standard' | 'inverse',
	children: JSX.Element[] | JSX.Element | string;
}

export type Attributes = {
	'data-o3-theme'?: 'inverse';
	'data-o3-editorial-quote-icon'?: boolean;
	'data-o3-editorial-underline'?: boolean;
};
