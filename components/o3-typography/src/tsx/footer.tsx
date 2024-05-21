import {ReactNode} from 'react';
import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

type FooterProps = {
	children: ReactNode;
	weight: 'normal' | 'bold';
} & StyleArguments;
export const Footer: React.FC<FooterProps> = ({
	children,
	weight = 'normal',
	theme,
}: FooterProps) => {
	const classList = ['o3-typography-footer'];

	if (weight === 'bold') {
		classList.push('o3-typography-bold');
	}
	return (
		<footer className={classList.join(' ')} {...getStyleAttributes({theme})}>
			{children}
		</footer>
	);
};
