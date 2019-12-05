import { h } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';

const DEFAULT_TINT = '054593,d6d5d3';

export default ({ headshot, headshotTint }) => {
	const options = {
		tint: DEFAULT_TINT || headshotTint,
	};

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
