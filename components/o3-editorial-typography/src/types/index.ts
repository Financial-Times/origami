export type HeadlineProps = {
	type: 'headline-large' | 'headline' | 'chapter' | 'subheading' | 'label';
	theme: 'standard' | 'inverse';
	children: string;
};

export type BodyProps = {
	type: 'small' | 'large';
	theme: 'standard' | 'inverse';
	children: string;
};


export type InverseAttribute = {
	'data-o3-theme'?: 'inverse';
};
