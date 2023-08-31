import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function startTimerOb16(ob16, scene, obstacle_objects, forcefield_objects, score, solved, global_language) {
  let counter = 0;
  const time_limit = 10;
  GUI_Warning(global_language.text.puzzles.ob16.warn.part1 + time_limit + global_language.text.puzzles.ob16.warn.part2, 1500, scene);
  playSound("tock", 1000, scene);
  function innerFunction() {
    setTimeout(() => {
      counter = counter + 1;
      if (counter % 2) {
        playSound("tick", 1000, scene);
      } else {
        playSound("tock", 1000, scene);
      }
      if (counter < time_limit) {
        innerFunction();
      } else {
        if (ob16.hint_bulb1 === ob16.puzz_bulb1 && ob16.hint_bulb2 === ob16.puzz_bulb2 && ob16.hint_bulb3 === ob16.puzz_bulb3 && ob16.hint_bulb4 === ob16.puzz_bulb4) {
          solved.solvedP16 = true;
          for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
            for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
              if (obstacle_objects[n].obstacle16_id === forcefield_objects[l].forcefield) {
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
          playSound("negative", 3000, scene);
          GUI_Warning(global_language.text.global.fail, 1500, scene);
          ob16.bulb_counter = 0;
          ob16.pushButton1p16 = false;
          ob16.pushButton2p16 = true;
          ob16.pushButton3p16 = true;
          ob16.pushButton4p16 = true;
          ob16.pushButton5p16 = true;
          ob16.puzz_bulb1 = "";
          ob16.puzz_bulb2 = "";
          ob16.puzz_bulb3 = "";
          ob16.puzz_bulb4 = "";
          let bulb1 = scene.getMeshByName("bulb1Ob16");
          bulb1.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
          bulb1.material.specularColor = new Color3(0.55, 0.48, 0.48);
          bulb1.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
          bulb1.material.ambientColor = new Color3(0.55, 0.48, 0.48);
          let bulb2 = scene.getMeshByName("bulb2Ob16");
          bulb2.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
          bulb2.material.specularColor = new Color3(0.55, 0.48, 0.48);
          bulb2.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
          bulb2.material.ambientColor = new Color3(0.55, 0.48, 0.48);
          let bulb3 = scene.getMeshByName("bulb3Ob16");
          bulb3.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
          bulb3.material.specularColor = new Color3(0.55, 0.48, 0.48);
          bulb3.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
          bulb3.material.ambientColor = new Color3(0.55, 0.48, 0.48);
          let bulb4 = scene.getMeshByName("bulb4Ob16");
          bulb4.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
          bulb4.material.specularColor = new Color3(0.55, 0.48, 0.48);
          bulb4.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
          bulb4.material.ambientColor = new Color3(0.55, 0.48, 0.48);
        }
      }
    }, 1050);
  }
  innerFunction();
}

export {startTimerOb16};
