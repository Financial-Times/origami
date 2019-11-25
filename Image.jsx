import { h } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';
import Link from './Link';

/**
 * Aspect Ratio
 * @param {{ width: Number, height: Number }} image
 * @returns {String|null}
 */
const aspectRatio = ({ width, height }) => {
	if (typeof width === 'number' && typeof height === 'number') {
		const ratio = (100 / width) * height;
		return ratio.toFixed(4) + '%';
	}

	return null;
};

const NormalImage = ({ src }) => (
	<img className="o-teaser__image" src={src} alt="" />
);

const LazyImage = ({ src, lazyLoad }) => {
	const lazyClassName = typeof lazyLoad === 'string' ? lazyLoad : '';
	return <img className={`o-teaser__image ${lazyClassName}`} data-src={src} alt="" />;
};

export default ({ relativeUrl, url, image, imageSize, imageLazyLoad, ...props }) => {
	const displayUrl = relativeUrl || url;
	const useImageService = !(image.url.startsWith('data:') || image.url.startsWith('blob:'));
	const imageSrc = useImageService ? imageService(image.url, ImageSizes[imageSize]) : image.url;
	const ImageComponent = imageLazyLoad ? LazyImage : NormalImage;

	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<div className="o-teaser__image-placeholder" style={{ paddingBottom: aspectRatio(image) }}>
				<Link {...props} url={displayUrl} attrs={{
					'data-trackable': 'image-link',
					'tabIndex': '-1',
					'aria-hidden': 'true',
				}}>
					<ImageComponent src={imageSrc} lazyLoad={imageLazyLoad} />
				</Link>
			</div>
		</div>
	) : null;
};
