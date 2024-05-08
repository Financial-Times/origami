import {DetailProps, QuoteProps, BigNumberProps, BylineProps} from '../types';
import {getAttributes} from './utils';

export const Detail = ({type, theme, children}: DetailProps) => {
	const classNames = `o3-editorial-typography-${type}`;
	const attributes = getAttributes(theme);

	return (
		<div className={classNames} {...attributes}>
			{children}
		</div>
	);
};

export const Quote = ({
	theme,
	quoteAuthor,
	quoteCaption,
	quoteIcon = true,
	children,
}: QuoteProps) => {
	const attributes = getAttributes(theme, false, quoteIcon);

	return (
		<blockquote className="o3-editorial-typography-quote" {...attributes}>
			<p>{children}</p>
			<cite>
				<span className="o3-editorial-typography-quote-author">
					{quoteAuthor}
				</span>
				<span className="o3-editorial-typography-quote-caption">
					{quoteCaption}
				</span>
			</cite>
		</blockquote>
	);
};

export const BigNumber = ({theme, title, children}: BigNumberProps) => {
	const attributes = getAttributes(theme);

	return (
		<div className="o3-editorial-typography-big-number" {...attributes}>
			<div className="o3-editorial-typography-big-number-title">{title}</div>
			<div className="o3-editorial-typography-big-number-content">
				{children}
			</div>
		</div>
	);
};

export const Byline = ({theme, children}: BylineProps) => {
	const attributes = getAttributes(theme);

	return (
		<div className="o3-editorial-typography-byline" {...attributes}>
			{children}
		</div>
	);
};
