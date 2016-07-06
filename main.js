import Video from './src/video.js';

const constructAll = () => {
	Video.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Video;
