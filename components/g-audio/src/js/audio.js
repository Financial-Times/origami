function eventListener(audio, ev) {
	const progress = parseInt(
		(100 * audio.audio.currentTime) / audio.audioLength,
		10
	)

	// Dispatch progress event at around 10%, 25%, 50%, 75% and 100%
	if (ev.type === "timeupdate" && !shouldDispatch(progress)) {
		return
	}

	fireEvent(ev.type, audio)
}

function shouldDispatch(progress) {
	const relevantProgressPoints = [
		8, 9, 10, 11, 12, 23, 24, 25, 26, 27, 48, 49, 50, 51, 52, 73, 74, 75, 76,
		77, 100,
	]
	return relevantProgressPoints.includes(progress)
}

function addEvents(audio, events) {
	events.forEach(event => {
		audio.audio.addEventListener(event, eventListener.bind(this, audio))
	})
}

function fireEvent(action, audioObject, extraDetail = {}) {
	let playerType = audioObject.targetObject.classList.contains("g-audio--block")
		? "block"
		: "inline"

	const playButtonElement = audioObject.targetObject.getElementsByClassName(
		"g-audio--playbutton"
	)[0]
	const contentElement =
		audioObject.targetObject.getElementsByClassName("g-audio-content")[0]

	// playButtonHeight equals height of one line
	const playButtonHeight = playButtonElement.offsetHeight

	// check if it overflows
	const numLinesOfText = Math.floor(
		contentElement.offsetHeight / playButtonHeight
	)

	if (numLinesOfText > 1) {
		playerType = "inline-multiplelines"
	}

	// log as progress to keep consistency with o-video
	if (action === "timeupdate") {
		action = "progress"
	}

	const event = new CustomEvent("oTracking.event", {
		detail: Object.assign(
			{
				category: "audio",
				playerType,
				action,
				contentId: audioObject.audioURL,
				progress: parseInt(
					(100 * audioObject.audio.currentTime) / audioObject.audioLength,
					10
				),
				duration: parseInt(audioObject.audioLength, 10),
			},
			extraDetail
		),
		bubbles: true,
	})
	// console.log(playerType, action, parseInt(100 * audioObject.audio.currentTime / audioObject.audioLength, 10), parseInt(audioObject.audioLength, 10));
	document.body.dispatchEvent(event)
}

function unloadListener() {
	this.updateAmountListened()

	// console.log('amt listened', +(this.amountListened / 1000).toFixed(2), (((this.amountListened / 1000) / (this.audioLength)) * 100).toFixed(2));
	fireEvent("listened", this, {
		amount: Number(this.amountListened / 1000).toFixed(2),
		amountPercentage: Number(
			(this.amountListened / 1000 / this.audioLength) * 100
		).toFixed(2),
	})
}

class AudioPlayer {
	constructor(targetObject, audioURL) {
		this.targetObject = targetObject
		this.audioURL = audioURL
		this.audio = this.targetObject.getElementsByTagName("audio")[0]
		this.audioLength = undefined
		this.playStart = null
		// amount of the audio, in milliseconds, that has actually been listened to
		this.amountListened = 0
		this.dateTimePlayStart = undefined

		// initialize player
		// turns on audio player styles
		this.targetObject.classList.add("g-audio--initialized")
		this.targetObject.innerHTML = `<span class='g-audio-content'>${this.targetObject.innerHTML}</span>`

		// hide HTML audio player controls
		this.targetObject
			.getElementsByTagName("audio")[0]
			.removeAttribute("controls")
		this.targetObject.getElementsByTagName("audio")[0].style.display = "none"

		// create play button
		const playButton = document.createElement("span")
		playButton.classList.add("g-audio--playbutton")
		playButton.setAttribute("tabindex", 0)
		const innerContent =
			this.targetObject.getElementsByClassName("g-audio-content")[0]
		targetObject.insertBefore(playButton, innerContent)

		// event handlers to check for loaded metadata
		// load length into data objects
		this.audio.load()
		this.audio.addEventListener(
			"loadedmetadata",
			() => this.loadMetadata(),
			false
		)

		// add event handler to document for pausing all players
		document.addEventListener(
			"g-audio.pauseAllPlayers",
			this.pause.bind(this, true)
		)
	}

	loadMetadata() {
		this.audioLength = this.audio.duration

		// set event handlers for everything else after metadata loaded
		// play/pause on click or enter
		this.targetObject
			.getElementsByClassName("g-audio--playbutton")[0]
			.addEventListener("click", () => this.toggleAudio(), false)
		this.targetObject
			.getElementsByClassName("g-audio--playbutton")[0]
			.addEventListener(
				"keypress",
				e => {
					if (e.which === 13 || e.keyCode === 13) {
						return this.toggleAudio()
					}
				},
				false
			)

		// toggle back to off after clip ends
		this.audio.addEventListener("ended", () => this.toggleAudio(), false)

		// skip on click
		this.targetObject
			.getElementsByClassName("g-audio-content")[0]
			.addEventListener("click", e => this.jumpTo(e), false)

		// adjust progress bar
		this.audio.addEventListener(
			"timeupdate",
			() => this.adjustProgressBar(),
			false
		)

		// add tracking events
		addEvents(this, [
			"playing",
			"pause",
			"seeked",
			"timeupdate",
			"ended",
			"error",
			"stalled",
		])

		// send 'listened' event on page unload
		const unloadEventName =
			"onbeforeunload" in window ? "beforeunload" : "unload"
		window.addEventListener(unloadEventName, unloadListener.bind(this))
	}

