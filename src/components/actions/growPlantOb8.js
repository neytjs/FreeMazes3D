import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function growPlantOb8(scene, camera, ob8, solved, obstacle_objects, forcefield_objects, score, player, global_language) {
  if (ob8.growing) {
  // first test to make sure if it is shrinking and if so stop it
    if (ob8.shrinking) {
      ob8["shrinking_" + ob8.growing_name] = false;
    }
    let selected = scene.getMeshByName(ob8.growing_name);
    let distance = camera.position.subtract(selected.position).length();
    const max_dist = 10;
    const max_growth = 1.8;
    const hidden = ob8.growing_name + "Hidden";
    if (selected.scaling.y < max_growth && distance < max_dist && ob8.pouring === true && ob8.water > 0) {
      selected.scaling.x = selected.scaling.x + 0.001;
      selected.scaling.y = selected.scaling.y + 0.002;
      selected.scaling.z = selected.scaling.z + 0.001;
    } else {
      if (selected.scaling.y < max_growth) {
        ob8.shrinking = true;
        ob8.shrinking_name = ob8.growing_name;
      }
      ob8.growing = false;
      ob8.growing_name = "";
    }
    if (selected.scaling.y >= max_growth && ob8[ob8.growing_name] === false) {
      ob8[ob8.growing_name] = true;
      playSound("load", 5000, scene);
      let selectedHidden = scene.getMeshByName(hidden);
      if (selectedHidden) {
        selectedHidden.material.alpha = 1;
      }
      if (ob8.fruitTree && ob8.pineTree && ob8.cactus && ob8.flower) {
        solved.solvedP8 = true;
        for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
          for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
            if (obstacle_objects[n].obstacle8_id === forcefield_objects[l].forcefield) {
              let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
              if (barrier) {
                ob8.pouring_sound.dispose(true, true);
                ob8.pouring_sound = null;
                let wateringCan = scene.getMeshByName("wateringCan");
                wateringCan.dispose();
                let wateringCanItem = scene.getMeshByName("wateringCanitem");
                wateringCanItem.dispose();
                let wateringCanPouring = scene.getMeshByName("wateringCanpouring");
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
}

export {growPlantOb8};
