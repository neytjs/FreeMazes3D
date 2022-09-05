import {ParticleSystem} from "@babylonjs/core/Particles";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function ballLandsOb9(ob9, obstacle_objects, forcefield_objects, solved, scene, score, hidden, num, global_language) {
  let counter = 0;
  // now test to see if the ball matches the plate
  for (let i = 0, length = obstacle_objects.length; i < length; i++) {
    if (obstacle_objects[i].type === "plate_Ob9" && obstacle_objects[i].color_name === ob9[hidden].color_name && obstacle_objects[i].plate_number === num) {
      counter = counter + 1;
      let hiddenBall = scene.getMeshByName(hidden);
      const particleSystem = new ParticleSystem("ballParticles"+num, 2000);
      particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
      particleSystem.emitter = hiddenBall.position;
      particleSystem.addColorGradient(0, new Color3(ob9[hidden].color_code.r, ob9[hidden].color_code.g, ob9[hidden].color_code.b));
      particleSystem.start();
      ob9["particle"+num] = particleSystem;
      playSound("positive", 2000, scene);
      ob9["plate" + obstacle_objects[i].plate_number] = true;
    // now test for puzzle completion
      if (ob9.plate1 === true && ob9.plate2 === true && ob9.plate3 === true && ob9.plate4 === true) {
        for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
          if (obstacle_objects[i].obstacle9_id === forcefield_objects[l].forcefield) {
            solved.solvedP9 = true;
            let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
            if (barrier) {
              setTimeout(() => {
                playSound("save", 5000, scene);
                barrier.dispose();
                GUI_Score(100, score, global_language);
                GUI_Warning(global_language.text.global.success, 1500, scene);
              }, 1500);
            }
          }
        }
      }
      break;
    }
  }
  if (counter === 0) {
    playSound("negative", 3000, scene);
  }
}

export {ballLandsOb9};
