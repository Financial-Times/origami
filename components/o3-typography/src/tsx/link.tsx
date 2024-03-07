import React from 'react';

enum Theme {
	standard = 'standard',
	inverse = 'inverse',
}

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	theme?: Theme;
	children?: React.ReactNode;
};

const makeClasses = (theme: Theme): string => {
	const classes: string[] = ['o3-typography', 'o3-typography-link'];

	if (theme !== Theme.standard) {
		classes.push(`o3-typography-link--${theme}`);
	}

	return classes.join(' ');
};

export const Link: React.FC<LinkProps> = ({
	theme = Theme.standard,
	children,
	...anchorProps
}) => {
	return (
		<a className={makeClasses(theme)} {...anchorProps}>
			{children}
		</a>
	);
};
