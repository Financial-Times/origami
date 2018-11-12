import oAudio from './src/js/o-audio';

const constructAll = function () {
	oAudio.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oAudio;