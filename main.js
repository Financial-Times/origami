import IGAudio from './src/js/audio';

const constructAll = () => {
  const IGAudioObjects = [];

  const audio_components = document.getElementsByClassName("ig-audio");

  for (let i = 0; i < audio_components.length; i++) {
    const a = audio_components[i];
    const audioURL = a.getElementsByTagName('source')[0].getAttribute('src');
    const igaudio = new IGAudio(a, audioURL);

    // keep track of igaudio objects
    IGAudioObjects.push(igaudio);
  }

  document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default IGAudio;
