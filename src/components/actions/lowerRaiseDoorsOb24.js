import {Sound} from "@babylonjs/core/Audio";

function lowerRaiseDoorsOb24(scene, solved, ob24) {
  if (solved.solvedP24 === false && (ob24.lower_doors === true || ob24.raise_doors === true)) {
    let door = {};
    if (ob24.lower_doors === true) {
      door = scene.getMeshByName("teleporterOb24a");
    }
    if (ob24.raise_doors === true) {
      door = scene.getMeshByName("teleporterOb24b");
    }

    if (ob24.playing_door_sound === false && (ob24.raise_doors === true || (ob24.lower_doors === true && ob24.liquid_status === ""))) {
      ob24.playing_door_sound = true;
      let doorSound = new Sound("doorSoundOb22", "./sound/engine.mp3", scene, null, { loop: true, autoplay: true, volume: 0.5, maxDistance: 80 });
      doorSound.attachToMesh(door);
    }
    let soundOnOff = () => {
      let dSound = scene.getSoundByName("doorSoundOb22");
      if (dSound) {
        dSound.detachFromMesh(door);
        dSound.dispose(true, true);
        dSound = null;
        ob24.playing_door_sound = false;
      }
    }
    const rate = 0.08;

    if (ob24.lower_doors === true && ob24.liquid_status === "") {
      let doorOb24_a = scene.getMeshByName("doorOb24_a");
      let doorOb24_b = scene.getMeshByName("doorOb24_b");
      let doorOb24_c = scene.getMeshByName("doorOb24_c");
      let doorOb24_aBarrier = scene.getMeshByName("doorOb24_aBarrier");
      let doorOb24_bBarrier = scene.getMeshByName("doorOb24_bBarrier");
      let doorOb24_cBarrier = scene.getMeshByName("doorOb24_cBarrier");
      if (doorOb24_a.position.y > -3.5) {
        doorOb24_a.position.y -= rate;
      }
      if (doorOb24_b.position.y > -3.5) {
        doorOb24_b.position.y -= rate;
      } else if (doorOb24_b.position.y <= -3.5) {
        ob24.lower_doors = false;
        doorOb24_aBarrier.position.y = -3.5;
        doorOb24_bBarrier.position.y = -3.5;
        doorOb24_cBarrier.position.y = 2021.5;
        soundOnOff();
      }
      doorOb24_c.position.y = 2021.5;
    }
    if (ob24.raise_doors === true) {
      let doorOb24_a = scene.getMeshByName("doorOb24_a");
      let doorOb24_b = scene.getMeshByName("doorOb24_b");
      let doorOb24_c = scene.getMeshByName("doorOb24_c");
      doorOb24_a.position.y = 3.5;
      doorOb24_b.position.y = 3.5;
      let doorOb24_aBarrier = scene.getMeshByName("doorOb24_aBarrier");
      let doorOb24_bBarrier = scene.getMeshByName("doorOb24_bBarrier");
      let doorOb24_cBarrier = scene.getMeshByName("doorOb24_cBarrier");
      doorOb24_aBarrier.position.y = 3.5;
      doorOb24_bBarrier.position.y = 3.5;
      doorOb24_cBarrier.position.y = 2028.5;
      if (doorOb24_c.position.y < 2028.5) {
        doorOb24_c.position.y += rate;
      } else if (doorOb24_c.position.y >= 2028.5) {
        soundOnOff();
        ob24.raise_doors = false;
        ob24.Ob24_wheel1 = false;
        ob24.Ob24_wheel2 = false;
        ob24.Ob24_wheel3 = false;
        ob24.Ob24_wheel4 = false;
        ob24.machine1 = false;
        ob24.machine2 = false;
        ob24.machinePipeSmoke1.dispose();
        ob24.machinePipeSmoke1 = false;
        ob24.machinePipeSmoke2.dispose();
        ob24.machinePipeSmoke2 = false;
        ob24.machinePipeSmoke3.dispose();
        ob24.machinePipeSmoke3 = false;
        ob24.machinePipeSmoke4.dispose();
        ob24.machinePipeSmoke4 = false;
        let teleporterOb24a = scene.getMeshByName("teleporterOb24a");
        ob24.machine_sound.detachFromMesh(teleporterOb24a);
        ob24.machine_sound.dispose(true, true);
        ob24.machine_sound = null;
        ob24.machine_sound = false;
      }
    }
  }
}

export {lowerRaiseDoorsOb24};
