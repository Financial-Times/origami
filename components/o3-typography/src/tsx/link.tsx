import React from 'react';
import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

enum Theme {
	standard = 'standard',
	inverse = 'inverse',
}

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
	StyleArguments & {
		children?: React.ReactNode;
		openInNewWindow?: boolean;
	};

const makeClasses = (theme: Theme): string => {
	const classes: string[] = [];

	if (theme !== Theme.standard) {
		classes.push(`o3-typography-link--${theme}`);
	}

	return classes.join(' ');
};

export const Link: React.FC<LinkProps> = ({
	theme = Theme.standard,
	children,
	openInNewWindow = false,
	...anchorProps
}) => {
	if (openInNewWindow) {
		Object.assign(anchorProps, {
			rel: 'noreferrer noopener',
			target: '_blank',
		});
	}
	return (
		<a
			className="o3-typography-link"
			{...getStyleAttributes({theme})}
			{...anchorProps}>
			{children}
		</a>
	);
};
