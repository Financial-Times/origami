import igAudio from './js/index';

const constructAll = () => {
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default igAudio;

var IGAudioObjects = [];

class IGAudio {
	constructor(targetObject, audioURL) {
		this.targetObject = targetObject;
		this.audioURL = audioURL;
		this.audio = this.targetObject.getElementsByTagName("audio")[0];

		IGAudioObjects.push(this); // keep track of igaudio objects

		this.targetObject.classList.add("initialized") // turns on audio player styles
		this.targetObject.getElementsByTagName("audio")[0].removeAttribute("controls"); // hide HTML audio player controls
		this.targetObject.getElementsByTagName("audio")[0].style.display = "none";

		this.targetObject.addEventListener("click", this.toggleAudio.bind(this), false) // play/pause on click
		this.audio.addEventListener("ended", this.toggleAudio.bind(this), false) // toggle back to off after clip ends
	}

	toggleAudio() {
		if (this.targetObject.classList.contains("pause")) {
			// console.log("go to pause")
			this.pause()
		} else {
			// console.log("go to play")
			this.play()
		}
	}

	play() {
		for (var igaudio of IGAudioObjects) { // stop all other audio instances from playing (pause)
			igaudio.pause()
		}
		this.audio.play()

		this.targetObject.classList.add("pause")
	}

	pause() {
		this.audio.pause()

		this.targetObject.classList.remove("pause")
	}

	destroy() {
		return this.targetObject.getElementsByTagName("audio").destroy();
	}

}


var audio_components = document.getElementsByClassName("ig-audio");

for (var a of audio_components) {
	const audioURL = a.getAttribute('data-audiourl')
	const igaudio = new IGAudio(a, audioURL)
}
