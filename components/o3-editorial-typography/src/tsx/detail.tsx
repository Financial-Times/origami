import {DetailProps, TopicTagProps, QuoteProps, BigNumberProps, BylineProps} from '../types';
import {getDataAttributes} from './utils';

export const TopicTag = ({href, theme, children}: TopicTagProps) => {
	const attributes = getDataAttributes(theme);
	const HtmlElement = href ? 'a' : 'span';
	return (
		<HtmlElement href={href} className="o3-editorial-typography-topic-tag" {...attributes}>
			{children}
		</HtmlElement>
	);
};

export const StandFirst = ({theme, children}: DetailProps) => {
	const attributes = getDataAttributes(theme);

	return (
		<p
			className="o3-editorial-typography-standfirst"
			{...attributes}>
			{children}
		</p>
	);
};

export const Caption = ({theme, children}: DetailProps) => {
	const attributes = getDataAttributes(theme);

	return (
		<figcaption className="o3-editorial-typography-caption" {...attributes}>
			{children}
		</figcaption>
	);
};

export const Quote = ({
	theme,
	type = "block",
	quoteAuthor,
	quoteCaption,
	quoteIcon = true,
	children,
}: QuoteProps) => {
	const attributes = getDataAttributes(theme, false, quoteIcon);
	const classNames = `o3-editorial-typography-${type}quote`;
	return (
		<blockquote className={classNames} {...attributes}>
			<p>{children}</p>
			<cite>
				<span className={`o3-editorial-typography-${type}quote__author`}>
					{quoteAuthor}
				</span>
				<span className={`o3-editorial-typography-${type}quote__source`}>
					{quoteCaption}
				</span>
			</cite>
		</blockquote>
	);
};

export const BigNumber = ({theme, title, children}: BigNumberProps) => {
	const attributes = getDataAttributes(theme);

	return (
		<div className="o3-editorial-typography-big-number" {...attributes}>
			<div className="o3-editorial-typography-big-number__title">{title}</div>
			<div className="o3-editorial-typography-big-number__content">
				{children}
			</div>
		</div>
	);
};

export const Byline = ({theme, children}: BylineProps) => {
	const attributes = getDataAttributes(theme);

	return (
		<div className="o3-editorial-typography-byline" {...attributes}>
			{children}
		</div>
	);
};
