import gAudio from './src/js/audio.js';

const constructAll = function () {
	gAudio.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default gAudio;
