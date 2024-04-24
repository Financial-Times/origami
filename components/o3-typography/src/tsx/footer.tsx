import {ReactNode} from 'react';

type FooterProps = {
	children: ReactNode;
	weight: 'normal' | 'bold';
};
export const Footer: React.FC<FooterProps> = ({
	children,
	weight = 'normal',
}: FooterProps) => {
	const classList = ['o3-typography', 'o3-typography-footer'];

	if (weight === 'bold') {
		classList.push('o3-typography-bold');
	}
	return <footer className={classList.join(' ')}>{children}</footer>;
};
