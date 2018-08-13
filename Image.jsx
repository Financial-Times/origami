import { h } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';
import Link from './Link';

/**
 * Aspect Ratio
 * @param {Number} width
 * @param {Number} height
 * @returns {String|null}
 */
const aspectRatio = (width, height) => {
	if (typeof width === 'number' && typeof height === 'number') {
		const ratio = (100 / width) * height;
		return ratio.toFixed(4) + '%';
	}

	return null;
};

const NormalImage = ({ src, ratio }) => (
	<div className="o-teaser__image-placeholder" style={{ paddingBottom: ratio }}>
		<img className="o-teaser__image" src={src} alt="" />
	</div>
);

// HACK: class names are specific to n-image 😷
const LazyLoadImage = ({ src, ratio }) => (
	<div className="o-teaser__image-placeholder n-image-wrapper--lazy-loading" style={{ paddingBottom: ratio }}>
		<img className="o-teaser__image n-image--lazy-loading" data-src={src} alt="" />
	</div>
);

export default ({ relativeUrl, url, image, imageSize, imageLazyLoad, ...props }) => {
	const displayUrl = relativeUrl || url;
	const imageSrc = imageService(image.url, ImageSizes[imageSize]);
	const imageRatio = aspectRatio(image.width, image.height);
	const ImageComponent = imageLazyLoad ? LazyLoadImage : NormalImage;

	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<Link {...props} url={displayUrl} attrs={{
				'data-trackable': 'image-link',
				'tab-index': '-1',
				'aria-hidden': 'true',
			}}>
				<ImageComponent src={imageSrc} ratio={imageRatio} />
			</Link>
		</div>
	) : null;
};
