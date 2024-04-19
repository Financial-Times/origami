import {StyleArguments} from './getStyleAttributes';

export const Caption: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme}) => {
	return (
		<figcaption className="o3-typography o3-typography-caption">
			{children}
		</figcaption>
	);
};
