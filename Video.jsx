import { h } from '@financial-times/x-engine';
import Image from './Image';

// Re-format the data for use with o-video
const formatData = (props) => JSON.stringify({
	renditions: [ props.video ],
	mainImageUrl: props.image ? props.image.url : null,
});

// To prevent React from touching the DOM after mounting… return an empty <div />
// <https://reactjs.org/docs/integrating-with-other-libraries.html>
const Embed = (props) => {
	const showGuidance = typeof(props.showGuidance) === 'boolean' ? props.showGuidance : true;
	return (
	<div className="o-teaser__image-container js-image-container">
		<div
			className="o-video"
			data-o-component="o-video"
			data-o-video-id={props.id}
			data-o-video-data={formatData(props)}
			data-o-video-optimumwidth="640"
			data-o-video-optimumvideowidth="640"
			data-o-video-autorender="true"
			data-o-video-playsinline="true"
			data-o-video-show-guidance={showGuidance}
			data-o-video-placeholder="true"
			data-o-video-placeholder-info="[]"
			data-o-video-placeholder-hint="Play video"
			data-o-video-systemcode={props.systemCode} />
	</div>
	)
};

export default (props) => (
	<div className="o-teaser__video">
		<div className="o--if-js">
			<Embed {...props} />
		</div>
		<div className="o--if-no-js">
			<Image {...props} />
		</div>
	</div>
);
