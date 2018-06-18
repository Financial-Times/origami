import { h } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';
import Link from './Link';

/**
 * Aspect Ratio
 * @param {{ width: Number, height: Number }} width
 * @returns {String|null}
 */
const aspectRatio = ({ width, height }) => {
	if (typeof width === 'number' && typeof height === 'number') {
		const ratio = 100 / width * height;
		return ratio.toFixed(4) + '%';
	}

	return null;
};

export default ({ relativeUrl, url, image, imageSize, imageLazyload, ...props }) => {
	const displayUrl = relativeUrl || url;
	const displaySrc = imageService(image.url, ImageSizes[imageSize]);

	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<div className="o-teaser__image-placeholder" style={{ paddingBottom: aspectRatio(image) }}>
				<Link {...props} url={displayUrl} attrs={{
					'data-trackable': 'image-link',
					'tab-index': '-1',
					'aria-hidden': 'true',
 				}}>
					<img className="o-teaser__image" src={imageService(image.url, ImageSizes[imageSize])} alt="" />
				</Link>
			</div>
		</div>
	) : null;
};
