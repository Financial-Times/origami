import { h } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';

// these colours are tweaked from o-colors palette colours to make headshots look less washed out
const DEFAULT_TINT = '054593,d6d5d3';

export default ({ headshot, headshotTint }) => {
	const options = `tint=${headshotTint || DEFAULT_TINT}`;

	return headshot ? (
		<img
			className="o-teaser__headshot"
			width={ImageSizes.Headshot}
			height={ImageSizes.Headshot}
			alt=""
			aria-hidden="true"
			src={imageService(headshot, ImageSizes.Headshot, options)}
		/>
	) : null;
};
