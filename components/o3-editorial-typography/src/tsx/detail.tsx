import {DetailProps, QuoteProps, BigNumberProps, Attributes} from '../types';

export const Detail = ({type, theme, children}: DetailProps) => {
	const classNames = `o3-editorial-typography--${type}`;
	const attributes: Attributes = {};
	if (theme === 'inverse') {
		attributes['data-o3-theme'] = theme;
	}

	return (
		<div className={classNames} {...attributes}>
			{children}
		</div>
	);
};

export const Quote = ({
	theme,
	quoteAuthor,
	quoteSource,
	quoteIcon = true,
	children,
}: QuoteProps) => {
	const attributes: Attributes = {};
	if (theme === 'inverse') {
		attributes['data-o3-theme'] = theme;
	}
	attributes['data-o3-editorial-quote-icon'] = quoteIcon;

	return (
		<blockquote className="o3-editorial-typography--quote" {...attributes}>
			<p>{children}</p>
			<cite>
				<span className="o3-editorial-typography--quote-author">
					{quoteAuthor}
				</span>
				<span className="o3-editorial-typography--caption">{quoteSource}</span>
			</cite>
		</blockquote>
	);
};

export const BigNumber = ({theme, title, children}: BigNumberProps) => {
	const attributes: Attributes = {};
	if (theme === 'inverse') {
		attributes['data-o3-theme'] = theme;
	}

	return (
		<div className="o3-editorial-typography--big-number" {...attributes}>
			<div className="o3-editorial-typography--big-number-title">{title}</div>
			<div className="o3-editorial-typography--body-small">{children}</div>
		</div>
	);
};
