function stopStartMusic(key, sound_track, scene) {
  if (key === 112 || key === 27) {
    sound_track.menu = sound_track.menu ? false : true;

    if (sound_track.menu) {
      stopStartSounds(true, scene);
      sound_track.menu_song.autoplay = true;
      sound_track.menu_song.play();
    }
    if (sound_track.song.isReady()) {
      sound_track.song.pause();
    } else {
      sound_track.song.autoplay = false;
    }
    if (sound_track.menu === false) {
      stopStartSounds(false, scene);
      sound_track.song.play();
      if (sound_track.menu_song.isReady()) {
        sound_track.menu_song.stop();
      } else {
        sound_track.menu_song.autoplay = false;
      }
    }
  }
}

function stopStartSounds(stop, scene) {
  if (stop) {
    for (let i = 0, length = scene.mainSoundTrack.soundCollection.length; i < length; i++) {
      if (scene.mainSoundTrack.soundCollection[i].name != "Music") {
        let aSound = scene.getSoundByName(scene.mainSoundTrack.soundCollection[i].name);
        aSound.autoplay = false;
        aSound.pause();
      }
    }
  } else {
    for (let i = 0, length = scene.mainSoundTrack.soundCollection.length; i < length; i++) {
      if (scene.mainSoundTrack.soundCollection[i].name != "Music") {
        let aSound = scene.getSoundByName(scene.mainSoundTrack.soundCollection[i].name);
        aSound.autoplay = true;
        aSound.play();
      }
    }
  }
}

export {stopStartMusic};
