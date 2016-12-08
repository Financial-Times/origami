/*global describe, it */

import expect from 'expect';
import AudioPlayer from './../src/js/audio';

describe('AudioPlayer API', function() {
  it('is defined', function() {
    expect(AudioPlayer).toBeA('function');
  });
});
