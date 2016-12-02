class IGAudio {
  constructor(targetObject, audioURL) {
    this.targetObject = targetObject;
    this.audioURL = audioURL;
    this.audio = this.targetObject.getElementsByTagName('audio')[0];
    this.audioLength = undefined;
    this.playStart = 0;

    // initialize player
    // turns on audio player styles
    this.targetObject.classList.add('ig-audio--initialized');
    this.targetObject.innerHTML = `<span class='ig-audio-content'>${this.targetObject.innerHTML}</span>`;

    // hide HTML audio player controls
    this.targetObject.getElementsByTagName('audio')[0].removeAttribute('controls');
    this.targetObject.getElementsByTagName('audio')[0].style.display = 'none';

    // create play button + progress bar divs
    const playButton = document.createElement('span');
    playButton.classList.add('ig-audio--playbutton');
    const innerContent = this.targetObject.getElementsByClassName('ig-audio-content')[0];
    targetObject.insertBefore(playButton, innerContent);

    // create progress bar
    const progressBar = document.createElement('span');
    progressBar.classList.add('ig-audio-content-progressbar');
    innerContent.appendChild(progressBar);

    // event handlers to check for loaded metadata
    // load length into data objects
    this.audio.addEventListener('loadedmetadata', () => this.loadMetadata(), false);

    // add event handler to document for pausing all players
    document.addEventListener('g-audio.pauseAllPlayers', this.pause.bind(this));
  }

  loadMetadata() {
    this.audioLength = this.audio.duration;

    // set event handlers for everything else after metadata loaded
    // play/pause on click
    this.targetObject.getElementsByClassName('ig-audio--playbutton')[0].addEventListener('click', () => this.toggleAudio(), false);

    // toggle back to off after clip ends
    this.audio.addEventListener('ended', () => this.toggleAudio(), false);

    // skip on click
    this.targetObject.getElementsByClassName('ig-audio-content')[0].addEventListener('click', (e) => this.jumpTo(e), false);

    // adjust progress bar
    this.audio.addEventListener('timeupdate', () => this.adjustProgressBar(), false);
  }

  toggleAudio() {
    if (this.targetObject.classList.contains('pause')) {
      // console.log('go to pause')
      this.pause();
    } else {
      // console.log('go to play')
      this.play();
    }
  }

  jumpTo(e) {
    const clickedPosition = e.pageX - this.targetObject.getElementsByClassName('ig-audio-content')[0].offsetLeft;
    const totalWidth = this.targetObject.getElementsByClassName('ig-audio-content')[0].offsetWidth;
    const percentClickedThrough = clickedPosition / totalWidth;

    const totalDuration = this.audioLength;
    const goTo = totalDuration * percentClickedThrough;
    this.playStart = goTo;

    this.play(goTo);
  }

  play(playStart=this.playStart) {
    // stop all other audio instances from playing (pause)
    document.dispatchEvent(new CustomEvent('g-audio.pauseAllPlayers'));

    this.audio.currentTime = playStart;
    this.audio.play();
    this.targetObject.classList.add('pause');
  }

  pause() {
    this.audio.pause();

    // if at the end, then reset play start to 0
    if (this.audio.currentTime >= this.audioLength) {
      this.playStart = 0;
    } else { // otherwise, keep track of when we paused
      this.playStart = this.audio.currentTime;
    }

    this.targetObject.classList.remove('pause');
  }

  destroy() {
    return this.targetObject.getElementsByTagName('audio').destroy();
  }

  adjustProgressBar() {
    const timeStamp = this.audio.currentTime;
    const totalDuration = this.audioLength;

    const percentPlayed = Math.ceil(timeStamp*100 / totalDuration);
    // console.log(timeStamp, totalDuration, percentPlayed)

    const progressBar = this.targetObject.getElementsByClassName('ig-audio-content-progressbar')[0];
    progressBar.setAttribute('style', `width: ${percentPlayed}%`);
  }

}

export default IGAudio;
