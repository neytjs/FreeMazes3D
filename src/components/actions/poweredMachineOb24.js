import {ParticleSystem} from "@babylonjs/core/Particles";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";

function poweredMachineOb24(scene, solved, ob24) {
  if (solved.solvedP24 === false) {
    if (ob24.wheel_name === "Ob24_wheel1" || ob24.wheel_name === "Ob24_wheel2" || ob24.wheel_name === "Ob24_wheel3" || ob24.wheel_name === "Ob24_wheel4") {
      let final_num = ob24.wheel_name[ob24.wheel_name.length -1];
      let top_ob24 = scene.getMeshByName("top_ob24_" + final_num);
      let particleSystem = new ParticleSystem("machinePipeSmoke" + final_num, 2000);
      particleSystem.particleTexture = new Texture("./imgs/circle.png");
      particleSystem.emitter = top_ob24;
      particleSystem.addColorGradient(0, new Color3(0.33, 0.12, 0.04));
      particleSystem.updateSpeed = 0.01;
      particleSystem.emitRate = 2000;
      particleSystem.direction1 = new Vector3(-1, 4, 1);
      particleSystem.direction2 = new Vector3(1, 4, -1);
      particleSystem.minSize = 0.3;
      particleSystem.maxSize = 0.7;
      particleSystem.start();
      ob24["machinePipeSmoke"+final_num] = particleSystem;

      if (ob24.machine_sound === false && (ob24.Ob24_wheel1 === true || ob24.Ob24_wheel2 === true || ob24.Ob24_wheel3 === true || ob24.Ob24_wheel4 === true)) {
        let teleporterOb24a = scene.getMeshByName("teleporterOb24a");
        ob24.machine_sound = new Sound("machineSoundOb24", "./sound/generator_loop.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 75 });
        ob24.machine_sound.attachToMesh(teleporterOb24a);
      }

      if (ob24.Ob24_wheel1 === true && ob24.Ob24_wheel3 === true && ob24.machine1 === false) {
        ob24.machine1 = true;
      }
      if (ob24.Ob24_wheel2 === true && ob24.Ob24_wheel4 === true && ob24.machine2 === false) {
        ob24.machine2 = true;
      }
      if (ob24.machine1 === true && ob24.machine2 === true) {
        ob24.lower_doors = true;
      }
    }
  }
}

export {poweredMachineOb24};
