export type HeadingProps = {
	type: 'display' | 'headline' | 'chapter' | 'subheading' | 'label';
	theme?: 'standard' | 'inverse';
	underline?: boolean;
	children: string;
};

export type SummaryProps = {
	children: (string | JSX.Element)[] | string | JSX.Element;
};

export type DetailProps = {
	theme?: 'standard' | 'inverse';
	children: JSX.Element[] | JSX.Element | string;
};

export type TopicTagProps = DetailProps & {
	href?: string;
};

export type QuoteProps = {
	theme?: 'standard' | 'inverse';
	type: 'block' | 'pull';
	quoteAuthor?: string;
	quoteSource?: string;
	children: string;
};

export type BigNumberProps = {
	theme?: 'standard' | 'inverse';
	title: string;
	children: string;
};

export type BylineProps = {
	theme?: 'standard' | 'inverse';
	children: JSX.Element[] | JSX.Element | string;
};

export type ListProps = {
	type: 'ordered' | 'unordered';
	theme?: 'standard' | 'inverse';
	listItems: string[];
};

export type Attributes = {
	'data-o3-theme'?: 'inverse';
	'data-o3-editorial-underline'?: boolean;
};
