import {Sound} from "@babylonjs/core/Audio";

function emptyTubeOb21(ob21, scene) {
  if (ob21.liquid1.emptying === true) {
    lowerLiquid(1);
  }
  if (ob21.liquid2.emptying === true) {
    lowerLiquid(2);
  }
  if (ob21.liquid3.emptying === true) {
    lowerLiquid(3);
  }
  if (ob21.liquid4.emptying === true) {
    lowerLiquid(4);
  }
  if (ob21.liquid5.emptying === true) {
    lowerLiquid(5);
  }
  if (ob21.liquid6.emptying === true) {
    lowerLiquid(6);
  }

  function lowerLiquid(liquid_num) {
    let liquid = scene.getMeshByName("Ob21_liquid" + liquid_num);
    if (ob21["liquid" + liquid_num].playing_sound === false) {
      ob21["liquid" + liquid_num].playing_sound = true;
      let emptyingSound = new Sound("liquidSound"+liquid_num, "./sound/AcidBubble.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 75 });
      emptyingSound.attachToMesh(liquid);
    }
    const empty = 1;
    if (liquid.scaling.y > empty) {
      liquid.scaling.y = liquid.scaling.y - 0.025;
      ob21["liquid" + liquid_num].level = Math.floor(liquid.scaling.y * 10);
    } else {
      let lSound = scene.getSoundByName("liquidSound"+liquid_num);
      if (lSound) {
        lSound.detachFromMesh(liquid);
        lSound.dispose(true, true);
        lSound = null;
      }
      ob21["liquid" + liquid_num].playing_sound = false;
      ob21["liquid" + liquid_num].emptying = false;
      ob21["liquid" + liquid_num].level = Math.floor(liquid.scaling.y * 10);
    }
  }
}

export {emptyTubeOb21};
