import {ImageSizes} from './concerns/constants';
import imageService from './concerns/image-service';
import {Byline, Headshot} from './props';
import Link from './link';

interface BylineProps extends Byline, Headshot {
	showByline?: boolean;
	showBylineHeadshot?: boolean;
}

const Headshot = ({headshot}: {headshot: string}) => (
	<img
		className="o-teaser__byline__headshot"
		width={ImageSizes.BylineHeadshot}
		height={ImageSizes.BylineHeadshot}
		alt=""
		aria-hidden="true"
		src={imageService(headshot, ImageSizes.BylineHeadshot, {})}
	/>
);

export default ({showByline, byline, showBylineHeadshot, headshot}: BylineProps) => {
	return showByline && byline && byline.length > 0 ? (
		<div className="o-teaser__byline">
			{showBylineHeadshot && headshot && <Headshot headshot={headshot} />}

			<div className="o-teaser__byline__author-links">
				{byline.map((el) => (
					Array.isArray(el) ?
						<Link
							url={el[1]}
							attrs={{'data-trackable': 'author-link'}}
						>
							{el[0]}
						</Link> : el
				))}
			</div>
		</div>
	) : null;
};
