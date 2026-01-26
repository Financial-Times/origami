import Container from './container';
import Content from './content';
import CustomSlot from './custom-slot';
import Headshot from './headshot';
import Byline from './byline';
import Image from './image';
import Meta from './meta';
import RelatedLinks from './related-links';
import Status from './status';
import Standfirst from './standfirst';
import Title from './title';
import Video from './video';
import {media} from './concerns/rules';
import {TeaserProps} from './props';

export function Teaser(props: TeaserProps) {
	return (
		<Container {...props}>
			<Content>
				{props.showMeta ? <Meta {...props} /> : null}
				{media(props) === 'video' ? <Video {...props} /> : null}
				{props.showTitle ? <Title {...props} /> : null}
				{props.showStandfirst ? <Standfirst {...props} /> : null}
				{props.showByline ? <Byline {...props} /> : null}
				{props.showStatus ? <Status {...props} /> : null}
				{props.showCustomSlot ? <CustomSlot {...props} /> : null}
				{
					/* Headshot is a legacy element.
					The Byline component already includes a headshot.
					Only render the Headshot when the media rule `headshot` is true and `showByline` is falsy. */
					media(props) === 'headshot' ? <Headshot {...props} /> : null
				}
			</Content>
			{media(props) === 'image' ? <Image {...props} /> : null}
			{props.showRelatedLinks ? <RelatedLinks {...props} /> : null}
		</Container>
	);
}
