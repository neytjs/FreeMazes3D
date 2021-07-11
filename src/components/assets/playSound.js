import {Sound} from "@babylonjs/core/Audio";

function playSound(sound_file, time, scene, callback) {
  let sound_object = {};
  switch (sound_file) {
    case "8bit_bomb_explosion":
      sound_object = new Sound("Sound", "./sound/8bit_bomb_explosion.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "anchor_action_sum":
      sound_object = new Sound("Sound", "./sound/anchor_action_sum.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "anchor_action_ind":
      sound_object = new Sound("Sound", "./sound/anchor_action_ind.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "aargh2":
      sound_object = new Sound("Sound", "./sound/aargh2.ogg", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "bubble_01":
      sound_object = new Sound("Sound", "./sound/bubble_01.ogg", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "cloth_inventory":
      sound_object = new Sound("Sound", "./sound/cloth_inventory.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "DoorClose04":
      sound_object = new Sound("Sound", "./sound/DoorClose04.ogg", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "Falling_Rock":
      sound_object = new Sound("Sound", "./sound/Falling_Rock.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "ghost":
      sound_object = new Sound("Sound", "./sound/ghost.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "load":
      sound_object = new Sound("Sound", "./sound/load.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "misc_menu_3":
      sound_object = new Sound("Sound", "./sound/misc_menu_3.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "misc_menu_4":
      sound_object = new Sound("Sound", "./sound/misc_menu_4.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "mouseclick":
      sound_object = new Sound("Sound", "./sound/mouseclick.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "MS_Realization":
      sound_object = new Sound("Sound", "./sound/MS_Realization.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "negative":
      sound_object = new Sound("Sound", "./sound/negative.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "negative_2":
      sound_object = new Sound("Sound", "./sound/negative_2.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "positive":
      sound_object = new Sound("Sound", "./sound/positive.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "Rifleprimary2":
      sound_object = new Sound("Sound", "./sound/Rifleprimary2.ogg", scene, null, {
        loop: false,
        autoplay: true,
        volume: 0.6
      });
    break;
    case "ring_inventory":
      sound_object = new Sound("Sound", "./sound/ring_inventory.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "save":
      sound_object = new Sound("Sound", "./sound/save.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "sell_buy_item":
      sound_object = new Sound("Sound", "./sound/sell_buy_item.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "swish_2":
      sound_object = new Sound("Sound", "./sound/swish_2.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "swish_4":
      sound_object = new Sound("Sound", "./sound/swish_4.wav", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
    case "tir":
      sound_object = new Sound("Sound", "./sound/tir.mp3", scene, null, {
        loop: false,
        autoplay: true
      });
    break;
  }

// forcing garbage collection
  setTimeout(function() {
    sound_object.dispose(true, true);
    sound_object = null;
  }, time);
}

export {playSound};
