import {Sound} from "@babylonjs/core/Audio";

function fillingTubeOb21(ob21, scene) {
  if (ob21.liquid1.filling === true) {
    raiseLiquid(1);
  }
  if (ob21.liquid2.filling === true) {
    raiseLiquid(2);
  }
  if (ob21.liquid3.filling === true) {
    raiseLiquid(3);
  }
  if (ob21.liquid4.filling === true) {
    raiseLiquid(4);
  }
  if (ob21.liquid5.filling === true) {
    raiseLiquid(5);
  }
  if (ob21.liquid6.filling === true) {
    raiseLiquid(6);
  }

  function raiseLiquid(liquid_num) {
    let liquid = scene.getMeshByName("Ob21_liquid" + liquid_num);
    if (ob21["liquid" + liquid_num].playing_sound === false) {
      ob21["liquid" + liquid_num].playing_sound = true;
      let fillingSound = new Sound("liquidSound"+liquid_num, "./sound/AcidBubble.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 75 });
      fillingSound.attachToMesh(liquid);
    }
    const max_fill = 10;
    if (liquid.scaling.y < max_fill) {
      liquid.scaling.y = liquid.scaling.y + 0.05;
      ob21["liquid" + liquid_num].level = Math.floor(liquid.scaling.y * 10);
    } else {
      let lSound = scene.getSoundByName("liquidSound"+liquid_num);
      if (lSound) {
        lSound.detachFromMesh(liquid);
        lSound.dispose(true, true);
        lSound = null;
      }
      ob21["liquid" + liquid_num].playing_sound = false;
      ob21["liquid" + liquid_num].filling = false;
      ob21["liquid" + liquid_num].level = Math.floor(liquid.scaling.y * 10);
    }
  }
}

export {fillingTubeOb21};
