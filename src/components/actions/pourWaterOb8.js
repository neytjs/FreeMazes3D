import {Vector3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function pourWaterOb8(solved, scene, camera, ob8, player, global_language) {
  if (player.holding === "wateringCan") {
    let genWateringCan = (status) => {
      if (status === "holding") {
        let wateringCanPouring = scene.getMeshByName("wateringCanpouring");
        wateringCanPouring.renderingGroupId = 0;
        wateringCanPouring.parent = null;
        wateringCanPouring.position.y = -1000;
        let wateringCanHolding = scene.getMeshByName("wateringCan");
        wateringCanHolding.position = new Vector3(0, -2.1, 0);
        wateringCanHolding.renderingGroupId = 1;
        wateringCanHolding.parent = camera;
      }
      if (status === "pouring") {
        let wateringCanHolding = scene.getMeshByName("wateringCan");
        wateringCanHolding.renderingGroupId = 0;
        wateringCanHolding.parent = null;
        wateringCanHolding.position.y = -1000;
        let wateringCanPouring = scene.getMeshByName("wateringCanpouring");
        wateringCanPouring.position = new Vector3(0, -2.1, 0);
        wateringCanPouring.renderingGroupId = 1;
        wateringCanPouring.parent = camera;
      }
    }
    if (ob8.pouring === true && solved.solvedP8 === false) {
      if (ob8.water_counter === 0 && ob8.water > 0) {
        ob8.water_counter = ob8.water_counter + 1;
        genWateringCan("pouring");
      }
      if (ob8.water <= 0 && ob8.water_counter > 0) {
        ob8.water_counter = 0;
        ob8.pouring_sound.dispose(true, true);
        ob8.pouring_sound = null;
        genWateringCan("holding");
        GUI_Warning(global_language.text.puzzles.ob8.warn, 1500, scene);
      } else if (ob8.water > 0) {
        ob8.water = ob8.water - 0.002;
        let barrier1_Ob8 = scene.getMeshByName("barrier1_Ob8");
        let barrier2_Ob8 = scene.getMeshByName("barrier2_Ob8");
        let barrier3_Ob8 = scene.getMeshByName("barrier3_Ob8");
        let barrier4_Ob8 = scene.getMeshByName("barrier4_Ob8");
        let wateringCan = scene.getMeshByName("wateringCanpouring");
        if (barrier1_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.shrinking_name = "";
          ob8.shrinking_pineTree = false;
          ob8.growing_name = "pineTree";
          ob8.growing = true;
        }
        if (barrier2_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.shrinking_name = "";
          ob8.shrinking_fruitTree = false;
          ob8.growing_name = "fruitTree";
          ob8.growing = true;
        }
        if (barrier3_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.shrinking_name = "";
          ob8.shrinking_cactus = false;
          ob8.growing_name = "cactus";
          ob8.growing = true;
        }
        if (barrier4_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.shrinking_name = "";
          ob8.shrinking_flower = false;
          ob8.growing_name = "flower";
          ob8.growing = true;
        }
      }
    }
    if (ob8.pouring === false && solved.solvedP8 === false && ob8.water_counter > 0) {
      ob8.water_counter = 0;
      genWateringCan("holding");
    }
  }
}

export {pourWaterOb8};
