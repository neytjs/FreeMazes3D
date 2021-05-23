import {GUI_Warning} from "../gui/gui_warning.js";
import {generateWateringCan} from "../assets/objects/generateWateringCan.js";
import {playSound} from "../assets/playSound.js";

function pourWaterOb8(solved, scene, camera, ob8) {
  let genWateringCan = (status) => {
    let wateringCan = scene.getMeshByName("wateringCan");
    wateringCan.dispose();
    generateWateringCan(status, scene, 0, 0, camera);
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
      GUI_Warning("You are out of water.", 1500);
    } else if (ob8.water > 0) {
      ob8.water = ob8.water - 0.002;
      let barrier1_Ob8 = scene.getMeshByName("barrier1_Ob8");
      let barrier2_Ob8 = scene.getMeshByName("barrier2_Ob8");
      let barrier3_Ob8 = scene.getMeshByName("barrier3_Ob8");
      let barrier4_Ob8 = scene.getMeshByName("barrier4_Ob8");
      let wateringCan = scene.getMeshByName("wateringCan");
      if (barrier1_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.growing_name = "pineTree";
          ob8.growing = true;
      }
      if (barrier2_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.growing_name = "fruitTree";
          ob8.growing = true;
      }
      if (barrier3_Ob8.intersectsMesh(wateringCan, false)) {
          ob8.growing_name = "cactus";
          ob8.growing = true;
      }
      if (barrier4_Ob8.intersectsMesh(wateringCan, false)) {
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

export {pourWaterOb8};
