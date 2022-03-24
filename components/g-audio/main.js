import gAudio from './src/js/audio.js';

const constructAll = function () {
	gAudio.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default gAudio;