function stopStartMusic(key, sound_track) {
  if (key === 112 || key === 27) {
    sound_track.menu = sound_track.menu ? false : true;

    if (sound_track.menu) {
      sound_track.menu_song.autoplay = true;
      sound_track.menu_song.play();
    }
    if (sound_track.song.isReady()) {
      sound_track.song.pause();
    } else {
      sound_track.song.autoplay = false;
    }
    if (sound_track.menu === false) {
      sound_track.song.play();
      if (sound_track.menu_song.isReady()) {
        sound_track.menu_song.stop();
      } else {
        sound_track.menu_song.autoplay = false;
      }
    }
  }
}

export {stopStartMusic};
