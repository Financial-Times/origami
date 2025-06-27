export interface HeadingProps {
	copy: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface BodyVariants {
	weight?: 'normal' | 'bold';
	style?: 'regular' | 'italic';
}

export interface BodyProps extends BodyVariants {
	children: React.JSX.Element | string | (React.JSX.Element|string)[];
};

export interface BodyVariantProps extends BodyVariants {
	children: string;
}
export interface LinkProps {
	children: string;
	href: string;
	attributes?: {
		[attribute: string]: string | boolean;
	};
	openInNewWindow?: boolean;
}
export interface SubScriptProps {
	copy: string;
}
export interface SuperScriptProps {
	copy: string;
}
export type StrongProps = Omit<BodyVariantProps, 'weight'>;

export type EmphasisProps = Omit<BodyVariantProps, 'style'>;

export interface CaptionProps {
	children: React.JSX.Element | string | (React.JSX.Element|string)[];
}
export interface FooterProps {
	copy: string;
}
export interface ListItemProps {
	children: React.JSX.Element | string | (React.JSX.Element|string)[];
}
export interface ListProps {
	children: ListItemProps[];
    ordered?: boolean;
}
export interface WrapperProps {
	children: React.JSX.Element[];
}

export function Wrapper({
	children = []
}: WrapperProps) {
	return (
        <div className='o-typography-wrapper'>
            {children}
        </div>
	);
}

export function Heading({
	level = 1,
	copy = ''
}: HeadingProps) {
    const HeadingTag = `h${level}`;
	return (
        <HeadingTag className={`o-typography-heading-level-${level}`}>
            {copy}
        </HeadingTag>
	);
}

export function Link({
	children = '',
	href = '#',
	openInNewWindow = false,
	attributes = {
	},
}: LinkProps) {
	const classNames = ['o-typography-link'];

	if(openInNewWindow) {
		Object.assign(attributes,  {
			rel: "noreferrer noopener",
			target: "_blank"
		});
	}

	return (
        <a href={href} className={classNames.join(' ')} {...attributes}>{children}</a>
	);
}

export function P({
	children = [],
	weight = 'normal',
	style = 'regular'
}: BodyProps) {
	const classNames = ['o-typography-body'];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <p className={classNames.join(' ')}>{children}</p>
	);
}

export function Body({
	children = [],
	weight = 'normal',
	style = 'regular'
}: BodyProps) {
	const classNames = ['o-typography-body'];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <div className={classNames.join(' ')}>{children}</div>
	);
}

export function Span({
	children = '',
	weight = 'normal',
	style = 'regular',
}: BodyVariantProps) {
	const classNames = [];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <span className={classNames.join(' ')}>{children}</span>
	);
}

export function Sup({
	children = '',
	weight = 'normal',
	style = 'regular',
}: BodyVariantProps) {
	const classNames = ['o-typography-sup'];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <span className={classNames.join(' ')}>{children}</span>
	);
}

export function Sub({
	children = '',
	weight = 'normal',
	style = 'regular',
}: BodyVariantProps) {
	const classNames = ['o-typography-sub'];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <span className={classNames.join(' ')}>{children}</span>
	);
}

export function Strong({
	children = '',
	style = 'regular',
}: StrongProps) {
	const classNames = ['o-typography-bold'];

	if(style == 'italic') {
		classNames.push('o-typography-italic');
	}

	return (
        <strong className={classNames.join(' ')}>{children}</strong>
	);
}

export function Em({
	children = '',
	weight = 'normal',
}: EmphasisProps) {
	const classNames = ['o-typography-italic'];

	if(weight == 'bold') {
		classNames.push('o-typography-bold');
	}

	return (
        <strong className={classNames.join(' ')}>{children}</strong>
	);
}

export function Footer({
	children = ''
}: EmphasisProps) {
	return <footer className='o-typography-footer'>{children}</footer>;
}

export function FigCaption({
	children = ''
}: CaptionProps) {
	return <figcaption className='o-typography-caption'>{children}</figcaption>;
}

export function List({
	children = [],
    ordered = false
}: ListProps) {
	const classNames = ['o-typography-list'];

	const ListTag = ordered ? 'ol' : 'ul';
	classNames.push(`o-typography-list--${ordered ? 'ordered' : 'unordered'}`);

	return <ListTag className={classNames.join(' ')}>
		{children}
	</ListTag>;
}

export function ListItem({
	children = []
}: ListItemProps) {
	return <li>
		{children}
	</li>;
}
