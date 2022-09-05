import {Vector3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {returnFloorTexture, returnTreeTexture} from "../assets/textures.js";

function pourWaterOb23(solved, scene, camera, ob23, player, global_language, score, obstacle_objects, forcefield_objects) {
  if (player.holding === "wateringCanHedgeMaze") {
    let genWateringCan = (status) => {
      if (status === "holding") {
        let wateringCanPouring = scene.getMeshByName("wateringCanHedgeMazepouring");
        wateringCanPouring.renderingGroupId = 0;
        wateringCanPouring.parent = null;
        wateringCanPouring.position.y = -1000;
        let wateringCanHolding = scene.getMeshByName("wateringCanHedgeMaze");
        wateringCanHolding.position = new Vector3(0, -2.1, 0);
        wateringCanHolding.renderingGroupId = 1;
        wateringCanHolding.parent = camera;
      }
      if (status === "pouring") {
        let wateringCanHolding = scene.getMeshByName("wateringCanHedgeMaze");
        wateringCanHolding.renderingGroupId = 0;
        wateringCanHolding.parent = null;
        wateringCanHolding.position.y = -1000;
        let wateringCanPouring = scene.getMeshByName("wateringCanHedgeMazepouring");
        wateringCanPouring.position = new Vector3(0, -2.1, 0);
        wateringCanPouring.renderingGroupId = 1;
        wateringCanPouring.parent = camera;
      }
    }
    if (ob23.pouring === true && solved.solvedP23 === false) {
      if (ob23.water_counter === 0 && ob23.water > 0) {
        ob23.water_counter = ob23.water_counter + 1;
        genWateringCan("pouring");
      }
      if (ob23.water <= 0 && ob23.water_counter > 0) {
        ob23.water_counter = 0;
        ob23.pouring_sound.dispose(true, true);
        ob23.pouring_sound = null;
        genWateringCan("holding");
        GUI_Warning(global_language.text.puzzles.ob8.warn, 1500, scene);
      } else if (ob23.water > 0) {
        ob23.water = ob23.water - 0.002;
        let pineTree1_Ob23 = scene.getMeshByName("pineTree1_Ob23");
        let pineTree2_Ob23 = scene.getMeshByName("pineTree2_Ob23");
        let pineTree3_Ob23 = scene.getMeshByName("pineTree3_Ob23");
        let wateringCan = scene.getMeshByName("wateringCanHedgeMazepouring");
        let completionTest = (current_obj, name, ob23) => {
          if (current_obj <= 0) {
            let currentTree = scene.getMeshByName(name);
            let specialEffect1 = scene.getMeshByName(name+"SpecialEffect1");
            specialEffect1.material.alpha = 0.2;
            let specialEffect2 = scene.getMeshByName(name+"SpecialEffect2");
            specialEffect2.material.alpha = 0.2;
            let x1 = currentTree.position.x;
            let z1 = currentTree.position.z;
            let y1 = 1000;
            let radius_s1 = 5;
            let s1pi1 = Math.PI;
            let s1height = 1001;
            let s2pi2 = Math.PI;
            let s2height = 1003;

            scene.registerBeforeRender(function() {
              specialEffect1.position = new Vector3((radius_s1 * Math.sin(s1pi1) + x1), s1height, (radius_s1 * Math.cos(s1pi1) + z1));
              s1pi1 = s1pi1 + 0.02;
              s1height = s1height + 0.02;

              specialEffect2.position = new Vector3((radius_s1 * Math.sin(s2pi2) + x1), s2height, (radius_s1 * Math.cos(s2pi2) + z1));
              s2pi2 = s2pi2 - 0.02;
              s2height = s2height + 0.02;

              if (s1height > 1012 & s2height > 1012) {
                specialEffect1.dispose();
                specialEffect2.dispose();
              }
            });

            playSound("positive", 2000, scene);
            GUI_Warning(global_language.text.puzzles.ob23.alert, 1350, scene);
            let trunk = scene.getMeshByName(name + "trunk");
            trunk.material.diffuseTexture = returnTreeTexture("bark_pine_big", scene);
            trunk.material.diffuseTexture.uScale = 3;
            trunk.material.diffuseTexture.vScale = 3;
            let needles = scene.getMeshByName(name + "needles");
            needles.material.diffuseTexture = returnTreeTexture("needles_pine", scene);
            needles.material.diffuseTexture.uScale = 6;
            needles.material.diffuseTexture.vScale = 6;
            let dirt = scene.getMeshByName(name + "dirt");
            dirt.material.diffuseTexture = returnFloorTexture("soil", scene);
            if (ob23.pineTree1 <= 0 && ob23.pineTree2 <= 0 && ob23.pineTree3 <= 0) {
              solved.solvedP23 = true;
              for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                  if (obstacle_objects[n].obstacle23_id === forcefield_objects[l].forcefield) {
                    let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                    if (barrier) {
                      ob23.pouring_sound.dispose(true, true);
                      ob23.pouring_sound = null;
                      let wateringCan = scene.getMeshByName("wateringCanHedgeMaze");
                      wateringCan.dispose();
                      let wateringCanItem = scene.getMeshByName("wateringCanHedgeMazeitem");
                      wateringCanItem.dispose();
                      let wateringCanPouring = scene.getMeshByName("wateringCanHedgeMazepouring");
                      wateringCanPouring.dispose();
                      player.holding = "";
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
            }
          }
        }

        if (pineTree1_Ob23.intersectsMesh(wateringCan, false) && ob23.pineTree1 > 0) {
          ob23.pineTree1 = ob23.pineTree1 - 0.3;
          completionTest(ob23.pineTree1, "pineTree1_Ob23", ob23);
        }
        if (pineTree2_Ob23.intersectsMesh(wateringCan, false) && ob23.pineTree2 > 0) {
          ob23.pineTree2 = ob23.pineTree2 - 0.3;
          completionTest(ob23.pineTree2, "pineTree2_Ob23", ob23);
        }
        if (pineTree3_Ob23.intersectsMesh(wateringCan, false) && ob23.pineTree3 > 0) {
          ob23.pineTree3 = ob23.pineTree3 - 0.3;
          completionTest(ob23.pineTree3, "pineTree3_Ob23", ob23);
        }
      }
    }
    if (ob23.pouring === false && solved.solvedP23 === false && ob23.water_counter > 0) {
      ob23.water_counter = 0;
      genWateringCan("holding");
    }
  }
}

export {pourWaterOb23};