	toggleAudio() {
		if (this.targetObject.classList.contains("g-audio-pause")) {
			// console.log('go to pause')
			this.pause()
		} else {
			// console.log('go to play')
			this.play()
		}
	}

	jumpTo(e) {
		const contentElement =
			this.targetObject.getElementsByClassName("g-audio-content")[0]
		const playButtonElement = this.targetObject.getElementsByClassName(
			"g-audio--playbutton"
		)[0]

		// playButtonHeight equals height of one line
		const playButtonHeight = playButtonElement.offsetHeight

		const clickedPositionX =
			e.pageX - contentElement.getBoundingClientRect().left

		// check if it overflows
		const numLinesOfText = Math.floor(
			contentElement.offsetHeight / playButtonHeight
		)

		if (numLinesOfText <= 1) {
			const clickedPosition = clickedPositionX
			const totalWidth = contentElement.offsetWidth
			const percentClickedThrough = clickedPosition / totalWidth
			const totalDuration = this.audioLength
			const goTo = totalDuration * percentClickedThrough
			this.playStart = goTo

			this.play(goTo)
		} else {
			this.toggleAudio()
		}
	}

	play(playStart = this.playStart) {
		// stop all other audio instances from playing (pause)
		document.dispatchEvent(new CustomEvent("g-audio.pauseAllPlayers"))

		if (playStart && this.audio.currentTime !== playStart) {
			this.audio.currentTime = playStart
		}
		this.audio.play()
		this.dateTimePlayStart = Date.now()
		this.targetObject.classList.add("g-audio-pause")
	}

	pause() {
		this.audio.pause()
		this.updateAmountListened()

		// if at the end, then reset play start to 0
		if (this.audio.currentTime >= this.audioLength) {
			this.playStart = 0
		} else {
			// otherwise, keep track of when we paused
			this.playStart = this.audio.currentTime
		}

		this.targetObject.classList.remove("g-audio-pause")
	}

	destroy() {
		return this.targetObject.getElementsByTagName("audio").destroy()
	}

	adjustProgressBar() {
		const timeStamp = this.audio.currentTime
		const totalDuration = this.audioLength

		const percentPlayed = Math.ceil((timeStamp * 100) / totalDuration)
		// console.log(timeStamp, totalDuration, percentPlayed)

		const progressBar =
			this.targetObject.getElementsByClassName("g-audio-content")[0]
		progressBar.setAttribute(
			"style",
			`background : -webkit-linear-gradient(left, rgba(175, 81, 108, 0.35) ${percentPlayed}%, rgba(175, 81, 108, 0.15) ${
				percentPlayed + 1
			}%); background : -moz-linear-gradient(left, rgba(175, 81, 108, 0.35) ${percentPlayed}%, rgba(175, 81, 108, 0.15) ${
				percentPlayed + 1
			}%); background : -o-linear-gradient(left, rgba(175, 81, 108, 0.35) ${percentPlayed}%, rgba(175, 81, 108, 0.15) ${
				percentPlayed + 1
			}%); background : linear-gradient(to right, rgba(175, 81, 108, 0.35) ${percentPlayed}%, rgba(175, 81, 108, 0.15) ${
				percentPlayed + 1
			}%); `
		)
	}

	updateAmountListened() {
		if (this.dateTimePlayStart !== undefined) {
			this.amountListened += Date.now() - this.dateTimePlayStart
			this.dateTimePlayStart = undefined
		}
	}

	// initialise g-audio components
	static init(rootElement) {
		if (!rootElement) {
			rootElement = document.body
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement)
		}

		/* If the root element has class g-audio, ie it is itself a gAudio component,
		 return a new AudioPlayer */
		if (rootElement instanceof HTMLElement && rootElement.matches(".g-audio")) {
			const audioURL = rootElement
				.getElementsByTagName("source")[0]
				.getAttribute("src")
			return new AudioPlayer(rootElement, audioURL)
		}

		// If the root element contains gAudio components, return new AudioPlayers for each one
		const audioComponents = rootElement.querySelectorAll(".g-audio")
		return [].map.call(audioComponents, el => {
			const audioURL = el.getElementsByTagName("source")[0].getAttribute("src")
			return new AudioPlayer(el, audioURL)
		})
	}
}

export default AudioPlayer
