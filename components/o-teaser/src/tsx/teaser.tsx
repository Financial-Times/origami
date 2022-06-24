import Container from './container';
import Content from './content';
import CustomSlot from './custom-slot';
import Headshot from './headshot';
import Image from './image';
import {Meta} from './meta';
import RelatedLinks from './related-links';
import {Status} from './status/status';
import {Standfirst} from './standfirst';
import {Title} from './title';
import {Video} from './video';
import {media} from './concerns/rules';
import {TeaserProps} from './prop-types';

export function Teaser(props: TeaserProps) {
	return (
		<Container {...props}>
			<Content>
				{props.showMeta && <Meta {...props} />}
				{media(props) === 'video' && <Video {...props} />}
				{props.showTitle && <Title {...props} />}
				{props.showStandfirst && <Standfirst {...props} />}
				{props.showStatus && <Status {...props} />}
				{props.showCustomSlot && <CustomSlot {...props} />}
				{media(props) === 'headshot' && <Headshot {...props} />}
			</Content>
			{media(props) === 'image' && <Image {...props} />}
			{props.showRelatedLinks && <RelatedLinks {...props} />}
		</Container>
	);
}
