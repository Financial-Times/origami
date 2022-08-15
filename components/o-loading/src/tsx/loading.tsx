export interface LoadingProps {
	size: 'mini' | 'small' | 'medium' | 'large';
	theme: 'light' | 'dark';
}

export function Loading({theme, size}: LoadingProps) {
	return (
		<div className={`o-loading o-loading--${theme} o-loading--${size}`}></div>
	);
}
