import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {ParticleSystem} from "@babylonjs/core/Particles";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function adjustLiquidLevelOb24(ob24, scene, player) {
  if (ob24.adjusting_liquid_level === true) {
    let liquid = scene.getMeshByName("lavaOb24");
    let liquidGlow = scene.getMeshByName("lavaGlowOb24");

  // lower
    if (liquid.position.y > ob24.current_lava && ob24.liquid_status === "lowering" && ob24.adjusting_liquid_level === true && liquid.position.y > ob24.min_lava) {
      liquid.position.y -= 0.02;
      liquidGlow.position.y -= 0.02;
    } else if (liquid.position.y <= ob24.current_lava && ob24.liquid_status === "lowering" && ob24.adjusting_liquid_level === true) {
      let bigButtonOb24_aGlow = scene.getMeshByName("bigButtonOb24_aGlow");
      bigButtonOb24_aGlow.position.y = -1000;
      ob24.adjusting_liquid_level = false;
      ob24.liquid_status = "";
      if (liquid.position.y <= ob24.min_lava) {
        let lavaDrainTopOb24 = scene.getMeshByName("lavaDrainTopOb24");
        let lSound = scene.getSoundByName("lavaSoundOb24");
        if (lSound) {
          lSound.detachFromMesh(liquid);
          lSound.dispose(true, true);
          lSound = null;
        }
        let particleSystem = new ParticleSystem("lavaDrainSmoke", 2000);
        particleSystem.particleTexture = new Texture("./imgs/circle.png");
        particleSystem.emitter = lavaDrainTopOb24;
        particleSystem.addColorGradient(0, new Color3(0.33, 0.12, 0.04));
        particleSystem.updateSpeed = 0.02;
        particleSystem.emitRate = 200;
        particleSystem.minLifeTime = 3.5;
        particleSystem.maxLifeTime = 5.5;
        particleSystem.direction1 = new Vector3(-1, 4, 1);
        particleSystem.direction2 = new Vector3(1, 4, -1);
        particleSystem.minSize = 2;
        particleSystem.maxSize = 6;
        particleSystem.start();
        let steamOb24 = scene.getMeshByName("steamOb24");
        steamOb24.position.y = 2012;
        let steamSound = new Sound("steamSoundOb24", "./sound/generator_loop.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 100 });
        steamSound.attachToMesh(steamOb24);
        let steamTopOb24 = scene.getMeshByName("steamTopOb24");
        steamTopOb24.position.y = 2024.5;
        player.holding = "";
        let blast = scene.getMeshByName("blastOb24");
        let blaster = scene.getMeshByName("blasterOb24");
        let blasterItem = scene.getMeshByName("blasterOb24item");
        blast.dispose();
        blaster.dispose();
        blasterItem.dispose();
      }
    }
  // raise
    if (liquid.position.y < ob24.current_lava && ob24.liquid_status === "raising" && ob24.adjusting_liquid_level === true) {
      liquid.position.y += 0.02;
      liquidGlow.position.y += 0.02;
    } else if (liquid.position.y >= ob24.current_lava && ob24.liquid_status === "raising" && ob24.adjusting_liquid_level === true) {
      let bigButtonOb24_aGlow = scene.getMeshByName("bigButtonOb24_aGlow");
      bigButtonOb24_aGlow.position.y = -1000;
      let bigButtonOb24_bGlow = scene.getMeshByName("bigButtonOb24_bGlow");
      bigButtonOb24_bGlow.position.y = -1000;
      ob24.adjusting_liquid_level = false;
      ob24.liquid_status = "";
      ob24.alarm = false;
    }
  }
}

export {adjustLiquidLevelOb24};
