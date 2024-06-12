import {SummaryProps} from '../types/index';

export const Summary = ({children}: SummaryProps) => {
	const classes = ['o3-editorial-typography-summary'];
	const HtmlElement = typeof children === 'string' ? 'p' : 'div';
	return <HtmlElement className={classes.join(' ')}>{children}</HtmlElement>;
};
