import {Sound} from "@babylonjs/core/Audio";
import {arrayShuffler} from '../utilities/shuffler.js';

function playMusic(scene, sound_track) {
  let tracks = [
    "01_Falling_Organ",
    "1_great_pyramids",
    "3_life_in_forest",
    "Caketown_1",
    "enchantmentinstumental_sonartuning",
    "Its_Love",
    "My_Friends_SCC",
    "night_city_lights_free_to_use",
    "Roy_Battys_Boombox",
    "soled_distorted_memory",
    "VirusHunterToonStationLevelMusic"
  ];
  tracks = arrayShuffler(tracks);

  let counter = 0;
  function playTrack(track_name) {
    let settings = { loop: false, autoplay: true, volume: 0.35 };
    switch (track_name) {
      case "01_Falling_Organ":
        sound_track.song = new Sound("Music", "./music/01_Falling_Organ.mp3", scene, null, settings);
      break;
      case "1_great_pyramids":
        sound_track.song = new Sound("Music", "./music/1_great_pyramids.mp3", scene, null, settings);
      break;
      case "3_life_in_forest":
        sound_track.song = new Sound("Music", "./music/3_life_in_forest.mp3", scene, null, settings);
      break;
      case "Caketown_1":
        sound_track.song = new Sound("Music", "./music/Caketown_1.mp3", scene, null, settings);
      break;
      case "enchantmentinstumental_sonartuning":
        sound_track.song = new Sound("Music", "./music/enchantmentinstumental_sonartuning.mp3", scene, null, settings);
      break;
      case "Its_Love":
        sound_track.song = new Sound("Music", "./music/Its_Love.mp3", scene, null, settings);
      break;
      case "My_Friends_SCC":
        sound_track.song = new Sound("Music", "./music/My_Friends_SCC.mp3", scene, null, settings);
      break;
      case "night_city_lights_free_to_use":
        sound_track.song = new Sound("Music", "./music/night_city_lights_free_to_use.mp3", scene, null, settings);
      break;
      case "Roy_Battys_Boombox":
        sound_track.song = new Sound("Music", "./music/Roy_Battys_Boombox.mp3", scene, null, settings);
      break;
      case "soled_distorted_memory":
        sound_track.song = new Sound("Music", "./music/soled_distorted_memory.mp3", scene, null, settings);
      break;
      case "VirusHunterToonStationLevelMusic":
        sound_track.song = new Sound("Music", "./music/VirusHunterToonStationLevelMusic.mp3", scene, null, settings);
      break;
    }

    if (counter < tracks.length) {
      sound_track.song.onEndedObservable.addOnce(() => {
        counter = counter + 1;
        sound_track.song.dispose(true, true);
        sound_track.song = null;
        playTrack(tracks[counter]);
      });
    } else {
      counter = 0;
      playTrack(tracks[counter]);
    }
  }
  playTrack(tracks[counter]);
}

function playMenuMusic(scene, sound_track, auto_setting) {
  sound_track.menu_song = new Sound("Music", "./music/Good_Bye.mp3", scene, null, { loop: true, autoplay: auto_setting, volume: 0.5 });
}

export {playMusic, playMenuMusic};
