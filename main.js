import IGAudio from './src/js/audio';

const constructAll = () => {
  var IGAudioObjects = [];

  var audio_components = document.getElementsByClassName("ig-audio");

  for (var i = 0; i < audio_components.length; i++) {
    var a = audio_components[i];
    var audioURL = a.getElementsByTagName('source')[0].getAttribute('src');
    var igaudio = new IGAudio(a, audioURL);

    IGAudioObjects.push(igaudio); // keep track of igaudio objects
  }

  document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default IGAudio;
