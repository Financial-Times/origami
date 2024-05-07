import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

type WrapperProps = React.HTMLAttributes<HTMLDivElement> & StyleArguments;
export const Wrapper = ({children, theme}: WrapperProps) => {
	return (
		<div
			className="o3-typography o3-typography-wrapper"
			{...getStyleAttributes({theme})}>
			{children}
		</div>
	);
};
