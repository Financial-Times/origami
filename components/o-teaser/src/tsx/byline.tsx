import {ImageSizes} from './concerns/constants';
import imageService from './concerns/image-service';
import {Byline, Headshot} from './props';
import Link from './link';

interface BylineProps extends Byline, Headshot {
	showHeadshot?: boolean;
}

const Headshot = ({headshot, bylineLabel}: {headshot?: string, bylineLabel: string}) => (
	headshot ? (
		<img
			className="o-teaser__byline-link-headshot"
			width={ImageSizes.BylineHeadshot}
			height={ImageSizes.BylineHeadshot}
			alt={`${bylineLabel} headshot`}
			aria-hidden="true"
			src={imageService(headshot, ImageSizes.BylineHeadshot, {})}
			srcSet={`
				${imageService(headshot, ImageSizes.BylineHeadshot, {})} 1x,
				${imageService(headshot, ImageSizes.BylineHeadshot*2, {})} 2x
			`}
		/>
	) : null
);

const BylineLink = ({text, url, headshot, showHeadshot}: {text: string, url: string, headshot?: string, showHeadshot?: boolean}) => (
	<Link
		url={url}
		attrs={{
			'data-trackable': 'byline-link',
			className: "o-teaser__byline-link"
		}}
	>
		<>
			{showHeadshot && <Headshot headshot={headshot} bylineLabel={text} />}
			<span className="o-teaser__byline-link-label">{text}</span>
		</>
	</Link>
);

const BylineText = ({text}: {text: string}) => (
	text ? <span className="o-teaser__byline-text">{text}</span> : null
);
		

export default ({byline, showHeadshot}: BylineProps) => (
	Array.isArray(byline) && byline.length > 0 ? (
		<div className="o-teaser__byline">
			<div className="o-teaser__byline-links">
				{byline.map(([text, url, headshot], index) => (
					text && url ?
						<BylineLink
							key={`byline-link-${index}`}
							text={text} url={url}
							headshot={headshot}
							showHeadshot={showHeadshot}
						/>
						: <BylineText key={`byline-text-${index}`} text={text} />
				))}
			</div>
		</div>
	) : null
);
