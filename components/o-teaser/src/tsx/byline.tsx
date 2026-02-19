import {ImageSizes} from './concerns/constants';
import imageService from './concerns/image-service';
import {Byline, Headshot} from './props';
import Link from './link';

interface BylineProps extends Byline, Headshot {
	showBylineHeadshot?: boolean;
}

const BylineLink = ({text, url, headshot, showBylineHeadshot}: {text: string, url: string, headshot?: string, showBylineHeadshot?: boolean}) => (
	<Link
		url={url}
		attrs={{
			'data-trackable': 'byline-link',
			className: "o-teaser__byline-link"
		}}
	>
		<>
			{showBylineHeadshot && headshot ?
				<img
					className="o-teaser__byline-headshot"
					width={ImageSizes.BylineHeadshot}
					height={ImageSizes.BylineHeadshot}
					alt=""
					aria-hidden="true"
					src={imageService(headshot, ImageSizes.BylineHeadshot, {})}
					srcSet={
						`${imageService(headshot, ImageSizes.BylineHeadshot*2, {})} 2x`
					}
				/>
			: null}
			<span className="o-teaser__byline-link-label">{text}</span>
		</>
	</Link>
);

const BylineText = ({text}: {text: string}) => (
	text ? <span className="o-teaser__byline-text">{text}</span> : null
);

export default ({byline, showBylineHeadshot}: BylineProps) => (
	Array.isArray(byline) && byline.length > 0 ? (
		<div className="o-teaser__byline">
			{byline.map(([text, url, headshot], index) => (
				text && url ?
					<BylineLink
						key={`byline-link-${index}-${text}`}
						text={text}
						url={url}
						headshot={headshot}
						showBylineHeadshot={showBylineHeadshot}
					/>
					: <BylineText key={`byline-text-${index}-${text}`} text={text} />
			))}
		</div>
	) : null
);
