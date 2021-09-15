import Video from './src/js/video.js';

const constructAll = () => {
	Video.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Video;
