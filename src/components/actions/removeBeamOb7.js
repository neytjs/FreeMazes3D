import {playSound} from "../assets/playSound.js";

function removeBeamOb7(hit_name, ob7, scene, player) {
  let power = scene.getMeshByName(hit_name.substring(0, 6));
  power.dispose();
  ob7.power_counter = ob7.power_counter + 1;
  playSound("negative", 4500, scene);
  if (ob7.power_counter >= 3) {
    let hutBarrier = scene.getMeshByName("hutBarrier");
    let spear = scene.getMeshByName("hutSpear");
    if (hutBarrier) {
      let hBSound = scene.getSoundByName("hutBarrierSound");
      hBSound.detachFromMesh(hutBarrier);
      hBSound.dispose(true, true);
      hBSound = null;
      hutBarrier.dispose();
      spear.dispose();
      player.holding = "";
      ob7.holding = false;
    }
  }
}

export {removeBeamOb7};
