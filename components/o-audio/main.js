import oAudio from './src/js/o-audio.js';
import Tracking from './src/js/tracking.js';

const constructAll = function () {
	oAudio.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default oAudio;

export { Tracking };
