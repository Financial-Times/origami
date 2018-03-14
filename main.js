import AudioPlayer from './src/js/audio';

const constructAll = () => {
	const audio_components = document.querySelectorAll('.g-audio');

	for (let i = 0; i < audio_components.length; i++) {
		const a = audio_components[i];
		const audioURL = a.getElementsByTagName('source')[0].getAttribute('src');
		new AudioPlayer(a, audioURL);
	}

	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export { constructAll as init };
export default AudioPlayer;
