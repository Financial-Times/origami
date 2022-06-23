import Container from './container';
import Content from './content';
import CustomSlot from './custom-slot';
import Headshot from './headshot';
import Image from './image';
import {Meta} from './meta';
import RelatedLinks from './related-links';
import Status from './status';
import {Standfirst} from './standfirst';
import {Title} from './title';
import {Video} from './video';
import {media} from './concerns/rules';
import {TeaserProps} from './prop-types';

export function Teaser(props: TeaserProps) {
	console.log({props});

	return (
		<Container {...props}>
			<Content>
				{props.showMeta && <Meta {...props} />}
				{media(props) === 'video' && <Video {...props} />}
				{props.showTitle && <Title {...props} />}
				{props.showStandfirst && <Standfirst {...props} />}
				{props.showStatus ? <Status {...props} /> : null}
				{props.showCustomSlot ? <CustomSlot {...props} /> : null}
				{media(props) === 'headshot' ? <Headshot {...props} /> : null}
			</Content>
			{media(props) === 'image' ? <Image {...props} /> : null}
			{props.showRelatedLinks ? <RelatedLinks {...props} /> : null}
		</Container>
	);
}
