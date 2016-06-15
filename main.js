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

		// initialize player
		this.targetObject.classList.add("initialized") // turns on audio player styles
		this.targetObject.innerHTML = "<span class='ig-audio-content'>" + this.targetObject.innerHTML + "</span>";
		this.targetObject.getElementsByTagName("audio")[0].removeAttribute("controls"); // hide HTML audio player controls
		this.targetObject.getElementsByTagName("audio")[0].style.display = "none";

		// create play button + progress bar divs
		var playButton = document.createElement('span')
			playButton.classList.add("playButton");
		var innerContent = this.targetObject.getElementsByClassName("ig-audio-content")[0]
		targetObject.insertBefore(playButton, innerContent);

		// event handlers
		this.targetObject.addEventListener("click", () => this.toggleAudio(), false) // play/pause on click
		this.audio.addEventListener("ended", () => this.toggleAudio(), false) // toggle back to off after clip ends
		this.audio.addEventListener("timeupdate", () => this.adjustProgressBar(), false)
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

	adjustProgressBar() {
		const timeStamp = this.audio.currentTime;
		const totalDuration = this.audio.duration;

		const percentPlayed = timeStamp*100 / totalDuration;
		console.log(timeStamp, totalDuration, percentPlayed)

		const left = 'rgba(24, 80, 131,.35)';
        const right = 'rgba(24, 80, 131,.15)';
        this.targetObject.getElementsByClassName("ig-audio-content")[0].setAttribute("style",
            "background: linear-gradient(to right, "+left+" "+percentPlayed+"%, "+right+" "+(percentPlayed+1)+"%");
	}

}


var audio_components = document.getElementsByClassName("ig-audio");

for (var a of audio_components) {
	const audioURL = a.getAttribute('data-audiourl')
	const igaudio = new IGAudio(a, audioURL)
}
