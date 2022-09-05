import {ParticleSystem} from "@babylonjs/core/Particles";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {arrayShuffler} from "../utilities/shuffler.js";

function poweredMachineOb22(scene, solved, ob22) {
  if (solved.solvedP22 === false && ob22.machine_status === "powered") {
    ob22.machine_status = "done";
    let top_ob22 = scene.getMeshByName("top_ob22");
    let particleSystem = new ParticleSystem("machineGardenSmoke1", 2000);
    particleSystem.particleTexture = new Texture("./imgs/circle.png");
    particleSystem.emitter = top_ob22;
    particleSystem.addColorGradient(0, new Color3(0.04, 0.29, 0.29));
    particleSystem.updateSpeed = 0.01;
    particleSystem.emitRate = 400;
    particleSystem.direction1 = new Vector3(-1, 4, 1);
    particleSystem.direction2 = new Vector3(1, 4, -1);
    particleSystem.minSize = 0.3;
    particleSystem.maxSize = 0.7;
    particleSystem.start();

    let machineSound = new Sound("machineGardenSound", "./sound/aircompressor.mp3", scene, null, { loop: true, autoplay: true, volume: 0.50, maxDistance: 75 });
    machineSound.attachToMesh(top_ob22);

    setTimeout(() => {
      let pure_gem_powder1 = scene.getMeshByName("purificationGemPowderOb22_1");
      pure_gem_powder1.position.y = 10.5;
      playSound("misc_menu_4", 2000, scene);
    }, 5000);
    setTimeout(() => {
      let pure_gem_powder2 = scene.getMeshByName("purificationGemPowderOb22_2");
      pure_gem_powder2.position.y = 10.5;
      playSound("misc_menu_4", 2000, scene);
      setTimeout(() => {
        machineSound.detachFromMesh(top_ob22);
        machineSound.dispose(true, true);
        machineSound = null;
        particleSystem.dispose(true, true);
        particleSystem = null;

        let powerDownSound = new Sound("powerDownSound", "./sound/qubodup-PowerDrain.ogg", scene, null, { loop: false, autoplay: true, volume: 0.8, maxDistance: 75 });
        powerDownSound.attachToMesh(top_ob22);
        setTimeout(() => {
          powerDownSound.detachFromMesh(top_ob22);
          powerDownSound.dispose(true, true);
          powerDownSound = null;
        }, 3000);
      }, 1000);
    }, 10000);
  }
}

export {poweredMachineOb22};
