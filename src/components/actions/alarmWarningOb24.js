import {Color3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";

function alarmWarningOb24(ob24, scene) {
  if (ob24.alarm === true) {
    ob24.alarm = false;
    let red = false;
    let warningSoundSourceOb24 = scene.getMeshByName("warningSoundSourceOb24");
    let warningSound = {};

    let flashAlarm = () => {
      red = red ? false : true;
      for (let i = 1, length = 4; i <= length; i++) {
        let bulb = scene.getMeshByName("bulbOb24_" + i);
        bulb.material.diffuseColor = red ? new Color3(1, 0, 0) : new Color3(0.55, 0.48, 0.48);
        bulb.material.specularColor = red ? new Color3(1, 0, 0) : new Color3(0.55, 0.48, 0.48);
        bulb.material.emissiveColor = red ? new Color3(1, 0, 0) : new Color3(0.55, 0.48, 0.48);
        bulb.material.ambientColor = red ? new Color3(1, 0, 0) : new Color3(0.55, 0.48, 0.48);
      }
      if (red) {
        warningSound = new Sound("warningSoundOb24", "./sound/warn.mp3", scene, null, { loop: false, autoplay: true, volume: 1, maxDistance: 100 });
        warningSound.attachToMesh(warningSoundSourceOb24);
      }

      if (ob24.adjusting_liquid_level === true) {
        setTimeout(() => {
          flashAlarm();
        }, 750);
      } else if (ob24.adjusting_liquid_level === false) {
        for (let i = 1, length = 4; i <= length; i++) {
          let bulb = scene.getMeshByName("bulbOb24_" + i);
          bulb.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
          bulb.material.specularColor = new Color3(0.55, 0.48, 0.48);
          bulb.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
          bulb.material.ambientColor = new Color3(0.55, 0.48, 0.48);
        }
        const def_val = ob24.default_lava;
        ob24.current_lava = def_val;
        let liquid = scene.getMeshByName("lavaOb24");
        let liquidGlow = scene.getMeshByName("lavaGlowOb24");
        liquid.position.y = def_val;
        liquidGlow.position.y = def_val + 0.25;
        warningSound.detachFromMesh(warningSoundSourceOb24);
        warningSound.dispose(true, true);
        warningSound = null;
      }
    }
    flashAlarm();
  }
}

export {alarmWarningOb24};
