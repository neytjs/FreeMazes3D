import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function removeBarrierOb18(buttons, solved, obstacle_objects, forcefield_objects, scene, score, global_language) {
  if (buttons.pushingButton === "pushButton1p18a") {
    solved.solvedP18 = true;
    for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
      for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
        if (obstacle_objects[n].obstacle18_id === forcefield_objects[l].forcefield) {
          let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
          if (barrier) {
            playSound("save", 5000, scene);
            barrier.dispose();
            GUI_Score(200, score, global_language);
            GUI_Warning(global_language.text.global.success, 1500, scene);
          }
        }
      }
    }
  }
}

export {removeBarrierOb18};
