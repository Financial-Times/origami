import {StyleArguments} from './getStyleAttributes';

type CaptionProps = {children: React.ReactNode};
export const Caption: React.FC<CaptionProps> = ({children}) => {
	return (
		<figcaption className="o3-typography o3-typography-caption">
			{children}
		</figcaption>
	);
};
