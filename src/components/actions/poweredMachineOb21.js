import {ParticleSystem} from "@babylonjs/core/Particles";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {arrayShuffler} from "../utilities/shuffler.js";

function poweredMachineOb21(ob21, solved, obstacle_objects, forcefield_objects, scene, score, global_language) {
  if (ob21.powered && ob21.running === false) {
    ob21.powered = false;
    if (ob21.running === true) {
      return false;
    }

    let innerFunction = () => {
      ob21.running = true;

      let top1_ob21 = scene.getMeshByName("top1_ob21");
      let particleSystem1 = new ParticleSystem("machineSmoke1", 2000);
      particleSystem1.particleTexture = new Texture("./imgs/circle.png");
      particleSystem1.emitter = top1_ob21;
      particleSystem1.addColorGradient(0, new Color3(0.33, 0.12, 0.04));
      particleSystem1.updateSpeed = 0.01;
      particleSystem1.emitRate = 800;
      particleSystem1.direction1 = new Vector3(-1, 4, 1);
      particleSystem1.direction2 = new Vector3(1, 4, -1);
      particleSystem1.minSize = 0.3;
      particleSystem1.maxSize = 0.7;
      particleSystem1.start();

      let top2_ob21 = scene.getMeshByName("top2_ob21");
      let particleSystem2 = new ParticleSystem("machineSmoke2", 2000);
      particleSystem2.particleTexture = new Texture("./imgs/circle.png");
      particleSystem2.emitter = top2_ob21;
      particleSystem2.addColorGradient(0, new Color3(0.33, 0.12, 0.04));
      particleSystem2.updateSpeed = 0.01;
      particleSystem2.emitRate = 800;
      particleSystem2.direction1 = new Vector3(-1, 4, 1);
      particleSystem2.direction2 = new Vector3(1, 4, -1);
      particleSystem2.minSize = 0.3;
      particleSystem2.maxSize = 0.7;
      particleSystem2.start();

      let machineSound = new Sound("machineSound", "./sound/aircompressor.mp3", scene, null, { loop: true, autoplay: true, volume: 0.50, maxDistance: 75 });
      machineSound.attachToMesh(top1_ob21);

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      let nums = [1, 2, 3, 4, 5, 6];
      nums = arrayShuffler(nums);

      setTimeout(() => {
        ob21["liquid" + nums[0]].emptying = true;
      }, getRandomInt(1000, 3500));
      setTimeout(() => {
        ob21["liquid" + nums[1]].emptying = true;
      }, getRandomInt(6000, 9000));
      setTimeout(() => {
        ob21["liquid" + nums[2]].emptying = true;
      }, getRandomInt(10000, 13000));
      setTimeout(() => {
        ob21["liquid" + nums[3]].emptying = true;
      }, getRandomInt(15000, 19000));
      setTimeout(() => {
        ob21["liquid" + nums[4]].emptying = true;
      }, getRandomInt(19500, 22000));
      setTimeout(() => {
        ob21["liquid" + nums[5]].emptying = true;
      }, getRandomInt(23000, 24500));

      setTimeout(() => {
        const final_level = 55;
        if ((ob21.liquid1.level > final_level && ob21.liquid1.emptying === false) && (ob21.liquid2.level > final_level && ob21.liquid2.emptying === false) && (ob21.liquid3.level > final_level && ob21.liquid3.emptying === false) && (ob21.liquid4.level > final_level && ob21.liquid4.emptying === false) && (ob21.liquid5.level > final_level && ob21.liquid5.emptying === false) && (ob21.liquid6.level > final_level && ob21.liquid6.emptying === false)) {
          solved.solvedP21 = true;
          for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
            for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
              if (obstacle_objects[n].obstacle21_id === forcefield_objects[l].forcefield) {
                let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                if (barrier) {
                  setTimeout(() => {
                    playSound("save", 5000, scene);
                    barrier.dispose();
                    GUI_Score(200, score, global_language);
                    GUI_Warning(global_language.text.global.success, 1500, scene);
                  }, 1500);
                }
              }
            }
          }
        } else {
          GUI_Warning(global_language.text.puzzles.ob21.fail, 2000, scene);
          ob21.running = false;
          machineSound.detachFromMesh(top1_ob21);
          machineSound.dispose(true, true);
          machineSound = null;
          particleSystem1.dispose(true, true);
          particleSystem1 = null;
          particleSystem2.dispose(true, true);
          particleSystem2 = null;

          let powerDownSound = new Sound("powerDownSound", "./sound/qubodup-PowerDrain.ogg", scene, null, { loop: false, autoplay: true, volume: 0.8, maxDistance: 75 });
          powerDownSound.attachToMesh(top1_ob21);
          setTimeout(() => {
            powerDownSound.detachFromMesh(top1_ob21);
            powerDownSound.dispose(true, true);
            powerDownSound = null;
          }, 3000);
        }
      }, 36000);
    }
    innerFunction();
  }
}

export {poweredMachineOb21};
