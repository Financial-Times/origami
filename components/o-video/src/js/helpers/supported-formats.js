const formats = {
	mpeg4: [
		'video/mp4; codecs="mp4v.20.8"'
	],
	h264: [
		'video/mp4; codecs="avc1.42E01E"',
		'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
	],
	ogg: [
		'video/ogg; codecs="theora"'
	],
	webm: [
		'video/webm; codecs="vp8, vorbis"'
	]
};

function supportedFormats () {
	const testEl = document.createElement('video');
	const supported = [];

	try {
		Object.keys(formats).forEach(format => {
			if (formats[format].some(type => testEl.canPlayType(type))) {
				supported.push(format);
			}
		});
	} catch(e) { }

	return supported;
}

export default supportedFormats;
